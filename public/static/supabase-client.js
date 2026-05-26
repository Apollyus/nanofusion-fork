console.log('NANOfusion Supabase Client: Loading...');

const SUPABASE_URL = 'https://mgmtkdwvhgrzefmyucvr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nbXRrZHd2aGdyemVmbXl1Y3ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMjc1NTUsImV4cCI6MjA5MTkwMzU1NX0.yWlwZvuTXmx8Op6BXR6t3z-xwXa1xWqwvklNLP1mOuk';

// Live binding exports
export let supabase = null;

export const normalizeMediaUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('//')) return 'https:' + url;
    // Handle Supabase storage paths if they come raw
    if (url.includes('storage/v1/object/public/')) return url;
    return `${SUPABASE_URL}/storage/v1/object/public/${url}`;
};

// Internal initialization
const loadSupabase = async () => {
    try {
        const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');
        supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        window.supabase = supabase;
        console.log('Supabase initialized successfully');
        // Dispatch event for other scripts
        window.dispatchEvent(new CustomEvent('supabase_ready', { detail: { supabase } }));
        return supabase;
    } catch (e) {
        console.error('Failed to load Supabase from CDN:', e);
        // Fail-safe mock to prevent app-wide ReferenceErrors
        const mock = {
            from: () => ({
                select: () => ({ order: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }), eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }), single: () => Promise.resolve({ data: null, error: null }) }) }), eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }), single: () => Promise.resolve({ data: null, error: null }) }),
                insert: () => Promise.resolve({ data: null, error: null }),
                update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) })
            })
        };
        supabase = mock;
        window.supabase = mock;
        return mock;
    }
};

// Start loading immediately
const initPromise = loadSupabase();

export const getSupabase = () => initPromise;
export const initSupabase = () => initPromise;
