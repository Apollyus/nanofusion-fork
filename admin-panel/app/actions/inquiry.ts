'use server'

import { createClient } from '@/lib/supabase/server'
import { inquirySchema, InquiryInput } from '@/lib/validations/inquiry'
import { revalidatePath } from 'next/cache'

export async function submitInquiry(rawInput: any) {
  // 1. Server-side validation
  const result = inquirySchema.safeParse(rawInput)
  
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }

  const data = result.data
  const supabase = await createClient()

  // 2. Database insert
  const { error } = await (supabase.from('inquiries') as any).insert({
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    address: data.address,
    service: data.service || 'general',
    distance_km: data.distance_km || 0,
    travel_cost_czk: data.travel_cost_czk || 0,
    source: 'form',
    status: 'new'
  })

  if (error) {
    console.error('Inquiry submission error:', error)
    return {
      success: false,
      message: 'Nepodařilo se odeslat poptávku. Zkuste to prosím později.'
    }
  }

  // 3. Cache revalidation
  revalidatePath('/admin/inquiries')
  revalidatePath('/')

  return {
    success: true,
    message: 'Vaši poptávku jsme přijali!'
  }
}

export async function calculateTrip(address: string) {
  // We can't import distance.ts directly if it uses process.env on client, 
  // but this is a server action so it's fine.
  try {
    const { getDistanceKm, getTravelCost } = await import('@/lib/distance')
    const supabase = await createClient()
    
    const distanceKm = await getDistanceKm(address)
    const travelCost = await getTravelCost(supabase, distanceKm)
    
    return { success: true, distanceKm, travelCost }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
}
