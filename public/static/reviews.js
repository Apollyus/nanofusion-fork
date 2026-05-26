/* NANOfusion — Premium Dark Reviews Scroller + Supabase hydratace */

let reviewsData = [
  { name: 'Ing. Petr Svoboda', info: 'Praha, Čištění střechy', stars: 5, text: 'Hloubkové čištění krytiny a následná nano-ochrana dopadla na jedničku. Střecha vypadá jako nově položená a už se na ní nedrží mech.' },
  { name: 'Jana Novotná', info: 'Brno, Čištění fasády', stars: 5, text: 'Fasáda prokoukla během jediného dne. Kluci byli moc šikovní, vše po sobě uklidili a výsledek je i po roce stále skvělý.' },
  { name: 'Marek Kučera', info: 'Plzeň, Zámková dlažba', stars: 5, text: 'Čištění před firmou dopadlo výborně. Zmizela všechna léta usazená špína a olejové skvrny. Výborná komunikace.' },
  { name: 'Lucie Marešová', info: 'Ostrava, Celková renovace', stars: 5, text: 'Oceňuji rychlost domluvy a zaměření zdarma. Cena byla férová a výsledek předčil naše očekávání. Určitě doporučuji!' },
  { name: 'David Černý', info: 'Liberec, Fotovoltaika', stars: 5, text: 'Nano-ochrana fotovoltaiky nám reálně zvýšila účinnost panelů. Velmi profesionální přístup and čistá práce.' },
  { name: 'Eva Králová', info: 'Hradec Králové, Čištění střechy', stars: 5, text: 'Skvělý výsledek. Po práci po sobě vše uklidili, dům vypadá skvěle a sousedi se už ptají na kontakt. Děkujeme!' },
  { name: 'Martin Horák', info: 'Pardubice, Fasáda', stars: 5, text: 'Efekt nano-ochrany je neskutečný. Voda z fasády prostě stéká a fasáda se sama omývá deštěm. Úžasná technologie.' },
  { name: 'Pavel Holub', info: 'České Budějovice, Terasa', stars: 5, text: 'Neskutečný rozdíl před a po. Terasa vypadá jako nově postavená a impregnace funguje skvěle.' },
  { name: 'Kateřina Šťastná', info: 'Zlín, Fasáda', stars: 5, text: 'Rychlost, profesionalita a čistota. Rozhodně doporučuji všem, kdo chtějí mít dům jako nový.' },
  { name: 'Jiří Procházka', info: 'Kladno, Střecha', stars: 5, text: 'Skvělá domluva, férová cena. Střecha po čištění vypadá perfektně a mech už nemá šanci.' },
];

