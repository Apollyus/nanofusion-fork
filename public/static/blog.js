/* Blog Injection & Premium Interaction Logic for NANOfusion */

import { supabase } from './supabase-config.js';

const fallbackBlogPosts = [
    { 
        id: 1, 
        title: 'Jak probíhá čištění fasád?', 
        summary: 'Přečtěte si, jaké technologie používáme pro hloubkovou očistu vašeho domu a proč je důležitá správná příprava.', 
        content: 'Čištění fasády není jen o estetice, ale především o ochraně materiálu. Náš proces začíná hloubkovou analýzou znečištění. Používáme šetrné, ale vysoce účinné chemické prostředky, které nepoškozují omítku, ale bez milosti odstraní řasy a plísně. Následuje jemný oplach a aplikace speciální nano-impregnace, která zajistí, že fasáda zůstane čistá až po dobu 10 let.',
        date: '10. 4. 2026', 
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800' 
    },
    { 
        id: 2, 
        title: 'Výhody nano-ochrany povrchů', 
        summary: 'Proč je nano-technologie revolucí v údržbě nemovitostí? Odpuzuje vodu, špínu a šetří váš čas i peněženku.', 
        content: 'Nano-technologie funguje na principu lotosového efektu. Na ošetřeném povrchu se vytvoří neviditelná vrstva nano-částic, které odpuzují vodu i olej. Špína se tak neusazuje hluboko do pópů materiálu, ale zůstává na povrchu, odkud ji smyje běžný déšť. To dramaticky snižuje potřebu mechanického čištění a prodlužuje životnost venkovních i vnitřních ploch.',
        date: '5. 4. 2026', 
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800' 
    },
    { 
        id: 3, 
        title: 'Příprava střechy na sezónu', 
        summary: 'Nepodceňte jarní údržbu. Vyčištěná střecha lépe odvádí vodu, nezarůstá mechem a působí jako nová.', 
        content: 'Po zimě je střecha často zanesená listím, mechem a pískem. Pokud tyto nečistoty neodstraníte, drží v sobě vlhkost, která v mrazu trhá krytinu. Naše jarní servisní balíčky zahrnují vyčištění žlabů, tlakové mytí krytiny a preventivní postřik proti organickému růstu. Vaše střecha tak bude připravená na přívalové deště i letní horka.',
        date: '28. 3. 2026', 
        image: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?w=800' 
    }
];

// Pre-fetch blog posts IMMEDIATELY on script load to save time (CTO Performance Hack)
export const blogPromise = (async () => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });
    if (error) throw error;
    return data;
  } catch (e) {
    console.warn('NANOfusion: Pre-fetch blog posts failed:', e);
    return null;
  }
})();

let blogPostsData = [];

