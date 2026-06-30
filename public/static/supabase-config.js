import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://mgmtkdwvhgrzefmyucvr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nbXRrZHd2aGdyemVmbXl1Y3ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMjc1NTUsImV4cCI6MjA5MTkwMzU1NX0.yWlwZvuTXmx8Op6BXR6t3z-xwXa1xWqwvklNLP1mOuk';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Also attach to window for global access (backward compatibility / debugging)
window.supabase = supabase;

// STRV: Global premium image optimization helper
window.nnf_optimizeImage = (url, width = 800) => {
  if (!url) return '';
  
  // Normalize
  let normalized = url;
  if (!url.startsWith('http') && !url.startsWith('//')) {
    normalized = `${supabaseUrl}/storage/v1/object/public/${url}`;
  } else if (url.startsWith('//')) {
    normalized = 'https:' + url;
  }
  
  // Do not transform SVGs or external domains (except Supabase)
  if (normalized.toLowerCase().endsWith('.svg') || !normalized.includes('supabase.co')) {
    return normalized;
  }
  
  // Use Cloudflare-backed wsrv.nl image resizer for maximum performance and compatibility
  return `https://wsrv.nl/?url=${encodeURIComponent(normalized)}&w=${width}&q=80&output=webp`;
};

