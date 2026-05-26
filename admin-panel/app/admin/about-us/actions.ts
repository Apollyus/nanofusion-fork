'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateAboutConfig(key: string, value: string) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('site_config') as any)
    .upsert({ key, value }, { onConflict: 'key' })
  
  if (error) throw new Error(error.message)
  revalidatePath('/admin/about-us')
  revalidatePath('/')
}
