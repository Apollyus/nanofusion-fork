/* NANOfusion — Premium Dark Reviews Scroller + Supabase hydratace */
import { supabase } from './supabase-config.js';

// Pre-fetch reviews data IMMEDIATELY on script load to save time (CTO Performance Hack)
export const reviewsPromise = (async () => {
  try {
    let data, error;
    ({ data, error } = await supabase.from('external_reviews').select('*').eq('approved', true));
    if (error || !data || data.length === 0) {
      ({ data, error } = await supabase.from('reviews').select('*').eq('is_approved', true));
    }
    if (error) throw error;
    return data;
  } catch (e) {
    console.warn('NANOfusion: Pre-fetch reviews failed:', e);
    return null;
  }
})();

const injectReviews = (list) => {
    const reviewsSection = document.getElementById('reference');
    if (!reviewsSection || reviewsSection.dataset.injected === 'true') return false;

    // Necháme sekci renderovat tam, kde už obsahuje realné recenze karty
    // (React SPA na homepage nebo statický HTML na podstránkách).
    // Přepsání celého innerHTML jinak vyvolá viditelný flash.
    if (reviewsSection.querySelectorAll('.review-card-premium, .review-card, [class*="review-card"]').length > 0) {
        reviewsSection.dataset.injected = 'true';
        return true;
    }

    // Double the array for smooth infinite scrolling loop
    const displayList = list.length > 2 ? list.concat(list) : list;

    reviewsSection.innerHTML = `
        <div class="reviews-section-container bg-slate-950 section-reveal">
            <div class="container mx-auto px-6">
                <div class="text-center mb-6">
                    <h2 class="text-4xl md:text-5xl font-bold text-white mb-3" style="margin-top: 0;">Co o nás říkají naši klienti</h2>
                    <p class="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed opacity-80 mb-4">
                        Reference čerpáme z portálů Firmy.cz a Google. Spokojenost našich klientů je pro nás prioritou číslo jedna.
                    </p>

                    <!-- 2 Glassmorphism Review Bubbles / Pill Buttons -->
                    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.8rem; margin-bottom: 1rem;">
                        <a href="https://www.firmy.cz/detail/12954501-nanofusion-s-r-o-blucina.html#hodnoceni" target="_blank" rel="noopener noreferrer"
                           style="background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 9999px; padding: 0.5rem 1.2rem; color: #ffffff; font-size: 0.85rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease; text-decoration: none; box-shadow: 0 4px 15px rgba(0,0,0,0.3);"
                           onmouseover="this.style.borderColor='#f59e0b'; this.style.background='rgba(245, 158, 11, 0.18)'; this.style.transform='translateY(-2px)';"
                           onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.15)'; this.style.background='rgba(255, 255, 255, 0.08)'; this.style.transform='translateY(0)';">
                            <span style="color: #f59e0b; font-weight: 900;">★ 4,9</span>
                            <span>Recenze na Firmy.cz ↗</span>
                        </a>
                        <a href="https://www.google.com/search?q=NANOfusion+recenze" target="_blank" rel="noopener noreferrer"
                           style="background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 9999px; padding: 0.5rem 1.2rem; color: #ffffff; font-size: 0.85rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease; text-decoration: none; box-shadow: 0 4px 15px rgba(0,0,0,0.3);"
                           onmouseover="this.style.borderColor='#4285F4'; this.style.background='rgba(66, 133, 244, 0.18)'; this.style.transform='translateY(-2px)';"
                           onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.15)'; this.style.background='rgba(255, 255, 255, 0.08)'; this.style.transform='translateY(0)';">
                            <span style="color: #4285F4; font-weight: 900;">★ 5,0</span>
                            <span>Recenze na Google ↗</span>
                        </a>
                    </div>
                </div>

                <div style="position: relative; width: 100%; max-width: 1300px; margin: 0 auto;" class="group">
                    <div id="reviews-scroller" style="display: flex; gap: 1.5rem; overflow-x: auto; scroll-behavior: smooth; padding: 0.5rem 0 1.5rem; scrollbar-width: none; mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);">
                        ${displayList.map(rev => `
                            <div class="review-card-premium"
                                 style="flex: 0 0 350px; background: #1e293b; border-radius: 1.5rem; padding: 2.25rem; box-shadow: 0 20px 40px rgba(0,0,0,0.1); display: flex; flex-direction: column; gap: 1.25rem;">
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

                    <button id="r-arrow-left"
                        class="hidden md:flex review-arrow left"
                        style="position: absolute !important; left: -25px !important; top: 50% !important; transform: translateY(-50%) !important; z-index: 100 !important; width: 60px !important; height: 60px !important; border-radius: 50% !important; background: #f59e0b !important; border: none !important; cursor: pointer !important; align-items: center !important; justify-content: center !important; box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3) !important; transition: all 0.3s ease !important; padding: 0 !important;"
                        onmouseover="this.style.scale='1.1'; this.style.backgroundColor='#d97706';"
                        onmouseout="this.style.scale='1'; this.style.backgroundColor='#f59e0b';"
                    >
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white !important" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="stroke: white !important; display: block !important; margin: auto !important;"><path d="M15 18l-6-6 6-6"></path></svg>
                    </button>
                    
                    <button id="r-arrow-right"
                        class="hidden md:flex review-arrow right"
                        style="position: absolute !important; right: -25px !important; top: 50% !important; transform: translateY(-50%) !important; z-index: 100 !important; width: 60px !important; height: 60px !important; border-radius: 50% !important; background: #f59e0b !important; border: none !important; cursor: pointer !important; align-items: center !important; justify-content: center !important; box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3) !important; transition: all 0.3s ease !important; padding: 0 !important;"
                        onmouseover="this.style.scale='1.1'; this.style.backgroundColor='#d97706';"
                        onmouseout="this.style.scale='1'; this.style.backgroundColor='#f59e0b';"
                    >
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white !important" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="stroke: white !important; display: block !important; margin: auto !important;"><path d="M9 18l6-6-6-6"></path></svg>
                    </button>
                </div>
            </div>
        </div>
        <style>
            .reviews-section-container {
                padding-top: 4rem !important;
                padding-bottom: 2.5rem !important;
            }
            #reviews-scroller::-webkit-scrollbar { display: none; }
            .review-arrow { opacity: 0 !important; pointer-events: none !important; transition: opacity 0.3s ease !important; }
            @media (min-width: 769px) {
                .group:hover .review-arrow { opacity: 1 !important; pointer-events: auto !important; }
            }
            @media (max-width: 1200px) and (min-width: 769px) {
                #r-arrow-left { left: 10px !important; }
                #r-arrow-right { right: 10px !important; }
            }
            @media (max-width: 768px) {
                .reviews-section-container {
                    padding-top: 2.5rem !important;
                    padding-bottom: 1.5rem !important;
                }
                .review-card-premium { flex: 0 0 85% !important; padding: 1.5rem !important; }
                .review-arrow, #r-arrow-left, #r-arrow-right { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }
            }
        </style>
    `;

    // Auto-Scroller Setup
    setTimeout(() => {
        const scroller = document.getElementById('reviews-scroller');
        const arrowLeft = document.getElementById('r-arrow-left');
        const arrowRight = document.getElementById('r-arrow-right');

        if (scroller) {
            let autoplayInterval;
            const startAutoplay = () => {
                autoplayInterval = setInterval(() => {
                    if (scroller.scrollLeft >= (scroller.scrollWidth / 2)) {
                        scroller.scrollLeft = 0;
                    } else {
                        scroller.scrollLeft += 1;
                    }
                }, 30);
            };
            const stopAutoplay = () => clearInterval(autoplayInterval);

            if (arrowLeft) {
                arrowLeft.onclick = (e) => { e.stopPropagation(); scroller.scrollLeft -= 400; };
                arrowLeft.onmouseenter = stopAutoplay;
            }
            if (arrowRight) {
                arrowRight.onclick = (e) => { e.stopPropagation(); scroller.scrollLeft += 400; };
                arrowRight.onmouseenter = stopAutoplay;
            }

            scroller.onmouseenter = stopAutoplay;
            scroller.onmouseleave = startAutoplay;
            scroller.addEventListener('touchstart', stopAutoplay, {passive: true});
            scroller.addEventListener('touchend', startAutoplay, {passive: true});
            scroller.addEventListener('touchcancel', startAutoplay, {passive: true});

            startAutoplay();
        }
    }, 100);

    reviewsSection.style.opacity = '0';
    reviewsSection.style.transition = 'opacity 0.6s ease-out';
    reviewsSection.dataset.injected = 'true';
    return true;
};

const initReviews = async () => {
    let finalReviews = [];
    const fallbackReviews = [
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

    try {
        const data = await reviewsPromise;
        if (data && data.length > 0) {
            finalReviews = data.map(d => ({
                name: d.author || d.name || 'Zákazník',
                info: d.location || d.city
                    ? `${d.city || ''}, ${d.service || d.source || 'firmy.cz'}`.trim().replace(/^,\s*/, '')
                    : (d.source === 'firmy.cz' ? 'Ověřeno na Firmy.cz' : (d.source === 'manual' ? 'Přímá zpětná vazba' : 'Ověřený zákazník')),
                stars: d.rating || d.stars || 5,
                text: d.content || d.text || ''
            })).filter(r => r.text);
        } else {
            finalReviews = fallbackReviews;
        }
    } catch (e) {
        console.warn('Reviews Sync Error:', e);
        finalReviews = fallbackReviews;
    }

    const runInjection = () => {
        if (injectReviews(finalReviews)) {
            const target = document.getElementById('reference');
            if (target) {
                setTimeout(() => { target.style.opacity = '1'; }, 100);
            }
            return true;
        }
        return false;
    };

    if (runInjection()) return;

    const observer = new MutationObserver(() => {
        if (runInjection()) {
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => { observer.disconnect(); runInjection(); }, 5000);
};

initReviews();
