'use server'

import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ServiceDetailClient } from './service-detail-client'

export default async function ServiceDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const supabase = await createClient()
  
  const [
    { data: service },
    { data: beforeAfter },
    { data: serviceReviews },
    { data: externalReviews }
  ] = await Promise.all([
    (supabase.from('services') as any).select('*').eq('id', params.id).single(),
    (supabase.from('service_before_after') as any).select('*').eq('service_id', params.id).order('order_index'),
    (supabase.from('service_reviews') as any).select('*').eq('service_id', params.id).order('created_at', { ascending: false }),
    (supabase.from('external_reviews') as any).select('*').eq('approved', true).order('published_at', { ascending: false })
  ])

  if (!service) {
    notFound()
  }

  const [
    { data: serviceSpecificFaqs },
    { data: globalSectionFaqs },
    { data: processConfig }
  ] = await Promise.all([
    (supabase.from('service_faqs') as any).select('*').eq('service_id', params.id).order('order_index'),
    (supabase.from('faqs') as any).select('*').eq('page_section', (service as any).slug).order('order_index'),
    (supabase.from('site_config') as any).select('value').eq('key', `service_process_${params.id}`).maybeSingle()
  ])

  // Merge them for the client
  const allFaqs = [
    ...((serviceSpecificFaqs as any[]) ?? []),
    ...((globalSectionFaqs as any[]) ?? []).map(f => ({ ...f, is_global: true }))
  ]

  let initialProcessSteps: Array<{ step: string; title: string; desc: string }> = []
  if (processConfig?.value) {
    try {
      initialProcessSteps = JSON.parse(processConfig.value)
    } catch (e) {
      initialProcessSteps = []
    }
  }

  return (
    <ServiceDetailClient 
      service={service as any} 
      beforeAfterItems={(beforeAfter as any[]) ?? []}
      serviceFaqs={allFaqs as any[]}
      serviceReviews={(serviceReviews as any[]) ?? []}
      externalReviews={(externalReviews as any[]) ?? []}
      initialProcessSteps={initialProcessSteps}
    />
  )
}
