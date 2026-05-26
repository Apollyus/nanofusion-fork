import { createClient } from '@/lib/supabase/server'
import { AccountClient } from './account-client'

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single()

  return <AccountClient user={user!} profile={profile!} />
}
