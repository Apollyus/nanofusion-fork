-- 004_storage_buckets.sql
-- Zajišťuje, aby všechny úložné prostory (buckets) byly veřejně dostupné,
-- aby si mohl webový prohlížeč stáhnout z nich obrázky.

-- 1. Pokud tyto buckety už existují, ujistíme se, že jsou označené jako veřejné
UPDATE storage.buckets SET public = true WHERE id IN ('heroes', 'services', 'realizations', 'articles', 'gallery');

-- (Pro jistotu je i vytvoříme, pokud náhodou chybí)
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('heroes', 'heroes', true),
  ('services', 'services', true),
  ('realizations', 'realizations', true),
  ('articles', 'articles', true),
  ('gallery', 'gallery', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Přidáme RLS politiku pro veřejné čtení souborů z těchto bucketů
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id IN ('heroes', 'services', 'realizations', 'articles', 'gallery'));

-- 3. (Volitelné) Admini mají povolený plný přístup ke všemu ve storage
DROP POLICY IF EXISTS "Admin Full Access" ON storage.objects;
CREATE POLICY "Admin Full Access" ON storage.objects FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
