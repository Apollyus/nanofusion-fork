import { SupabaseClient } from '@supabase/supabase-js'

export async function uploadFile(
  supabase: SupabaseClient,
  file: File,
  bucket: string,
  folder: string
): Promise<string> {
  const ext = file.name.split('.').pop()
  const path = `${folder}/${Date.now()}-${crypto.randomUUID()}.${ext}`

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { cacheControl: '3600', upsert: false })

  if (error) throw new Error(`Storage upload failed: ${error.message}`)

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path)

  return publicUrl
}
