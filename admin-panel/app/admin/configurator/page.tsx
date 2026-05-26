'use server'

import { createClient } from '@/lib/supabase/server'
import { ConfiguratorClient } from './configurator-client'

export default async function ConfiguratorPage() {
  const supabase = await createClient()

  const [
    { data: prices },
    { data: chatSessions },
    { data: inquiries },
  ] = await Promise.all([
    (supabase.from('configurator_prices') as any).select('*').order('label'),
    (supabase.from('chat_sessions') as any)
      .select('id, user_identifier, status, started_at, last_activity, messages')
      .order('last_activity', { ascending: false })
      .limit(50),
    (supabase.from('inquiries') as any)
      .select('*')
      .order('created_at', { ascending: false }),
  ])

  return (
    <ConfiguratorClient
      initialPrices={(prices as any[]) ?? []}
      initialChatSessions={(chatSessions as any[]) ?? []}
      initialInquiries={(inquiries as any[]) ?? []}
    />
  )
}
