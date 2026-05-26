'use server'

import { createClient } from '@/lib/supabase/server'
import { CertificatesClient } from './certificates-client'

export default async function CertificatesPage() {
  const supabase = await createClient()
  
  const { data: config } = await (supabase.from('site_config') as any)
    .select('value')
    .eq('key', 'about_certificates')
    .single()

  const initialCertificates = config?.value ? JSON.parse(config.value) : []

  return <CertificatesClient initialCertificates={initialCertificates} />
}
