/* Dynamic FAQs for NANOfusion — MutationObserver verze */

let allFaqsCache = null;

const injectFaqs = async () => {
    let faqSection = document.getElementById('faq');
    if (!faqSection || faqSection.dataset.injected === 'true') return;

    // Clear section immediately to prevent "flickering" of old hardcoded content
    faqSection.innerHTML = '<div style="opacity: 0; height: 300px;"></div>';
    faqSection.style.transition = 'opacity 0.5s ease-in-out';
    faqSection.style.opacity = '0';

    const hydrateFaqs = async () => {
        try {
            const { supabase } = await import('./supabase-config.js');
            const { data, error } = await supabase.from('faqs')
                .select('*')
                .eq('is_active', true)
                .order('order_index', { ascending: true });

            if (!error && data && data.length > 0) {
                console.log('NANOfusion: FAQs synchronized from Cloud');
                
                allFaqsCache = data;
                const isFaqPage = window.location.pathname.includes('faq');
                let displayData = data;

                if (!isFaqPage) {
                    // Hlavní stránka: zobrazit pouze ty s page_section === 'home' (max 5)
                    displayData = data.filter(f => f.page_section === 'home').slice(0, 5);
                }

                render(displayData, isFaqPage);
                setTimeout(() => { faqSection.style.opacity = '1'; }, 50);
            }
        } catch (e) {
            console.error('FAQ Sync Error:', e);
        }
    };

    const render = (faqs, isFaqPage) => {
        const buttonHtml = !isFaqPage 
            ? `
            <div class="text-center" style="margin-top: 3.5rem;">
                <button onclick="window.nnf_openFaqModal()" style="
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 1rem 2.25rem;
                    border-radius: 9999px;
                    background: hsl(37, 91%, 55%);
                    color: white;
                    border: none;
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 0.938rem;
                    box-shadow: 0 10px 15px -3px hsla(37, 91%, 55%, 0.4);
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='hsl(37, 91%, 45%)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.background='hsl(37, 91%, 55%)'; this.style.transform='translateY(0)';" class="faq-cta-btn">
                    Zobrazit všechny dotazy
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14m-7-7l7 7-7 7"></path>
                    </svg>
                </button>
            </div>`
            : '';

        const headerHtml = isFaqPage
            ? `
            <div class="max-w-4xl mx-auto" style="margin-bottom: 3.5rem;">
                <h1 class="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-heading">Často kladené dotazy</h1>
                <p class="text-xl text-slate-600 leading-relaxed">
                    Vše, co potřebujete vědět o našich technologiích, postupech a zárukách.
                </p>
            </div>
            `
            : `
            <div class="text-center" style="margin-bottom: 3.5rem;">
                <h2 class="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-heading">Časté dotazy</h2>
                <p class="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">Vše, co potřebujete vědět o našich technologiích a postupech.</p>
            </div>
            `;

        const wrapperClass = isFaqPage ? 'max-w-4xl mx-auto' : 'max-w-3xl mx-auto';

        const faqHtml = `
            <div class="container mx-auto px-6">
                ${headerHtml}
                <div class="${wrapperClass}">
                    ${faqs.map((f, i) => `
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
                ${buttonHtml}
            </div>
        `;
        faqSection.innerHTML = faqHtml;
        faqSection.dataset.injected = 'true';
    };

    hydrateFaqs();
};

// ============================================================
// FAQ MODAL WINDOW (STEJNÉ JAKO U SEKCE O NÁS)
// ============================================================
window.nnf_openFaqModal = () => {
    let overlay = document.getElementById('faq-modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'faq-modal-overlay';
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,0.4);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:99999999;display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity 0.3s ease;';
        document.body.appendChild(overlay);
        setTimeout(() => { overlay.style.opacity = '1'; }, 10);
    } else {
        overlay.style.display = 'flex';
        overlay.style.opacity = '1';
    }

    const faqs = allFaqsCache || [];

    const faqListHtml = faqs.map((f, i) => `
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
    `).join('');

    overlay.innerHTML = `
        <div class="faq-modal-card" style="background:white;width:100%;max-width:1100px;max-height:90vh;border-radius:32px;overflow:hidden;display:flex;flex-direction:column;position:relative;box-shadow:0 30px 100px rgba(15,23,42,0.15);animation:modalReveal 0.4s cubic-bezier(0.16, 1, 0.3, 1);">
            <!-- Zavírací tlačítko -->
            <button onclick="window.nnf_closeFaq()" class="faq-modal-close" style="position:absolute;top:20px;right:20px;background:#f1f5f9;border:none;width:44px;height:44px;border-radius:50%;cursor:pointer;font-size:24px;z-index:100;font-weight:bold;display:flex;align-items:center;justify-content:center;transition:all 0.2s;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='#f1f5f9'">&times;</button>
            
            <div class="faq-modal-scroll" style="flex:1;overflow-y:auto;padding:40px 60px;">
                <!-- Hlavička -->
                <div class="faq-modal-header" style="margin-bottom:3rem;max-width:800px;">
                    <span style="color:#f59e0b;font-weight:800;text-transform:uppercase;font-size:13px;letter-spacing:0.15em;display:block;margin-bottom:8px;">ČASTÉ DOTAZY</span>
                    <h2 class="faq-modal-title" style="font-size:2.5rem;font-weight:900;color:#0f172a;line-height:1.1;letter-spacing:-0.03em;margin:0 0 12px 0;">Často kladené dotazy</h2>
                    <div class="faq-modal-subtitle" style="font-size:1.15rem;font-weight:600;color:#64748b;line-height:1.4;">Vše, co potřebujete vědět o našich technologiích, postupech a zárukách.</div>
                </div>

                <!-- Otázky -->
                <div style="max-width:900px;margin-bottom:2rem;">
                    ${faqListHtml}
                </div>
            </div>
        </div>
        <style>
            @keyframes modalReveal {
                from { opacity: 0; transform: scale(0.95) translateY(10px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
            }
            @media (max-width: 768px) {
                .faq-modal-card {
                    border-radius: 20px !important;
                    max-height: 95vh !important;
                    width: 100% !important;
                }
                .faq-modal-scroll {
                    padding: 24px 20px !important;
                }
                .faq-modal-close {
                    top: 12px !important;
                    right: 12px !important;
                    width: 36px !important;
                    height: 36px !important;
                    font-size: 20px !important;
                }
                .faq-modal-header {
                    margin-bottom: 1.5rem !important;
                }
                .faq-modal-title {
                    font-size: 1.75rem !important;
                    margin-bottom: 8px !important;
                }
                .faq-modal-subtitle {
                    font-size: 0.95rem !important;
                    line-height: 1.3 !important;
                }
            }
        </style>
    `;

    document.body.style.overflow = 'hidden';
};

window.nnf_closeFaq = () => {
    const overlay = document.getElementById('faq-modal-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
};

// Globální odchytávání kliknutí na /faq linky (stejné jako u about-us.js)
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link) {
        const href = link.getAttribute('href') || '';
        const text = link.textContent.trim();
        if (href === '/faq' || href.includes('faq/index.html') || text === 'Časté dotazy') {
            e.preventDefault();
            e.stopPropagation();
            window.nnf_openFaqModal();
        }
    }
}, true);

// MutationObserver — čeká dokud main.js nevytvoří #faq
const initFaq = () => {
    if (document.getElementById('faq')) {
        injectFaqs();
        return;
    }
    const observer = new MutationObserver(() => {
        if (document.getElementById('faq')) {
            observer.disconnect();
            injectFaqs();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => { observer.disconnect(); injectFaqs(); }, 8000);
};

initFaq();
