-- ============================================================
-- NANOfusion Admin CMS — Database Schema Migration
-- Run this in Supabase SQL Editor or via Supabase CLI
-- ============================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- Clean up existing tables to avoid type conflicts (UUID vs Integer)
drop table if exists inquiries cascade;
drop table if exists chat_sessions cascade;
drop table if exists configurator_prices cascade;
drop table if exists faqs cascade;
drop table if exists gallery_items cascade;
drop table if exists articles cascade;
drop table if exists external_reviews cascade;
drop table if exists realization_photos cascade;
drop table if exists realizations cascade;
drop table if exists service_reviews cascade;
drop table if exists service_before_after cascade;
drop table if exists services cascade;
drop table if exists hero_media cascade;
drop table if exists profiles cascade;

-- ============================================================
-- 1. PROFILES
-- ============================================================
create table if not exists profiles (
  id uuid references auth.users primary key,
  email text,
  full_name text,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  avatar_url text,
  created_at timestamptz not null default now()
);

-- Auto-create profile on user signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'editor')
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ============================================================
-- 2. HERO MEDIA
-- ============================================================
create table if not exists hero_media (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('image', 'video')),
  url text not null,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 3. SERVICES
-- ============================================================
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  hero_image_url text,
  order_index int not null default 0,
  is_active boolean not null default true,
  updated_at timestamptz default now()
);

-- ============================================================
-- 4. SERVICE BEFORE/AFTER PHOTOS
-- ============================================================
create table if not exists service_before_after (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  before_url text,
  after_url text,
  caption text,
  order_index int not null default 0
);

-- ============================================================
-- 5. SERVICE REVIEWS
-- ============================================================
create table if not exists service_reviews (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  author text,
  rating int check (rating between 1 and 5),
  content text,
  source text not null default 'manual',
  is_visible boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 6. REALIZATIONS
-- ============================================================
create table if not exists realizations (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  location text,
  duration text,
  work_type text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 7. REALIZATION PHOTOS
-- ============================================================
create table if not exists realization_photos (
  id uuid primary key default gen_random_uuid(),
  realization_id uuid not null references realizations(id) on delete cascade,
  url text not null,
  caption text,
  order_index int not null default 0
);

-- ============================================================
-- 8. EXTERNAL REVIEWS (Firmy.cz)
-- ============================================================
create table if not exists external_reviews (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'firmy.cz',
  external_id text unique,
  author text,
  rating int check (rating between 1 and 5),
  content text,
  published_at timestamptz,
  approved boolean not null default false,
  fetched_at timestamptz not null default now()
);

-- ============================================================
-- 9. ARTICLES (Nano-magazín)
-- ============================================================
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text,
  hero_image_url text,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 10. GALLERY ITEMS
-- ============================================================
create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('image', 'youtube')),
  url text not null,
  youtube_id text,
  caption text,
  order_index int not null default 0,
  is_active boolean not null default true
);

-- ============================================================
-- 11. FAQS
-- ============================================================
create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  order_index int not null default 0,
  is_active boolean not null default true
);

-- ============================================================
-- 12. CONFIGURATOR PRICES
-- ============================================================
create table if not exists configurator_prices (
  id uuid primary key default gen_random_uuid(),
  item_key text unique not null,
  label text,
  price numeric(10,2),
  unit text,
  updated_at timestamptz not null default now()
);

-- Seed initial price items
insert into configurator_prices (item_key, label, price, unit) values
  ('cleaning_roofs', 'Čištění střech', 190, 'Kč/m²'),
  ('cleaning_facades', 'Čištění fasád', 150, 'Kč/m²'),
  ('cleaning_pavement', 'Čištění dlažeb', 120, 'Kč/m²'),
  ('solar_panels', 'Solární panely', 80, 'Kč/m²'),
  ('graffiti_removal', 'Odstranění graffiti', 250, 'Kč/m²'),
  ('nano_roofs', 'Nano-ochrana střech', 220, 'Kč/m²'),
  ('nano_facades', 'Nano-ochrana fasád', 180, 'Kč/m²'),
  ('nano_pavement', 'Nano-ochrana dlažeb', 160, 'Kč/m²')
on conflict (item_key) do nothing;

-- ============================================================
-- 13. CHAT SESSIONS
-- ============================================================
create table if not exists chat_sessions (
  id uuid primary key default gen_random_uuid(),
  session_token text unique,
  user_identifier text,
  messages jsonb not null default '[]',
  status text not null check (status in ('open', 'closed')) default 'open',
  started_at timestamptz not null default now(),
  last_activity timestamptz not null default now()
);

-- ============================================================
-- 14. INQUIRIES
-- ============================================================
create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  service text,
  message text,
  status text not null check (status in ('new', 'in_progress', 'resolved')) default 'new',
  source text not null default 'form',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  notes text
);

-- ============================================================
-- ROW LEVEL SECURITY — ALL TABLES
-- ============================================================

-- Helper function to check admin/editor role
create or replace function is_admin_or_editor()
returns boolean as $$
begin
  return exists (
    select 1 from profiles
    where profiles.id = auth.uid()
    and profiles.role in ('admin', 'editor')
  );
end;
$$ language plpgsql security definer stable;

-- Helper function to check admin role only
create or replace function is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  );
end;
$$ language plpgsql security definer stable;

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table hero_media enable row level security;
alter table services enable row level security;
alter table service_before_after enable row level security;
alter table service_reviews enable row level security;
alter table realizations enable row level security;
alter table realization_photos enable row level security;
alter table external_reviews enable row level security;
alter table articles enable row level security;
alter table gallery_items enable row level security;
alter table faqs enable row level security;
alter table configurator_prices enable row level security;
alter table chat_sessions enable row level security;
alter table inquiries enable row level security;

-- Profiles: Users can see their own profile; admins can see all
create policy "users can see own profile" on profiles
  for select using (auth.uid() = id OR is_admin());
create policy "users can update own profile" on profiles
  for update using (auth.uid() = id);
create policy "admins can manage all profiles" on profiles
  for all using (is_admin());

-- All other tables: admin/editor can do everything
do $$
declare
  tbl text;
  tables text[] := array[
    'hero_media', 'services', 'service_before_after', 'service_reviews',
    'realizations', 'realization_photos', 'external_reviews', 'articles',
    'gallery_items', 'faqs', 'configurator_prices', 'chat_sessions', 'inquiries'
  ];
begin
  foreach tbl in array tables loop
    execute format('
      create policy "admin_editor_all_%s" on %s
        for all
        using (is_admin_or_editor())
        with check (is_admin_or_editor());
    ', tbl, tbl);
  end loop;
end $$;

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
-- Run these in Supabase Dashboard > Storage > New bucket
-- Or via storage API. Buckets: hero, services, realizations, articles, gallery

-- ============================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================
create index if not exists idx_inquiries_status on inquiries(status);
create index if not exists idx_inquiries_created_at on inquiries(created_at desc);
create index if not exists idx_external_reviews_approved on external_reviews(approved);
create index if not exists idx_articles_is_published on articles(is_published);
create index if not exists idx_realizations_is_published on realizations(is_published);
create index if not exists idx_chat_sessions_status on chat_sessions(status);
create index if not exists idx_services_order on services(order_index);
