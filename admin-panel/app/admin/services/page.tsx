'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { ServicesClient } from './services-client'

export default async function ServicesPage() {
  const supabase = await createAdminClient()
  const { data: services } = await (supabase.from('services') as any)
    .select('*, service_before_after(count), service_reviews(count)')
    .order('order_index', { ascending: true })

  return <ServicesClient initialServices={(services as any[]) ?? []} />
}