const injectReviews = () => {
    const reviewsSection = document.getElementById('reference');
    if (!reviewsSection || reviewsSection.dataset.injected === 'true') return false;

    reviewsSection.innerHTML = `
        <div class="pt-48 pb-16 bg-slate-950 section-reveal">
            <div class="container mx-auto px-6">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-6xl font-bold text-white mb-6" style="margin-top: 4rem;">Co o nás říkají naši klienti</h2>
                    <p class="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed opacity-80">
                        Reference čerpáme z portálu firmy.cz. Spokojenost našich klientů je pro nás prioritou číslo jedna.
                    </p>
                </div>

                <div style="position: relative; width: 100%; max-width: 1300px; margin: 0 auto;">
                    <div id="reviews-scroller" style="display: flex; gap: 1.5rem; overflow-x: auto; scroll-behavior: smooth; padding: 1rem 0 3rem; scrollbar-width: none; mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);">
                        ${reviewsData.map(rev => `
                            <div class="review-card-premium"
                                 style="flex: 0 0 350px; background: #1e293b; border-radius: 1.5rem; padding: 2.5rem; box-shadow: 0 20px 40px rgba(0,0,0,0.1); display: flex; flex-direction: column; gap: 1.5rem;">
                                 <div style="display: flex; gap: 4px;">
                                    ${Array(rev.stars || 5).fill('<span style="color: #f59e0b; font-size: 1.2rem;">★</span>').join('')}
                                </div>
                                <p style="color: #cbd5e1; font-style: italic; font-size: 1rem; line-height: 1.7; flex-grow: 1;">
                                    "${rev.text}"
                                </p>
                                <div>
                                    <h4 style="color: white; font-weight: 700; font-size: 1.1rem; margin-bottom: 0.25rem;">${rev.name}</h4>
                                    <p style="color: #64748b; font-size: 0.85rem;">${rev.info || 'Ověřený zákazník'}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Premium Navigation Arrows - EXACT CLONE FROM GALLERY -->
                    <button onclick="document.getElementById('reviews-scroller').scrollLeft -= 500"
                        class="hidden md:flex"
                        style="position: absolute !important; left: -25px !important; top: 50% !important; transform: translateY(-50%) !important; z-index: 100 !important; width: 60px !important; height: 60px !important; border-radius: 30px !important; background: #f59e0b !important; border: none !important; cursor: pointer !important; align-items: center !important; justify-content: center !important; box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3) !important; transition: all 0.3s ease !important; padding: 0 !important;"
                        onmouseover="this.style.scale='1.1'; this.style.backgroundColor='#d97706';"
                        onmouseout="this.style.scale='1'; this.style.backgroundColor='#f59e0b';"
                    >
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white !important" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="stroke: white !important; display: block !important; margin: auto !important;"><path d="M15 18l-6-6 6-6"></path></svg>
                    </button>
                    
                    <button onclick="document.getElementById('reviews-scroller').scrollLeft += 500"
                        class="hidden md:flex"
                        style="position: absolute !important; right: -25px !important; top: 50% !important; transform: translateY(-50%) !important; z-index: 100 !important; width: 60px !important; height: 60px !important; border-radius: 30px !important; background: #f59e0b !important; border: none !important; cursor: pointer !important; align-items: center !important; justify-content: center !important; box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3) !important; transition: all 0.3s ease !important; padding: 0 !important;"
                        onmouseover="this.style.scale='1.1'; this.style.backgroundColor='#d97706';"
                        onmouseout="this.style.scale='1'; this.style.backgroundColor='#f59e0b';"
                    >
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white !important" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="stroke: white !important; display: block !important; margin: auto !important;"><path d="M9 18l6-6-6-6"></path></svg>
                    </button>
                </div>
            </div>
        </div>
        <style>
            #reviews-scroller::-webkit-scrollbar { display: none; }
            @media (max-width: 1200px) {
                /* On smaller desktops, move them slightly in so they don't clip */
                button[onclick*="reviews-scroller"] { left: -10px !important; right: -10px !important; }
            }
            @media (max-width: 768px) {
                .review-card-premium { flex: 0 0 85% !important; padding: 2rem !important; }
                button[onclick*="reviews-scroller"] { display: none !important; }
                .pt-48 { padding-top: 6rem !important; }
            }
        </style>
    `;
    reviewsSection.style.opacity = '0';
    reviewsSection.style.transition = 'opacity 0.6s ease-out';
    reviewsSection.dataset.injected = 'true';
    return true;
};

const hydrateReviews = async () => {
    try {
        const { supabase } = await import('./supabase-config.js');
        let data, error;
        ({ data, error } = await supabase.from('external_reviews').select('*').eq('approved', true));
        if (error || !data || data.length === 0) {
            ({ data, error } = await supabase.from('reviews').select('*').eq('is_approved', true));
        }
        if (!error && data && data.length > 0) {
            reviewsData = data.map(d => ({
                name: d.author || d.name || 'Zákazník',
                info: d.location || d.city
                    ? `${d.city || ''}, ${d.service || d.source || 'firmy.cz'}`.trim().replace(/^,\s*/, '')
                    : (d.source === 'firmy.cz' ? 'Ověřeno na Firmy.cz' : (d.source === 'manual' ? 'Přímá zpětná vazba' : 'Ověřený zákazník')),
                stars: d.rating || d.stars || 5,
                text: d.content || d.text || ''
            })).filter(r => r.text);
            const target = document.getElementById('reference');
            if (target) {
                target.dataset.injected = 'false';
                injectReviews();
                setTimeout(() => { target.style.opacity = '1'; }, 100);
            }
        }
    } catch (e) {
        console.error('Reviews Sync Error:', e);
    }
};

const initReviews = () => {
    if (injectReviews()) {
        hydrateReviews();
        return;
    }
    const observer = new MutationObserver(() => {
        if (injectReviews()) {
            observer.disconnect();
            hydrateReviews();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => { observer.disconnect(); injectReviews(); hydrateReviews(); }, 5000);
};

initReviews();
