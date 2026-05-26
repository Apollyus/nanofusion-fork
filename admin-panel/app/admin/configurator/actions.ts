'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updatePrice(id: string, price: number) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('configurator_prices') as any)
    .update({ price, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/configurator')
}

export async function updatePriceLabel(id: string, label: string) {
  const supabase = await createAdminClient()
  const { error } = await (supabase.from('configurator_prices') as any)
    .update({ label })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/configurator')
}

export async function savePrices(prices: { id: string; price: number }[]) {
  const supabase = await createAdminClient()
  const updates = prices.map(({ id, price }) =>
    (supabase.from('configurator_prices') as any)
      .update({ price, updated_at: new Date().toISOString() })
      .eq('id', id)
  )
  await Promise.all(updates)
  revalidatePath('/admin/configurator')
}
