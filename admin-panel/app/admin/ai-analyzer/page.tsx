'use server'

import { createClient } from '@/lib/supabase/server'
import { AIAnalyzerClient } from './ai-analyzer-client'

export default async function AIAnalyzerPage() {
  const supabase = await createClient()

  // Fetch all AI analyses ordered by creation date (newest first)
  const { data: analyses } = await (supabase.from('ai_analyses') as any)
    .select('*')
    .order('created_at', { ascending: false })

  return <AIAnalyzerClient initialAnalyses={(analyses as any[]) || []} />
}
