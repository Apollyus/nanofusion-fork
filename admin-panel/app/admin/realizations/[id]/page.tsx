import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { RealizationDetailClient } from './realization-detail-client'

export default async function RealizationDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const supabase = await createClient()

  const { data: realization } = await (supabase.from('realizations') as any)
    .select('*')
    .eq('id', params.id)
    .single()

  if (!realization) notFound()

  const { data: photos } = await (supabase.from('realization_photos') as any)
    .select('*')
    .eq('realization_id', params.id)
    .order('order_index', { ascending: true })

  return (
    <RealizationDetailClient
      realization={realization}
      initialPhotos={photos ?? []}
    />
  )
}
