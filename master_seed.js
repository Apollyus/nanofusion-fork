
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import fs from 'fs';

const envPath = path.resolve('admin-panel/.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const services = [
  { slug: 'facade', name: 'Čištění fasád', description: 'Hloubkové odstranění řas, plísní a atmosférických nečistot.', hero_image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800' },
  { slug: 'roof', name: 'Čištění střech', description: 'Šetrné čištění střešní krytiny od mechů a lišejníků.', hero_image_url: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?w=800' },
  { slug: 'pavement', name: 'Čištění dlažeb', description: 'Hloubkové čištění zámkové dlažby a kamene.', hero_image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800' }
];

const realizations = [
  { title: 'Čištění střechy RD, Praha', description: 'Silné znečištění mechem a lišejníkem na severní straně střechy.', location: 'Praha - Západ', is_published: true, hero_image_url: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?w=800' },
  { title: 'Renovace fasády, Brno', description: 'Atmosférické nečistoty a mastnota z blízké křižovatky.', location: 'Brno', is_published: true, hero_image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800' }
];

const faqs = [
  { question: 'Proč investovat do čištění?', answer: 'Čištění prodlouží životnost a zlepší vzhled domu.', order_index: 1 },
  { question: 'Jak dlouho vydrží impregnace?', answer: 'Účinek se pohybuje kolem 5–10 let podle typu povrchu.', order_index: 2 }
];

async function masterSeed() {
  console.log('🏗️  STRV Master Seed: Probíhá finální synchronizace...');

  await supabase.from('services').upsert(services, { onConflict: 'slug' });
  await supabase.from('articles').upsert([{ slug: 'blog-1', title: 'Novinka v čištění', is_published: true }], { onConflict: 'slug' });
  await supabase.from('realizations').upsert(realizations);
  await supabase.from('faqs').upsert(faqs);

  console.log('🚀 Synchronizace dokončena. Web i Admin mají všechna data.');
}

masterSeed();
