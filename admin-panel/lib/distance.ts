import { SupabaseClient } from '@supabase/supabase-js'

export async function getDistanceKm(customerAddress: string): Promise<number> {
  const origin = encodeURIComponent('Cezavy 627, 664 56 Blučina, Czechia')
  const destination = encodeURIComponent(customerAddress)

  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    console.warn('GOOGLE_MAPS_API_KEY is missing, returning default distance')
    return 0
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json` +
      `?origins=${origin}&destinations=${destination}` +
      `&key=${apiKey}&language=cs&units=metric`
    )
    const data = await res.json()
    const element = data.rows?.[0]?.elements?.[0]

    if (element?.status !== 'OK') {
      throw new Error('Nepodařilo se vypočítat vzdálenost: ' + (element?.status || 'Unknown error'))
    }
    
    return Math.ceil(element.distance.value / 1000)
  } catch (error) {
    console.error('Distance calculation error:', error)
    throw error
  }
}

export async function getTravelCost(supabase: SupabaseClient, distanceKm: number): Promise<number> {
  const { data } = await supabase
    .from('configurator_prices')
    .select('price')
    .eq('item_key', 'price_per_km')
    .single()
    
  const pricePerKm = data?.price ?? 12
  return distanceKm * pricePerKm
}
