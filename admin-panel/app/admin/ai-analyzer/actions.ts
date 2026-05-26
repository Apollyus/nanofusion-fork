'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateAnalysisStatus(id: string, status: 'new' | 'in_progress' | 'contacted' | 'resolved') {
  const supabase = await createAdminClient()
  
  const { error } = await (supabase.from('ai_analyses') as any)
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
  
  if (error) throw new Error(error.message)
  revalidatePath('/admin/ai-analyzer')
  revalidatePath('/admin')
}

export async function updateAnalysisNotes(id: string, additional_notes: string) {
  const supabase = await createAdminClient()
  
  const { error } = await (supabase.from('ai_analyses') as any)
    .update({ additional_notes, updated_at: new Date().toISOString() })
    .eq('id', id)
  
  if (error) throw new Error(error.message)
  revalidatePath('/admin/ai-analyzer')
}

export async function deleteAnalysis(id: string) {
  const supabase = await createAdminClient()
  
  const { error } = await (supabase.from('ai_analyses') as any)
    .delete()
    .eq('id', id)
  
  if (error) throw new Error(error.message)
  revalidatePath('/admin/ai-analyzer')
  revalidatePath('/admin')
}
