-- 002_fixes.sql
-- 1. Standardized RLS Policies
-- Enable RLS on all relevant tables
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE realizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE realization_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE magazine_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read their own profile, admins can read all
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can manage all profiles" ON profiles;
CREATE POLICY "Admins can manage all profiles" ON profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Inquiries: public can insert, admins can manage
DROP POLICY IF EXISTS "Public can insert inquiries" ON inquiries;
CREATE POLICY "Public can insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can manage inquiries" ON inquiries;
CREATE POLICY "Admins can manage inquiries" ON inquiries FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Services, Realizations, Gallery, FAQ: public can read Active/Published, admins can manage
-- Services
DROP POLICY IF EXISTS "Public can read active services" ON services;
CREATE POLICY "Public can read active services" ON services FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Admins can manage services" ON services;
CREATE POLICY "Admins can manage services" ON services FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Realizations
DROP POLICY IF EXISTS "Public can read published realizations" ON realizations;
CREATE POLICY "Public can read published realizations" ON realizations FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Admins can manage realizations" ON realizations;
CREATE POLICY "Admins can manage realizations" ON realizations FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 2. Firmy.cz Integration
CREATE TABLE IF NOT EXISTS firmy_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rating DECIMAL(3,2),
  review_count INTEGER,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS firmy_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT,
  rating INTEGER,
  content TEXT,
  review_date DATE,
  external_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for Firmy tables
ALTER TABLE firmy_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE firmy_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read firmy stats" ON firmy_stats FOR SELECT USING (true);
CREATE POLICY "Public can read firmy reviews" ON firmy_reviews FOR SELECT USING (true);

-- 3. pg_cron Setup (requires pg_cron extension)
-- CREATE EXTENSION IF NOT EXISTS pg_cron;
-- SELECT cron.schedule('firmy-scrape', '0 4 * * 1', $$ SELECT net.http_get(url:='https://nanofusion.vercel.app/api/reviews/firmy?key=CRON_SECRET') $$);
