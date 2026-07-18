import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mgmtkdwvhgrzefmyucvr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nbXRrZHd2aGdyemVmbXl1Y3ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMjc1NTUsImV4cCI6MjA5MTkwMzU1NX0.yWlwZvuTXmx8Op6BXR6t3z-xwXa1xWqwvklNLP1mOuk';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: services, error } = await supabase.from('services').select('*').eq('is_active', true);
  if (error) {
    console.error('Error fetching services:', error);
  } else {
    console.log('ACTIVE SERVICES:');
    services.forEach(s => {
      console.log(`- ID: ${s.id}, Slug: ${s.slug}, Name: ${s.name}`);
    });
  }
}

run();
