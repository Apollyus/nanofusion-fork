'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { uploadFile } from '@/lib/storage'
import { Realization } from './realizations-client'

export async function createRealization(data: {
  title: string
  subtitle?: string
  description?: string
  location?: string
  duration?: string
  work_type?: string
  category?: string
  youtube_id?: string
}) {
  const supabase = await createAdminClient()
  const { data: realization, error } = await (supabase.from('realizations') as any)
    .insert(data)
    .select('*')
    .single()
  if (error) throw new Error(error.message)
  revalidatePath('/admin/realizations')
  return realization as Realization
}

export async function updateRealization(id: string, data: Partial<{
  title: string
  subtitle: string
  description: string
  location: string
  duration: string
  work_type: string
  category: string
  youtube_id: string
  is_published: boolean
}>) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('realizations') as any)
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/realizations')
}

export async function deleteRealization(id: string) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('realizations') as any).delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/realizations')
}

export async function togglePublished(id: string, is_published: boolean) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('realizations') as any)
    .update({ is_published, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/realizations')
}

export async function uploadMultipleRealizationPhotos(
  realizationId: string,
  formData: FormData
) {
  const supabase = await createAdminClient()
  const files = formData.getAll('files') as File[]
  if (!files || files.length === 0) throw new Error('No files provided')

  const results = []
  for (const file of files) {
    try {
      const publicUrl = await uploadFile(supabase, file, 'realizations', realizationId)
      const res: any = await (supabase.from('realization_photos') as any).insert({
        realization_id: realizationId,
        url: publicUrl,
        order_index: Math.floor(Date.now() / 1000) + results.length,
      }).select().single()

      if (res.error) throw res.error
      results.push(res.data)
    } catch (err) {
      console.error(`Batch upload failed for one file:`, err)
    }
  }

  revalidatePath('/admin/realizations')
  return results
}

export async function uploadRealizationPhoto(
  realizationId: string,
  file: FormData
) {
  const supabase = await createAdminClient()
  const fileData = file.get('file') as File
  if (!fileData) throw new Error('No file provided')

  const publicUrl = await uploadFile(supabase, fileData, 'realizations', realizationId)

  const res: any = await (supabase.from('realization_photos') as any).insert({
    realization_id: realizationId,
    url: publicUrl,
    order_index: Math.floor(Date.now() / 1000), 
  }).select().single()

  if (res.error) {
    console.error(`[Admin] Database write failed for photo ${publicUrl}:`, res.error)
    throw new Error(`Database write failed: ${res.error.message}`)
  }

  revalidatePath('/admin/realizations')
  return res.data?.url || publicUrl
}

export async function deleteRealizationPhoto(photoId: string) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('realization_photos') as any)
    .delete()
    .eq('id', photoId)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/realizations')
}

export async function updateRealizationPhotos(photos: { id: string, caption?: string, order_index: number }[]) {
  const supabase = await createAdminClient()
  
  for (const photo of photos) {
    const { error } = await (supabase.from('realization_photos') as any)
      .update({ 
        caption: photo.caption, 
        order_index: photo.order_index,
        updated_at: new Date().toISOString() 
      })
      .eq('id', photo.id)
    
    if (error) console.error(`Error updating photo ${photo.id}:`, error.message)
  }
  
  revalidatePath('/admin/realizations')
}
