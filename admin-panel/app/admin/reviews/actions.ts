'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function approveReview(id: string) {
  const supabase = await createAdminClient()
  if (!supabase) throw new Error('Admin client unavailable')
  const { error } = await (supabase.from('external_reviews') as any)
    .update({ approved: true })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/reviews')
}

export async function rejectReview(id: string) {
  const supabase = await createAdminClient()
  if (!supabase) throw new Error('Admin client unavailable')
  const { error } = await (supabase.from('external_reviews') as any)
    .update({ approved: false })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/reviews')
}

export async function deleteReview(id: string) {
  const supabase = await createAdminClient()
  if (!supabase) throw new Error('Admin client unavailable')
  const { error } = await (supabase.from('external_reviews') as any)
    .delete()
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/reviews')
}

export async function addManualReview(data: {
  author: string
  rating: number
  content: string
}) {
  const supabase = await createAdminClient()
  if (!supabase) throw new Error('Admin client unavailable')
  const { error } = await (supabase.from('external_reviews') as any).insert({
    source: 'manual',
    author: data.author,
    rating: data.rating,
    content: data.content,
    approved: true,
    published_at: new Date().toISOString(),
  })
  if (error) throw new Error(error.message)
  revalidatePath('/admin/reviews')
}

// TASK 9: Schválení recenze z Firmy.cz — kopíruje záznam do external_reviews
export async function approveFirmyReview(firmyReviewId: string) {
  const supabase = await createAdminClient()
  if (!supabase) throw new Error('Admin client unavailable')

  const { data: review, error: fetchError } = await (supabase.from('firmy_reviews') as any)
    .select('*')
    .eq('id', firmyReviewId)
    .single()

  if (fetchError || !review) throw new Error('Recenze nenalezena')

  const { error } = await (supabase.from('external_reviews') as any)
    .upsert({
      source: 'firmy.cz',
      external_id: review.external_id || firmyReviewId,
      author: review.author_name,
      rating: review.rating,
      content: review.content,
      published_at: review.review_date,
      approved: true,
    }, { onConflict: 'external_id' })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/reviews')
}

export async function syncFirmyReviews() {
  const profileUrl = process.env.FIRMY_CZ_PROFILE_URL
  if (!profileUrl) throw new Error('Chybí FIRMY_CZ_PROFILE_URL v prostředí Vercelu')

  const supabase = await createAdminClient()
  if (!supabase) throw new Error('Admin client nedostupný')

  // 1. Stáhni HTML profilu
  const response = await fetch(profileUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept-Language': 'cs-CZ,cs;q=0.9',
    },
    cache: 'no-store',
  })

  if (!response.ok) throw new Error(`Firmy.cz odpověděl: ${response.status}`)
  const html = await response.text()

  // 2. JSON-LD Schema.org parsing
  const reviews: Array<{ external_id: string; author: string; rating: number; content: string; published_at: string | null }> = []
  const jsonLdBlocks = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]

  for (const match of jsonLdBlocks) {
    try {
      const data = JSON.parse(match[1].trim())
      const entities = Array.isArray(data) ? data : [data]
      for (const entity of entities) {
        const rawReviews = entity?.review
          ? (Array.isArray(entity.review) ? entity.review : [entity.review])
          : []
        for (const rev of rawReviews) {
          const author = rev?.author?.name || rev?.author || 'Anonymní'
          const rating = Math.min(5, Math.max(1, parseInt(rev?.reviewRating?.ratingValue ?? '5')))
          const content = (rev?.reviewBody || '').trim()
          if (content.length < 5) continue
          const extId = `firmy_${Buffer.from(author + content.substring(0, 30)).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 32)}`
          reviews.push({ external_id: extId, author, rating, content, published_at: rev?.datePublished || null })
        }
      }
    } catch (_) {}
  }

  // 2b. Fallback: HTML scraping (ReviewItem classes) - captures more than JSON-LD
  if (reviews.length === 0) {
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
      const extId = `firmy_html_${Buffer.from(authors[i] + texts[i].substring(0, 20)).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 32)}`
      
      // Prevent duplicates in same run
      if (!reviews.find(r => r.external_id === extId)) {
        reviews.push({
          external_id: extId,
          author: authors[i] || 'Anonymní',
          rating: 5,
          content: texts[i],
          published_at: dates[i] || null
        })
      }
    }
  }

  // 3. Upsert do external_reviews
  let imported = 0
  for (const rev of reviews) {
    // Zkontroluj duplicity ručně (external_id nemá UNIQUE constraint v DB)
    const { data: existing } = await (supabase.from('external_reviews') as any)
      .select('id')
      .eq('external_id', rev.external_id)
      .maybeSingle()

    if (existing) continue // Přeskoč duplicitu

    const { error } = await (supabase.from('external_reviews') as any).insert({
      source: 'firmy.cz',
      external_id: rev.external_id,
      author: rev.author,
      rating: rev.rating,
      content: rev.content,
      published_at: rev.published_at,
      approved: false, // Ruční schvalování na přání klienta
      fetched_at: new Date().toISOString(),
    })
    if (!error) imported++
  }

  revalidatePath('/admin/reviews')
  return { imported, total: reviews.length }
}

