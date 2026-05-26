'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createFaq(data: { question: string; answer: string; order_index: number; page_section?: string }) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('faqs') as any).insert(data)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/faqs')
  revalidatePath('/faq')
  revalidatePath('/')
}

export async function updateFaq(id: string, data: { question?: string; answer?: string; is_active?: boolean; page_section?: string }) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('faqs') as any).update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/faqs')
  revalidatePath('/faq')
  revalidatePath('/')
}

export async function deleteFaq(id: string) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('faqs') as any).delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/faqs')
  revalidatePath('/faq')
  revalidatePath('/')
}

export async function reorderFaqs(items: { id: string; order_index: number }[]) {
  const supabase = await createAdminClient()
  const updates = items.map(({ id, order_index }) =>
    (supabase.from('faqs') as any).update({ order_index }).eq('id', id)
  )
  await Promise.all(updates)
  revalidatePath('/admin/faqs')
  revalidatePath('/faq')
  revalidatePath('/')
}
