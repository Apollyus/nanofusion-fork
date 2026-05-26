'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { uploadFile } from '@/lib/storage'

export async function uploadHeroFile(formData: FormData) {
  const supabase = await createAdminClient()
  const file = formData.get('file') as File
  if (!file) throw new Error('Chybí soubor')
  const publicUrl = await uploadFile(supabase, file, 'heroes', 'hero')
  const { error } = await (supabase.from('hero_media') as any)
    .insert({ url: publicUrl, type: file.type.startsWith('video/') ? 'video' : 'image', is_active: false })
  if (error) throw new Error(error.message)
  revalidatePath('/admin/hero')
  return publicUrl
}


export async function updateHeroTitle(value: string) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('site_config') as any)
    .upsert({ key: 'hero_title', value }, { onConflict: 'key' })
  
  if (error) throw new Error(error.message)
  revalidatePath('/admin/hero')
  revalidatePath('/')
}

export async function toggleHeroMedia(id: string, is_active: boolean) {
  const supabase = await createAdminClient()
  
  if (is_active) {
    await (supabase.from('hero_media') as any).update({ is_active: false }).neq('id', id)
  }

  const { error } = await (supabase.from('hero_media') as any)
    .update({ is_active, updated_at: new Date().toISOString() })
    .eq('id', id)
  
  if (error) throw new Error(error.message)
  revalidatePath('/admin/hero')
  revalidatePath('/')
}

export async function addHeroMedia(url: string, type: 'image' | 'video') {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('hero_media') as any)
    .insert({ url, type, is_active: false })
  
  if (error) throw new Error(error.message)
  revalidatePath('/admin/hero')
}

export async function deleteHeroMedia(id: string) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('hero_media') as any)
    .delete()
    .eq('id', id)
  
  if (error) throw new Error(error.message)
  revalidatePath('/admin/hero')
}
