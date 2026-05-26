/**
 * NANOfusion — O nás a Certifikáty z Supabase site_config
 * CTO Edition - STRV Premium Standards
 */

import { supabase } from './supabase-config.js';

// Globální cache pro okamžité otevírání (0ms)
let aboutUsCache = null;
let isPreloading = false;

// Pre-fetchování dat ihned při načtení stránky
export const preloadAboutUsData = async () => {
  if (isPreloading) return;
  isPreloading = true;
  try {
    const { data: configData, error } = await supabase
      .from('site_config')
      .select('*')
      .in('key', [
        'about_title',
        'about_subtitle',
        'about_description',
        'about_stats',
        'about_certificates',
        'about_why_title',
        'about_why_points',
        'about_certs_title',
        'about_certs_subtitle'
      ]);

    if (error) throw error;

    const config = (configData || []).reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    aboutUsCache = {
      title: config.about_title || 'Příběh preciznosti a inovace',
      subtitle: config.about_subtitle || '14 let pečujeme o to, co jste usilovně vybudovali',
      description: config.about_description || 'NANOfusion vznikla z vášně pro detail a potřeby chránit to, co naši klienti usilovně vybudovali. Věříme, že krása architektury by neměla blednout pod vlivem času a počasí.',
      stats: [],
      certs: [],
      whyTitle: config.about_why_title || 'Proč NANOfusion?',
      whyPoints: [],
      certsTitle: config.about_certs_title || 'Naše certifikace a odbornost',
      certsSubtitle: config.about_certs_subtitle || 'Spolupracujeme s předními výrobci v oboru a naši specialisté pravidelně procházejí náročným školením pro aplikaci moderních nano-materiálů.'
    };

    // Parsování statistik
    try {
      aboutUsCache.stats = config.about_stats ? JSON.parse(config.about_stats) : [
        { label: 'Realizací', value: '950+' },
        { label: 'Let garance', value: '10' },
        { label: 'Let zkušeností', value: '14' }
      ];
    } catch (e) {
      aboutUsCache.stats = [
        { label: 'Realizací', value: '950+' },
        { label: 'Let garance', value: '10' },
        { label: 'Let zkušeností', value: '14' }
      ];
    }

    // Parsování whyPoints
    try {
      aboutUsCache.whyPoints = config.about_why_points ? JSON.parse(config.about_why_points) : [
        "Vlastní prověřené postupy a špičková certifikovaná chemie",
        "Zaměření, kalkulace a osobní konzultace po celé ČR zdarma",
        "Profesionální tým specialistů s mnohaletou řemeslnou praxí"
      ];
    } catch (e) {
      aboutUsCache.whyPoints = [
        "Vlastní prověřené postupy a špičková certifikovaná chemie",
        "Zaměření, kalkulace a osobní konzultace po celé ČR zdarma",
        "Profesionální tým specialistů s mnohaletou řemeslnou praxí"
      ];
    }

    // Parsování certifikátů
    try {
      let parsedCerts = config.about_certificates ? JSON.parse(config.about_certificates) : [];
      aboutUsCache.certs = parsedCerts.map(c => ({
        ...c,
        imageUrl: c.imageUrl ? c.imageUrl.replace(/\s+/g, '') : 'https://images.unsplash.com/photo-1589330694653-ded6df53f7bb?w=800'
      }));
    } catch (e) {
      aboutUsCache.certs = [];
    }

    window.__nnf_cachedCerts = aboutUsCache.certs;
    console.log('NANOfusion: O nás data úspěšně pre-fetchována na pozadí.');
  } catch (e) {
    console.warn('NANOfusion: Pre-fetch O nás selhal', e);
  } finally {
    isPreloading = false;
  }
};

