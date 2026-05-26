'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { uploadFile } from '@/lib/storage'

export async function addYoutubeItem(url: string, caption?: string) {
  const supabase = await createAdminClient()
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  )
  const youtubeId = match?.[1]
  if (!youtubeId) throw new Error('Neplatná YouTube URL')

  const { count } = await (supabase.from('gallery_items') as any)
    .select('*', { count: 'exact', head: true })

  const { data, error } = await (supabase.from('gallery_items') as any).insert({
    type: 'youtube',
    url,
    youtube_id: youtubeId,
    caption: caption || null,
    order_index: count ?? 0,
    is_active: true,
    album_id: null,
  }).select().single()

  if (error) throw new Error(error.message)
  revalidatePath('/admin/gallery')
  return data
}

export async function addImageItem(url: string, caption?: string) {
  const supabase = await createAdminClient()

  const { count } = await (supabase.from('gallery_items') as any)
    .select('*', { count: 'exact', head: true })

  const { data, error } = await (supabase.from('gallery_items') as any).insert({
    type: 'image',
    url,
    caption: caption || null,
    order_index: count ?? 0,
    is_active: true,
    album_id: null,
  }).select().single()

  if (error) throw new Error(error.message)
  revalidatePath('/admin/gallery')
  return data
}

export async function uploadGalleryImage(file: FormData) {
  const supabase = await createAdminClient()
  const fileData = file.get('file') as File
  if (!fileData) throw new Error('No file provided')

  const publicUrl = await uploadFile(supabase, fileData, 'gallery', 'items')
  const item = await addImageItem(publicUrl, file.get('caption') as string | undefined)
  return item
}

export async function deleteGalleryItem(id: string) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('gallery_items') as any).delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/gallery')
}

export async function updateGalleryCaption(id: string, caption: string) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('gallery_items') as any)
    .update({ caption })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/gallery')
}

export async function updateGalleryOrder(updates: { id: string; order_index: number }[]) {
  const supabase = await createAdminClient()
  for (const { id, order_index } of updates) {
    const { error } = await (supabase.from('gallery_items') as any)
      .update({ order_index })
      .eq('id', id)
    if (error) console.error(`Error updating order for ${id}:`, error.message)
  }
  revalidatePath('/admin/gallery')
}

export async function toggleGalleryItemActive(id: string, is_active: boolean) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('gallery_items') as any)
    .update({ is_active })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/gallery')
}

// ============================================================
// ALBUM ACTIONS
// ============================================================

export async function createGalleryAlbum(title: string, caption?: string) {
  const supabase = await createAdminClient()
  const { count } = await (supabase.from('gallery_albums') as any)
    .select('*', { count: 'exact', head: true })
  const { data, error } = await (supabase.from('gallery_albums') as any).insert({
    title,
    caption: caption || null,
    order_index: count ?? 0,
    is_active: true,
  }).select().single()
  if (error) throw new Error(error.message)
  revalidatePath('/admin/gallery')
  return data
}

export async function uploadAlbumPhoto(albumId: string, file: FormData) {
  const supabase = await createAdminClient()
  const fileData = file.get('file') as File
  if (!fileData) throw new Error('No file provided')

  const publicUrl = await uploadFile(supabase, fileData, 'gallery', 'albums')

  const { count } = await (supabase.from('gallery_items') as any)
    .select('*', { count: 'exact', head: true })
    .eq('album_id', albumId)

  const { data, error } = await (supabase.from('gallery_items') as any).insert({
    type: 'image',
    url: publicUrl,
    caption: (file.get('caption') as string) || null,
    order_index: count ?? 0,
    is_active: true,
    album_id: albumId,
  }).select().single()

  if (error) throw new Error(error.message)
  revalidatePath('/admin/gallery')
  return data
}

export async function deleteGalleryAlbum(id: string) {
  const supabase = await createAdminClient()
  // gallery_items cascade-deleted automatically via FK ON DELETE CASCADE
  const { error } = await (supabase.from('gallery_albums') as any).delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/gallery')
}

export async function toggleAlbumActive(id: string, is_active: boolean) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('gallery_albums') as any)
    .update({ is_active })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/gallery')
}

export async function deleteAlbumPhoto(id: string) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('gallery_items') as any).delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/gallery')
}

export async function updateAlbumOrder(updates: { id: string; order_index: number }[]) {
  const supabase = await createAdminClient()
  for (const { id, order_index } of updates) {
    await (supabase.from('gallery_albums') as any).update({ order_index }).eq('id', id)
  }
  revalidatePath('/admin/gallery')
}
