'use server'

import { createClient, createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteUser(id: string) {
  const adminClient = await createAdminClient()
  
  // 1. Delete the user from Auth
  const { error: authError } = await adminClient.auth.admin.deleteUser(id)
  if (authError) throw new Error(authError.message)

  // 2. Delete the profile
  const supabase = await createAdminClient() as any
  const { error: profileError } = await supabase
    .from('profiles')
    .delete()
    .eq('id', id)
  
  if (profileError) throw new Error(profileError.message)
  
  revalidatePath('/admin/users')
}

export async function addUser(email: string) {
  const adminClient = await createAdminClient()
  
  // Generate a random temporary password
  const tempPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-8).toUpperCase() + '1!';
  
  const { data, error } = await adminClient.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
    user_metadata: { role: 'admin', full_name: email.split('@')[0] }
  })
  
  if (error) throw new Error(error.message)

  const supabase = await createAdminClient() as any
  await supabase.from('profiles').upsert({
    id: data.user.id,
    role: 'admin',
    force_password_change: true
  })

  revalidatePath('/admin/users')
  return tempPassword
}

export async function updateUserRole(id: string, role: 'admin' | 'editor') {
  const supabase = await createAdminClient() as any
  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', id)
  
  if (error) throw new Error(error.message)
  revalidatePath('/admin/users')
}
