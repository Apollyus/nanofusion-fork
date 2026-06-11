'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateInquiryStatus(id: string, status: string, source?: string) {
  const supabase = await createAdminClient()
  if (!supabase) throw new Error('Admin client unavailable')
  
  const targetTable = source === 'ai_analyzer' ? 'leads' : 'inquiries'
  const { error } = await (supabase.from(targetTable) as any)
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    
  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/inquiries')
  revalidatePath('/admin/analyzer')
}

export async function updateInquiryNotes(id: string, notes: string, source?: string) {
  const supabase = await createAdminClient()
  if (!supabase) throw new Error('Admin client unavailable')
  
  const targetTable = source === 'ai_analyzer' ? 'leads' : 'inquiries'
  const payload = source === 'ai_analyzer' 
    ? { description: notes, updated_at: new Date().toISOString() }
    : { notes, updated_at: new Date().toISOString() }

  const { error } = await (supabase.from(targetTable) as any)
    .update(payload)
    .eq('id', id)
    
  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/inquiries')
  revalidatePath('/admin/analyzer')
}

export async function deleteInquiry(id: string, source?: string) {
  const supabase = await createAdminClient()
  if (!supabase) throw new Error('Admin client unavailable')
  
  const targetTable = source === 'ai_analyzer' ? 'leads' : 'inquiries'
  const { error } = await (supabase.from(targetTable) as any)
    .delete()
    .eq('id', id)
    
  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/inquiries')
  revalidatePath('/admin/analyzer')
}
