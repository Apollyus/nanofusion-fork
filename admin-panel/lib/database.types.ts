// Database types generated from Supabase schema
// Run: npx supabase gen types typescript --project-id mgmtkdwvhgrzefmyucvr > lib/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          role: 'admin' | 'editor'
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          role?: 'admin' | 'editor'
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          role?: 'admin' | 'editor'
          avatar_url?: string | null
          created_at?: string
        }
      }
      hero_media: {
        Row: {
          id: string
          type: 'image' | 'video'
          url: string
          is_active: boolean
          updated_at: string
        }
        Insert: {
          id?: string
          type: 'image' | 'video'
          url: string
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          id?: string
          type?: 'image' | 'video'
          url?: string
          is_active?: boolean
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          slug: string
          name: string
          description: string | null
          hero_image_url: string | null
          order_index: number
          is_active: boolean
          updated_at: string | null
          process_description: string | null
          features: string[] | null
        }
        Insert: {
          id?: string
          slug: string
          name: string
          description?: string | null
          hero_image_url?: string | null
          order_index?: number
          is_active?: boolean
          updated_at?: string | null
          process_description?: string | null
          features?: string[] | null
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          description?: string | null
          hero_image_url?: string | null
          order_index?: number
          is_active?: boolean
          updated_at?: string | null
          process_description?: string | null
          features?: string[] | null
        }
      }
      service_before_after: {
        Row: {
          id: string
          service_id: string
          before_url: string | null
          after_url: string | null
          caption: string | null
          order_index: number
        }
        Insert: {
          id?: string
          service_id: string
          before_url?: string | null
          after_url?: string | null
          caption?: string | null
          order_index?: number
        }
        Update: {
          id?: string
          service_id?: string
          before_url?: string | null
          after_url?: string | null
          caption?: string | null
          order_index?: number
        }
      }
      service_reviews: {
        Row: {
          id: string
          service_id: string
          author: string | null
          rating: number | null
          content: string | null
          source: string
          is_visible: boolean
          created_at: string
        }
        Insert: {
          id?: string
          service_id: string
          author?: string | null
          rating?: number | null
          content?: string | null
          source?: string
          is_visible?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          service_id?: string
          author?: string | null
          rating?: number | null
          content?: string | null
          source?: string
          is_visible?: boolean
          created_at?: string
        }
      }
      service_faqs: {
        Row: {
          id: string
          service_id: string
          question: string
          answer: string
          order_index: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          service_id: string
          question: string
          answer: string
          order_index?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          service_id?: string
          question?: string
          answer?: string
          order_index?: number
          is_active?: boolean
          created_at?: string
        }
      }
      realizations: {
        Row: {
          id: string
          title: string
          subtitle: string | null
          description: string | null
          location: string | null
          duration: string | null
          work_type: string | null
          category: string | null
          youtube_id: string | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          subtitle?: string | null
          description?: string | null
          location?: string | null
          duration?: string | null
          work_type?: string | null
          category?: string | null
          youtube_id?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string | null
          description?: string | null
          location?: string | null
          duration?: string | null
          work_type?: string | null
          category?: string | null
          youtube_id?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      realization_photos: {
        Row: {
          id: string
          realization_id: string
          url: string
          caption: string | null
          order_index: number
          updated_at: string | null
        }
        Insert: {
          id?: string
          realization_id: string
          url: string
          caption?: string | null
          order_index?: number
          updated_at?: string | null
        }
        Update: {
          id?: string
          realization_id?: string
          url?: string
          caption?: string | null
          order_index?: number
          updated_at?: string | null
        }
      }
      external_reviews: {
        Row: {
          id: string
          source: string
          external_id: string | null
          author: string | null
          rating: number | null
          content: string | null
          published_at: string | null
          approved: boolean
          fetched_at: string
        }
        Insert: {
          id?: string
          source?: string
          external_id?: string | null
          author?: string | null
          rating?: number | null
          content?: string | null
          published_at?: string | null
          approved?: boolean
          fetched_at?: string
        }
        Update: {
          id?: string
          source?: string
          external_id?: string | null
          author?: string | null
          rating?: number | null
          content?: string | null
          published_at?: string | null
          approved?: boolean
          fetched_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          content: string | null
          hero_image_url: string | null
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content?: string | null
          hero_image_url?: string | null
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string | null
          hero_image_url?: string | null
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      gallery_items: {
        Row: {
          id: string
          type: 'image' | 'youtube'
          url: string
          youtube_id: string | null
          caption: string | null
          order_index: number
          is_active: boolean
          album_id: string | null
        }
        Insert: {
          id?: string
          type: 'image' | 'youtube'
          url: string
          youtube_id?: string | null
          caption?: string | null
          order_index?: number
          is_active?: boolean
          album_id?: string | null
        }
        Update: {
          id?: string
          type?: 'image' | 'youtube'
          url?: string
          youtube_id?: string | null
          caption?: string | null
          order_index?: number
          is_active?: boolean
          album_id?: string | null
        }
      }
      gallery_albums: {
        Row: {
          id: string
          title: string
          caption: string | null
          order_index: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          caption?: string | null
          order_index?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          caption?: string | null
          order_index?: number
          is_active?: boolean
          created_at?: string
        }
      }
      faqs: {
        Row: {
          id: string
          question: string
          answer: string
          order_index: number
          is_active: boolean
          page_section: string
        }
        Insert: {
          id?: string
          question: string
          answer: string
          order_index?: number
          is_active?: boolean
          page_section?: string
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          order_index?: number
          is_active?: boolean
          page_section?: string
        }
      }
      configurator_prices: {
        Row: {
          id: string
          item_key: string
          label: string | null
          price: number | null
          unit: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          item_key: string
          label?: string | null
          price?: number | null
          unit?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          item_key?: string
          label?: string | null
          price?: number | null
          unit?: string | null
          updated_at?: string
        }
      }
      chat_sessions: {
        Row: {
          id: string
          session_token: string | null
          user_identifier: string | null
          messages: Json
          status: 'open' | 'closed'
          started_at: string
          last_activity: string
        }
        Insert: {
          id?: string
          session_token?: string | null
          user_identifier?: string | null
          messages?: Json
          status?: 'open' | 'closed'
          started_at?: string
          last_activity?: string
        }
        Update: {
          id?: string
          session_token?: string | null
          user_identifier?: string | null
          messages?: Json
          status?: 'open' | 'closed'
          started_at?: string
          last_activity?: string
        }
      }
      inquiries: {
        Row: {
          id: string
          name: string | null
          email: string | null
          phone: string | null
          service: string | null
          message: string | null
          status: 'new' | 'in_progress' | 'resolved'
          source: string
          created_at: string
          updated_at: string
          notes: string | null
          address: string | null
          distance_km: number | null
          travel_cost_czk: number | null
        }
        Insert: {
          id?: string
          name?: string | null
          email?: string | null
          phone?: string | null
          service?: string | null
          message?: string | null
          status?: 'new' | 'in_progress' | 'resolved'
          source?: string
          created_at?: string
          updated_at?: string
          notes?: string | null
          address?: string | null
          distance_km?: number | null
          travel_cost_czk?: number | null
        }
        Update: {
          id?: string
          name?: string | null
          email?: string | null
          phone?: string | null
          service?: string | null
          message?: string | null
          status?: 'new' | 'in_progress' | 'resolved'
          source?: string
          created_at?: string
          updated_at?: string
          notes?: string | null
          address?: string | null
          distance_km?: number | null
          travel_cost_czk?: number | null
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type Inserts<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type Updates<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']
