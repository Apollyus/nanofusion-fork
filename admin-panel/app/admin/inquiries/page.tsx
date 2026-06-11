'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { InquiriesClient } from './inquiries-client'

export default async function InquiriesPage() {
  const supabase = await createAdminClient()
  if (!supabase) {
    return <InquiriesClient initialInquiries={[]} />
  }

  // Parallel fetch for both inquiries and AI analyzer leads
  const [inquiriesResult, leadsResult] = await Promise.all([
    (supabase.from('inquiries') as any).select('*'),
    (supabase.from('leads') as any).select('*')
  ])

  const inquiries = inquiriesResult.data || []
  const leads = leadsResult.data || []

  // Map leads to match the inquiries structure
  const mappedLeads = leads.map((lead: any) => {
    let message = lead.analysis_result || ''
    if (lead.additional_notes) {
      message += `\n\nDodatečné informace poptávky:\n${lead.additional_notes}`
    }

    return {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      service: `AI Analýza - ${lead.surface || lead.analysis_type || 'Fasáda'}`,
      message: message,
      status: lead.status || 'new',
      source: 'ai_analyzer',
      created_at: lead.created_at,
      updated_at: lead.updated_at,
      notes: lead.description || '', // We use 'description' for admin notes on leads
      original_photo_url: lead.original_photo_url || lead.image_url || '',
    }
  })

  // Combine and sort by created_at DESC
  const allInquiries = [...inquiries, ...mappedLeads].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  return (
    <InquiriesClient
      initialInquiries={allInquiries as any[]}
    />
  )
}