const openBlogDetail = (post) => {
    let overlay = document.getElementById('blog-modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'blog-modal-overlay';
        overlay.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.85); backdrop-filter:blur(8px); z-index:999999; display:none; align-items:center; justify-content:center; padding:20px;';
        document.body.appendChild(overlay);
    }

    const rawContent = post.content || post.summary || '';
    const targetMatch = rawContent.match(/<!--\s*target_service:\s*(.*?)\s*-->/);
    let targetService = targetMatch ? targetMatch[1] : (post.service_slug || post.target_service || null);

    // Smart fallback if not explicitly set in database comment
    if (!targetService) {
        const text = ((post.title || '') + ' ' + (post.slug || '') + ' ' + rawContent).toLowerCase();
        if (text.includes('fasád') || text.includes('fasad')) targetService = 'sluzby/facade';
        else if (text.includes('střech') || text.includes('strech')) targetService = 'sluzby/roof';
        else if (text.includes('dlažb') || text.includes('dlazb')) targetService = 'sluzby/pavement';
        else if (text.includes('impregnac') || text.includes('ochran')) targetService = 'sluzby/impregnation';
        else if (text.includes('graffiti')) targetService = 'sluzby/graffiti';
        else if (text.includes('solár') || text.includes('fotovoltaik') || text.includes('pv')) targetService = 'sluzby/pv';
        else if (text.includes('průmysl') || text.includes('prumysl')) targetService = 'sluzby/industrial';
    }

    const displayContent = rawContent.replace(/<!--\s*target_service:\s*.*?\s*-->/g, '');

    let buttonOnClick = "document.getElementById('blog-modal-overlay').style.display='none'; if(window.scrollToKalkulacka){window.scrollToKalkulacka();}else{window.location.href='/#kalkulacka';}";
    let buttonText = "Poptat tuto službu →";

    if (targetService && targetService !== 'kalkulacka') {
        const targetPath = targetService.startsWith('/') ? targetService : '/' + targetService;
        buttonOnClick = `window.location.href='${targetPath}';`;
        buttonText = "Poptat tuto službu →";
    }

    overlay.innerHTML = `
        <div style="background:#ffffff; width:100%; max-width:840px; max-height:88vh; border-radius:32px; overflow-y:auto; position:relative; box-shadow:0 25px 60px rgba(0,0,0,0.4); margin:auto; box-sizing:border-box;">
            <button onclick="document.getElementById('blog-modal-overlay').style.display='none'; document.body.style.overflow='';" style="position:absolute; top:24px; right:24px; left:auto !important; background:#f1f5f9; border:none; width:44px; height:44px; border-radius:50%; cursor:pointer; font-size:24px; z-index:100; font-weight:bold; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 14px rgba(0,0,0,0.15); transition:all 0.2s; color:#0f172a; outline:none;" onmouseover="this.style.background='#e2e8f0'; this.style.transform='scale(1.05)';" onmouseout="this.style.background='#f1f5f9'; this.style.transform='scale(1)';" aria-label="Zavřít článek">&times;</button>
            <div style="padding: 3.75rem 2.5rem 2.5rem 2.5rem;">
                <div style="position:relative; height:380px; margin-top:0.5rem; margin-bottom:2rem; border-radius:1.5rem; overflow:hidden; box-shadow:0 20px 40px rgba(0,0,0,0.1);">
                    <img src="${window.nnf_optimizeImage(post.image, 1080)}" alt="${post.title || 'Blog NANOfusion'}" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <div>
                    <div style="color:#f59e0b; font-weight:800; text-transform:uppercase; font-size:12px; margin-bottom:12px; letter-spacing:0.1em;">Článek • ${post.date}</div>
                    <h2 style="font-size:32px; font-weight:800; color:#0f172a; line-height:1.2; margin-bottom:24px;">${post.title}</h2>
                    <div class="blog-content-html" style="font-size:18px; line-height:1.7; color:#475569;">${displayContent}</div>
                    
                    <div style="margin-top:40px; padding-top:30px; border-top:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
                        <div style="font-weight:700; color:#1e293b;">Zaujal vás článek?</div>
                        <button onclick="${buttonOnClick}" style="background:#f59e0b; color:white; border:none; padding:12px 24px; border-radius:12px; font-weight:800; cursor:pointer; transition:all 0.2s;" onmouseenter="this.style.background='#d97706'" onmouseleave="this.style.background='#f59e0b'">${buttonText}</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    };
};

const injectBlog = async () => {
    let blogSection = document.getElementById('blog');
    const referenceSection = document.getElementById('reference');
    const contactSection = document.getElementById('kontakt');
    
    if (!blogSection) {
        blogSection = document.createElement('section');
        blogSection.id = 'blog';
        blogSection.className = 'py-32 bg-white'; // Increased padding (v0.2 - 24 to 32)
    }

    if (referenceSection && referenceSection.parentNode) {
        referenceSection.parentNode.insertBefore(blogSection, referenceSection.nextSibling);
    } else if (contactSection && contactSection.parentNode) {
        contactSection.parentNode.insertBefore(blogSection, contactSection);
    }

    // Surgical database retrieval of articles
    try {
        const dbPosts = await blogPromise;
        if (dbPosts && dbPosts.length > 0) {
            const formatDate = (dateStr) => {
                if (!dateStr) return '';
                const date = new Date(dateStr);
                return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`;
            };

            blogPostsData = dbPosts.map(dbPost => ({
                id: dbPost.id,
                title: dbPost.title,
                summary: dbPost.content ? dbPost.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : '',
                content: dbPost.content || '',
                date: formatDate(dbPost.published_at || dbPost.created_at),
                image: dbPost.hero_image_url || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800'
            }));
        } else {
            blogPostsData = fallbackBlogPosts;
        }
    } catch (e) {
        console.warn('NANOfusion: Failed to fetch blog posts from Supabase, using local fallback.', e);
        blogPostsData = fallbackBlogPosts;
    }

    const render = () => {
        const displayPosts = blogPostsData.length > 2 ? blogPostsData.concat(blogPostsData) : blogPostsData;

        blogSection.innerHTML = `
            <div class="container mx-auto px-6">
                <div class="text-center mb-16 md:mb-24">
                    <h2 class="text-3xl md:text-5xl font-bold mb-6 font-heading" style="color: #f59e0b;">Nano-Magazín & Tipy</h2>
                    <p class="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">Sledujte rady a novinky, jak pečovat o váš dům s moderními technologiemi.</p>
                </div>
                
                <div style="position:relative; width:100%; max-width:1400px; margin:0 auto;" class="group">
                    <!-- Track Container -->
                    <div id="blog-scroller" style="display: flex; gap: 2rem; overflow-x: auto; scroll-behavior: smooth; padding: 1rem 0 3rem; scrollbar-width: none; mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);">
                        ${displayPosts.map(post => `
                            <div class="blog-card-modern" 
                                onclick="window.nnf_openBlog('${post.id}')"
                                style="flex: 0 0 calc(33.333% - 1.34rem); min-width: 320px; background: white; border-radius: 2rem; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); transition: all 0.3s ease; cursor: pointer; display: flex; flex-direction: column;" 
                                onmouseover="this.style.transform='translateY(-10px)'; this.style.boxShadow='0 25px 45px rgba(0,0,0,0.1)';" 
                                onmouseout="this.style.transform='none'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.05)';"
                            >
                                <div style="height: 240px; overflow: hidden;">
                                    <img src="${window.nnf_optimizeImage(post.image, 640)}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover;">
                                </div>
                                <div style="padding: 2rem;">
                                    <div style="font-size: 0.75rem; color: #f59e0b; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">AKTUALITA • ${post.date}</div>
                                    <h3 style="font-size: 1.25rem; font-weight: 700; color: #1e293b; margin-bottom: 1rem; line-height: 1.3;">${post.title}</h3>
                                    <div style="color: #f59e0b; font-size: 0.8rem; font-weight: 700; display: flex; align-items: center; gap: 0.25rem;">Číst článek <span>→</span></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Premium Navigation Arrows -->
                    <button id="b-arrow-left" 
                        class="hidden md:flex blog-arrow left"
                        style="position: absolute !important; left: -25px !important; top: 50% !important; transform: translateY(-50%) !important; z-index: 100 !important; width: 60px !important; height: 60px !important; border-radius: 50% !important; background: #f59e0b !important; border: none !important; cursor: pointer !important; align-items: center !important; justify-content: center !important; box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3) !important; transition: all 0.3s ease !important; padding: 0 !important;"
                        onmouseover="this.style.scale='1.1'; this.style.backgroundColor='#d97706';"
                        onmouseout="this.style.scale='1'; this.style.backgroundColor='#f59e0b';"
                    > 
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white !important" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="stroke: white !important; display: block !important; margin: auto !important;"><path d="M15 18l-6-6 6-6"></path></svg> 
                    </button>
                    
                    <button id="b-arrow-right" 
                        class="hidden md:flex blog-arrow right"
                        style="position: absolute !important; right: -25px !important; top: 50% !important; transform: translateY(-50%) !important; z-index: 100 !important; width: 60px !important; height: 60px !important; border-radius: 50% !important; background: #f59e0b !important; border: none !important; cursor: pointer !important; align-items: center !important; justify-content: center !important; box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3) !important; transition: all 0.3s ease !important; padding: 0 !important;"
                        onmouseover="this.style.scale='1.1'; this.style.backgroundColor='#d97706';"
                        onmouseout="this.style.scale='1'; this.style.backgroundColor='#f59e0b';"
                    > 
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white !important" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="stroke: white !important; display: block !important; margin: auto !important;"><path d="M9 18l6-6-6-6"></path></svg> 
                    </button>
                </div>
            </div>
            
            <style>
                #blog-scroller::-webkit-scrollbar { display: none; }
                .blog-arrow { opacity: 0 !important; pointer-events: none !important; transition: opacity 0.3s ease !important; }
                @media (min-width: 769px) {
                    .group:hover .blog-arrow { opacity: 1 !important; pointer-events: auto !important; }
                }
                @media (max-width: 1200px) and (min-width: 769px) {
                    #b-arrow-left { left: 10px !important; }
                    #b-arrow-right { right: 10px !important; }
                }
                @media (max-width: 768px) {
                    .blog-card-modern { flex: 0 0 90% !important; min-width: unset !important; }
                    .blog-arrow, #b-arrow-left, #b-arrow-right { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }
                }
            </style>
        `;

        // Auto-Scroller setup
        setTimeout(() => {
            const scroller = document.getElementById('blog-scroller');
            const arrowLeft = document.getElementById('b-arrow-left');
            const arrowRight = document.getElementById('b-arrow-right');

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
                scroller.addEventListener('touchstart', stopAutoplay, {passive: true});
                scroller.addEventListener('touchend', startAutoplay, {passive: true});
                scroller.addEventListener('touchcancel', startAutoplay, {passive: true});

                startAutoplay();
            }
        }, 100);
    };

    render();
};

window.nnf_openBlog = (id) => {
    const post = blogPostsData.find(p => String(p.id) === String(id));
    if (post) openBlogDetail(post);
};

const initBlog = () => {
    if (!document.getElementById('blog')) {
        injectBlog();
    } else {
        // Disconnect observer once successfully injected to free up main thread CPU
        blogObserver.disconnect();
    }
};

const blogObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) initBlog();
    });
});

blogObserver.observe(document.body, { childList: true, subtree: true });
initBlog();
window.addEventListener('load', () => setTimeout(initBlog, 1000));