// ============================================================
// MODAL RENDERER & INTERACTIVE LOGIC
// ============================================================
export const openAboutUsModal = async () => {
  // 1. Zobrazíme transparentní skleněné pozadí (web zůstane v pozadí plně vidět)
  let overlay = document.getElementById('about-us-modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'about-us-modal-overlay';
    // Měníme na rgba(15,23,42,0.4) a blur(8px)
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,0.4);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:99999999;display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity 0.3s ease;';
    document.body.appendChild(overlay);
    setTimeout(() => { overlay.style.opacity = '1'; }, 10);
  } else {
    overlay.style.display = 'flex';
    overlay.style.opacity = '1';
  }

  // 2. Pokud nemáme cache (téměř nenastane), ukážeme spinner a stáhneme data
  if (!aboutUsCache) {
    overlay.innerHTML = `
      <div style="color:white;display:flex;flex-direction:column;align-items:center;gap:1rem;">
        <div style="width:40px;height:40px;border:3px solid rgba(255,255,255,0.1);border-top-color:#f59e0b;border-radius:50%;animation:spin 1s infinite linear;"></div>
        <span style="font-family:'Outfit',sans-serif;font-size:14px;color:white;font-weight:600;letter-spacing:0.05em;text-shadow:0 2px 10px rgba(0,0,0,0.5);">Načítání...</span>
      </div>
      <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
    `;
    await preloadAboutUsData();
  }

  // Spustíme revalidaci na pozadí pro případ, že se v CMS změnila data od posledního načtení
  preloadAboutUsData();

  const { title, subtitle, description, stats, certs, whyTitle, whyPoints, certsTitle, certsSubtitle } = aboutUsCache;

  // Generování HTML statistik
  const statsHtml = stats.map(s => `
    <div style="background:#f8fafc;padding:1.5rem;border-radius:1.5rem;border:1px solid #e2e8f0;text-align:center;">
      <div style="font-size:2.25rem;font-weight:900;background:linear-gradient(135deg, #f59e0b, #d97706);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:0.25rem;">${s.value}</div>
      <div style="font-size:0.875rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${s.label}</div>
    </div>
  `).join('');

  // Generování HTML certifikátů
  const certsHtml = certs.length > 0
    ? certs.map(c => `
        <div class="cert-card" onclick="window.nnf_openCertDetail('${c.id}')" style="background:#ffffff;border-radius:1.5rem;border:1px solid #e2e8f0;overflow:hidden;cursor:pointer;transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);box-shadow:0 4px 12px rgba(0,0,0,0.03);position:relative;">
          <div style="height:150px;position:relative;overflow:hidden;background:#f8fafc;">
            <img src="${c.imageUrl}" alt="${c.title}" style="width:100%;height:100%;object-fit:cover;transition:transform 0.5s ease;" class="cert-img-hover" loading="lazy">
            <div style="position:absolute;inset:0;background:linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 60%);"></div>
            <span style="position:absolute;bottom:12px;left:12px;background:rgba(245,158,11,0.95);color:white;padding:3px 10px;border-radius:6px;font-size:10px;font-weight:800;letter-spacing:0.05em;text-transform:uppercase;">Certifikát</span>
          </div>
          <div style="padding:1.25rem;">
            <h4 style="font-size:0.95rem;font-weight:800;color:#0f172a;margin-bottom:0.25rem;line-clamp:1;-webkit-line-clamp:1;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;">${c.title}</h4>
            <p style="color:#64748b;font-size:0.813rem;line-height:1.5;line-clamp:2;-webkit-line-clamp:2;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;margin:0;">${c.description}</p>
          </div>
        </div>
      `).join('')
    : `<div style="grid-column:1/-1;text-align:center;padding:3rem;background:#f8fafc;border-radius:2rem;border:1px dashed #cbd5e1;color:#64748b;font-weight:600;">Naše certifikáty v oboru se připravují k zobrazení...</div>`;

  // Vložíme hlavní obsah modal okna (0ms latence, vše vykresleno okamžitě)
  overlay.innerHTML = `
    <div class="about-modal-card" style="background:white;width:100%;max-width:1100px;max-height:90vh;border-radius:32px;overflow:hidden;display:flex;flex-direction:column;position:relative;box-shadow:0 30px 100px rgba(15,23,42,0.15);animation:modalReveal 0.4s cubic-bezier(0.16, 1, 0.3, 1);">
      <!-- Zavírací tlačítko -->
      <button onclick="window.nnf_closeAboutUs()" class="about-modal-close" style="position:absolute;top:20px;right:20px;background:#f1f5f9;border:none;width:44px;height:44px;border-radius:50%;cursor:pointer;font-size:24px;z-index:100;font-weight:bold;display:flex;align-items:center;justify-content:center;transition:all 0.2s;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='#f1f5f9'">&times;</button>
      
      <div class="about-modal-scroll" style="flex:1;overflow-y:auto;padding:40px 60px;">
        <!-- Hlavička -->
        <div class="about-modal-header" style="margin-bottom:3rem;max-width:800px;">
          <span style="color:#f59e0b;font-weight:800;text-transform:uppercase;font-size:13px;letter-spacing:0.15em;display:block;margin-bottom:8px;">O NÁS</span>
          <h2 class="about-modal-title" style="font-size:2.5rem;font-weight:900;color:#0f172a;line-height:1.1;letter-spacing:-0.03em;margin:0 0 12px 0;">${title}</h2>
          <div class="about-modal-subtitle" style="font-size:1.15rem;font-weight:600;color:#64748b;line-height:1.4;">${subtitle}</div>
        </div>

        <!-- Mřížka obsahu -->
        <div style="display:grid;grid-template-columns:1.2fr 0.8fr;gap:50px;margin-bottom:4rem;" class="about-grid-responsive">
          <!-- Levý sloupec: Text + Statistiky -->
          <div>
            <div class="about-modal-desc" style="font-size:1.05rem;line-height:1.75;color:#334155;white-space:pre-wrap;margin-bottom:2.5rem;">${description}</div>
            
            <!-- Statistiky -->
            <div class="about-modal-stats-grid" style="display:grid;grid-template-columns:repeat(3, 1fr);gap:20px;">
              ${statsHtml}
            </div>
          </div>

          <!-- Pravý sloupec: Proč NANOfusion -->
          <div class="about-modal-accent-box" style="background:#0f172a;color:white;padding:2.5rem;border-radius:2rem;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:center;">
            <h3 style="font-size:1.5rem;font-weight:800;margin:0 0 1.5rem 0;color:#f59e0b;">${whyTitle}</h3>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:1.25rem;">
              ${whyPoints.map(p => `
                <li style="display:flex;align-items:flex-start;gap:12px;line-height:1.5;">
                  <span style="color:#f59e0b;font-weight:800;font-size:1.15rem;">✓</span>
                  <span>${p}</span>
                </li>
              `).join('')}
            </ul>
            <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        <!-- Sekce Certifikáty -->
        <div>
          <div class="about-modal-certs-header" style="margin-bottom:1.5rem;display:flex;align-items:center;justify-content:space-between;">
            <h3 style="font-size:1.5rem;font-weight:800;color:#0f172a;margin:0;">${certsTitle}</h3>
            <div class="about-modal-certs-line" style="height:2px;flex:1;background:#f1f5f9;margin-left:24px;"></div>
          </div>
          <p class="about-modal-certs-subtitle" style="color:#64748b;font-size:0.95rem;margin-bottom:2rem;max-width:700px;">${certsSubtitle}</p>
          
          <!-- Mřížka certifikátů -->
          <div class="about-modal-certs-grid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:24px;">
            ${certsHtml}
          </div>
        </div>
      </div>
    </div>
    
    <style>
      @keyframes modalReveal {
        from { opacity: 0; transform: scale(0.95) translateY(10px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
      .cert-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 15px 30px rgba(0,0,0,0.08) !important;
        border-color: #f59e0b !important;
      }
      .cert-card:hover .cert-img-hover {
        transform: scale(1.08);
      }
      @media (max-width: 768px) {
        .about-modal-card {
          border-radius: 20px !important;
          max-height: 95vh !important;
          width: 100% !important;
        }
        .about-modal-scroll {
          padding: 24px 20px !important;
        }
        .about-modal-close {
          top: 12px !important;
          right: 12px !important;
          width: 36px !important;
          height: 36px !important;
          font-size: 20px !important;
        }
        .about-modal-header {
          margin-bottom: 1.5rem !important;
        }
        .about-modal-title {
          font-size: 1.75rem !important;
          margin-bottom: 8px !important;
        }
        .about-modal-subtitle {
          font-size: 0.95rem !important;
          line-height: 1.3 !important;
        }
        .about-grid-responsive {
          grid-template-columns: 1fr !important;
          gap: 24px !important;
          margin-bottom: 2.5rem !important;
        }
        .about-modal-desc {
          font-size: 0.938rem !important;
          line-height: 1.6 !important;
          margin-bottom: 1.5rem !important;
        }
        .about-modal-stats-grid {
          gap: 12px !important;
        }
        .about-modal-stats-grid > div {
          padding: 1rem !important;
          border-radius: 1rem !important;
        }
        .about-modal-stats-grid > div > div:first-child {
          font-size: 1.75rem !important;
        }
        .about-modal-stats-grid > div > div:last-child {
          font-size: 0.75rem !important;
        }
        .about-modal-accent-box {
          padding: 1.5rem !important;
          border-radius: 1.25rem !important;
        }
        .about-modal-accent-box h3 {
          font-size: 1.25rem !important;
          margin-bottom: 1rem !important;
        }
        .about-modal-accent-box ul {
          gap: 0.75rem !important;
        }
        .about-modal-accent-box li {
          font-size: 0.875rem !important;
        }
        .about-modal-certs-header h3 {
          font-size: 1.25rem !important;
        }
        .about-modal-certs-line {
          margin-left: 12px !important;
        }
        .about-modal-certs-subtitle {
          font-size: 0.875rem !important;
          margin-bottom: 1.25rem !important;
        }
        .about-modal-certs-grid {
          gap: 16px !important;
          grid-template-columns: 1fr !important;
        }
      }
    </style>
  `;

  document.body.style.overflow = 'hidden';
};

