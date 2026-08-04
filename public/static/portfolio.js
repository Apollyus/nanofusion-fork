/* Dynamic Portfolio / Realizations for NANOfusion with Autoplay & Arrows */
import { supabase } from './supabase-config.js';

// Pre-fetch realizations data IMMEDIATELY on script load to save time (CTO Performance Hack)
export const portfolioPromise = (async () => {
  try {
    const { data, error } = await supabase
      .from('realizations')
      .select('*, realization_photos(id, url, order_index, caption)')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (e) {
    console.warn('NANOfusion: Pre-fetch realizations failed:', e);
    return null;
  }
})();

const injectPortfolio = async () => {
    let portfolioSection = document.getElementById('realizace');
    if (portfolioSection && portfolioSection.dataset.initialized) return;

    if (!portfolioSection) {
        portfolioSection = document.createElement('div');
        portfolioSection.id = 'realizace';
        portfolioSection.className = 'py-24 bg-slate-50 relative overflow-hidden';

        const referenceSection = document.getElementById('reference');
        const sluzbySection = document.getElementById('sluzby');
        const processSection = document.getElementById('proces');
        if (referenceSection?.parentNode) {
            referenceSection.parentNode.insertBefore(portfolioSection, referenceSection);
        } else if (sluzbySection?.parentNode) {
            sluzbySection.parentNode.insertBefore(portfolioSection, sluzbySection.nextSibling);
        } else if (processSection?.parentNode) {
            processSection.parentNode.insertBefore(portfolioSection, processSection);
        } else {
            const root = document.querySelector('#root > div') || document.body;
            root.appendChild(portfolioSection);
        }
    }

    portfolioSection.dataset.initialized = 'true';

    let projectsData = [];

    // Default static fallback data (only used if Supabase load fails)
    const fallbackProjects = [
        {
            id: 'default-1',
            title: 'Čištění střechy RD, Praha',
            work_type: 'Čištění střech',
            location: 'Praha - Západ',
            duration: '2 dny',
            description: 'Silné znečištění mechem a lišejníkem po 15 letech. Tlakové čištění s nano-ochranou.',
            photos: [{ url: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?w=800' }],
        },
        {
            id: 'default-2',
            title: 'Renovace fasády bytového domu, Brno',
            work_type: 'Čištění fasád',
            location: 'Brno - Královo Pole',
            duration: '4 dny',
            description: 'Atmosférické nečistoty a mastnota z blízké frekventované křižovatky. Plocha přes 1200 m².',
            photos: [{ url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800' }],
        },
        {
            id: 'default-3',
            title: 'Zámková dlažba firemního areálu, Plzeň',
            work_type: 'Čištění dlažeb',
            location: 'Plzeň - Borská pole',
            duration: '1 den',
            description: 'Olejové skvrny a zašlá špína z těžké techniky. Horkovodní čištění za plného provozu.',
            photos: [{ url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800' }],
        },
    ];

    window.nnf_switchPortfolioPhoto = (idx) => {
        const photos = window.nnf_currentPortfolioPhotos || [];
        if (photos.length === 0) return;
        
        const newIndex = (idx + photos.length) % photos.length;
        window.nnf_currentPortfolioIndex = newIndex;
        
        const photo = photos[newIndex];
        const imgEl = document.getElementById('modal-main-img');
        if (imgEl) {
            imgEl.src = window.nnf_optimizeImage(photo.url, 1080);
        }
        
        const thumbsContainer = document.getElementById('modal-gallery-thumbs');
        if (thumbsContainer) {
            Array.from(thumbsContainer.children).forEach((thumbDiv, i) => {
                if (i === newIndex) {
                    thumbDiv.style.borderColor = '#F59E0B';
                } else {
                    thumbDiv.style.borderColor = 'transparent';
                }
            });
        }
    };

    window.nnf_prevPortfolioPhoto = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        window.nnf_switchPortfolioPhoto(window.nnf_currentPortfolioIndex - 1);
    };

    window.nnf_nextPortfolioPhoto = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        window.nnf_switchPortfolioPhoto(window.nnf_currentPortfolioIndex + 1);
    };

    const openCaseStudy = (p) => {
        let modal = document.getElementById('case-study-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'case-study-modal';
            modal.className = 'modal-overlay';
            document.body.appendChild(modal);
        }

        const mainPhoto = window.nnf_optimizeImage(p.photos?.[0]?.url || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', 1080);
        
        window.nnf_currentPortfolioPhotos = p.photos || [];
        window.nnf_currentPortfolioIndex = 0;

        // Gallery logic
        const galleryHtml = p.photos && p.photos.length > 1
            ? `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:0.75rem;margin-top:1.5rem;" id="modal-gallery-thumbs">
                ${p.photos.map((ph, idx) => `
                    <div style="position:relative;aspect-ratio:4/3;border-radius:0.75rem;overflow:hidden;cursor:pointer;border:2px solid ${idx === 0 ? '#F59E0B' : 'transparent'};transition:all 0.2s;" 
                         onclick="window.nnf_switchPortfolioPhoto(${idx})">
                        <img src="${window.nnf_optimizeImage(ph.url, 256)}" alt="${p.title || 'Fotografie realizace NANOfusion'}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
                    </div>`).join('')}
               </div>`
            : '';

        modal.innerHTML = `
            <div class="modal-content" style="max-width:960px;max-height:90vh;overflow-y:auto;">
                <button class="close-modal-btn">&times;</button>
                <div style="padding:2.5rem;">
                    <div style="position:relative;margin-bottom:1.5rem;border-radius:1.5rem;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.1);" id="portfolio-modal-media-viewport">
                        
                        <!-- Navigation arrows inside the image container -->
                        ${p.photos && p.photos.length > 1 ? `
                          <button onclick="window.nnf_prevPortfolioPhoto(event)" style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); z-index: 10; width: 48px; height: 48px; border-radius: 50%; background: rgba(15, 23, 42, 0.6); border: none; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='rgba(245, 158, 11, 0.9)'" onmouseout="this.style.background='rgba(15, 23, 42, 0.6)'">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg>
                          </button>
                          <button onclick="window.nnf_nextPortfolioPhoto(event)" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); z-index: 10; width: 48px; height: 48px; border-radius: 50%; background: rgba(15, 23, 42, 0.6); border: none; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='rgba(245, 158, 11, 0.9)'" onmouseout="this.style.background='rgba(15, 23, 42, 0.6)'">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg>
                          </button>
                        ` : ''}
                        
                        <img id="modal-main-img" src="${mainPhoto}" alt="${p.title}" style="width:100%;height:450px;object-fit:cover;cursor:zoom-in;" onclick="window.open(this.src, '_blank')">
                    </div>
                    
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1.5rem;margin-bottom:1.5rem;">
                        <div style="flex:1;min-width:300px;">
                            <h2 style="font-size:2.25rem;font-weight:900;color:#0f172a;margin-bottom:1rem;line-height:1.2;">${p.title}</h2>
                            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1rem;">
                                <span style="background:#fff7ed;color:#f59e0b;padding:0.5rem 1.25rem;border-radius:99px;font-size:0.75rem;font-weight:900;text-transform:uppercase;letter-spacing:0.05em;">${p.work_type}</span>
                                ${p.duration ? `<span style="background:#f1f5f9;color:#475569;padding:0.5rem 1.25rem;border-radius:99px;font-size:0.75rem;font-weight:700;">⏱ ${p.duration}</span>` : ''}
                                ${p.location ? `<span style="background:#f1f5f9;color:#475569;padding:0.5rem 1.25rem;border-radius:99px;font-size:0.75rem;font-weight:700;">📍 ${p.location}</span>` : ''}
                            </div>
                            ${galleryHtml}
                        </div>
                        <div style="width:100%;max-width:320px;background:#F59E0B;padding:2rem;border-radius:1.5rem;color:white;box-shadow:0 15px 35px rgba(245,158,11,0.2);">
                            <h4 style="font-weight:900;font-size:1.1rem;margin-bottom:0.5rem;">Zaujala vás tato práce?</h4>
                            <p style="font-size:0.9rem;opacity:0.9;margin-bottom:1.5rem;line-height:1.5;">Rádi pro vás připravíme nezávaznou kalkulaci zdarma.</p>
                             <button onclick="if(window.nnf_closeModalAndScrollToKalkulacka){window.nnf_closeModalAndScrollToKalkulacka();}else{document.getElementById('case-study-modal').style.display='none';document.body.style.overflow='';if(window.scrollToKalkulacka){window.scrollToKalkulacka();}else{window.location.href='/#kalkulacka';}}"
                                style="width:100%;background:white;color:#F59E0B;border:none;padding:1rem;border-radius:1rem;font-weight:900;cursor:pointer;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.05em;transition:all 0.3s;"
                                onmouseenter="this.style.transform='translateY(-2px)';this.style.boxShadow='0 5px 15px rgba(0,0,0,0.1)'"
                                onmouseleave="this.style.transform='translateY(0)'">
                                MÁM ZÁJEM 💬
                            </button>
                        </div>
                    </div>
                    
                    ${p.description ? `
                    <div style="background:white;padding:2.5rem;border-radius:1.5rem;margin-bottom:2rem;border:1px solid #e2e8f0;">
                        <h4 style="font-size:0.75rem;font-weight:800;color:#94a3b8;text-transform:uppercase;margin-bottom:1rem;letter-spacing:0.1em;">Detaily realizace</h4>
                        <div style="color:#334155;line-height:1.8;font-size:1.1rem;">${p.description}</div>
                    </div>` : ''}
                </div>
            </div>
        `;
        modal.style.display = 'flex';

        const closeModal = () => {
            modal.style.display = 'none';
            if (window.location.hash.includes('#realizace')) {
                history.replaceState(null, '', window.location.pathname + window.location.search);
            }
        };

        const closeBtn = modal.querySelector('.close-modal-btn');
        if (closeBtn) closeBtn.onclick = closeModal;
        modal.onclick = (e) => { 
            if (e.target === modal) {
                closeModal();
            }
        };
        window.nnf_closeModalAndScrollToKalkulacka = () => {
            closeModal();
            if (window.scrollToKalkulacka) {
                window.scrollToKalkulacka();
            } else {
                const kalk = document.getElementById('kalkulacka');
                if (kalk) kalk.scrollIntoView({ behavior: 'smooth' });
                else window.location.href = '/#kalkulacka';
            }
        };
    };

    const handleRouting = () => {
        const hash = window.location.hash;
        if (hash.startsWith('#realizace/')) {
            const id = hash.split('/')[1];
            const project = projectsData.find(p => String(p.id) === String(id));
            if (project) {
                openCaseStudy(project);
            }
        } else if (hash === '#realizace') {
            const modal = document.getElementById('case-study-modal');
            if (modal) modal.style.display = 'none';
            history.replaceState(null, '', window.location.pathname + window.location.search);
        }
    };

    // Hydratace z Supabase
    try {
        const data = await portfolioPromise;
        if (data && data.length > 0) {
            projectsData = data.map(r => ({
                id: r.id,
                title: r.title || 'Realizace',
                work_type: r.work_type || 'Naše práce',
                location: r.location || '',
                duration: r.duration || '',
                description: r.description || '',
                photos: (r.realization_photos || []).sort((a, b) => a.order_index - b.order_index),
            }));
        } else {
            projectsData = fallbackProjects;
        }
    } catch (e) {
        console.warn('Portfolio Sync: Cloud data nedostupná, používám fallback.');
        projectsData = fallbackProjects;
    }

    const render = () => {
        portfolioSection.style.opacity = '1';

        const generateCards = (list) => list.map(p => {
            const img = window.nnf_optimizeImage(p.photos?.[0]?.url || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', 640);
            return `
            <div class="portfolio-card-modern" 
                style="text-decoration: none; display: block; cursor: pointer;"
                onclick="window.location.hash='realizace/${p.id}'"
            >
                <div class="portfolio-img-wrap">
                    <img src="${img}" alt="${p.title}" loading="lazy">
                    <div class="portfolio-overlay">
                        <span class="view-btn">Detail projektu</span>
                    </div>
                </div>
                <div class="portfolio-content">
                    <span class="portfolio-tag">${p.work_type || 'Realizace'}</span>
                    <h3 class="portfolio-h3">${p.title}</h3>
                    ${p.location ? `<p style="font-size:0.85rem;color:#64748b;margin-top:0.4rem;display:flex;items-center;gap:0.4rem;">📍 ${p.location}</p>` : ''}
                </div>
            </div>`;
        }).join('');

        portfolioSection.innerHTML = `
            <div class="container mx-auto px-4 mb-16">
                <div class="text-center">
                    <h2 class="text-4xl md:text-6xl font-bold mb-6" style="color: #f59e0b;">Naše realizace v detailu</h2>
                    <p class="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">Sledujte, jak vracíme povrchům jejich původní vzhled a krásu</p>
                </div>
            </div>
            
            <div class="relative max-w-[1400px] mx-auto group">
                <div id="portfolio-scroller" class="portfolio-container-new">
                    <div id="portfolio-track" class="portfolio-track-new">
                        ${generateCards(projectsData)}
                        ${generateCards(projectsData)}
                    </div>
                </div>

                <!-- Premium Navigation Arrows (Identical round shape & offset as Nano-Magazín) -->
                <button id="p-arrow-left" class="hidden md:flex portfolio-arrow left" 
                    style="position: absolute !important; left: 15px !important; top: 50% !important; transform: translateY(-50%) !important; z-index: 100 !important; width: 60px !important; height: 60px !important; min-width: 60px !important; min-height: 60px !important; border-radius: 50% !important; background: #f59e0b !important; border: none !important; cursor: pointer !important; align-items: center !important; justify-content: center !important; box-shadow: 0 10px 25px rgba(245, 158, 11, 0.4) !important; transition: all 0.3s ease !important; padding: 0 !important;"
                    onmouseover="this.style.scale='1.1'; this.style.backgroundColor='#d97706';" 
                    onmouseout="this.style.scale='1'; this.style.backgroundColor='#f59e0b';" 
                >
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white !important" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="stroke: white !important; display: block !important; margin: auto !important;"><path d="M15 18l-6-6 6-6"></path></svg>
                </button>
                <button id="p-arrow-right" class="hidden md:flex portfolio-arrow right" 
                    style="position: absolute !important; right: 15px !important; top: 50% !important; transform: translateY(-50%) !important; z-index: 100 !important; width: 60px !important; height: 60px !important; min-width: 60px !important; min-height: 60px !important; border-radius: 50% !important; background: #f59e0b !important; border: none !important; cursor: pointer !important; align-items: center !important; justify-content: center !important; box-shadow: 0 10px 25px rgba(245, 158, 11, 0.4) !important; transition: all 0.3s ease !important; padding: 0 !important;"
                    onmouseover="this.style.scale='1.1'; this.style.backgroundColor='#d97706';" 
                    onmouseout="this.style.scale='1'; this.style.backgroundColor='#f59e0b';" 
                >
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white !important" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="stroke: white !important; display: block !important; margin: auto !important;"><path d="M9 18l6-6-6-6"></path></svg>
                </button>
            </div>

            <div style="display:flex;justify-content:center;padding:5rem 0;">
                <button onclick="if(window.scrollToKalkulacka){window.scrollToKalkulacka(event);}else{window.location.href='/#kalkulacka';}"
                    class="inline-flex items-center px-12 py-6 bg-amber-500 text-white font-black rounded-2xl hover:bg-amber-600 transition-all shadow-2xl active:scale-95 uppercase tracking-widest text-sm hover:translate-y-[-2px]">
                    Spočítejte si to
                    <svg class="ml-3 w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
            </div>

            <style>
                .portfolio-container-new {
                    display: flex;
                    overflow-x: auto;
                    scroll-behavior: smooth;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    padding: 2rem 0;
                    mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                }
                .portfolio-container-new::-webkit-scrollbar { display: none; }
                
                .portfolio-track-new {
                    display: flex;
                    gap: 2.5rem;
                    padding: 0 5%;
                    min-width: max-content;
                }

                .portfolio-card-modern {
                    flex: 0 0 450px;
                    background: white;
                    border-radius: 2.5rem;
                    overflow: hidden;
                    border: 1px solid #f1f5f9;
                    box-shadow: 0 15px 40px -10px rgba(0,0,0,0.05);
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                }

                .portfolio-card-modern:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 25px 60px -15px rgba(0,0,0,0.1);
                    border-color: #f59e0b20;
                }

                .portfolio-img-wrap {
                    height: 320px;
                    overflow: hidden;
                    position: relative;
                }

                .portfolio-img-wrap img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .portfolio-card-modern:hover .portfolio-img-wrap img {
                    transform: scale(1.1);
                }

                .portfolio-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(15,23,42,0.8), transparent);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.4s;
                }

                .portfolio-card-modern:hover .portfolio-overlay {
                    opacity: 1;
                }

                .view-btn {
                    background: white;
                    color: #0f172a;
                    padding: 0.8rem 1.5rem;
                    border-radius: 1rem;
                    font-weight: 800;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    transform: translateY(20px);
                    transition: transform 0.4s;
                }

                .portfolio-card-modern:hover .view-btn {
                    transform: translateY(0);
                }

                .portfolio-content { padding: 2rem; }
                .portfolio-tag {
                    display: inline-block;
                    padding: 0.3rem 0.8rem;
                    background: #fff7ed;
                    color: #f59e0b;
                    border-radius: 0.75rem;
                    font-size: 0.7rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    margin-bottom: 1rem;
                }
                .portfolio-h3 { font-size: 1.4rem; font-weight: 800; color: #0f172a; line-height: 1.3; }

                .portfolio-arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 60px !important;
                    height: 60px !important;
                    min-width: 60px !important;
                    min-height: 60px !important;
                    border-radius: 50% !important;
                    background: #f59e0b !important;
                    color: white;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 100;
                    box-shadow: 0 10px 25px rgba(245, 158, 11, 0.4);
                    transition: all 0.3s ease;
                    opacity: 0 !important;
                    pointer-events: none !important;
                }

                #p-arrow-left, .portfolio-arrow.left { left: 15px !important; }
                #p-arrow-right, .portfolio-arrow.right { right: 15px !important; }

                @media (min-width: 1500px) {
                    #p-arrow-left, .portfolio-arrow.left { left: -25px !important; }
                    #p-arrow-right, .portfolio-arrow.right { right: -25px !important; }
                }

                @media (min-width: 769px) {
                    .group:hover .portfolio-arrow { opacity: 1 !important; pointer-events: auto !important; }
                }

                @media (max-width: 768px) {
                    .portfolio-card-modern { flex: 0 0 84vw !important; max-width: 340px !important; border-radius: 1.5rem; }
                    .portfolio-img-wrap { height: 220px; }
                    #modal-main-img { height: 280px !important; }
                    .portfolio-h3 { font-size: 1.1rem; }
                    .portfolio-arrow, #p-arrow-left, #p-arrow-right { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }
                    .portfolio-container-new { mask-image: none !important; -webkit-mask-image: none !important; padding: 1rem 0 !important; }
                    .portfolio-track-new { gap: 1.25rem !important; padding: 0 8vw !important; }
                }
            </style>
        `;

        // Auto-Scroller Setup (Matches reviews.js & blog.js 1:1)
        setTimeout(() => {
            const scroller = document.getElementById('portfolio-scroller');
            const arrowLeft = document.getElementById('p-arrow-left');
            const arrowRight = document.getElementById('p-arrow-right');

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
                    arrowLeft.onclick = (e) => { e.stopPropagation(); scroller.scrollLeft -= 450; };
                    arrowLeft.onmouseenter = stopAutoplay;
                }
                if (arrowRight) {
                    arrowRight.onclick = (e) => { e.stopPropagation(); scroller.scrollLeft += 450; };
                    arrowRight.onmouseenter = stopAutoplay;
                }

                scroller.onmouseenter = stopAutoplay;
                scroller.onmouseleave = startAutoplay;

                startAutoplay();
            }
        }, 100);
        
        // Initial route check
        handleRouting();
        portfolioSection.style.opacity = '1';
    };

    render();
    window.addEventListener('hashchange', handleRouting);
};

// --- Initialization Logic ---
const initPortfolio = () => {
    const el = document.getElementById('realizace');
    if (el && el.dataset.initialized) return true;
    
    const referenceSection = document.getElementById('reference');
    const sluzbySection = document.getElementById('sluzby');
    const processSection = document.getElementById('proces');
    
    if (referenceSection?.parentNode || sluzbySection?.parentNode || processSection?.parentNode || el) {
        injectPortfolio();
        return true;
    }
    return false;
};

const runInit = () => {
    if (initPortfolio()) return;

    const observer = new MutationObserver(() => {
        if (initPortfolio()) {
            observer.disconnect();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
    // Fallback if sections never appear (inject at bottom)
    setTimeout(() => {
        if (!document.getElementById('realizace')) {
            observer.disconnect();
            injectPortfolio();
        }
    }, 5000);
};

// Start
runInit();
