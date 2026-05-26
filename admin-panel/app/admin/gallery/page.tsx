'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { GalleryClient } from './gallery-client'

export default async function GalleryPage() {
  const supabase = await createAdminClient()

  // Standalone items (no album)
  const { data: items } = await (supabase.from('gallery_items') as any)
    .select('*')
    .is('album_id', null)
    .order('order_index', { ascending: true })

  // Albums with their photos
  const { data: albums } = await (supabase.from('gallery_albums') as any)
    .select('*, gallery_items(*)')
    .order('order_index', { ascending: true })

  return (
    <GalleryClient
      initialItems={(items as any[]) ?? []}
      initialAlbums={(albums as any[]) ?? []}
    />
  )
}