window.nnf_closeAboutUs = () => {
  const overlay = document.getElementById('about-us-modal-overlay');
  if (overlay) {
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }
};

// ============================================================
// CERTIFIKÁT DETAIL MODAL
// ============================================================
window.nnf_openCertDetail = (certId) => {
  const certs = window.__nnf_cachedCerts || [];
  const cert = certs.find(c => c.id === certId);
  if (!cert) return;

  let detailOverlay = document.getElementById('cert-detail-overlay');
  if (!detailOverlay) {
    detailOverlay = document.createElement('div');
    detailOverlay.id = 'cert-detail-overlay';
    // Měníme na rgba(15, 23, 42, 0.6) a blur(8px)
    detailOverlay.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,0.6);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:999999999;display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity 0.3s ease;';
    document.body.appendChild(detailOverlay);
    setTimeout(() => { detailOverlay.style.opacity = '1'; }, 10);
  } else {
    detailOverlay.style.display = 'flex';
    detailOverlay.style.opacity = '1';
  }

  detailOverlay.innerHTML = `
    <div class="cert-zoom-card" style="background:white;width:100%;max-width:700px;border-radius:28px;overflow:hidden;box-shadow:0 30px 80px rgba(15,23,42,0.2);position:relative;animation:modalReveal 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
      <button onclick="window.nnf_closeCertDetail()" class="cert-zoom-close" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.9);border:none;width:38px;height:38px;border-radius:50%;cursor:pointer;font-size:20px;z-index:10;font-weight:bold;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 10px rgba(0,0,0,0.1);">&times;</button>
      
      <div class="cert-zoom-img-wrap" style="height:350px;background:#0f172a;position:relative;overflow:hidden;">
        <img src="${cert.imageUrl}" alt="${cert.title}" style="width:100%;height:100%;object-fit:contain;">
      </div>
      
      <div class="cert-zoom-body" style="padding:2.5rem;">
        <div style="color:#f59e0b;font-weight:800;text-transform:uppercase;font-size:11px;letter-spacing:0.1em;margin-bottom:8px;">Ověřená certifikace</div>
        <h3 class="cert-zoom-title" style="font-size:1.75rem;font-weight:900;color:#0f172a;margin:0 0 1rem 0;line-height:1.2;letter-spacing:-0.02em;">${cert.title}</h3>
        <p class="cert-zoom-desc" style="color:#475569;font-size:0.95rem;line-height:1.7;margin:0;">${cert.description}</p>
      </div>
    </div>
    
    <style>
      @media (max-width: 768px) {
        .cert-zoom-card {
          border-radius: 20px !important;
          max-width: 95% !important;
        }
        .cert-zoom-img-wrap {
          height: 220px !important;
        }
        .cert-zoom-body {
          padding: 1.5rem !important;
        }
        .cert-zoom-title {
          font-size: 1.35rem !important;
          margin-bottom: 8px !important;
        }
        .cert-zoom-desc {
          font-size: 0.875rem !important;
          line-height: 1.5 !important;
        }
        .cert-zoom-close {
          top: 12px !important;
          right: 12px !important;
          width: 32px !important;
          height: 32px !important;
          font-size: 18px !important;
        }
      }
    </style>
  `;

  detailOverlay.onclick = (e) => {
    if (e.target === detailOverlay) window.nnf_closeCertDetail();
  };
};