export async function syncGoogleReviews() {
  const placeId = process.env.GOOGLE_PLACE_ID || 'ChIJQSiiUsXPHEkcRBUavNy8LwxM'
  const apiKey = process.env.GOOGLE_MAPS_API_KEY

  if (!apiKey) throw new Error('Chybí GOOGLE_MAPS_API_KEY — nastavte ve Vercel env vars')

  const supabase = await createAdminClient()
  if (!supabase) throw new Error('Admin client nedostupný')

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&language=cs&reviews_sort=newest&key=${apiKey}`
  const res = await fetch(url, { cache: 'no-store' })
  const data = await res.json()

  if (data.status !== 'OK') throw new Error(`Google API: ${data.error_message || data.status}`)

  const googleReviews: any[] = data.result?.reviews || []
  let imported = 0

  for (const rev of googleReviews) {
    if (!rev.text || rev.text.length < 5) continue
    const extId = `google_${rev.time}_${rev.author_name.replace(/\s/g, '').substring(0, 16)}`

    const { data: existing } = await (supabase.from('external_reviews') as any)
      .select('id').eq('external_id', extId).maybeSingle()
    if (existing) continue

    const { error } = await (supabase.from('external_reviews') as any).insert({
      source: 'google',
      external_id: extId,
      author: rev.author_name,
      rating: rev.rating,
      content: rev.text,
      published_at: new Date(rev.time * 1000).toISOString(),
      approved: true,
      fetched_at: new Date().toISOString(),
    })
    if (!error) imported++
  }

  revalidatePath('/admin/reviews')
  return { imported, total: googleReviews.length, rating: data.result?.rating }
}

export async function bulkAddReviews(rawText: string) {
  const supabase = await createAdminClient()
  if (!supabase) throw new Error('Admin client nedostupný')

  // Pokročilý parser pro copy-pasted text
  const reviewBlocks = rawText.split(/\n\s*\n/)
  let imported = 0
  
  for (const block of reviewBlocks) {
    const blockLines = block.split('\n').map(l => l.trim()).filter(Boolean)
    if (blockLines.length < 2) continue

    const author = blockLines[0]
    let rating = 5
    let content = ''

    const ratingMatch = block.match(/([1-5])\s*(?:hvězd|hv|stars|★)/i) || block.match(/^([1-5])$/m)
    if (ratingMatch) rating = parseInt(ratingMatch[1])

    content = blockLines.slice(1).filter(l => !l.match(/^[1-5]$/) && !l.match(/hvězd/i)).join(' ')

    if (content.length > 5) {
      const { error } = await (supabase.from('external_reviews') as any).insert({
        source: 'manual_bulk',
        author,
        rating,
        content,
        approved: false,
        published_at: new Date().toISOString(),
      })
      if (!error) imported++
    }
  }

  revalidatePath('/admin/reviews')
  return { imported }
}
