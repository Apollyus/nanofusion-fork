-- 003_public_selects.sql
-- Toto řeší chybějící oprávnění pro čtení dat z veřejného webu (bez přihlášení)

-- Hero média (pro úvodní video/obrázek)
DROP POLICY IF EXISTS "Public can read active hero media" ON public.hero_media;
CREATE POLICY "Public can read active hero media" ON public.hero_media
  FOR SELECT USING (is_active = true);

-- Recenze z Firmy.cz / manuálně přidané
DROP POLICY IF EXISTS "Public can read approved external reviews" ON public.external_reviews;
CREATE POLICY "Public can read approved external reviews" ON public.external_reviews
  FOR SELECT USING (approved = true);

-- Články (Magazín)
DROP POLICY IF EXISTS "Public can read published articles" ON public.articles;
CREATE POLICY "Public can read published articles" ON public.articles
  FOR SELECT USING (is_published = true);

-- FAQ (Často kladené dotazy)
DROP POLICY IF EXISTS "Public can read active faqs" ON public.faqs;
CREATE POLICY "Public can read active faqs" ON public.faqs
  FOR SELECT USING (is_active = true);

-- Kalkulačka (Ceny konfigurátoru)
DROP POLICY IF EXISTS "Public can read configurator prices" ON public.configurator_prices;
CREATE POLICY "Public can read configurator prices" ON public.configurator_prices
  FOR SELECT USING (true);

-- Galerie realizací
DROP POLICY IF EXISTS "Public can read active gallery items" ON public.gallery_items;
CREATE POLICY "Public can read active gallery items" ON public.gallery_items
  FOR SELECT USING (is_active = true);

-- Služby (detailní obsah k nim)
DROP POLICY IF EXISTS "Public can read service faqs" ON public.service_faqs;
CREATE POLICY "Public can read service faqs" ON public.service_faqs
  FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public can read service before after" ON public.service_before_after;
CREATE POLICY "Public can read service before after" ON public.service_before_after
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read service reviews" ON public.service_reviews;
CREATE POLICY "Public can read service reviews" ON public.service_reviews
  FOR SELECT USING (true);

