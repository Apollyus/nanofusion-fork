-- ============================================================
-- MIGRATION: 008_AI_ANALYSES (WARNING-FREE VERSION)
-- Creates the AI Analyses table for customer lead capture
-- ============================================================

CREATE TABLE IF NOT EXISTS public.ai_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    object_type TEXT,
    analysis_type TEXT,
    urgency TEXT DEFAULT 'střední',
    original_photo_url TEXT NOT NULL,
    before_photo_url TEXT,
    after_photo_url TEXT,
    analysis_result TEXT,
    additional_notes TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ai_analyses ENABLE ROW LEVEL SECURITY;

-- 1. Admin/Editor Policy: Access to all operations
CREATE POLICY "admin_editor_all_ai_analyses" ON public.ai_analyses
FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role IN ('admin', 'editor')
    )
);

-- 2. Public Insert Policy: Customers can submit their analysis from the landing page
CREATE POLICY "public_insert_ai_analyses" ON public.ai_analyses
FOR INSERT WITH CHECK (true);

-- Seed a default analysis for testing purposes if the database is blank
INSERT INTO public.ai_analyses (
    name, 
    email, 
    phone, 
    object_type, 
    analysis_type, 
    urgency, 
    original_photo_url, 
    before_photo_url, 
    after_photo_url, 
    analysis_result,
    status
) VALUES (
    'Tomáš Novotný',
    'tomas.novotny@email.cz',
    '+420 777 888 999',
    'rodinný dům',
    'fasáda',
    'vysoká',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
    'Analýza fasády rodinného domu detekovala silné znečištění řasami a plísněmi na severní a západní straně objektu. Doporučujeme hloubkové tlakové čištění s nanesením aktivního biocidního přípravku a následnou dlouhodobou hydrofobní nano-impregnaci NANOfusion se zárukou 10 let.',
    'new'
) ON CONFLICT DO NOTHING;
