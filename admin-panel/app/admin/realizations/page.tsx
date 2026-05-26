'use server'

import { createClient } from '@/lib/supabase/server'
import { RealizationsClient } from './realizations-client'

export default async function RealizationsPage() {
  const supabase = await createClient()
  const { data: realizations } = await (supabase.from('realizations') as any)
    .select('*, realization_photos(*)')
    .order('created_at', { ascending: false })

  return <RealizationsClient initialRealizations={(realizations as any[]) ?? []} />
}
