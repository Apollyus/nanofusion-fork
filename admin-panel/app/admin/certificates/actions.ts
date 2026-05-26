'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { uploadFile } from '@/lib/storage'

export async function uploadCertificateImage(formData: FormData) {
  const supabase = await createAdminClient()
  const file = formData.get('file') as File
  if (!file) throw new Error('Chybí soubor')
  
  const publicUrl = await uploadFile(supabase, file, 'media', 'certificates')
  return publicUrl
}

export async function updateCertificatesConfig(certificates: any[]) {
  const supabase = await createAdminClient()
  const value = JSON.stringify(certificates)
  
  const { error } = await (supabase.from('site_config') as any)
    .upsert({ key: 'about_certificates', value }, { onConflict: 'key' })
  
  if (error) throw new Error(error.message)
  revalidatePath('/admin/certificates')
  revalidatePath('/')
  return { success: true }
}
