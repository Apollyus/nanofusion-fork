import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')

  const isAuthorized =
    key === process.env.CRON_SECRET ||
    process.env.NODE_ENV !== 'production'

  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const placeId = process.env.GOOGLE_PLACE_ID || 'ChIJQSiiUsXPHEkcRBUavNy8LwxM'
  const apiKey = process.env.GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Chybí GOOGLE_MAPS_API_KEY v prostředí. Nastavte ho ve Vercel → Settings → Environment Variables.' },
      { status: 500 }
    )
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&language=cs&reviews_sort=newest&key=${apiKey}`
    const res = await fetch(url, { cache: 'no-store' })
    const data = await res.json()

    if (data.status !== 'OK') {
      return NextResponse.json(
        { error: `Google Places API: ${data.error_message || data.status}` },
        { status: 502 }
      )
    }

    const googleReviews: any[] = data.result?.reviews || []
    let imported = 0

    for (const rev of googleReviews) {
      if (!rev.text || rev.text.length < 5) continue

      const extId = `google_${rev.time}_${rev.author_name.replace(/\s/g, '').substring(0, 16)}`

      // Zkontroluj duplicity
      const { data: existing } = await supabase
        .from('external_reviews')
        .select('id')
        .eq('external_id', extId)
        .maybeSingle()

      if (existing) continue

      const { error } = await supabase.from('external_reviews').insert({
        source: 'google',
        external_id: extId,
        author: rev.author_name,
        rating: rev.rating,
        content: rev.text,
        published_at: new Date(rev.time * 1000).toISOString(),
        approved: true, // Google recenze = automaticky schváleny
        fetched_at: new Date().toISOString(),
      } as any)

      if (!error) imported++
    }

    return NextResponse.json({
      ok: true,
      overall_rating: data.result?.rating,
      total_on_google: data.result?.user_ratings_total,
      found: googleReviews.length,
      imported,
      note: imported > 0
        ? `${imported} nových Google recenzí importováno a ihned zveřejněno`
        : 'Žádné nové Google recenze (vše již importováno)',
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Sync selhal: ' + error.message }, { status: 500 })
  }
}
