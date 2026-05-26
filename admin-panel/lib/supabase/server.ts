import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export async function createClient(): Promise<any> {
  const cookieStore = await cookies()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.error('Supabase keys missing')
    return null
  }

  return createServerClient<Database>(url, key, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // Ignore cookie errors in Server Components
          }
        },
      },
    }
  )
}
// Admin client with service role key — server-side only
// Using standard createClient to ensure RLS bypass without cookie interference
export async function createAdminClient(): Promise<any> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    console.error('Supabase Admin keys missing')
    return null
  }

  return createSupabaseClient<Database>(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}
