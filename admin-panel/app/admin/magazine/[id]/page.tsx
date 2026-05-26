import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { MagazineEditorClient } from '../magazine-editor-client'

export default async function MagazineEditorPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const isNew = params.id === 'new'
  let article = null

  if (!isNew) {
    const supabase = await createClient()
    const { data } = await (supabase.from('articles') as any).select('*').eq('id', params.id).single()
    if (!data) notFound()
    article = data
  }

  return <MagazineEditorClient article={article} />
}