window.nnf_closeCertDetail = () => {
  const detailOverlay = document.getElementById('cert-detail-overlay');
  if (detailOverlay) {
    detailOverlay.style.opacity = '0';
    setTimeout(() => {
      detailOverlay.style.display = 'none';
    }, 300);
  }
};

window.nnf_openAboutUs = openAboutUsModal;

// ============================================================
// DYNAMICKÉ INJEKTOVÁNÍ DO NAVIGACE (ROBUSTNÍ CT ENGINER)
// ============================================================
export const patchNavigation = () => {
  const navLinks = Array.from(document.querySelectorAll('header nav a, header div a'));
  const referenceLink = navLinks.find(a => a.textContent.trim() === 'Reference');

  if (referenceLink) {
    const navContainers = Array.from(new Set(navLinks.map(a => a.parentNode).filter(p => p)));
    navContainers.forEach(container => {
      // Pokud už odkaz existuje, přeskočíme ho
      if (container.querySelector('a.about-us-injected-link')) return;

      const refInContainer = Array.from(container.querySelectorAll('a')).find(a => a.textContent.trim() === 'Reference');
      if (refInContainer) {
        const aboutLink = refInContainer.cloneNode(true);
        aboutLink.textContent = 'O nás';
        aboutLink.href = '#about';
        // Zachováme původní třídy a pouze přidáme identifikační třídu
        aboutLink.classList.add('about-us-injected-link');
        // Odstraníme jakékoliv aktivní stavy (aktivní barvy a tloušťky), které mohl naklonovaný element mít
        aboutLink.classList.remove('active-link', 'active');

        // Zaručíme, že onclick zamezí defaultu a otevře modal
        aboutLink.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          openAboutUsModal();
        };

        // Vložíme hned za Reference
        refInContainer.parentNode.insertBefore(aboutLink, refInContainer.nextSibling);
      }
    });
  }
};

// Spustíme preloading dat z Supabase okamžitě na pozadí při načtení skriptu (nečekáme na kliknutí!)
preloadAboutUsData();

// ============================================================
// INICIALIZACE A DELEGACE UDÁLOSTÍ
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  patchNavigation();
  preloadAboutUsData(); // Dvojitá pojistka
  // Zpožděný run pro dynamické nav linky generované Reactem
  setTimeout(patchNavigation, 1000);
  setTimeout(patchNavigation, 2500);
});

// Sledujeme změny v DOMu (MutationObserver) pro re-injektování do React navigace
const aboutObserver = new MutationObserver(() => {
  patchNavigation();
});
aboutObserver.observe(document.body, { childList: true, subtree: true });

// Globální odchytávání kliknutí na staré / o-nas linky
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link) {
    const href = link.getAttribute('href') || '';
    const text = link.textContent.trim();
    if (href.includes('o-nas.html') || text === 'O nás' || link.classList.contains('about-us-injected-link')) {
      e.preventDefault();
      e.stopPropagation();
      openAboutUsModal();
    }
  }
}, true);
