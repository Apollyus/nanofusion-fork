import './legal-modal.js';
import { openAboutUsModal } from './about-us.js';

window.openAboutUsModal = openAboutUsModal;
window.nnf_openAboutUs = openAboutUsModal;




// Navbar Frosted Glass Scroll Effect
const handleNavbarBlurScroll = () => {
  const header = document.querySelector('header');
  if (header) {
    if (window.scrollY > 20) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }
};
window.addEventListener('scroll', handleNavbarBlurScroll, { passive: true });
document.addEventListener('DOMContentLoaded', handleNavbarBlurScroll);

// Master Hash Navigation Handler (Příchozí prokliky z podstránek jako /#kalkulacka, /#sluzby, /#realizace, /#reference)
const handleIncomingHash = () => {
  const hash = (window.location.hash || '').toLowerCase();
  if (!hash) return;

  if (hash === '#kalkulacka' || hash === '#kalkulace' || hash === '#poptavka') {
    if (window.scrollToKalkulacka) {
      window.scrollToKalkulacka();
    }
  } else {
    const targetId = hash.replace('#', '');
    let targetEl = document.getElementById(targetId);

    // Support section aliases (e.g. realizace vs reference vs realizace-sec)
    if (!targetEl) {
      if (targetId === 'realizace' || targetId === 'reference' || targetId === 'recenze') {
        targetEl = document.getElementById('reference') || document.getElementById('realizace') || document.getElementById('realizace-sec') || document.getElementById('recenze');
      } else if (targetId === 'sluzby') {
        targetEl = document.getElementById('sluzby') || document.getElementById('sluzby-sec');
      } else if (targetId === 'o-nas' || targetId === 'o-nas-sec') {
        targetEl = document.getElementById('o-nas-sec') || document.getElementById('o-nas');
      }
    }

    if (targetEl && typeof targetEl.getBoundingClientRect === 'function') {
      const topOffset = Math.round(targetEl.getBoundingClientRect().top + window.pageYOffset - 90);
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  }
};

const isReload = (performance.getEntriesByType && performance.getEntriesByType('navigation')[0]?.type === 'reload') || (performance.navigation && performance.navigation.type === 1);

if (isReload) {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname);
  }
  window.scrollTo(0, 0);
} else if (window.location.hash) {
  // Plynulý dojezd na sekci okamžitě po načtení hlavní strany z podstránky (0ms zpoždění)
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    handleIncomingHash();
  } else {
    document.addEventListener('DOMContentLoaded', handleIncomingHash);
  }
} else {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

// Start fetching hero title IMMEDIATELY on script execution (CTO Performance Hack)
export const heroTitlePromise = (async () => {
  try {
    const { supabase } = await import('./supabase-config.js');
    const { data, error } = await supabase.from('site_config').select('value').eq('key', 'hero_title').single();
    if (error) throw error;
    return data ? data.value : null;
  } catch (e) {
    console.warn('NANOfusion: Pre-fetch hero title failed:', e);
    return null;
  }
})();

// Pre-fetch services from Supabase for dynamic card video hydration
export const servicesPromise = (async () => {
  try {
    const { supabase } = await import('./supabase-config.js');
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });
    if (error) throw error;
    return data;
  } catch (e) {
    console.warn('NANOfusion: Pre-fetch services failed:', e);
    return null;
  }
})();

// Helper to send postMessage commands directly to YouTube iframes
const sendYTCommand = (iframe, func, args = []) => {
  try {
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: func,
        args: args
      }), '*');
    }
  } catch (e) { }
};

// Module-level scrollToKalkulacka — dostupná okamžitě pro všechny click listenery
window.scrollToKalkulacka = (e) => {
  if (e && e.preventDefault) e.preventDefault();
  if (e && e.stopPropagation) e.stopPropagation();
  const el = document.getElementById('kalkulacka') || document.querySelector('.hero-calc-card') || document.querySelector('.calc-section') || document.querySelector('#calc-steps') || document.querySelector('#m-form');
  if (el) {
    const top = Math.round(el.getBoundingClientRect().top + window.pageYOffset - 90);
    window.scrollTo({ top, behavior: 'smooth' });
  } else {
    window.location.href = '/#kalkulacka';
  }
};

// Global interaction trigger to unlock video autoplay on 100% of browsers
const unlockAllVideos = () => {
  document.querySelectorAll('iframe[src*="youtube.com"]').forEach(iframe => {
    sendYTCommand(iframe, 'mute');
    sendYTCommand(iframe, 'playVideo');
  });
  document.querySelectorAll('video').forEach(vid => {
    vid.muted = true;
    vid.play().catch(() => { });
  });
};

['scroll', 'mousemove', 'touchstart', 'click', 'pointerdown'].forEach(evt => {
  window.addEventListener(evt, unlockAllVideos, { passive: true, once: false });
});

// YouTube Iframe API loader and auto-play helper
if (!document.getElementById('yt-api-script')) {
  const script = document.createElement('script');
  script.id = 'yt-api-script';
  script.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(script);
}

const ytQueue = [];
window.onYouTubeIframeAPIReady = () => {
  window.nnf_ytReady = true;
  ytQueue.forEach(fn => fn());
};

const playYouTubeIframe = (iframe) => {
  sendYTCommand(iframe, 'mute');
  sendYTCommand(iframe, 'playVideo');

  const init = () => {
    try {
      if (window.YT && window.YT.Player) {
        new window.YT.Player(iframe, {
          events: {
            onReady: (e) => {
              e.target.mute();
              e.target.playVideo();
            }
          }
        });
      }
    } catch (e) {
      console.warn('NANOfusion: YT Player init warning:', e);
    }
  };

  if (window.nnf_ytReady && window.YT && window.YT.Player) {
    init();
  } else {
    ytQueue.push(init);
  }
};

