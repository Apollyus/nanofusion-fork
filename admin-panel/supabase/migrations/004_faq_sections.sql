-- ============================================================
-- FAQ PAGE SECTIONS
-- ============================================================

alter table if exists faqs 
add column if not exists page_section text not null default 'global';

-- Update index if not exists
create index if not exists idx_faqs_page_section on faqs(page_section);
