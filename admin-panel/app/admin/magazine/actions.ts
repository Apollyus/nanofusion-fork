'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveArticle(id: string | null, data: any) {
  const supabase = await createAdminClient()
  
  if (id) {
    // Update — uses 'articles' table (unified with public web)
    const { error } = await (supabase.from('articles') as any)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) throw new Error(error.message)
  } else {
    // Create — uses 'articles' table (unified with public web)
    const { error } = await (supabase.from('articles') as any)
      .insert({ ...data, is_published: false })
    if (error) throw new Error(error.message)
  }
  
  revalidatePath('/admin/magazine')
}

export async function deleteArticle(id: string) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('articles') as any).delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/magazine')
}
