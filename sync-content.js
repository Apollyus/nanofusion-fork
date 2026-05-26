import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://mgmtkdwvhgrzefmyucvr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nbXRrZHd2aGdyemVmbXl1Y3ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMjc1NTUsImV4cCI6MjA5MTkwMzU1NX0.yWlwZvuTXmx8Op6BXR6t3z-xwXa1xWqwvklNLP1mOuk';
const supabase = createClient(supabaseUrl, supabaseKey);

async function syncContent() {
    console.log('🚀 Starting NANOfusion Content Sync...');

    try {
        // 1. Fetch Data
        console.log('📡 Fetching data from Supabase...');
        const [configRes, servicesRes, portfolioRes, reviewsRes, faqsRes] = await Promise.all([
            supabase.from('site_config').select('*'),
            supabase.from('services').select('*').eq('is_active', true).order('order_index', { ascending: true }),
            supabase.from('realizations').select('*, realization_photos(*)').eq('is_published', true).order('created_at', { ascending: false }),
            supabase.from('reviews').select('*').eq('is_approved', true).order('created_at', { ascending: false }),
            supabase.from('faqs').select('*').eq('is_active', true).order('order_index', { ascending: true })
        ]);

        // 2. Generate Sections HTML
        
        // --- SERVICES ---
        const servicesHtml = `
        <section id="sluzby" class="py-24 bg-white">
            <div class="container mx-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${(servicesRes.data || []).map(s => `
                        <div class="group relative bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in">
                            <div class="aspect-[16/9] overflow-hidden">
                                <img src="${s.hero_image_url || s.image}" alt="${s.name || s.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                            </div>
                            <div class="p-6">
                                <div class="flex items-center gap-2 mb-3">
                                    <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">${s.category || s.tag || 'Služba'}</span>
                                </div>
                                <h3 class="text-xl font-bold mb-2">${s.name || s.title}</h3>
                                <div class="text-muted-foreground text-sm line-clamp-2">${s.description || s.detail}</div>
                                <div class="mt-4 flex items-center text-primary font-bold text-sm">
                                    Zjistit více 
                                    <svg class="ml-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M5 12h14m-7-7l7 7-7 7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>`;

        // --- PORTFOLIO ---
        const portfolioHtml = `
        <section id="realizace" class="py-32 bg-slate-50 relative overflow-hidden">
            <div class="container mx-auto px-6">
                <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-heading">Naše realizace</h2>
                        <p class="text-slate-500 text-lg max-w-xl">Ukázky naší práce z celé České republiky.</p>
                    </div>
                </div>
                <div style="display: flex; gap: 1.5rem; overflow-x: auto; padding: 1rem 0 3rem; scrollbar-width: none;">
                    ${(portfolioRes.data || []).map(p => `
                        <div style="flex: 0 0 400px; background: white; border-radius: 1.5rem; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                            <img src="${p.realization_photos?.[0]?.url}" alt="${p.title}" style="width: 100%; height: 250px; object-fit: cover;">
                            <div style="padding: 2rem;">
                                <span style="color: #f59e0b; font-weight: 800; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;">${p.work_type}</span>
                                <h3 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin-top: 0.5rem;">${p.title}</h3>
                                <p style="color: #64748b; font-size: 0.875rem; margin-top: 1rem;">${p.location}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>`;

        // --- REVIEWS ---
        const reviewsHtml = `
        <section id="reference" class="py-24 bg-slate-950 text-white">
            <div class="container mx-auto px-6 text-center">
                <h2 class="text-4xl md:text-5xl font-bold mb-16">Co o nás říkají naši klienti</h2>
                <div style="display: flex; gap: 1.5rem; overflow-x: auto; padding-bottom: 2rem; scrollbar-width: none;">
                    ${(reviewsRes.data || []).map(r => `
                        <div style="flex: 0 0 350px; background: #1e293b; border-radius: 1.5rem; padding: 2.5rem; text-align: left;">
                            <div style="color: #f59e0b; margin-bottom: 1rem;">★★★★★</div>
                            <p style="color: #cbd5e1; font-style: italic; margin-bottom: 1.5rem;">"${r.content || r.text}"</p>
                            <h4 style="font-weight: 700;">${r.author || r.name}</h4>
                            <p style="color: #64748b; font-size: 0.85rem;">${r.city || r.location || 'Ověřený zákazník'}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>`;

        // --- ABOUT US ---
        const configData = configRes.data || [];
        const configMap = configData.reduce((acc, item) => {
            acc[item.key] = item.value;
            return acc;
        }, {});

        const aboutTitle = configMap.about_title || 'Příběh preciznosti a inovace';
        const aboutSubtitle = configMap.about_subtitle || '14 let pečujeme o to, co jste usilovně vybudovali';
        const aboutDescription = configMap.about_description || 'NANOfusion vznikla z vášně pro detail a potřeby chránit to, co naši klienti usilovně vybudovali. Věříme, že krása architektury by neměla blednout pod vlivem času a počasí.';

        let aboutStats = [];
        try {
            aboutStats = configMap.about_stats ? JSON.parse(configMap.about_stats) : [
                { label: 'Realizací', value: '950+' },
                { label: 'Let garance', value: '10' },
                { label: 'Let zkušeností', value: '14' }
            ];
        } catch (e) {
            aboutStats = [
                { label: 'Realizací', value: '950+' },
                { label: 'Let garance', value: '10' },
                { label: 'Let zkušeností', value: '14' }
            ];
        }

        let aboutCerts = [];
        try {
            aboutCerts = configMap.about_certificates ? JSON.parse(configMap.about_certificates) : [];
        } catch (e) {
            aboutCerts = [];
        }

        const statsHtml = aboutStats.map(s => `
            <div class="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center">
                <div class="text-amber-500 font-bold text-4xl mb-2">${s.value}</div>
                <h3 class="text-slate-500 text-sm uppercase tracking-wider font-bold">${s.label}</h3>
            </div>
        `).join('');

        const certsHtml = aboutCerts.length > 0
            ? `
            <h2 class="text-3xl font-bold text-slate-900 mt-16 mb-6">Naše certifikace a odbornost</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                ${aboutCerts.map(c => `
                    <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
                        <img src="${c.imageUrl ? c.imageUrl.replace(/\s+/g, '') : ''}" alt="${c.title}" class="w-full h-48 object-cover rounded-2xl mb-4">
                        <h3 class="text-xl font-bold text-slate-900 mb-2">${c.title}</h3>
                        <p class="text-slate-500 text-sm leading-relaxed">${c.description}</p>
                    </div>
                `).join('')}
            </div>`
            : '';

        const aboutUsHtml = `
            <h1 class="text-4xl md:text-6xl font-bold text-slate-900 mb-8 font-heading">${aboutTitle}</h1>
            
            <div class="prose prose-slate lg:prose-xl max-w-none">
                <p class="text-xl text-slate-600 leading-relaxed mb-8">
                    ${aboutSubtitle}
                </p>
                <div style="white-space: pre-wrap;" class="text-slate-600 mb-8">${aboutDescription}</div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
                    ${statsHtml}
                </div>

                ${certsHtml}

                <div class="bg-slate-900 text-white p-12 rounded-[2rem] my-16 relative overflow-hidden">
                    <div class="relative z-10">
                        <h3 class="text-2xl font-bold mb-4">Proč NANOfusion?</h3>
                        <ul class="space-y-4 opacity-90">
                            <li class="flex items-center gap-3">
                                <span class="text-amber-500">✔</span> Vlastní prověřené postupy a certifikovaná chemie
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-amber-500">✔</span> Zaměření a konzultace po celé ČR zdarma
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-amber-500">✔</span> Tým specialistů s mnohaletou praxí
                            </li>
                        </ul>
                    </div>
                    <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
                </div>
            </div>
        `;

        // --- FAQ ---
        const faqsResData = faqsRes.data || [];
        const faqsHtml = `
        <section id="faq" class="py-24 bg-slate-50">
            <div class="container mx-auto px-6">
                <div class="max-w-4xl mx-auto" style="margin-bottom: 3.5rem;">
                    <h1 class="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-heading">Často kladené dotazy</h1>
                    <p class="text-xl text-slate-600 leading-relaxed">
                        Vše, co potřebujete vědět o našich technologiích, postupech a zárukách.
                    </p>
                </div>
                <div class="max-w-4xl mx-auto">
                    ${faqsResData.map((f, i) => `
                        <div class="faq-item" style="margin-bottom: 1.25rem; border: 1px solid #e2e8f0; border-radius: 0.875rem; overflow: hidden; background: white; transition: all 0.3s ease;">
                            <button onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('svg').classList.toggle('rotate-180')"
                                    style="width: 100%; text-align: left; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; background: none; border: none; cursor: pointer;">
                                <span style="font-weight: 700; color: #1e293b; font-size: 0.938rem;">${f.question}</span>
                                <svg class="transition-transform flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </button>
                            <div class="hidden" style="padding: 0 1.5rem 1.25rem; color: #64748b; line-height: 1.6; font-size: 0.875rem;">
                                ${f.answer}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>`;

        // 3. Update HTML files (Robust Multi-Path Support)
        const filesToUpdate = [
            'index.html', 
            'o-nas.html', 
            'faq/index.html',
            'public/o-nas.html',
            'public/faq/index.html',
            'admin-panel/public/o-nas.html',
            'admin-panel/public/faq/index.html'
        ];
        
        for (const filename of filesToUpdate) {
            if (!fs.existsSync(filename)) continue;
            let content = fs.readFileSync(filename, 'utf8');

            // Replace SYNC blocks
            content = replaceSyncBlock(content, 'SERVICES', servicesHtml);
            content = replaceSyncBlock(content, 'PORTFOLIO', portfolioHtml);
            content = replaceSyncBlock(content, 'REVIEWS', reviewsHtml);
            content = replaceSyncBlock(content, 'ABOUT_US', aboutUsHtml);
            content = replaceSyncBlock(content, 'FAQ', faqsHtml);

            fs.writeFileSync(filename, content);
            console.log(`✅ ${filename} synchronized.`);
        }

        console.log('✨ NANOfusion Sync Complete!');

    } catch (err) {
        console.error('❌ Sync failed:', err);
    }
}

function replaceSyncBlock(content, key, newHtml) {
    const startMarker = `<!-- SYNC:${key}:START -->`;
    const endMarker = `<!-- SYNC:${key}:END -->`;
    const regex = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`, 'g');
    
    if (content.includes(startMarker)) {
        return content.replace(regex, `${startMarker}\n${newHtml}\n${endMarker}`);
    }
    return content;
}

syncContent();
