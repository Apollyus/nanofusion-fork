'use server'

import { createClient } from '@/lib/supabase/server'
import { HeroClient } from './hero-client'

export default async function HeroPage() {
  const supabase = await createClient()
  
  // Fetch media
  const { data: heroItems } = await (supabase.from('hero_media') as any)
    .select('*')
    .order('updated_at', { ascending: false })

  // Fetch site config (hero title)
  const { data: config } = await (supabase.from('site_config') as any)
    .select('*')
    .eq('key', 'hero_title')
    .single()

  return (
    <HeroClient 
      initialItems={(heroItems as any[]) || []} 
      initialTitle={(config as any)?.value || 'Špičková péče o to,<br>co jste usilovně vybudovali'} 
    />
  )
}
