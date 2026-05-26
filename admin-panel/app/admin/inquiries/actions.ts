'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateInquiryStatus(id: string, status: string) {
  const supabase = await createAdminClient()
  if (!supabase) throw new Error('Admin client unavailable')
  const { error } = await (supabase.from('inquiries') as any)
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/inquiries')
}

export async function updateInquiryNotes(id: string, notes: string) {
  const supabase = await createAdminClient()
  if (!supabase) throw new Error('Admin client unavailable')
  const { error } = await (supabase.from('inquiries') as any)
    .update({ notes, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/inquiries')
}

export async function deleteInquiry(id: string) {
  const supabase = await createAdminClient()
  if (!supabase) throw new Error('Admin client unavailable')
  const { error } = await (supabase.from('inquiries') as any).delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/inquiries')
}
