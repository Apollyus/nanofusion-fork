-- ============================================================
-- INQUIRIES ENHANCEMENTS
-- ============================================================

alter table inquiries 
add column if not exists address text,
add column if not exists distance_km numeric(10,2),
add column if not exists travel_cost_czk numeric(10,2);

-- Also add price_per_km to configurator_prices if not exists
insert into configurator_prices (item_key, label, price, unit)
values ('price_per_km', 'Cena za km (doprava)', 12, 'Kč/km')
on conflict (item_key) do nothing;
