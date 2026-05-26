'use server'

import { createClient } from '@/lib/supabase/server'
import { FaqsClient } from './faqs-client'

export default async function FaqsPage() {
  const supabase = await createClient()
  const { data: faqs } = await (supabase.from('faqs') as any)
    .select('*')
    .order('order_index', { ascending: true })

  return <FaqsClient initialFaqs={(faqs as any[]) ?? []} />
}
