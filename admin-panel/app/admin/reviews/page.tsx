'use server'

import { createClient } from '@/lib/supabase/server'
import { ReviewsClient } from './reviews-client'

export default async function ReviewsPage() {
  const supabase = await createClient()
  const { data: reviews } = await (supabase.from('external_reviews') as any)
    .select('*')
    .order('fetched_at', { ascending: false })

  return <ReviewsClient initialReviews={(reviews as any[]) ?? []} />
}
