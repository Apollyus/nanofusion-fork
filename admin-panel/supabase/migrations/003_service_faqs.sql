-- ============================================================
-- SERVICE FAQS TABLE
-- ============================================================

create table if not exists service_faqs (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references services(id) on delete cascade,
  question text not null,
  answer text not null,
  order_index int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

alter table service_faqs enable row level security;

-- Admin/editor can manage all service FAQs
create policy "admins_manage_service_faqs" on service_faqs
  for all using (
    exists (
      select 1 from profiles 
      where profiles.id = auth.uid() 
      and profiles.role in ('admin', 'editor')
    )
  );

-- Public can read active service FAQs
create policy "public_read_service_faqs" on service_faqs
  for select to public using (is_active = true);
