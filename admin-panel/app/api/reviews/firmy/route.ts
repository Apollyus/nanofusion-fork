import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')

  // Auth: cron nebo admin
  const isAuthorized =
    key === process.env.CRON_SECRET ||
    process.env.NODE_ENV !== 'production'
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const profileUrl = process.env.FIRMY_CZ_PROFILE_URL
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!profileUrl || !supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: 'Chybí konfigurace: FIRMY_CZ_PROFILE_URL, NEXT_PUBLIC_SUPABASE_URL nebo SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    // 1. Stáhni HTML profilu Firmy.cz
    const response = await fetch(profileUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'cs-CZ,cs;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      next: { revalidate: 0 },
    })

    if (!response.ok) {
      return NextResponse.json({ error: `Firmy.cz odpověděl: ${response.status}` }, { status: 502 })
    }

    const html = await response.text()

    // 2. Celkové hodnocení (pro stats)
    const ratingMatch = html.match(/class="score-value">([\\d,.]+)</)
    const countMatch = html.match(/class="score-count">(\d+)/)
    const overallRating = ratingMatch ? parseFloat(ratingMatch[1].replace(',', '.')) : 0
    const reviewCount = countMatch ? parseInt(countMatch[1]) : 0

    // 3. JSON-LD Schema.org parsing — nejspolehlivější metoda (SSR)
    const reviews: Array<{
      external_id: string
      author: string
      rating: number
      content: string
      published_at: string | null
    }> = []

    const jsonLdBlocks = html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)

    for (const match of jsonLdBlocks) {
      try {
        const raw = match[1].trim()
        const data = JSON.parse(raw)
        const entities = Array.isArray(data) ? data : [data]

        for (const entity of entities) {
          // Recenze mohou být přímo na objektu nebo vnořené
          const rawReviews = entity?.review
            ? (Array.isArray(entity.review) ? entity.review : [entity.review])
            : []

          for (const rev of rawReviews) {
            const author = rev?.author?.name || rev?.author || 'Anonymní'
            const rating = parseInt(rev?.reviewRating?.ratingValue ?? rev?.rating ?? '5')
            const content = rev?.reviewBody || rev?.description || ''
            const datePublished = rev?.datePublished || null

            if (!content || content.length < 5) continue

            // Generujeme stabilní external_id z obsahu
            const extId = `firmy_${btoa(encodeURIComponent(author + content.substring(0, 30))).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32)}`

            reviews.push({
              external_id: extId,
              author,
              rating: isNaN(rating) ? 5 : Math.min(5, Math.max(1, rating)),
              content,
              published_at: datePublished,
            })
          }
        }
      } catch (_) {
        // Přeskočíme neplatné JSON-LD bloky
      }
    }

    // 4. Fallback: HTML scraping přes Firmy.cz CSS třídy (reviewItem__*)
    if (reviews.length === 0) {
      // Firmy.cz CSS class pattern (dynamicky načítáno, ale někdy v SSR pro SEO)
      const authorPattern = /class="reviewItem__authorName[^"]*"[^>]*>([^<]+)</gi
      const textPattern = /class="reviewItem__text[^"]*"[^>]*>([\s\S]*?)<\/p>/gi
      const datePattern = /class="reviewItem__date[^"]*"[^>]*>([^<]+)</gi

      const authors: string[] = []
      const texts: string[] = []
      const dates: string[] = []

      let m: RegExpExecArray | null
      while ((m = authorPattern.exec(html)) !== null) authors.push(m[1].trim())
      while ((m = textPattern.exec(html)) !== null) texts.push(m[1].replace(/<[^>]+>/g, '').trim())
      while ((m = datePattern.exec(html)) !== null) dates.push(m[1].trim())

      for (let i = 0; i < Math.min(authors.length, texts.length); i++) {
        if (texts[i].length < 5) continue
        const extId = `firmy_css_${Buffer.from(authors[i] + texts[i].substring(0, 20)).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 32)}`
        reviews.push({
          external_id: extId,
          author: authors[i] || 'Anonymní',
          rating: 5,
          content: texts[i],
          published_at: dates[i] || null,
        })
      }
    }

    // 5. Upsert recenzí do external_reviews (skip duplicity přes external_id)
    let imported = 0
    let skipped = 0

    for (const rev of reviews) {
      const { error } = await supabase.from('external_reviews').upsert({
        source: 'firmy.cz',
        external_id: rev.external_id,
        author: rev.author,
        rating: rev.rating,
        content: rev.content,
        published_at: rev.published_at,
        approved: false, // Čeká na schválení v admin panelu
        fetched_at: new Date().toISOString(),
      }, { onConflict: 'external_id', ignoreDuplicates: true })

      if (error) {
        skipped++
      } else {
        imported++
      }
    }

    // 6. Ulož celkové hodnocení do firmy_stats (pro dashboard)
    if (overallRating > 0) {
      try {
        await supabase.from('firmy_stats').upsert({
          rating: overallRating,
          review_count: reviewCount,
          updated_at: new Date().toISOString(),
        })
      } catch (_) {} // Tabulka nemusí existovat
    }

    console.log(`Firmy.cz sync: ${imported} nových, ${skipped} přeskočeno, ${reviews.length} celkem`)

    return NextResponse.json({
      ok: true,
      overall_rating: overallRating,
      total_on_firmy: reviewCount,
      parsed_reviews: reviews.length,
      imported,
      skipped,
      note: imported > 0
        ? `${imported} nových recenzí čeká na schválení v admin panelu`
        : 'Žádné nové recenze k importu (nebo JSON-LD chybí v HTML)',
    })

  } catch (error: any) {
    console.error('Firmy.cz scrape error:', error)
    return NextResponse.json({ error: 'Scraping selhal: ' + error.message }, { status: 500 })
  }
}
