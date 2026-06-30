import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

function createDummySupabaseClient() {
  const handler: ProxyHandler<any> = {
    get(target, prop) {
      if (prop === 'from' || prop === 'select' || prop === 'eq' || prop === 'order' || prop === 'limit' || prop === 'match' || prop === 'single' || prop === 'maybeSingle' || prop === 'update' || prop === 'insert' || prop === 'delete') {
        return () => new Proxy({}, handler)
      }
      if (prop === 'then') {
        return (resolve: any) => resolve({ data: [], error: null })
      }
      return new Proxy({}, handler)
    }
  }
  return new Proxy({}, handler)
}

export async function createClient(): Promise<any> {
  const cookieStore = await cookies()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn('Supabase keys missing - returning dummy client')
    return createDummySupabaseClient()
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
    console.warn('Supabase Admin keys missing - returning dummy client')
    return createDummySupabaseClient()
  }

  return createSupabaseClient<Database>(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}
