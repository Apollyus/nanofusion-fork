-- SQL Migration for "How It Works" section
-- Run this in your Supabase SQL Editor

-- 1. Create table for section headers (Generic for future use)
CREATE TABLE IF NOT EXISTS public.site_sections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section_key TEXT UNIQUE NOT NULL,
    title TEXT,
    subtitle TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create table for How It Works steps
CREATE TABLE IF NOT EXISTS public.how_it_works_steps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    step_number TEXT,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Enable RLS
ALTER TABLE public.site_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.how_it_works_steps ENABLE ROW LEVEL SECURITY;

-- 4. Policies for site_sections
DROP POLICY IF EXISTS "Allow public read site_sections" ON public.site_sections;
CREATE POLICY "Allow public read site_sections" ON public.site_sections FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admin full access site_sections" ON public.site_sections;
CREATE POLICY "Allow admin full access site_sections" ON public.site_sections FOR ALL USING (true);

-- 5. Policies for how_it_works_steps
DROP POLICY IF EXISTS "Allow public read how_it_works_steps" ON public.how_it_works_steps;
CREATE POLICY "Allow public read how_it_works_steps" ON public.how_it_works_steps FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admin full access how_it_works_steps" ON public.how_it_works_steps;
CREATE POLICY "Allow admin full access how_it_works_steps" ON public.how_it_works_steps FOR ALL USING (true);

-- 6. Insert initial data for How It Works section
INSERT INTO public.site_sections (section_key, title, subtitle)
VALUES ('how_it_works', 'Jak to funguje', '3 jednoduché kroky ke změně')
ON CONFLICT (section_key) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle;

INSERT INTO public.how_it_works_steps (step_number, title, description, icon, order_index)
VALUES 
('01', 'Kontaktujte nás', 'Vyplňte formulář nebo zavolejte. Domluvíme nezávaznou konzultaci a prohlídku zdarma.', 'Phone', 1),
('02', 'Zaměření a nabídka', 'Přijedeme, vše odborně posoudíme a připravíme cenovou nabídku na míru – zdarma.', 'ClipboardCheck', 2),
('03', 'Realizace a ochrana', 'Profesionálně vyčistíme a ošetříme váš majetek s dlouhodobou ochranou až 10 let.', 'ShieldCheck', 3)
ON CONFLICT DO NOTHING;
