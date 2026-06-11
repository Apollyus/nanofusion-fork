'use server'

import { createClient, createAdminClient } from '@/lib/supabase/server'
import { AnalyzerClient } from './analyzer-client'
import type { NanoTip } from './actions'

const DEFAULT_NANO_TIPS: NanoTip[] = [
  {
    id: "lifetime",
    title: "Životnost",
    text: "Nanopovlak Nanofusion chrání povrch 3–5 let bez nutnosti opakování.",
  },
  {
    id: "self-cleaning",
    title: "Samočistící efekt",
    text: "Díky hydrofobní vrstvě stéká voda i nečistoty samy — povrch se čistí deštěm.",
  },
  {
    id: "uv",
    title: "UV ochrana",
    text: "Nanovrstva odráží UV záření a brání vyblednutí barev fasády či auta.",
  },
  {
    id: "bio",
    title: "Stop mechům a řasám",
    text: "Ošetřený povrch zabraňuje opětovnému usazování mechů, řas a lišejníků.",
  },
  {
    id: "eco",
    title: "Šetrné k okolí",
    text: "Naše přípravky jsou biologicky odbouratelné a bezpečné pro rostliny i zvířata.",
  },
  {
    id: "warranty",
    title: "Záruka kvality",
    text: "Na profesionální aplikaci poskytujeme záruku až 5 let písemně.",
  },
  {
    id: "speed",
    title: "Rychlá realizace",
    text: "Běžnou fasádu rodinného domu zvládneme ošetřit za 1–2 dny.",
  },
]

export default async function AnalyzerPage() {
  const supabase = await createClient()
  if (!supabase) {
    return <AnalyzerClient initialTips={DEFAULT_NANO_TIPS} initialLeads={[]} />
  }
  
  // Parallel fetch for existing tips config and leads
  const [configResult, leadsResult] = await Promise.all([
    (supabase.from('site_config') as any).select('*').eq('key', 'nano_tips').maybeSingle(),
    (supabase.from('leads') as any).select('*').order('created_at', { ascending: false })
  ])

  let config = configResult.data
  const leads = leadsResult.data || []
  let tips: NanoTip[] = DEFAULT_NANO_TIPS

  if (!config) {
    // If not found in site_config, seed the default values using the Admin client (bypassing RLS write restrictions)
    const adminSupabase = await createAdminClient()
    if (adminSupabase) {
      const { data: inserted, error } = await (adminSupabase.from('site_config') as any)
        .insert({
          key: 'nano_tips',
          value: JSON.stringify(DEFAULT_NANO_TIPS),
          description: 'NanoTipy zobrazované během AI analýzy',
        })
        .select()
        .single()
      
      if (!error && inserted) {
        config = inserted
      }
    }
  }

  if (config && config.value) {
    try {
      const parsed = JSON.parse(config.value)
      if (Array.isArray(parsed)) {
        tips = parsed
      }
    } catch (e) {
      console.error('Failed to parse nano_tips JSON from database:', e)
    }
  }

  return (
    <AnalyzerClient initialTips={tips} initialLeads={leads} />
  )
}
