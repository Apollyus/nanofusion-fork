import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://mgmtkdwvhgrzefmyucvr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nbXRrZHd2aGdyemVmbXl1Y3ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMjc1NTUsImV4cCI6MjA5MTkwMzU1NX0.yWlwZvuTXmx8Op6BXR6t3z-xwXa1xWqwvklNLP1mOuk';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Also attach to window for global access (backward compatibility / debugging)
window.supabase = supabase;