const syncServicesMedia = async () => {
  const sluzbySection = document.getElementById('sluzby');
  if (!sluzbySection) return;

  try {
    const services = await servicesPromise;
    if (!services || services.length === 0) return;

    const cards = sluzbySection.querySelectorAll('.group, [class*="card"], [onclick*="/sluzby/"]');
    cards.forEach(card => {
      const linkAttr = card.getAttribute('onclick') || card.getAttribute('href') || '';
      const cardTitle = card.querySelector('h3')?.textContent.trim().toLowerCase();

      const match = services.find(s =>
        (s.slug && linkAttr.includes(s.slug)) ||
        (s.name && cardTitle && (cardTitle.includes(s.name.toLowerCase()) || s.name.toLowerCase().includes(cardTitle)))
      );

      if (match && !card.dataset.videoSynced) {
        const video = match.video_url || match.hero_video_url;
        if (!video) return;

        const ytMatch = video.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
        const ytId = ytMatch ? ytMatch[1] : null;

        const imgEl = card.querySelector('img');
        if (!imgEl) return;
        const mediaBox = imgEl.parentElement;
        if (!mediaBox || mediaBox.classList.contains('p-6')) return;

        if (ytId) {
          mediaBox.style.position = 'relative';
          let iframe = mediaBox.querySelector('iframe');
          if (!iframe) {
            const origin = encodeURIComponent(window.location.origin);
            iframe = document.createElement('iframe');
            iframe.id = `yt-card-player-${ytId}-${Math.random().toString(36).slice(2, 6)}`;
            iframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1&origin=${origin}&playsinline=1`;
            iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:none;z-index:1;';
            iframe.allow = 'autoplay; fullscreen; encrypted-media; picture-in-picture';
            mediaBox.appendChild(iframe);
          }
          playYouTubeIframe(iframe);
          card.dataset.videoSynced = 'true';
        } else if (video) {
          mediaBox.style.position = 'relative';
          if (!mediaBox.querySelector('video')) {
            const vid = document.createElement('video');
            vid.src = video;
            vid.autoplay = true;
            vid.loop = true;
            vid.muted = true;
            vid.playsInline = true;
            vid.setAttribute('webkit-playsinline', 'true');
            vid.className = 'w-full h-full object-cover absolute inset-0';
            mediaBox.appendChild(vid);
            vid.play().catch(() => { });
          }
          card.dataset.videoSynced = 'true';
        }
      }
    });
  } catch (e) {
    console.warn('NANOfusion: syncServicesMedia failed:', e);
  }
};

const syncHeroText = async (heading) => {
  try {
    const titleVal = await heroTitlePromise;
    const fallbackTitle = 'Špičková péče o to,<br><span style="color: #f59e0b;">co jste usilovně vybudovali</span>';

    if (titleVal) {
      heading.innerHTML = titleVal;
      console.log('NANOfusion: Hero text synchronizován');
    } else {
      heading.innerHTML = fallbackTitle;
    }
  } catch (e) {
    heading.innerHTML = 'Špičková péče o to,<br><span style="color: #f59e0b;">co jste usilovně vybudovali</span>';
  } finally {
    // Signal title loading completion to preloader
    if (!window.nnf_preloaderState) window.nnf_preloaderState = {};
    window.nnf_preloaderState.titleReady = true;
    if (window.nnf_checkPreloader) {
      window.nnf_checkPreloader();
    }
  }
};

const observeAll = () => {
  // 1. Reveal Animations
  document.querySelectorAll('.section-reveal:not(.observed)').forEach(el => {
    revealObserver.observe(el);
    el.classList.add('observed');
  });

  // 2. Dynamic Text Replacement (Hero)
  const heroHeading = document.querySelector('h1.font-heading');
  if (heroHeading && (heroHeading.textContent.includes('co jste vybudovali') || heroHeading.textContent.includes('Čistíme')) && !heroHeading.dataset.updated) {
    syncHeroText(heroHeading);
    heroHeading.style.fontSize = 'min(6vw, 56px)';
    heroHeading.style.lineHeight = '1.12';
    heroHeading.style.fontWeight = '900';
    heroHeading.style.letterSpacing = '-0.02em';

    const parentContainer = heroHeading.closest('.max-w-2xl') || heroHeading.parentElement;
    if (parentContainer) {
      parentContainer.style.maxWidth = '920px';
      parentContainer.classList.remove('max-w-2xl');
      parentContainer.classList.add('max-w-4xl');
      const p = parentContainer.querySelector('p');
      if (p) {
        p.style.fontSize = 'clamp(1.05rem, 1.3vw, 1.2rem)';
        p.style.marginTop = '1rem';
        p.style.lineHeight = '1.55';
      }
    }
    heroHeading.dataset.updated = 'true';
  }

  // 2.1. Trigger Hero Media Load immediately when React mounts the hero section
  if (window.nnf_loadHeroMedia) {
    window.nnf_loadHeroMedia();
  }

  // 2.2. Hero Badges Row Patch (3 pill badges on 1 row)
  const heroHeadingEl = document.querySelector('h1.font-heading, .hero h1');
  if (heroHeadingEl) {
    const parentContainer = heroHeadingEl.parentElement;
    if (parentContainer && !parentContainer.querySelector('.hero-badges-row')) {
      const existingBadge = parentContainer.querySelector('.inline-flex.rounded-full, [class*="rounded-full"]');

      const badgeRow = document.createElement('div');
      badgeRow.className = 'hero-badges-row';
      badgeRow.style.cssText = 'display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; margin-bottom: 1.5rem; z-index: 2; position: relative;';

      const stylePill = 'background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 9999px; padding: 0.4rem 1.1rem; color: #ffffff; font-size: 0.875rem; font-weight: 600; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 4px 14px rgba(0,0,0,0.15);';

      badgeRow.innerHTML = `
        <div style="${stylePill}">
          <span style="color: #f59e0b; font-weight: 800;">★★★★★</span>
          <span>950+ dokončených projektů</span>
        </div>
        <div style="${stylePill}">
          <span style="font-size: 1rem;">🛡️</span>
          <span>Pojištění odpovědnosti</span>
        </div>
        <div style="${stylePill}">
          <span style="color: #f59e0b; font-weight: 800;">★ 4,9</span>
          <span>na Firmy.cz</span>
        </div>
      `;

      if (existingBadge) {
        existingBadge.replaceWith(badgeRow);
      } else {
        parentContainer.insertBefore(badgeRow, heroHeadingEl);
      }
    }
  }

  // 2.3. Patch Hero Primary CTA Button ("Spočítejte si cenu" -> #kalkulacka)
  window.scrollToKalkulacka = (e) => {
    if (e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
    }

    // Safely close case study modal if open
    const caseModal = document.getElementById('case-study-modal');
    if (caseModal) caseModal.style.display = 'none';
    document.body.style.overflow = '';
    document.body.style.pointerEvents = '';
    if (window.location.hash.includes('#realizace')) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    const performScroll = () => {
      let targetEl = document.getElementById('kalkulacka') || document.querySelector('.hero-calc-card') || document.querySelector('.calc-section') || document.querySelector('#calc-steps') || document.querySelector('#m-form');
      if (!targetEl && window.nnf_injectCalculator) {
        try { targetEl = window.nnf_injectCalculator(); } catch (err) { }
        targetEl = document.getElementById('kalkulacka') || document.querySelector('.hero-calc-card') || document.querySelector('.calc-section') || document.querySelector('#calc-steps') || document.querySelector('#m-form');
      }

      if (targetEl && typeof targetEl.getBoundingClientRect === 'function') {
        const topOffset = Math.round(targetEl.getBoundingClientRect().top + window.pageYOffset - 90);
        window.scrollTo({ top: topOffset, behavior: 'smooth' });

        setTimeout(() => {
          const firstInput = targetEl.querySelector('input, select, button');
          if (firstInput) try { firstInput.focus(); } catch (err) { }
        }, 400);
      } else {
        window.location.href = '/#kalkulacka';
      }
    };

    performScroll();
  };
  // Eagerly inject Configurator on homepage load above #kontakt
  const ensureCalculatorInjected = () => {
    if (window.location.pathname !== '/' && window.location.pathname !== '/index.html' && window.location.pathname !== '') return;
    if (!document.getElementById('kalkulacka') && window.nnf_injectCalculator) {
      try { window.nnf_injectCalculator(); } catch (err) { }
    }
  };
  ensureCalculatorInjected();
  setTimeout(ensureCalculatorInjected, 100);
  setTimeout(ensureCalculatorInjected, 500);
  setTimeout(ensureCalculatorInjected, 1500);

  const scrollToKalkulacka = window.scrollToKalkulacka;

  const patchHeroButtons = () => {
    document.querySelectorAll('a, button').forEach(el => {
      const heroSec = el.closest('section:first-of-type') || el.closest('.hero, #hero, [data-hero]');
      const isHeroContext = !!(heroSec && !heroSec.closest('#blog') && !heroSec.closest('#realizace') && !heroSec.closest('#sluzby'));

      if (isHeroContext) {
        const text = el.textContent.trim().toLowerCase();

        // A. "Prozkoumat služby" -> #sluzby
        if (text.includes('prozkoumat') || (text.includes('služb') && !text.includes('spočítejte') && !text.includes('spočítat'))) {
          el.setAttribute('href', '#sluzby');
          if (el.parentNode && el.parentNode.tagName === 'A') el.parentNode.setAttribute('href', '#sluzby');
          el.dataset.heroBtnType = 'sluzby';
          el.style.cursor = 'pointer';
        }
        // B. "Spočítat cenu" -> #kalkulacka
        else if (text.includes('nezávazná') || text.includes('cenov') || text.includes('kalkul') || text.includes('spočítat') || text.includes('spočítejte') || text.includes('získat') || text.includes('poptávk')) {
          if (!el.dataset.heroTextPatched) {
            const svg = el.querySelector('svg');
            const svgHtml = svg ? svg.outerHTML : `<svg class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>`;
            el.innerHTML = `Spočítat cenu ${svgHtml}`;
            el.dataset.heroTextPatched = 'true';
          }
          el.setAttribute('href', '#kalkulacka');
          if (el.parentNode && el.parentNode.tagName === 'A') el.parentNode.setAttribute('href', '#kalkulacka');
          el.style.cursor = 'pointer';
          el.style.pointerEvents = 'auto';
          el.dataset.heroCtaPatched = 'true';
          el.dataset.heroBtnType = 'kalkulacka';
        }
      }
    });

    document.querySelectorAll('a[href="#kalkulacka"], a[href="/poptavka"]').forEach(a => {
      a.style.cursor = 'pointer';
    });

    document.querySelectorAll('a[href="#sluzby"]').forEach(a => {
      a.style.cursor = 'pointer';
    });
  };

  patchHeroButtons();
  setTimeout(patchHeroButtons, 500);
  setTimeout(patchHeroButtons, 1500);

  // 2.4. Uniform gap logic across homepage sections (Hero -> Stats -> Služby -> Jak to funguje)
  const sluzbySection = document.getElementById('sluzby');
  if (sluzbySection) {
    sluzbySection.style.setProperty('padding-top', '3.5rem', 'important');
    sluzbySection.style.setProperty('padding-bottom', '1.5rem', 'important');
    const statsSection = sluzbySection.previousElementSibling;
    if (statsSection) {
      statsSection.style.setProperty('padding-bottom', '1.5rem', 'important');
      statsSection.style.setProperty('margin-bottom', '0', 'important');
    }

    // Hide "Naše služby" category label & make "Dočista kvalitní služby" heading orange
    const categorySpan = sluzbySection.querySelector('span.uppercase, span.text-primary');
    if (categorySpan && categorySpan.textContent.trim().toLowerCase() === 'naše služby') {
      categorySpan.style.display = 'none';
    }
    const mainHeading = sluzbySection.querySelector('h2');
    if (mainHeading) {
      mainHeading.style.setProperty('color', '#f59e0b', 'important');
    }
    const subtitle = sluzbySection.querySelector('p');
    if (subtitle && subtitle.textContent.includes('Kompletní péče')) {
      subtitle.textContent = subtitle.textContent.replace('Kompletní péče', 'Komplexní péče');
    }

    // Hydrate YouTube / MP4 video overlay for service cards from Supabase
    syncServicesMedia();
  }

  // Make "Naše Realizace v detailu" heading orange & patch CTA button to "Spočítejte si to"
  const realizaceSection = document.getElementById('realizace');
  if (realizaceSection) {
    const realizaceHeading = realizaceSection.querySelector('h2');
    if (realizaceHeading) {
      realizaceHeading.style.setProperty('color', '#f59e0b', 'important');
    }
    const ctaBtn = Array.from(realizaceSection.querySelectorAll('button, a')).find(b =>
      b.textContent.toLowerCase().includes('takové výsledky') || b.textContent.toLowerCase().includes('spočítejte')
    );
    if (ctaBtn) {
      ctaBtn.innerHTML = `Spočítejte si to <svg class="ml-3 w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>`;
      ctaBtn.onclick = (e) => {
        e.preventDefault();
        window.scrollToKalkulacka();
      };
    }
  }

  const procesSection = document.getElementById('proces');
  if (procesSection) {
    procesSection.style.setProperty('padding-top', '2.5rem', 'important');
    procesSection.style.setProperty('padding-bottom', '2.5rem', 'important');
  }

  // Ensure top black bar is nested inside header so fixed positioning includes both bars
  const headerEl = document.querySelector('header');
  if (headerEl) {
    const prevBar = headerEl.previousElementSibling;
    if (prevBar && prevBar.classList.contains('bg-neutral-800')) {
      headerEl.insertBefore(prevBar, headerEl.firstChild);
    }
  }

  // 3. Ensure top black bar displays phone number +420 774 509 409 (exact same style as email)
  const topContacts = document.querySelector('.top-info-bar-contacts, header .max-w-7xl > div');
  if (topContacts && !topContacts.querySelector('a[href*="774509409"]')) {
    const phoneEl = document.createElement('a');
    phoneEl.href = 'tel:+420774509409';
    phoneEl.style.cssText = 'color: inherit; font-weight: 400; text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; transition: color 0.2s;';
    phoneEl.onmouseover = function () { this.style.color = '#f59e0b'; };
    phoneEl.onmouseout = function () { this.style.color = 'inherit'; };
    phoneEl.innerHTML = '+420 774 509 409';
    topContacts.insertBefore(phoneEl, topContacts.firstChild);
  }

  // Remove any icons or 3-lines next to phone number in top black bar
  document.querySelectorAll('a[href*="774509409"]').forEach(link => {
    if (link.closest('.top-info-bar-contacts, header div.bg-neutral-800, header div.bg-neutral-900, header div.text-xs')) {
      const svg = link.querySelector('svg');
      if (svg) svg.remove();
      const i = link.querySelector('i');
      if (i) i.remove();
      link.innerHTML = link.innerHTML.replace(/^[^\+\d]+/, '');
    }
  });

  // Remove duplicated phone number from white header navbar next to "Nezávazná poptávka" button
  document.querySelectorAll('header div.gap-3 > a[href*="774509409"], header nav + div > a[href*="774509409"]').forEach(el => el.remove());

  // 4. Update Logos (SRC only, sizes are in CSS)
  const logos = document.querySelectorAll('header img:not(.chat-logo):not(.ai-chat-launcher img), nav img:not(.chat-logo)');
  logos.forEach(img => {
    if (!img.dataset.patched && (img.src.includes('logo.jpg') || img.src.includes('logo-nav.jpg') || img.src.includes('logo_dark.jpg'))) {
      img.src = '/static/nanofusion-long.png';
      img.dataset.patched = 'true';

      // Cleanup legacy inline styles from parent if they exist
      const parent = img.parentElement;
      if (parent && parent.classList.contains('bg-white') && parent.classList.contains('p-2')) {
        parent.style.background = 'transparent';
        parent.style.padding = '0';
      }
    }
  });

  const footerLogos = document.querySelectorAll('footer img');
  footerLogos.forEach(img => {
    img.src = '/static/nanofusion-footer-logo.png';
    img.dataset.patched = 'true';
    if (!img.parentElement || img.parentElement.tagName !== 'A') {
      const a = document.createElement('a');
      a.href = '/';
      a.className = 'footer-logo-link';
      a.style.cssText = 'display: inline-flex; align-items: center; text-decoration: none; cursor: pointer; margin-bottom: 1rem;';
      img.parentNode.insertBefore(a, img);
      a.appendChild(img);
    }
  });

  // 5. Navigation Links & CTA Buttons Cleanup
  // Strictly filter out removed items ("Jak to funguje", "FAQ", "Konfigurátor") from all navbar containers
  document.querySelectorAll('header nav a, header div a, .nav-mobile-drawer a, div[class*="mobile-menu"] a').forEach(a => {
    const text = (a.textContent || '').trim().toLowerCase();
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (
      text === 'jak to funguje' ||
      text === 'faq' ||
      text === 'časté dotazy' ||
      text === 'konfigurátor' ||
      href === '#postup' ||
      href === '#proces' ||
      href === '#faq' ||
      href === '/faq' ||
      (href.includes('kalkulacka') && !a.classList.contains('nav-cta-desktop') && !a.classList.contains('drawer-cta') && !a.className.includes('amber'))
    ) {
      a.remove();
    }
  });

  // Header / Navbar CTA button -> "Spočítat cenu" & scroll to Kalkulačka
  document.querySelectorAll('header .nav-cta-desktop, .nav-mobile-drawer .drawer-cta, header a[href*="kalkulacka"], header button.bg-amber-500, header a.bg-amber-500, header button.bg-primary, header a.bg-primary, header button, header a').forEach(a => {
    const text = (a.textContent || '').trim().toLowerCase();
    if (a.classList.contains('nav-cta-desktop') || a.classList.contains('drawer-cta') || a.classList.contains('bg-primary') || text.includes('nezávazn') || text.includes('poptávk') || text.includes('spočítejte') || text.includes('spočítat')) {
      if (text.includes('služby') || text.includes('reference') || text.includes('blog') || text.includes('galerie') || text.includes('o nás') || text.includes('kontakt')) return;
      // Only overwrite content if not already patched (preserve SVG arrows from template)
      if (!a.dataset.ctaNavPatched) {
        const svg = a.querySelector('svg');
        if (svg) {
          // Preserve existing SVG — just ensure pointer-events:none on SVG to prevent dead zones
          svg.style.pointerEvents = 'none';
        } else {
          a.textContent = 'Spočítat cenu';
        }
        a.dataset.ctaNavPatched = 'true';
      }
      // onclick is handled by capture handler; set as redundant fallback only
      if (!a.dataset.ctaOnclickSet) {
        a.onclick = (e) => {
          if (e) { e.preventDefault(); e.stopPropagation(); }
          if (window.scrollToKalkulacka) { window.scrollToKalkulacka(e); }
          else {
            const target = document.getElementById('kalkulacka') || document.getElementById('m-form') || document.getElementById('kontakt');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }
        };
        a.dataset.ctaOnclickSet = 'true';
      }
    }
  });

  // STRV Direct Native Click Listener Binding for Hero CTA Buttons (Preserves React VDOM & full-surface clickability)
  document.querySelectorAll('button.bg-primary, a.bg-primary, [class*="hero"] button, [class*="hero"] a').forEach(btn => {
    if (!btn.closest('header') && !btn.closest('footer') && !btn.closest('#kalkulacka') && !btn.closest('#m-form')) {
      const text = (btn.textContent || '').trim().toLowerCase();
      if (text.includes('spočítejte') || text.includes('spočítat') || text.includes('poptávk')) {
        btn.style.cursor = 'pointer';
        btn.onclick = (e) => {
          if (e) {
            e.preventDefault();
            e.stopPropagation();
          }
          if (window.scrollToKalkulacka) {
            window.scrollToKalkulacka(e);
          } else {
            const target = document.getElementById('kalkulacka') || document.getElementById('m-form');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }
        };
      }
    }
  });

  const isRoot = window.location.pathname === '/' || window.location.pathname === '/index.html';
  const prefix = isRoot ? '' : '/';

  const patchNavContainers = () => {
    const containers = document.querySelectorAll('header nav, .nav-mobile-drawer, header div.md\\:flex, div[class*="mobile-menu"], header div[class*="space-y"]');
    containers.forEach(container => {
      // Remove Konfigurátor, Jak to funguje, FAQ from container
      container.querySelectorAll('a').forEach(a => {
        const text = (a.textContent || '').trim().toLowerCase();
        const href = (a.getAttribute('href') || '').toLowerCase();
        if (text === 'konfigurátor' || text === 'jak to funguje' || text === 'faq' || text === 'časté dotazy' || href === '#postup' || href === '#proces' || href === '#faq' || href === '/faq') {
          a.remove();
        }
      });

      const links = Array.from(container.querySelectorAll('a'));
      if (links.length === 0) return;

      const sluzbyLink = links.find(a => (a.textContent || '').trim().toLowerCase() === 'služby');
      const refLink = links.find(a => (a.textContent || '').trim().toLowerCase() === 'reference');

      const anchor = sluzbyLink || refLink || links[0];
      if (!anchor) return;

      // 1. Blog
      if (!links.some(a => (a.textContent || '').trim().toLowerCase() === 'blog' || (a.getAttribute('href') || '').includes('blog'))) {
        const blogLink = anchor.cloneNode(true);
        blogLink.textContent = 'Blog';
        blogLink.href = prefix + '#blog';
        const currentRef = Array.from(container.querySelectorAll('a')).find(a => (a.textContent || '').trim().toLowerCase() === 'reference') || anchor;
        currentRef.parentNode.insertBefore(blogLink, currentRef.nextSibling);
      }

      // 2. Galerie
      if (!links.some(a => (a.textContent || '').trim().toLowerCase() === 'galerie' || (a.getAttribute('href') || '').includes('galerie'))) {
        const galleryLink = anchor.cloneNode(true);
        galleryLink.textContent = 'Galerie';
        galleryLink.href = prefix + '#galerie';
        const currentBlog = Array.from(container.querySelectorAll('a')).find(a => (a.textContent || '').trim().toLowerCase() === 'blog') || anchor;
        currentBlog.parentNode.insertBefore(galleryLink, currentBlog.nextSibling);
      }

      // 3. O nás
      if (!links.some(a => (a.textContent || '').trim().toLowerCase() === 'o nás' || (a.getAttribute('href') || '').includes('o-nas'))) {
        const aboutLink = anchor.cloneNode(true);
        aboutLink.textContent = 'O nás';
        aboutLink.href = prefix + '#o-nas';
        const currentGallery = Array.from(container.querySelectorAll('a')).find(a => (a.textContent || '').trim().toLowerCase() === 'galerie') || anchor;
        currentGallery.parentNode.insertBefore(aboutLink, currentGallery.nextSibling);
      }
    });
  };

  patchNavContainers();
  // Re-run on click of hamburger toggles & ensure 'X' icon is visible on open drawer
  document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('.nav-mobile-toggle, header button.lg\\:hidden, #nav-toggle');
    if (toggleBtn) {
      const headerEl = toggleBtn.closest('header') || document.querySelector('header');
      const drawerEl = document.getElementById('nav-drawer') || document.querySelector('.nav-mobile-drawer') || document.querySelector('header div.lg\\:hidden');

      setTimeout(() => {
        const isOpen = toggleBtn.classList.contains('open') || (drawerEl && (drawerEl.classList.contains('open') || drawerEl.classList.contains('active') || drawerEl.style.display === 'flex' || drawerEl.style.display === 'block'));
        toggleBtn.classList.toggle('open', isOpen);
        if (headerEl) headerEl.classList.toggle('menu-open', isOpen);

        // SVG transformation to Close 'X' icon
        const svg = toggleBtn.querySelector('svg');
        if (svg) {
          if (isOpen) {
            svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" stroke="currentColor"></path>';
          } else {
            svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16" stroke="currentColor"></path>';
          }
        }
      }, 10);

      setTimeout(patchNavContainers, 50);
      setTimeout(patchNavContainers, 200);
    }
  });

  // Helper: Auto-close mobile menu drawer safely on link / section selection (Non-recursive & ultra-fast)
  let isClosingMenu = false;
  const closeMobileMenu = () => {
    if (isClosingMenu) return;
    isClosingMenu = true;

    try {
      // 1. Hide open mobile menu containers cleanly
      const menuContainers = document.querySelectorAll('header div.lg\\:hidden.border-t, header div.space-y-1, .mobile-menu, .nav-mobile-drawer');
      menuContainers.forEach(el => {
        el.style.display = 'none';
        el.classList.remove('open', 'active', 'show', 'drawer-open');
      });
      document.querySelectorAll('header, .nav-mobile-toggle, #nav-toggle, header button.lg\\:hidden').forEach(el => {
        el.classList.remove('menu-open', 'open');
        const svg = el.querySelector('svg');
        if (svg) {
          svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16" stroke="currentColor"></path>';
        }
      });

      // 2. Dispatch Keyboard Escape event for modal/sheet closing (non-clicking)
      const escEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        bubbles: true,
        cancelable: true
      });
      document.dispatchEvent(escEvent);

      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
    } catch (err) {
      console.warn('Mobile menu close:', err);
    } finally {
      setTimeout(() => {
        isClosingMenu = false;
      }, 300);
    }
  };

  window.nnf_closeMobileMenu = closeMobileMenu;

  // STRV Capture-Phase Event Delegation for navbar CTA buttons ("Spočítat cenu")
  document.addEventListener('click', (e) => {
    const btn = e.target && e.target.closest ? e.target.closest('.nav-cta-desktop, .drawer-cta, .cta-btn-primary, header a[href*="kalkulacka"], header a[href*="poptavka"], header button.bg-amber-500, header a.bg-amber-500, header button.bg-primary, header a.bg-primary') : null;
    let isCta = !!btn;

    if (!isCta && e.target && e.target.closest) {
      const headerBtn = e.target.closest('header button, header a, .nav-mobile-drawer a, .nav-mobile-drawer button');
      if (headerBtn) {
        const text = (headerBtn.textContent || '').trim().toLowerCase();
        if (text.includes('spočítat') || text.includes('spočítejte') || text.includes('poptávk') || text.includes('nezávazn')) {
          if (!text.includes('služby') && !text.includes('reference') && !text.includes('blog') && !text.includes('galerie') && !text.includes('o nás') && !text.includes('kontakt')) {
            isCta = true;
          }
        }
      }
    }

    if (isCta) {
      e.preventDefault();
      // Use stopImmediatePropagation to prevent second capture handler from double-calling scrollToKalkulacka
      e.stopImmediatePropagation();
      // Close mobile menu if open
      if (typeof closeMobileMenu === 'function') {
        closeMobileMenu();
      } else if (window.nnf_closeMobileMenu) {
        window.nnf_closeMobileMenu();
      }
      if (window.scrollToKalkulacka) {
        window.scrollToKalkulacka(e);
      } else {
        window.location.href = '/#kalkulacka';
      }
    }
  }, true);


  // STRV Staff Engineer Capture-Phase Listener: Instant 0ms modal opening for "O nás" (Prevents page reloads & delays)
  document.addEventListener('click', (e) => {
    const link = e.target && e.target.closest ? e.target.closest('a, button, [role="button"]') : null;
    if (link) {
      const href = (link.getAttribute('href') || '').toLowerCase();
      const text = (link.textContent || '').trim().toLowerCase();
      if (href.includes('o-nas') || href.includes('o-nas.html') || href === '#about' || href === '#o-nas' || text === 'o nás' || text.includes('o nás')) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        if (typeof window.openAboutUsModal === 'function') {
          window.openAboutUsModal();
        } else if (typeof window.nnf_openAboutUs === 'function') {
          window.nnf_openAboutUs();
        }
        return;
      }
    }
  }, true);

  // STRV Fast Listener: Logo Click -> Instant Smooth Scroll to Top (or Home)
  document.addEventListener('click', (e) => {
    const logoLink = e.target && e.target.closest ? e.target.closest('header a[href="/"], header a[href="/index.html"], header a.nav-logo-link, footer a[href="/"], .nav-logo-img') : null;
    if (logoLink) {
      const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname === '';
      if (isHomePage) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, true);

  // 6. Active link state & smooth scroll for in-page anchors & CTA buttons
  document.addEventListener('click', (e) => {
    let btn = e.target.closest('a, button, [role="button"], .nav-cta-desktop, .drawer-cta');

    // STRV Fallback 1: If click was within bounding box of header CTA button (prevents overlay deadzones)
    if (!btn && e.target.closest('header')) {
      const ctaEl = document.querySelector('header .nav-cta-desktop, .drawer-cta, header button.bg-primary, header a.bg-primary');
      if (ctaEl && typeof ctaEl.getBoundingClientRect === 'function') {
        const rect = ctaEl.getBoundingClientRect();
        if (e.clientX >= rect.left - 6 && e.clientX <= rect.right + 6 && e.clientY >= rect.top - 6 && e.clientY <= rect.bottom + 6) {
          btn = ctaEl;
        }
      }
    }

    // STRV Fallback 2: Bounding box hit-test for Hero Section CTA button ("Spočítejte si cenu")
    if (!btn || (btn && !btn.getAttribute('href') && !btn.onclick)) {
      const heroCta = document.querySelector('main section:first-of-type button.bg-primary, main section:first-of-type a.bg-primary, [class*="hero"] button.bg-primary, [class*="hero"] a.bg-primary, #root section button.bg-primary');
      if (heroCta && typeof heroCta.getBoundingClientRect === 'function') {
        const rect = heroCta.getBoundingClientRect();
        if (e.clientX >= rect.left - 5 && e.clientX <= rect.right + 5 && e.clientY >= rect.top - 5 && e.clientY <= rect.bottom + 5) {
          btn = heroCta;
        }
      }
    }
    if (!btn) return;

    const text = (btn.textContent || '').trim().toLowerCase();
    const href = (btn.getAttribute('href') || '').toLowerCase();
    const isNavOrFooter = !!btn.closest('header, nav, footer, .nav-mobile-drawer, .top-info-bar-inner, [role="dialog"], header div.lg\\:hidden');
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname === '';

    // Auto-close mobile drawer if clicking a link/button inside mobile menu/header
    const isMobileNavContainer = !!btn.closest('header div.lg\\:hidden, nav, [role="dialog"], [data-state="open"], .nav-mobile-drawer');
    const isHamburgerToggle = (btn.classList.contains('lg:hidden') || btn.classList.contains('nav-mobile-toggle')) && !btn.closest('header div.lg\\:hidden a');

    if (isMobileNavContainer && !isHamburgerToggle && (btn.tagName === 'A' || href.length > 0 || btn.closest('header div.lg\\:hidden, [role="dialog"], nav'))) {
      closeMobileMenu();
    }

    // Do NOT intercept inner clicks on blog cards/modals unless it's a nav/footer link
    if (!isNavOrFooter && btn.closest('#blog-modal-overlay, .blog-card-modern, .gallery-modal')) return;

    // 0. "O nás" link -> otevírá modal O nás okamžitě (0ms latence) na hlavní straně i na podstránkách služeb
    if (href.includes('o-nas') || text.includes('o nás')) {
      e.preventDefault();
      if (typeof window.openAboutUsModal === 'function') {
        window.openAboutUsModal();
      } else if (typeof window.nnf_openAboutUs === 'function') {
        window.nnf_openAboutUs();
      } else {
        import('./about-us.js').then(m => {
          if (m && m.openAboutUsModal) {
            m.openAboutUsModal();
          } else if (window.openAboutUsModal) {
            window.openAboutUsModal();
          }
        }).catch(() => {
          window.location.href = '/#o-nas';
        });
      }
      return;
    }

    // 0.1 Pokud jsme na podstránce (např. /sluzby/cisteni-strech), odkazy v navigaci a patce přesměrují na sekce na hlavní straně.
    // POZOR: Odkazy na konkrétní podstránky služeb (např. /sluzby/cisteni-strech) MUSÍ normálně proklikávat!
    if (!isHomePage && isNavOrFooter) {
      const cleanHref = href.replace(/\/$/, '');
      const isSpecificServiceLink = /^\/?sluzby\/[a-z0-9-]+$/i.test(cleanHref) && !cleanHref.endsWith('/sluzby') && !cleanHref.endsWith('/#sluzby');

      if (!isSpecificServiceLink && (href === '/#sluzby' || href === '#sluzby' || href === '/sluzby' || href === '/sluzby/' || text === 'služby')) {
        e.preventDefault();
        window.location.href = '/#sluzby';
        return;
      }
      if (isSpecificServiceLink) {
        // Allow normal browser navigation to the specific service subpage
        return;
      }
      if (href.includes('kalkulacka') || text.includes('konfigurát') || text.includes('spočítat') || text.includes('spočítejte') || text.includes('poptávk')) {
        e.preventDefault();
        const hasLocalCalc = document.getElementById('kalkulacka') || document.querySelector('.hero-calc-card') || document.querySelector('#m-form');
        if (hasLocalCalc) {
          window.scrollToKalkulacka(e);
        } else {
          window.location.href = '/#kalkulacka';
        }
        return;
      }
      if (href.includes('realizace') || href.includes('reference') || text === 'reference' || text === 'realizace') {
        e.preventDefault();
        window.location.href = '/#reference';
        return;
      }
      if (href.includes('blog') || text === 'blog') {
        e.preventDefault();
        window.location.href = '/#blog';
        return;
      }
      if (href.includes('galerie') || text === 'galerie') {
        e.preventDefault();
        window.location.href = '/#galerie';
        return;
      }
      if (href.includes('kontakt') || text === 'kontakt') {
        e.preventDefault();
        window.location.href = '/#kontakt';
        return;
      }
    }

    // 1. "Reference" / "Realizace" link -> MUST scroll smoothly to #reference / #realizace on 1st click
    if (href.includes('realizace') || href.includes('reference') || text === 'reference' || text === 'realizace') {
      e.preventDefault();
      const performRefScroll = () => {
        const refEl = document.getElementById('reference') || document.getElementById('realizace') || document.getElementById('realizace-sec') || document.getElementById('recenze');
        if (refEl && typeof refEl.getBoundingClientRect === 'function') {
          const topOffset = Math.round(refEl.getBoundingClientRect().top + window.pageYOffset - 90);
          window.scrollTo({ top: topOffset, behavior: 'smooth' });
        } else {
          window.location.href = '/#reference';
        }
      };
      performRefScroll();
      return;
    }

    // A. "Prozkoumat služby" button -> MUST scroll to #sluzby
    if (text.includes('prozkoumat') || href === '#sluzby' || btn.dataset.heroBtnType === 'sluzby') {
      const sluzbyEl = document.getElementById('sluzby') || document.getElementById('sluzby-sec');
      if (sluzbyEl) {
        e.preventDefault();
        const topOffset = Math.round(sluzbyEl.getBoundingClientRect().top + window.pageYOffset - 90);
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
        return;
      }
    }

    // B. "Spočítejte si cenu" / "Spočítejte si to" / Konfigurátor / Poptávka / Zadat poptávku -> MUST scroll to #kalkulacka
    if (href.includes('#kalkulacka') || href === '/poptavka' || text.includes('spočítejte') || text.includes('spočítat') || text.includes('kalkul') || text.includes('poptávk') || text.includes('nezávazná') || btn.dataset.heroCtaPatched === 'true' || btn.dataset.heroBtnType === 'kalkulacka' || btn.classList.contains('nav-cta-desktop') || btn.classList.contains('drawer-cta') || btn.classList.contains('bg-primary')) {
      e.preventDefault();
      window.scrollToKalkulacka(e);
      return;
    }

    // C. Other hash links
    const hashIdx = href.indexOf('#');
    if (hashIdx !== -1) {
      const hash = href.substring(hashIdx + 1);
      if (hash) {
        let targetEl = document.getElementById(hash);
        if (!targetEl) {
          if (hash === 'realizace' || hash === 'reference' || hash === 'recenze') {
            targetEl = document.getElementById('reference') || document.getElementById('realizace') || document.getElementById('realizace-sec') || document.getElementById('recenze');
          } else if (hash === 'sluzby') {
            targetEl = document.getElementById('sluzby') || document.getElementById('sluzby-sec');
          } else if (hash === 'o-nas' || hash === 'o-nas-sec') {
            targetEl = document.getElementById('o-nas-sec') || document.getElementById('o-nas');
          }
        }

        if (targetEl && typeof targetEl.getBoundingClientRect === 'function') {
          e.preventDefault();
          const topOffset = Math.round(targetEl.getBoundingClientRect().top + window.pageYOffset - 90);
          window.scrollTo({ top: topOffset, behavior: 'smooth' });
          return;
        }
      }
    }
  }, true);

  const currentPath = window.location.pathname;
  document.querySelectorAll('header nav a').forEach(a => {
    if (a.getAttribute('href') === currentPath || (currentPath === '/' && a.getAttribute('href') === '/')) {
      a.classList.add('active-link');
    } else {
      a.classList.remove('active-link');
    }
  });

  // 7. Footer Updates
  const footer = document.querySelector('footer');
  if (footer && !footer.dataset.patched) {
    footer.classList.remove('bg-neutral-900', 'bg-slate-900');

    // Update IČO & Footer Links
    const footerTexts = footer.querySelectorAll('p.text-xs.text-neutral-500');
    footerTexts.forEach(p => {
      if (p.textContent.includes('IČ:')) {
        p.innerHTML = `IČ: 29375363 | 
          <a href="/obchodni-podminky" style="color: #94a3b8; text-decoration: underline;">Obchodní podmínky</a> | 
          <a href="/gdpr" style="color: #94a3b8; text-decoration: underline;">GDPR</a> | 
          <a href="https://eshop-nanofusion.cz" target="_blank" rel="noopener noreferrer" class="footer-eshop-link" style="color: #f59e0b; font-weight: 700; text-decoration: underline;">E-shop</a> | 
          <a href="https://nanofusion-j3bs.vercel.app/admin/login" class="footer-admin-link">Zaměstnanci</a> | 
          <a href="https://www.aerisq.tech" target="_blank" rel="noopener noreferrer" class="footer-created-link" style="color: #94a3b8; text-decoration: none; font-weight: 600;">Created by 💚</a>`;
      }
    });

    // Update Tagline
    footer.querySelectorAll('p.text-sm.text-neutral-400, p').forEach(p => {
      if (!p.dataset.brUpdated && (p.textContent.includes('Od roku 2012') || p.textContent.includes('13 let') || p.textContent.includes('12 let') || p.textContent.includes('pečujeme o váš majetek'))) {
        p.innerHTML = 'Profesionální čištění, impregnace a nátěry.<br>Již 14 let pečujeme o váš majetek po celé ČR.';
        p.style.color = '#94a3b8';
        p.dataset.brUpdated = 'true';
      }
    });

    // Transform Social Links
    const existingSocial = Array.from(footer.querySelectorAll('a')).find(a =>
      a.href.includes('facebook.com') || a.href.includes('instagram.com') || a.href.includes('linkedin.com')
    );
    const socialContainer = existingSocial ? existingSocial.parentElement : null;

    // Inject TikTok if missing
    if (socialContainer && !socialContainer.querySelector('a[href*="tiktok"]')) {
      const tiktokLink = document.createElement('a');
      tiktokLink.href = 'https://www.tiktok.com/@nano_fusion_cz';
      tiktokLink.target = '_blank';
      socialContainer.appendChild(tiktokLink);
    }

    footer.querySelectorAll('a').forEach(link => {
      if (link.dataset.iconized) return;
      const h = link.href.toLowerCase();
      if (h.includes('facebook') || h.includes('instagram') || h.includes('linkedin') || h.includes('youtube') || h.includes('tiktok')) {
        link.style.display = 'inline-flex';
        link.style.alignItems = 'center';
        link.style.justifyContent = 'center';
        link.style.width = '44px';
        link.style.height = '44px';
        link.style.borderRadius = '12px';
        link.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        link.style.color = 'white';
        link.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        link.style.marginRight = '8px';
        link.style.opacity = '1';

        let iconSvg = '';
        if (link.href.includes('facebook')) {
          link.href = 'https://www.facebook.com/nanofusioncz';
          iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`;
        } else if (link.href.includes('instagram')) {
          link.href = 'https://www.instagram.com/nano_fusion_cz/';
          iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`;
        } else if (link.href.includes('linkedin')) {
          link.href = 'https://www.linkedin.com/company/nanofusion/';
          iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`;
        } else if (link.href.includes('youtube')) {
          link.href = 'https://www.youtube.com/channel/UCBX5e_PVDcAKmurD9GsdYSA';
          iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>`;
        } else if (link.href.includes('tiktok')) {
          link.href = 'https://www.tiktok.com/@nano_fusion_cz';
          iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>`;
        }

        link.innerHTML = iconSvg;
        link.dataset.iconized = 'true';
      }
    });

    // Transform Footer Headings & Map
    const footerHeadings = Array.from(footer.querySelectorAll('h3, h4, p.font-bold'));
    const servicesHeading = footerHeadings.find(h => h.textContent.includes('Služby'));
    const contactHeading = footerHeadings.find(h => h.textContent.includes('Kontakt'));

    if (servicesHeading) {
      servicesHeading.style.color = '#f59e0b';
      servicesHeading.style.fontWeight = '800';
    }

    if (contactHeading) {
      contactHeading.style.color = '#f59e0b';
      contactHeading.style.fontWeight = '800';

      const contactCol = contactHeading.parentElement;
      if (contactCol && !contactCol.querySelector('.footer-map-container')) {
        const mapContainer = document.createElement('div');
        mapContainer.className = 'footer-map-container';
        mapContainer.style.marginTop = '1.5rem';
        mapContainer.style.borderRadius = '1rem';
        mapContainer.style.overflow = 'hidden';
        mapContainer.style.border = '2px solid #f59e0b';
        mapContainer.style.height = '200px';
        mapContainer.style.position = 'relative';
        mapContainer.innerHTML = `
          <iframe 
            src="https://www.google.com/maps?q=NANOfusion%20s.r.o.,%20Blučina&output=embed" 
            width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy">
          </iframe>
          <div style="position: absolute; inset: 0; background: transparent; cursor: pointer;" onclick="window.open('https://www.google.com/maps?q=NANOfusion+s.r.o.,+Blučina', '_blank')"></div>
        `;
        contactCol.appendChild(mapContainer);
      }
    }

    footer.dataset.patched = 'true';
  }

  // 8. Experience Stats
  document.querySelectorAll('div, p, span, h2, h3, h4').forEach(el => {
    if (el.children.length === 0 && !el.dataset.statPatched) {
      if (el.textContent.includes('12 let zkušeností') || el.textContent.includes('13 let zkušeností')) {
        el.textContent = el.textContent.replace('12 let zkušeností', '14 let zkušeností').replace('13 let zkušeností', '14 let zkušeností');
        el.dataset.statPatched = 'true';
      }
      if ((el.textContent.trim() === '12' || el.textContent.trim() === '13') && el.nextElementSibling && el.nextElementSibling.textContent.includes('Let zkušeností')) {
        el.textContent = '14';
        el.dataset.statPatched = 'true';
      }
    }
  });

  // 9. Gallery Section Injection
  const referenceSection = document.getElementById('reference');
  if (referenceSection && !document.getElementById('galerie')) {
    injectGallery();
  }

  // 10. Footer Services Transform
  const servicesHeading = Array.from(document.querySelectorAll('footer h3, footer h4, footer p.font-bold')).find(h => h.textContent.includes('Služby'));
  if (servicesHeading && !servicesHeading.dataset.finalized) {
    finalizeServices(servicesHeading);
  }
};

const finalizeServices = (heading) => {
  heading.style.color = '#f59e0b';
  heading.style.fontWeight = '800';
  const servicesUl = heading.parentElement.querySelector('ul');
  if (servicesUl && !servicesUl.dataset.finalized) {
    const serviceItems = [
      { id: 'facade', name: 'Čištění fasád' },
      { id: 'roof', name: 'Čištění střech' },
      { id: 'pavement', name: 'Čištění dlažeb' },
      { id: 'pv', name: 'Solární panely' },
      { id: 'graffiti', name: 'Odstranění graffiti' },
      { id: 'industrial', name: 'Průmyslové čištění' },
      { id: 'facade-paint', name: 'Nátěry fasád' },
      { id: 'roof-paint', name: 'Nátěry střech' },
      { id: 'antislip', name: 'Protiskluzová úprava' },
      { id: 'ceramfloor', name: 'IG CeramFloor' },
      { id: 'antibac', name: 'Antibakteriální ochrana' }
    ];

    servicesUl.innerHTML = '';
    servicesUl.className = 'space-y-4';

    serviceItems.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = item.name;
      a.className = 'footer-service-link';
      a.style.cssText = 'color:#94a3b8; font-weight:400; font-size:0.9rem; transition:all 0.3s ease; display:block; opacity:0.8;';

      a.onclick = (e) => {
        e.preventDefault();
        if (window.nnf_openService) {
          window.nnf_openService(item.id);
        } else {
          const cards = Array.from(document.querySelectorAll('#sluzby h3, #sluzby h4'));
          const card = cards.find(c => c.textContent.toLowerCase().includes(item.name.toLowerCase()));
          if (card) card.click();
        }
      };

      a.onmouseenter = () => { a.style.transform = 'translateX(8px)'; a.style.opacity = '1'; a.style.color = '#f59e0b'; };
      a.onmouseleave = () => { a.style.transform = 'translateX(0)'; a.style.opacity = '0.8'; a.style.color = '#94a3b8'; };

      li.appendChild(a);
      servicesUl.appendChild(li);
    });
    servicesUl.dataset.finalized = 'true';
    heading.dataset.finalized = 'true';
  }
};

let galleryItems = [];

const syncGalleryData = async () => {
  try {
    const { supabase } = await import('./supabase-config.js');
    const { data, error } = await supabase
      .from('realizations')
      .select('*, realization_photos(*)')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    galleryItems = data || [];
    console.log(`NANOfusion: Sync completed. Loaded ${galleryItems.length} realizations.`);

    // Debug: Check if photos are present
    galleryItems.forEach(item => {
      const photoCount = item.realization_photos ? item.realization_photos.length : 0;
      if (photoCount > 0) {
        console.log(`Item "${item.title}" has ${photoCount} photos.`);
      }
    });

    renderGalleryContent();
  } catch (e) {
    console.warn('NANOfusion: Gallery sync failed', e);
  }
};

const renderGalleryContent = () => {
  const scroller = document.getElementById('gallery-scroller-inner');
  if (!scroller) return;

  if (galleryItems.length === 0) {
    scroller.innerHTML = '<p style="color: #94a3b8; padding: 2rem;">Zatím zde nejsou žádné realizace.</p>';
    return;
  }

  scroller.innerHTML = galleryItems.map(item => {
    const mainImg = item.realization_photos?.[0]?.url || item.image_url || 'https://images.unsplash.com/photo-1635339001328-8007ebfd4a60?w=800';
    return `
      <div class="gallery-item-v" onclick="window.nnf_openGallery('${item.id}')" style="flex: 0 0 450px; background: #0f172a; border-radius: 2rem; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); cursor: pointer; transition: all 0.3s ease; border: 1px solid rgba(255,255,255,0.05); position: relative; user-select: none;">
          <!-- Click Capture Overlay -->
          <div style="position: absolute; inset: 0; z-index: 10; cursor: pointer;"></div>
          
          <div style="height: 250px; position: relative;">
              <img src="${mainImg}" style="width: 100%; height: 100%; object-fit: cover;">
              ${item.youtube_id ? `<div style="position: absolute; inset: 0; background: rgba(15, 23, 42, 0.4); display: flex; align-items: center; justify-content: center;">
                  <div style="width: 60px; height: 60px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white;">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </div>
              </div>` : ''}
          </div>
          <div style="padding: 2rem;">
              <div style="color: #f59e0b; font-weight: 800; font-size: 0.75rem; letter-spacing: 0.1em; margin-bottom: 0.5rem; text-transform: uppercase;">${item.work_type || 'Realizace'}</div>
              <h3 style="color: white; font-weight: 800; font-size: 1.25rem; margin-bottom: 1rem;">${item.title}</h3>
              <div style="color: #94a3b8; font-size: 0.875rem; line-height: 1.6;">${(item.description || '').substring(0, 100).replace(/<[^>]*>?/gm, '')}...</div>
          </div>
      </div>
    `;
  }).join('');
};

window.nnf_switchModalMedia = (url, isVideo = false, youtubeId = null) => {
  const container = document.getElementById('modal-media-content');
  const viewport = document.getElementById('modal-media-viewport');
  if (!container) return;

  // Visual feedback: border on thumbnails
  const thumbs = document.querySelectorAll('.modal-thumb-item');
  thumbs.forEach(t => {
    // Check if thumbnail matches youtube video or photo url
    const isYoutubeThumb = t.getAttribute('onclick')?.includes('true');
    if (isVideo && youtubeId && isYoutubeThumb) {
      t.style.borderColor = '#f59e0b';
    } else if (!isVideo && t.dataset.photoUrl === url) {
      t.style.borderColor = '#f59e0b';
    } else {
      t.style.borderColor = 'transparent';
    }
  });

  if (isVideo && youtubeId) {
    container.innerHTML = `
      <div style="aspect-ratio: 16/9; width: 100%; height: 100%;">
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>`;
  } else {
    container.innerHTML = `
      <img src="${window.nnf_optimizeImage(url, 1080)}" style="width:100%; height:100%; object-fit:cover; animation: fadeIn 0.5s ease;">`;
  }

  // Update current index based on select
  if (window.nnf_currentGalleryMedia) {
    window.nnf_currentGalleryIndex = window.nnf_currentGalleryMedia.findIndex(m =>
      (isVideo && m.isVideo && m.youtubeId === youtubeId) || (!isVideo && !m.isVideo && m.url === url)
    );
  }

  // Scroll to top of modal if needed
  if (viewport) {
    const modalBody = viewport.closest('div[style*="overflow-y:auto"]');
    if (modalBody) modalBody.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

window.nnf_prevGalleryMedia = (e) => {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  if (!window.nnf_currentGalleryMedia || window.nnf_currentGalleryMedia.length <= 1) return;
  window.nnf_currentGalleryIndex = (window.nnf_currentGalleryIndex - 1 + window.nnf_currentGalleryMedia.length) % window.nnf_currentGalleryMedia.length;
  const item = window.nnf_currentGalleryMedia[window.nnf_currentGalleryIndex];
  window.nnf_switchModalMedia(item.url, item.isVideo, item.youtubeId);
};

window.nnf_nextGalleryMedia = (e) => {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  if (!window.nnf_currentGalleryMedia || window.nnf_currentGalleryMedia.length <= 1) return;
  window.nnf_currentGalleryIndex = (window.nnf_currentGalleryIndex + 1) % window.nnf_currentGalleryMedia.length;
  const item = window.nnf_currentGalleryMedia[window.nnf_currentGalleryIndex];
  window.nnf_switchModalMedia(item.url, item.isVideo, item.youtubeId);
};

window.nnf_openGallery = (id) => {
  const item = galleryItems.find(g => String(g.id) === String(id));
  if (!item) return;

  let overlay = document.getElementById('gallery-modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'gallery-modal-overlay';
    overlay.style.cssText = 'position:fixed; inset:0; background:rgba(15,23,42,0.98); backdrop-filter:blur(20px); z-index:9999999; display:none; align-items:center; justify-content:center; padding:20px;';
    document.body.appendChild(overlay);
  }

  const photos = item.realization_photos || [];
  const mainImg = window.nnf_optimizeImage(photos[0]?.url || item.image_url || 'https://images.unsplash.com/photo-1635339001328-8007ebfd4a60?w=1200', 1080);

  // Build list of all media items in correct index order
  const mediaItems = [];
  if (item.youtube_id) {
    mediaItems.push({ isVideo: true, youtubeId: item.youtube_id, url: '' });
  }
  if (photos.length > 0) {
    photos.forEach(p => {
      mediaItems.push({ isVideo: false, youtubeId: null, url: p.url });
    });
  } else if (item.image_url) {
    mediaItems.push({ isVideo: false, youtubeId: null, url: item.image_url });
  }

  window.nnf_currentGalleryMedia = mediaItems;
  window.nnf_currentGalleryIndex = 0;

  overlay.innerHTML = `
    <div style="background:white; width:100%; max-width:1000px; max-height:95vh; border-radius:32px; overflow:hidden; display:flex; flex-direction:column; position:relative; box-shadow:0 30px 100px rgba(0,0,0,0.5); z-index:10000000;">
      <button onclick="document.getElementById('gallery-modal-overlay').style.display='none'" style="position:absolute; top:20px; right:20px; background:rgba(255,255,255,0.9); border:none; width:44px; height:44px; border-radius:50%; cursor:pointer; font-size:24px; z-index:101; font-weight:bold; box-shadow:0 4px 15px rgba(0,0,0,0.1);">&times;</button>
      
      <div style="flex: 1; overflow-y:auto; padding-bottom: 40px;">
        <div id="modal-media-viewport" style="background: #000; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center;">
          
          <!-- Navigation arrows inside the image container -->
          ${mediaItems.length > 1 ? `
            <button onclick="window.nnf_prevGalleryMedia(event)" style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); z-index: 10; width: 48px; height: 48px; border-radius: 50%; background: rgba(15, 23, 42, 0.6); border: none; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='rgba(245, 158, 11, 0.9)'" onmouseout="this.style.background='rgba(15, 23, 42, 0.6)'">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg>
            </button>
            <button onclick="window.nnf_nextGalleryMedia(event)" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); z-index: 10; width: 48px; height: 48px; border-radius: 50%; background: rgba(15, 23, 42, 0.6); border: none; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='rgba(245, 158, 11, 0.9)'" onmouseout="this.style.background='rgba(15, 23, 42, 0.6)'">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg>
            </button>
          ` : ''}

          <!-- Media content container -->
          <div id="modal-media-content" style="height:500px; width: 100%; display: block; overflow: hidden; position: relative;">
            ${item.youtube_id
      ? `<div style="aspect-ratio: 16/9; width: 100%; height: 100%;">
                  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${item.youtube_id}?autoplay=1" frameborder="0" allow="autoplay; fullscreen; encrypted-media" allowfullscreen style="border:0;"></iframe>
                 </div>`
      : `<img src="${mainImg}" style="width:100%; height:100%; object-fit:cover;">`
    }
          </div>
        </div>
        
        <div style="padding:40px; background:white;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 300px;">
              <div style="color:#f59e0b; font-weight:800; text-transform:uppercase; font-size:13px; margin-bottom:12px; letter-spacing:0.15em;">Realizace • ${item.work_type || 'NANO-OCHRANA'}</div>
              <h2 style="font-size:32px; font-weight:900; color:#0f172a; line-height:1.1; margin-bottom:16px; letter-spacing:-0.03em;">${item.title}</h2>
              <div style="display: flex; gap: 12px; margin-bottom: 24px;">
                ${item.location ? `<span style="background:#f1f5f9; padding:6px 12px; border-radius:8px; font-size:12px; font-weight:700; color:#64748b;">📍 ${item.location}</span>` : ''}
                ${item.duration ? `<span style="background:#f1f5f9; padding:6px 12px; border-radius:8px; font-size:12px; font-weight:700; color:#64748b;">⏱ ${item.duration}</span>` : ''}
              </div>
            </div>
          </div>
 
          <div style="font-size:17px; line-height:1.7; color:#334155; margin-bottom:30px;">${item.description || ''}</div>
          
          <div style="margin-bottom: 40px;">
            <h4 style="font-size:12px; font-weight:800; color:#94a3b8; text-transform:uppercase; margin-bottom:16px; letter-spacing:0.1em;">Galerie & Video</h4>
            <div id="modal-thumbnails-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(120px, 1fr)); gap:12px;">
              ${item.youtube_id ? `
                <div onclick="window.nnf_switchModalMedia('', true, '${item.youtube_id}')" style="aspect-ratio:1; border-radius:12px; overflow:hidden; cursor:pointer; border:2px solid #f59e0b; position:relative;" class="modal-thumb-item">
                  <img src="https://img.youtube.com/vi/${item.youtube_id}/0.jpg" style="width:100%; height:100%; object-fit:cover; opacity:0.6;">
                  <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:white;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              ` : ''}
              ${photos.map((p, idx) => `
                <div onclick="window.nnf_switchModalMedia('${p.url}')" data-photo-url="${p.url}" style="aspect-ratio:1; border-radius:12px; overflow:hidden; cursor:pointer; border:2px solid ${idx === 0 && !item.youtube_id ? '#f59e0b' : 'transparent'}; transition:all 0.2s;" class="modal-thumb-item">
                  <img src="${window.nnf_optimizeImage(p.url, 256)}" style="width:100%; height:100%; object-fit:cover;">
                </div>
              `).join('')}
            </div>
          </div>
 
          <div style="background:#0f172a; padding:32px; border-radius:24px; display:flex; align-items:center; justify-content:space-between; gap:20px; flex-wrap: wrap;">
            <div>
              <div style="font-weight:800; color:white; font-size:20px;">Líbí se vám tento výsledek?</div>
              <div style="color:#94a3b8; font-size:14px;">Napište nám a získejte cenovou nabídku zdarma.</div>
            </div>
            <button disabled style="background:#cbd5e1; color:#94a3b8; border:none; padding:16px 32px; border-radius:16px; font-weight:800; cursor:not-allowed; transition:all 0.3s ease; white-space:nowrap;">
              Nanobot (Již brzy)
            </button>
          </div>
        </div>
      </div>
    </div>
    <style>
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    </style>
  `;
  overlay.style.display = 'flex';
  overlay.onclick = (e) => { if (e.target === overlay) overlay.style.display = 'none'; };
};

const injectGallery = () => {
  let gallerySection = document.getElementById('galerie');
  const referenceSection = document.getElementById('reference');
  if (!gallerySection && referenceSection) {
    gallerySection = document.createElement('section');
    gallerySection.id = 'galerie';
    gallerySection.className = 'pt-24 pb-32 bg-white relative overflow-hidden';
    // Anchor after #blog when it's already been injected (blog.js races this
    // same insertion point independently), otherwise right after #reference.
    // Keeps the Reference -> Blog -> Galerie order stable regardless of
    // which async injector wins the race.
    const blogSection = document.getElementById('blog');
    const anchor = blogSection && blogSection.parentNode === referenceSection.parentNode
      ? blogSection
      : referenceSection;
    anchor.parentNode.insertBefore(gallerySection, anchor.nextSibling);

    gallerySection.innerHTML = `
      <div class="container mx-auto px-4">
          <div class="text-center mb-16">
              <h2 class="text-3xl md:text-5xl font-bold mb-6 font-heading" style="color: #f59e0b; margin-top: 3rem;">Špičková péče o váš majetek v detailech</h2>
              <div class="w-20 h-1 bg-amber-500 mx-auto rounded-full"></div>
          </div>
      </div>

        <div style="position: relative; width: 100%; max-width: 1400px; margin: 0 auto;" class="group">
          <button id="gallery-prev" 
            class="hidden md:flex gallery-arrow left"
            style="position: absolute !important; left: -25px !important; top: 50% !important; transform: translateY(-50%) !important; z-index: 100 !important; width: 60px !important; height: 60px !important; border-radius: 50% !important; background: #f59e0b !important; border: none !important; cursor: pointer !important; align-items: center !important; justify-content: center !important; box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3) !important; transition: all 0.3s ease !important; padding: 0 !important;"
            onmouseover="this.style.scale='1.1'; this.style.backgroundColor='#d97706';"
            onmouseout="this.style.scale='1'; this.style.backgroundColor='#f59e0b';"
          > 
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white !important" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="stroke: white !important; display: block !important; margin: auto !important;"><path d="M15 18l-6-6 6-6"></path></svg> 
          </button>
          
          <button id="gallery-next" 
            class="hidden md:flex gallery-arrow right"
            style="position: absolute !important; right: -25px !important; top: 50% !important; transform: translateY(-50%) !important; z-index: 100 !important; width: 60px !important; height: 60px !important; border-radius: 50% !important; background: #f59e0b !important; border: none !important; cursor: pointer !important; align-items: center !important; justify-content: center !important; box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3) !important; transition: all 0.3s ease !important; padding: 0 !important;"
            onmouseover="this.style.scale='1.1'; this.style.backgroundColor='#d97706';"
            onmouseout="this.style.scale='1'; this.style.backgroundColor='#f59e0b';"
          > 
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white !important" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="stroke: white !important; display: block !important; margin: auto !important;"><path d="M9 18l6-6-6-6"></path></svg> 
          </button>

        <div id="gallery-scroller-inner" style="display: flex; gap: 1.5rem; overflow-x: auto; scroll-behavior: smooth; padding: 1rem 0 3rem; -ms-overflow-style: none; scrollbar-width: none; min-height: 400px;">
          <style>
            #gallery-scroller-inner::-webkit-scrollbar { display: none; }
            .gallery-arrow { opacity: 0 !important; pointer-events: none !important; transition: opacity 0.3s ease !important; }
            @media (min-width: 769px) {
                .group:hover .gallery-arrow { opacity: 1 !important; pointer-events: auto !important; }
            }
            @media (max-width: 1200px) and (min-width: 769px) {
                #gallery-prev { left: 10px !important; }
                #gallery-next { right: 10px !important; }
            }
            @media (max-width: 768px) {
                .gallery-arrow, #gallery-prev, #gallery-next { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }
            }
          </style>
          <!-- Načítání dat... -->
        </div>
      </div>
    `;

    if (window.nnf_loadGalleryFromDB) {
      window.nnf_loadGalleryFromDB();
    } else {
      syncGalleryData();
    }

    const scroller = document.getElementById('gallery-scroller-inner');
    const nextBtn = document.getElementById('gallery-next');
    const prevBtn = document.getElementById('gallery-prev');
    let isPaused = false;

    const performJump = (dir) => {
      const jumpAmount = scroller.clientWidth > 1000 ? 474 : 350;
      scroller.scrollBy({ left: dir * jumpAmount, behavior: 'smooth' });
    };

    setInterval(() => {
      if (!isPaused) {
        if (scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 100) {
          scroller.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          performJump(1);
        }
      }
    }, 5000);

    scroller.addEventListener('mouseenter', () => isPaused = true);
    scroller.addEventListener('mouseleave', () => isPaused = false);
    nextBtn.addEventListener('click', () => { performJump(1); isPaused = true; setTimeout(() => isPaused = false, 15000); });
    prevBtn.addEventListener('click', () => { performJump(-1); isPaused = true; setTimeout(() => isPaused = false, 15000); });
  }
};

// --- Execution Engine ---

let isObserving = false;
const domObserver = new MutationObserver(() => {
  if (isObserving) return;
  isObserving = true;
  requestAnimationFrame(() => {
    observeAll();
    isObserving = false;
  });
});

// Initialize preloader state for homepage vs subpages
const isHomepage = window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname.endsWith('/');

window.nnf_preloaderState = {
  titleReady: !isHomepage,
  mediaReady: !isHomepage,
  spaSettled: !isHomepage
};

let nnf_spaSettledAt = 0;
const markSpaSettled = () => {
  if (window.nnf_preloaderState.spaSettled) return;
  window.nnf_preloaderState.spaSettled = true;
  nnf_spaSettledAt = performance.now();
  window.nnf_checkPreloader();
};

// Na homepage čekáme, dokud React SPA nepřevezme stránku po svém mountu.
// Rozlišení SPA renderu od statického fallbacku: SPA při renderu vyprázdní celý #root,
// čímž smaže komentářové markery <!-- SYNC:FALLBACK:... --> (createRoot.render()).
// Dokud marker existuje, stránku drží statický fallback → NEpovažujeme ji za SPA.
if (isHomepage) {
  const rootEl = document.getElementById('root');
  if (rootEl) {
    let settledTimer = null;

    const hasFallbackMarkers = () =>
      Array.from(rootEl.childNodes).some(n =>
        n.nodeType === 8 && /SYNC:FALLBACK/.test(n.data || '')
      );

    const hasRealSpaLayout = () =>
      Array.from(rootEl.children).some(child =>
        child && child.firstElementChild &&
        (child.tagName === 'SECTION' || child.childElementCount >= 2) &&
        !child.querySelector('.animate-spin')
      );

    const spaObserver = new MutationObserver(() => {
      clearTimeout(settledTimer);
      if (!hasFallbackMarkers() && hasRealSpaLayout()) {
        // Krátký debounce: počkáme, než se DOM ustálí (nereagovat na průběžné re-rendery)
        settledTimer = setTimeout(markSpaSettled, 200);
      }
    });
    spaObserver.observe(rootEl, { childList: true, subtree: true });

    // Pojistka: nikdy neoznačíme SPA za "usazené", dokud:
//  (1) v DOM jede celoplošný boot-spinner SPA (.fixed.inset-0 .animate-spin), NEBO
//  (2) statický fallback ještě drží stránku (markery SYNC:FALLBACK přítomny,
//      bundle se teprve stahuje a zatím bychom odhalili statický obsah).
// Jinak SPA visí na spinnersu (pomalé /api) → držíme kryt dál; odhalí se až landing
// (nebo absolutní pojistky 11–12s).
    const spaFallback = setInterval(() => {
      if (window.nnf_preloaderState.spaSettled) { clearInterval(spaFallback); return; }
      const rootNow = document.getElementById('root');
      const fallbackPresent = rootNow && Array.from(rootNow.childNodes).some(n => n.nodeType === 8 && /SYNC:FALLBACK/.test(n.data || ''));
      const fullscreenSpinner = document.querySelector('.fixed.inset-0 .animate-spin, .animate-spin');
      if (!fullscreenSpinner && !fallbackPresent) { clearInterval(spaFallback); markSpaSettled(); }
    }, 600);
  }
}

// Globální "quiet DOM" detekce: pamatujeme čas poslední DOM mutace, abychom odhalili
// stránku až ve chvíli, kdy se obsah skutečně přestal měnit (SPA i naše patche dojely).
// DOM se nesmí měnit 700 ms — jinak bychom odhalili rozjetý obsah.
let nnf_lastDomMutationAt = 0;
new MutationObserver(() => { nnf_lastDomMutationAt = performance.now(); })
  .observe(document.body, { childList: true, subtree: true, attributes: true, characterData: true });

window.nnf_checkPreloader = () => {
  const s = window.nnf_preloaderState;
  const now = performance.now();
  const quietMs = now - nnf_lastDomMutationAt;
  const sinceSpa = nnf_spaSettledAt > 0 ? now - nnf_spaSettledAt : 0;
  const fontsOk = !document.fonts || document.fonts.status !== 'loading';
  // Odhalení řídí ČAS od převzetí SPA (doznění vstupních animací pod krytem),
  // quiet-hlídač jen urychluje, nikdy NEBLOKUJE — jinak může velké mutation churn
  // držet kryt až do krajní pojistky (=> pomalé načítání).
  const ready = s.titleReady && s.mediaReady && s.spaSettled && fontsOk && sinceSpa >= 800;
  if (ready && (quietMs > 450 || sinceSpa >= 2600)) {
    clearPreloader();
  }
};

// Periodické pře-kontrolování (každých 250 ms), dokud preloader existuje:
// SP covers i stavy, kdy žádná událost flagů nepřijde (např. až SPA domaženo po zpoždění).
const preloaderRecheck = setInterval(() => {
  if (!document.getElementById('preloader')) { clearInterval(preloaderRecheck); return; }
  window.nnf_checkPreloader();
}, 250);

// --- TEMP DEBUG: aktivuj přes URL ?dbg=1 (vyžaduje hard reload, zaloguje timeline) ---
if (location.search.includes('dbg')) {
  window.nnf_dbg = { t0: performance.now(), ev: [], lastFlags: null, preGone: false };
  const dbgP = (m) => window.nnf_dbg.ev.push(`+${Math.round(performance.now() - window.nnf_dbg.t0)}ms ${m}`);
  const flagTimer = setInterval(() => {
    const s = window.nnf_preloaderState || {};
    const sig = `title:${!!s.titleReady} media:${!!s.mediaReady} spa:${!!s.spaSettled}`;
    if (sig !== window.nnf_dbg.lastFlags) { window.nnf_dbg.lastFlags = sig; dbgP('flags -> ' + sig); }
  }, 30);
  const preTimer = setInterval(() => {
    const p = document.getElementById('preloader');
    if (p && (p.classList.contains('fade-out') || !p.parentNode) && !window.nnf_dbg.preGone) {
      window.nnf_dbg.preGone = true; dbgP('PRELOADER GONE'); clearInterval(preTimer);
    }
  }, 50);
  let mutCount = 0; const sqlLog = { h1: 0, pref: 0, faq: 0 };
  new MutationObserver((ms) => {
    mutCount++;
    ms.forEach(m => m.addedNodes.forEach(n => {
      if (n.nodeType !== 1 || !n.querySelector) return;
      if (n.querySelector('h1.font-heading')) sqlLog.h1++;
      if (n.querySelector('#reference')) sqlLog.pref++;
      if (n.querySelector('#faq')) sqlLog.faq++;
    }));
  }).observe(document.body, { childList: true, subtree: true });
  setTimeout(() => {
    const root = document.getElementById('root');
    dbgP('dom mutations total: ' + mutCount);
    dbgP('spa fallback markers present: ' + [...(root?.childNodes || [])].some(n => n.nodeType === 8 && /SYNC:FALLBACK/.test(n.data || '')));
    dbgP('root children: ' + (root?.children.length || 0) + ' | first: ' + (root?.firstElementChild?.tagName || 'none') + '.' + (root?.firstElementChild?.className || '').slice(0, 40));
    dbgP('spinner in root: ' + !!(root && root.querySelector('.animate-spin')));
    dbgP('added: #reference x' + sqlLog.pref + ' | #faq x' + sqlLog.faq + ' | h1.font-heading x' + sqlLog.h1);
    dbgP('imgs loaded: ' + [...document.images].filter(i => i.complete).length + '/' + document.images.length);
    const dbgText = window.nnf_dbg.ev.join('\n');
    console.info('[nnf-dbg]\n' + dbgText);
    const out = document.createElement('pre');
    out.id = 'nnf-dbg-out';
    out.textContent = dbgText;
    out.style.cssText = 'position:fixed;top:0;left:0;z-index:1000000;background:#0b1220;color:#4ade80;font:11px/1.5 monospace;white-space:pre-wrap;max-width:100vw;max-height:70vh;overflow:auto;padding:8px;';
    document.body.appendChild(out);
  }, 11000);
}

const clearPreloader = () => {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('fade-out')) {
    preloader.classList.add('fade-out');
    document.body.style.opacity = '1';
    document.body.style.overflow = 'auto';
    setTimeout(() => { if (preloader.parentNode) preloader.remove(); }, 600);
    console.log('NANOfusion: Preloader plynule odstraněn.');
  } else {
    document.body.style.opacity = '1';
    document.body.style.overflow = 'auto';
  }
};

const initApp = () => {
  observeAll();
  domObserver.observe(document.body, { childList: true, subtree: true });

  // Smart safety timeout – NEodhaluje napevno po X sekundách. Odhalí jen při reálné poruše:
  //  (a) hero data (title/media) se nenačetla do 15s → něco je rozbité,
  //  (b) SPA nepřevzalo stránku do 30s → spustíme statický fallback.
  //  Normální (byť pomalá) načítání tak NEUTRHNE odhalení v půlce rozjezdu.
  if (isHomepage) {
    setTimeout(() => {
      if (!window.nnf_preloaderState.titleReady || !window.nnf_preloaderState.mediaReady) clearPreloader();
    }, 15000);
    setTimeout(() => {
      if (!window.nnf_preloaderState.spaSettled) clearPreloader();
    }, 30000);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

setTimeout(clearPreloader, 45000); // Final fallback (úplná krajní mez)
