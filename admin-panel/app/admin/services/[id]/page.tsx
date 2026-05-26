'use server'

import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ServiceDetailClient } from './service-detail-client'

export default async function ServiceDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const supabase = await createClient()
  
  const [
    { data: service },
    { data: beforeAfter }
  ] = await Promise.all([
    (supabase.from('services') as any).select('*').eq('id', params.id).single(),
    (supabase.from('service_before_after') as any).select('*').eq('service_id', params.id).order('order_index')
  ])

  if (!service) {
    notFound()
  }

  const [
    { data: serviceSpecificFaqs },
    { data: globalSectionFaqs }
  ] = await Promise.all([
    (supabase.from('service_faqs') as any).select('*').eq('service_id', params.id).order('order_index'),
    (supabase.from('faqs') as any).select('*').eq('page_section', (service as any).slug).order('order_index')
  ])

  // Merge them for the client
  const allFaqs = [
    ...((serviceSpecificFaqs as any[]) ?? []),
    ...((globalSectionFaqs as any[]) ?? []).map(f => ({ ...f, is_global: true }))
  ]

  return (
    <ServiceDetailClient 
      service={service as any} 
      beforeAfterItems={(beforeAfter as any[]) ?? []}
      serviceFaqs={allFaqs as any[]}
    />
  )
}
