'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { uploadFile } from '@/lib/storage'

export async function createService(data: { name: string; slug: string }) {
  const supabase = await createAdminClient()
  const { data: service, error } = await (supabase.from('services') as any)
    .insert({ ...data, is_active: true })
    .select('id')
    .single()
  
  if (error) throw new Error(error.message)
  revalidatePath('/admin/services')
  return (service as any).id
}

export async function updateService(id: string, data: any) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('services') as any)
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)
  
  if (error) throw new Error(error.message)
  revalidatePath('/admin/services')
  revalidatePath(`/admin/services/${id}`)
}

export async function deleteService(id: string) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('services') as any).delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/services')
}

export async function toggleServiceStatus(id: string, is_active: boolean) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('services') as any)
    .update({ is_active, updated_at: new Date().toISOString() })
    .eq('id', id)
  
  if (error) throw new Error(error.message)
  revalidatePath('/admin/services')
}

export async function reorderServices(items: { id: string; order_index: number }[]) {
  const supabase = await createAdminClient()
  const updates = items.map(({ id, order_index }) =>
    (supabase.from('services') as any).update({ order_index }).eq('id', id)
  )
  await Promise.all(updates)
  revalidatePath('/admin/services')
}

export async function addServiceFaq(serviceId: string, question: string, answer: string) {
  const supabase = await createAdminClient()
  const { data, error } = await (supabase.from('service_faqs') as any)
    .insert({ service_id: serviceId, question, answer })
    .select()
    .single()
  
  if (error) throw new Error(error.message)
  revalidatePath(`/admin/services/${serviceId}`)
  return data
}

export async function updateServiceFaq(id: string, data: any) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('service_faqs') as any)
    .update(data)
    .eq('id', id)
  
  if (error) throw new Error(error.message)
}

export async function deleteServiceFaq(id: string) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('service_faqs') as any).delete().eq('id', id)
  if (error) throw new Error(error.message)
}

// --- Before/After management ---
export async function addBeforeAfter(serviceId: string, beforeUrl: string, afterUrl: string, caption?: string) {
  const supabase = await createAdminClient()
  const { count } = await (supabase.from('service_before_after') as any)
    .select('*', { count: 'exact', head: true })
    .eq('service_id', serviceId)
  const { data, error } = await (supabase.from('service_before_after') as any)
    .insert({ service_id: serviceId, before_url: beforeUrl, after_url: afterUrl, caption: caption || '', order_index: count ?? 0 })
    .select()
    .single()
  if (error) throw new Error(error.message)
  revalidatePath(`/admin/services/${serviceId}`)
  return data
}

export async function deleteBeforeAfter(id: string, serviceId: string) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('service_before_after') as any).delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath(`/admin/services/${serviceId}`)
}

export async function uploadServiceFile(serviceId: string, formData: FormData) {
  const supabase = await createAdminClient()
  const file = formData.get('file') as File
  if (!file) throw new Error('Chybí soubor')
  return await uploadFile(supabase, file, 'services', `${serviceId}/before-after`)
}

export async function uploadBeforeAfterPhoto(serviceId: string, formData: FormData) {
  const supabase = await createAdminClient()
  const beforeFile = formData.get('before') as File
  const afterFile = formData.get('after') as File
  const caption = formData.get('caption') as string | null
  if (!beforeFile || !afterFile) throw new Error('Chybí fotky před nebo po')
  const [beforeUrl, afterUrl] = await Promise.all([
    uploadFile(supabase, beforeFile, 'services', `${serviceId}/before-after`),
    uploadFile(supabase, afterFile, 'services', `${serviceId}/before-after`),
  ])
  return addBeforeAfter(serviceId, beforeUrl, afterUrl, caption || '')
}

export async function uploadServiceHeroImage(serviceId: string, formData: FormData) {
  const supabase = await createAdminClient()
  const file = formData.get('file') as File
  if (!file) throw new Error('Chybí soubor')
  const publicUrl = await uploadFile(supabase, file, 'services', serviceId)
  const { error } = await (supabase.from('services') as any)
    .update({ hero_image_url: publicUrl, updated_at: new Date().toISOString() })
    .eq('id', serviceId)
  if (error) throw new Error(error.message)
  revalidatePath(`/admin/services/${serviceId}`)
  return publicUrl
}
