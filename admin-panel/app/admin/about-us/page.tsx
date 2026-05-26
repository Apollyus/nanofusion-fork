'use server'

import { createClient } from '@/lib/supabase/server'
import { AboutClient } from './about-client'

export default async function AboutUsPage() {
  const supabase = await createClient()
  
  const { data: config } = await (supabase.from('site_config') as any)
    .select('*')
    .in('key', [
      'about_title',
      'about_subtitle',
      'about_description',
      'about_stats',
      'about_certificates',
      'about_why_title',
      'about_why_points',
      'about_certs_title',
      'about_certs_subtitle'
    ])

  const configMap = (config || []).reduce((acc: any, item: any) => {
    acc[item.key] = item.value
    return acc
  }, {})

  const defaultStats = JSON.stringify([
    { label: 'Realizací', value: '950+' },
    { label: 'Let garance', value: '10' },
    { label: 'Let zkušeností', value: '14' }
  ])

  const defaultWhyPoints = JSON.stringify([
    "Vlastní prověřené postupy a špičková certifikovaná chemie",
    "Zaměření, kalkulace a osobní konzultace po celé ČR zdarma",
    "Profesionální tým specialistů s mnohaletou řemeslnou praxí"
  ])

  return (
    <AboutClient 
      initialTitle={configMap.about_title || 'Příběh preciznosti a inovace'} 
      initialSubtitle={configMap.about_subtitle || '14 let pečujeme o to, co jste usilovně vybudovali'}
      initialDescription={configMap.about_description || 'NANOfusion vznikla z vášně pro detail a potřeby chránit architekturu před vlivem času a počasí...'}
      initialStats={configMap.about_stats || defaultStats}
      initialCertificates={configMap.about_certificates || '[]'}
      initialWhyTitle={configMap.about_why_title || 'Proč NANOfusion?'}
      initialWhyPoints={configMap.about_why_points || defaultWhyPoints}
      initialCertsTitle={configMap.about_certs_title || 'Naše certifikace a odbornost'}
      initialCertsSubtitle={configMap.about_certs_subtitle || 'Spolupracujeme s předními výrobci v oboru a naši specialisté pravidelně procházejí náročným školením pro aplikaci moderních nano-materiálů.'}
    />
  )
}
