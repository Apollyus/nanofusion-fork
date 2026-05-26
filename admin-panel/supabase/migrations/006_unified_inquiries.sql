-- ============================================================
-- UNIFIED INQUIRIES (Phase 1 Fix)
-- ============================================================

-- Add area and total_price_est to inquiries table
alter table inquiries 
add column if not exists area numeric(10,2),
add column if not exists total_price_est text;

-- Optional: Migrate existing leads if any
-- insert into inquiries (name, phone, service, area, source, message, created_at)
-- select name, phone, service, area, source, total_price_est, created_at from leads;

-- Drop leads table to avoid confusion (uncomment when ready)
-- drop table if exists leads;
