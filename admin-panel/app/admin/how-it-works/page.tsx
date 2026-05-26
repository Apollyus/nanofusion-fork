'use server'

import { createClient } from '@/lib/supabase/server'
import { HowItWorksClient } from './how-it-works-client'

export default async function HowItWorksPage() {
  const supabase = await createClient()
  
  // Fetch section header
  const { data: section } = await (supabase.from('site_sections') as any)
    .select('*')
    .eq('section_key', 'how_it_works')
    .single()

  // Fetch steps
  const { data: steps } = await (supabase.from('how_it_works_steps') as any)
    .select('*')
    .order('order_index', { ascending: true })

  return (
    <HowItWorksClient 
      initialSection={section || { title: 'Jak to funguje', subtitle: '3 jednoduché kroky ke změně' }} 
      initialSteps={steps || []} 
    />
  )
}
