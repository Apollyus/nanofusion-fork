/* Dynamic Portfolio / Realizations for NANOfusion with Autoplay & Arrows */

const injectPortfolio = async () => {
    if (document.getElementById('realizace')) return; // Zabráníme dvojité inicializaci

    const portfolioSection = document.createElement('div');
    portfolioSection.id = 'realizace';
    portfolioSection.className = 'py-24 bg-slate-50 relative overflow-hidden';

    // Vložíme sekci na správné místo v DOM
    const referenceSection = document.getElementById('reference');
    const processSection = document.getElementById('proces');
    if (referenceSection?.parentNode) {
        referenceSection.parentNode.insertBefore(portfolioSection, referenceSection);
    } else if (processSection?.parentNode) {
        processSection.parentNode.insertBefore(portfolioSection, processSection.nextSibling);
    } else {
        const root = document.querySelector('#root > div') || document.body;
        root.appendChild(portfolioSection);
    }

    // Hardcoded záloha
    let projectsData = [
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

    const openCaseStudy = (p) => {
        let modal = document.getElementById('case-study-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'case-study-modal';
            modal.className = 'modal-overlay';
            document.body.appendChild(modal);
        }

        const mainPhoto = p.photos?.[0]?.url || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800';
        
        // Gallery logic
        const galleryHtml = p.photos && p.photos.length > 1
            ? `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:0.75rem;margin-top:1.5rem;" id="modal-gallery-thumbs">
                ${p.photos.map((ph, idx) => `
                    <div style="position:relative;aspect-ratio:4/3;border-radius:0.75rem;overflow:hidden;cursor:pointer;border:2px solid ${idx === 0 ? '#F59E0B' : 'transparent'};transition:all 0.2s;" 
                         onclick="document.getElementById('modal-main-img').src='${ph.url}'; Array.from(this.parentElement.children).forEach(el=>el.style.borderColor='transparent'); this.style.borderColor='#F59E0B'">
                        <img src="${ph.url}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
                    </div>`).join('')}
               </div>`
            : '';

        modal.innerHTML = `
            <div class="modal-content" style="max-width:960px;max-height:90vh;overflow-y:auto;">
                <button class="close-modal-btn" onclick="window.location.hash = 'realizace'">&times;</button>
                <div style="padding:2.5rem;">
                    <div style="position:relative;margin-bottom:1.5rem;border-radius:1.5rem;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.1);">
                        <img id="modal-main-img" src="${mainPhoto}" alt="${p.title}" style="width:100%;height:450px;object-fit:cover;cursor:zoom-in;" onclick="window.open(this.src, '_blank')">
                    </div>
                    
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1.5rem;margin-bottom:1.5rem;">
                        <div style="flex:1;min-width:300px;">
                            <h2 style="font-size:2.25rem;font-weight:900;color:#0f172a;margin-bottom:1rem;line-height:1.2;">${p.title}</h2>
                            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1.5rem;">
                                <span style="background:#fff7ed;color:#f59e0b;padding:0.5rem 1.25rem;border-radius:99px;font-size:0.75rem;font-weight:900;text-transform:uppercase;letter-spacing:0.05em;">${p.work_type}</span>
                                ${p.duration ? `<span style="background:#f1f5f9;color:#475569;padding:0.5rem 1.25rem;border-radius:99px;font-size:0.75rem;font-weight:700;">⏱ ${p.duration}</span>` : ''}
                                ${p.location ? `<span style="background:#f1f5f9;color:#475569;padding:0.5rem 1.25rem;border-radius:99px;font-size:0.75rem;font-weight:700;">📍 ${p.location}</span>` : ''}
                            </div>
                        </div>
                        <div style="width:100%;max-width:320px;background:#F59E0B;padding:2rem;border-radius:1.5rem;color:white;box-shadow:0 15px 35px rgba(245,158,11,0.2);">
                            <h4 style="font-weight:900;font-size:1.1rem;margin-bottom:0.5rem;">Zaujala vás tato práce?</h4>
                            <p style="font-size:0.9rem;opacity:0.9;margin-bottom:1.5rem;line-height:1.5;">Rádi pro vás připravíme nezávaznou kalkulaci zdarma.</p>
                            <button onclick="document.getElementById('case-study-modal').style.display='none';document.getElementById('ai-chat-launcher').click();"
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
                    
                    ${p.photos && p.photos.length > 1 ? `
                        <div style="margin-top:2.5rem;">
                            <h4 style="font-size:0.75rem;font-weight:800;color:#94a3b8;text-transform:uppercase;margin-bottom:1rem;letter-spacing:0.1em;">Fotogalerie projektu (${p.photos.length})</h4>
                            ${galleryHtml}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        modal.style.display = 'flex';
        modal.querySelector('.close-modal-btn').onclick = () => {
            modal.style.display = 'none';
            if (window.location.hash.startsWith('#realizace/')) {
                window.location.hash = 'realizace';
            }
        };
        modal.onclick = (e) => { 
            if (e.target === modal) {
                modal.style.display = 'none';
                if (window.location.hash.startsWith('#realizace/')) {
                    window.location.hash = 'realizace';
                }
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
        }
    };

    // Hydratace z Supabase
    try {
        const { supabase } = await import('./supabase-config.js');
        const { data, error } = await supabase
            .from('realizations')
            .select('*, realization_photos(id, url, order_index, caption)')
            .eq('is_published', true)
            .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
            projectsData = data.map(r => ({
                id: r.id,
                title: r.title || 'Realizace',
                work_type: r.work_type || 'Naše práce',
                location: r.location || '',
                duration: r.duration || '',
                description: r.description || '',
                photos: (r.realization_photos || []).sort((a, b) => a.order_index - b.order_index),
            }));
            // Re-render with live data
            render();
            // Trigger routing again after data is loaded
            handleRouting();
        }
    } catch (e) {
        console.warn('Portfolio Sync: Cloud data nedostupná.');
    }

    const render = () => {
        // Set opacity to 0 initially to prevent flickering
        portfolioSection.style.opacity = '0';
        portfolioSection.style.transition = 'opacity 0.6s ease-out';

        const generateCards = (list) => list.map(p => {
            const img = p.photos?.[0]?.url || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800';
            return `
            <a href="#realizace/${p.id}" class="portfolio-card-modern" style="text-decoration: none; display: block;">
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
            </a>`;
        }).join('');

        portfolioSection.innerHTML = `
            <div class="container mx-auto px-4 mb-16">
                <div class="text-center">
                    <h2 class="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Naše Realizace v detailu</h2>
                    <p class="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">Sledujte, jak vracíme domům jejich původní krásu a lesk.</p>
                </div>
            </div>
            
            <div class="relative max-w-[1600px] mx-auto group">
                <div id="portfolio-scroller" class="portfolio-container-new">
                    <div id="portfolio-track" class="portfolio-track-new">
                        ${generateCards(projectsData)}
                        ${generateCards(projectsData)}
                    </div>
                </div>

                <!-- Premium Navigation Arrows -->
                <button id="p-arrow-left" class="portfolio-arrow left" 
                    onmouseover="this.style.scale='1.1'; this.style.backgroundColor='#d97706';" 
                    onmouseout="this.style.scale='1'; this.style.backgroundColor='#f59e0b';" 
                    style="position: absolute !important; left: 20px !important; top: 50% !important; transform: translateY(-50%) !important; z-index: 100 !important; width: 60px !important; height: 60px !important; border-radius: 30px !important; background: #f59e0b !important; border: none !important; cursor: pointer !important; align-items: center !important; justify-content: center !important; box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3) !important; transition: all 0.3s ease !important; padding: 0 !important;">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white !important" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="stroke: white !important;"><path d="M15 18l-6-6 6-6"></path></svg>
                </button>
                <button id="p-arrow-right" class="portfolio-arrow right" 
                    onmouseover="this.style.scale='1.1'; this.style.backgroundColor='#d97706';" 
                    onmouseout="this.style.scale='1'; this.style.backgroundColor='#f59e0b';" 
                    style="position: absolute !important; right: 20px !important; top: 50% !important; transform: translateY(-50%) !important; z-index: 100 !important; width: 60px !important; height: 60px !important; border-radius: 30px !important; background: #f59e0b !important; border: none !important; cursor: pointer !important; align-items: center !important; justify-content: center !important; box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3) !important; transition: all 0.3s ease !important; padding: 0 !important;">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white !important" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="stroke: white !important;"><path d="M9 18l6-6-6-6"></path></svg>
                </button>
            </div>

            <div style="display:flex;justify-content:center;padding:5rem 0;">
                <button onclick="document.getElementById('ai-chat-launcher').click()"
                    class="inline-flex items-center px-12 py-6 bg-amber-500 text-white font-black rounded-2xl hover:bg-amber-600 transition-all shadow-2xl active:scale-95 uppercase tracking-widest text-sm hover:translate-y-[-2px]">
                    CHCI TAKÉ TAKOVÉ VÝSLEDKY
                    <svg class="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
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
                    width: 60px;
                    height: 60px;
                    border-radius: 30px;
                    background: #f59e0b !important;
                    color: white;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 20;
                    box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3);
                    transition: all 0.3s ease;
                    opacity: 0;
                }

                .group:hover .portfolio-arrow { opacity: 1; }
                .portfolio-arrow.left { left: -25px; }
                .portfolio-arrow.right { right: -25px; }

                @media (max-width: 768px) {
                    .portfolio-card-modern { flex: 0 0 320px; border-radius: 1.5rem; }
                    .portfolio-img-wrap { height: 240px; }
                    #modal-main-img { height: 280px !important; }
                    .portfolio-h3 { font-size: 1.1rem; }
                    .portfolio-arrow { display: none !important; }
                    .portfolio-container-new { mask-image: none; -webkit-mask-image: none; }
                }
            </style>
        `;

        // Scroller Logic
        const scroller = document.getElementById('portfolio-scroller');
        const arrowLeft = document.getElementById('p-arrow-left');
        const arrowRight = document.getElementById('p-arrow-right');
        
        if (scroller && arrowLeft && arrowRight) {
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

            arrowLeft.addEventListener('click', (e) => {
                e.stopPropagation();
                scroller.scrollLeft -= 480;
            });

            arrowRight.addEventListener('click', (e) => {
                e.stopPropagation();
                scroller.scrollLeft += 480;
            });

            scroller.addEventListener('mouseenter', stopAutoplay);
            scroller.addEventListener('mouseleave', startAutoplay);
            arrowLeft.addEventListener('mouseenter', stopAutoplay);
            arrowRight.addEventListener('mouseenter', stopAutoplay);

            startAutoplay();
        }
        
        // Initial route check
        handleRouting();

        // Final fade-in
        setTimeout(() => { portfolioSection.style.opacity = '1'; }, 100);
    };

    render();
    window.addEventListener('hashchange', handleRouting);
};

// --- Initialization Logic ---
const initPortfolio = () => {
    if (document.getElementById('realizace')) return;
    
    const referenceSection = document.getElementById('reference');
    const processSection = document.getElementById('proces');
    
    if (referenceSection?.parentNode || processSection?.parentNode) {
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
