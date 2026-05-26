/**
 * NANOfusion Main logic module - Optimized CTO Edition
 * Handles Reveal System, Branding patches, and UI enhancements.
 */

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

const syncHeroText = async (heading) => {
  try {
    const { supabase } = await import('./supabase-config.js');
    const { data, error } = await supabase.from('site_config').select('value').eq('key', 'hero_title').single();
    if (!error && data) {
      heading.style.transition = 'opacity 0.3s ease';
      heading.style.opacity = '0';
      setTimeout(() => {
        heading.innerHTML = data.value;
        heading.style.opacity = '1';
      }, 300);
      console.log('NANOfusion: Hero text synchronizován');
    } else {
      heading.innerHTML = 'Špičková péče o to,<br><span style="color: #f59e0b;">co jste usilovně vybudovali</span>';
    }
  } catch (e) {
    heading.innerHTML = 'Špičková péče o to,<br><span style="color: #f59e0b;">co jste usilovně vybudovali</span>';
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
    heroHeading.style.fontSize = 'min(7vw, 64px)';
    heroHeading.style.lineHeight = '1.1';
    heroHeading.style.fontWeight = '900';
    heroHeading.style.letterSpacing = '-0.02em';

    const parentContainer = heroHeading.closest('.max-w-2xl') || heroHeading.parentElement;
    if (parentContainer) {
      parentContainer.style.maxWidth = '1000px';
      parentContainer.classList.remove('max-w-2xl');
      parentContainer.classList.add('max-w-4xl');
    }
    heroHeading.dataset.updated = 'true';
  }

  // 2.1. Trigger Hero Media Load immediately when React mounts the hero section
  if (window.nnf_loadHeroMedia) {
    window.nnf_loadHeroMedia();
  }

  // 3. Remove header phone number
  const navPhone = document.querySelector('header a[href="tel:+420774509409"]');
  if (navPhone) navPhone.remove();

  // 4. Update Logos (SRC only, sizes are in CSS)
  const logos = document.querySelectorAll('header img:not(.chat-logo):not(.ai-chat-launcher img), nav img:not(.chat-logo), footer img');
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

  // 5. Navigation Links Injection
  const navLinks = Array.from(document.querySelectorAll('header nav a, header div a'));
  const referenceLink = navLinks.find(a => a.textContent.trim() === 'Reference');

  if (referenceLink && !referenceLink.dataset.navPatched) {
    const isRoot = window.location.pathname === '/' || window.location.pathname === '/index.html';
    
    // Standardize hash links
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#') && !isRoot) a.href = '/' + href;
    });

    const navContainers = Array.from(new Set(navLinks.map(a => a.parentNode).filter(p => p)));
    navContainers.forEach(container => {
      if (container.dataset.navPatched) return;
      const refInContainer = Array.from(container.querySelectorAll('a')).find(a => a.textContent.trim() === 'Reference');
      if (refInContainer) {
        if (!container.querySelector('a[href="#kalkulacka"]')) {
          const configLink = refInContainer.cloneNode(true);
          configLink.textContent = 'Konfigurátor';
          configLink.href = '#kalkulacka';
          refInContainer.parentNode.insertBefore(configLink, refInContainer);
        }
        if (!container.querySelector('a[href="#galerie"]')) {
          const galleryLink = refInContainer.cloneNode(true);
          galleryLink.textContent = 'Galerie';
          galleryLink.href = '#galerie';
          refInContainer.parentNode.insertBefore(galleryLink, refInContainer.nextSibling);
        }
        if (!container.querySelector('a[href="#blog"]')) {
          const blogLink = refInContainer.cloneNode(true);
          blogLink.textContent = 'Blog';
          blogLink.href = '#blog';
          refInContainer.parentNode.insertBefore(blogLink, refInContainer.nextSibling);
        }
        container.dataset.navPatched = 'true';
      }
    });
    referenceLink.dataset.navPatched = 'true';
  }

  // 6. Active link state
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
    
    // Update IČO
    const footerTexts = footer.querySelectorAll('p.text-xs.text-neutral-500');
    footerTexts.forEach(p => {
      if (p.textContent.includes('IČ:')) {
        p.innerHTML = `© 2026 NANOfusion s.r.o. | IČ: 29375363 | 
          <a href="https://eshop.nanofusion.cz" target="_blank" style="color: inherit; text-decoration: none; margin-left: 10px; border-bottom: 1px solid #444;">E-shop</a> | 
          <a href="https://nanofusion-j3bs.vercel.app/admin/login" style="color: #f59e0b; font-weight: 700; text-decoration: none; margin-left: 5px;">Zaměstnanci</a>`;
      }
    });

    // Update Tagline
    footer.querySelectorAll('p.text-sm.text-neutral-400').forEach(p => {
      if (!p.dataset.brUpdated && (p.textContent.includes('Od roku 2012') || p.textContent.includes('13 let') || p.textContent.includes('12 let'))) {
        p.innerHTML = 'Profesionální čištění, impregnace a nátěry.<br>Již 14 let pečujeme o váš majetek po celé ČR.';
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
          iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`;
        } else if (link.href.includes('instagram')) {
          iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`;
        } else if (link.href.includes('linkedin')) {
          iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`;
        } else if (link.href.includes('youtube')) {
          iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>`;
        } else if (link.href.includes('tiktok')) {
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
            src="https://www.google.com/maps?q=Cezavy%20627,664%2056%20Blučina&output=embed" 
            width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy">
          </iframe>
          <div style="position: absolute; inset: 0; background: transparent;" onclick="window.open('https://www.google.com/maps?q=Cezavy%20627,664%2056%20Blučina', '_blank')"></div>
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
  const container = document.getElementById('modal-media-viewport');
  if (!container) return;

  // Visual feedback: border on thumbnails
  const thumbs = document.querySelectorAll('.modal-thumb-item');
  thumbs.forEach(t => {
    t.style.borderColor = (t.dataset.photoUrl === url) ? '#f59e0b' : 'transparent';
  });

  if (isVideo && youtubeId) {
    container.innerHTML = `
      <div style="aspect-ratio: 16/9; width: 100%;">
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>`;
  } else {
    container.innerHTML = `
      <div style="height:500px; position:relative;">
        <img src="${url}" style="width:100%; height:100%; object-fit:cover; animation: fadeIn 0.5s ease;">
      </div>`;
  }
  
  // Scroll to top of modal if needed
  const modalBody = container.closest('div[style*="overflow-y:auto"]');
  if (modalBody) modalBody.scrollTo({ top: 0, behavior: 'smooth' });
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
  const mainImg = photos[0]?.url || item.image_url || 'https://images.unsplash.com/photo-1635339001328-8007ebfd4a60?w=1200';

  overlay.innerHTML = `
    <div style="background:white; width:100%; max-width:1000px; max-height:95vh; border-radius:32px; overflow:hidden; display:flex; flex-direction:column; position:relative; box-shadow:0 30px 100px rgba(0,0,0,0.5); z-index:10000000;">
      <button onclick="document.getElementById('gallery-modal-overlay').style.display='none'" style="position:absolute; top:20px; right:20px; background:rgba(255,255,255,0.9); border:none; width:44px; height:44px; border-radius:50%; cursor:pointer; font-size:24px; z-index:101; font-weight:bold; box-shadow:0 4px 15px rgba(0,0,0,0.1);">&times;</button>
      
      <div style="flex: 1; overflow-y:auto; padding-bottom: 40px;">
        <div id="modal-media-viewport" style="background: #000;">
          ${item.youtube_id 
            ? `<div style="aspect-ratio: 16/9; width: 100%;">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${item.youtube_id}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
               </div>`
            : `<div style="height:500px; position:relative;">
                <img src="${mainImg}" style="width:100%; height:100%; object-fit:cover;">
               </div>`
          }
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
                <div onclick="window.nnf_switchModalMedia('', true, '${item.youtube_id}')" style="aspect-ratio:1; border-radius:12px; overflow:hidden; cursor:pointer; border:2px solid #f59e0b; position:relative;">
                  <img src="https://img.youtube.com/vi/${item.youtube_id}/0.jpg" style="width:100%; height:100%; object-fit:cover; opacity:0.6;">
                  <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:white;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              ` : ''}
              ${photos.map((p, idx) => `
                <div onclick="window.nnf_switchModalMedia('${p.url}')" data-photo-url="${p.url}" style="aspect-ratio:1; border-radius:12px; overflow:hidden; cursor:pointer; border:2px solid ${idx === 0 && !item.youtube_id ? '#f59e0b' : 'transparent'}; transition:all 0.2s;" class="modal-thumb-item">
                  <img src="${p.url}" style="width:100%; height:100%; object-fit:cover;">
                </div>
              `).join('')}
            </div>
          </div>

          <div style="background:#0f172a; padding:32px; border-radius:24px; display:flex; align-items:center; justify-content:space-between; gap:20px; flex-wrap: wrap;">
            <div>
              <div style="font-weight:800; color:white; font-size:20px;">Líbí se vám tento výsledek?</div>
              <div style="color:#94a3b8; font-size:14px;">Napište nám a získejte cenovou nabídku zdarma.</div>
            </div>
            <button onclick="document.getElementById('gallery-modal-overlay').style.display='none'; setTimeout(() => document.getElementById('ai-chat-launcher').click(), 200)" 
              style="background:#f59e0b; color:white; border:none; padding:16px 32px; border-radius:16px; font-weight:800; cursor:pointer; transition:all 0.3s ease; white-space:nowrap; box-shadow:0 10px 20px rgba(245, 158, 11, 0.2);">
              CHCI TAKÉ TAKOVOU PÉČI
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
  overlay.onclick = (e) => { if(e.target === overlay) overlay.style.display = 'none'; };
};

const injectGallery = () => {
  let gallerySection = document.getElementById('galerie');
  const referenceSection = document.getElementById('reference');
  if (!gallerySection && referenceSection) {
    gallerySection = document.createElement('section');
    gallerySection.id = 'galerie';
    gallerySection.className = 'pt-24 pb-32 bg-white relative overflow-hidden';
    referenceSection.parentNode.insertBefore(gallerySection, referenceSection.nextSibling);

    gallerySection.innerHTML = `
      <div class="container mx-auto px-4">
          <div class="text-center mb-16">
              <h2 class="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-heading" style="margin-top: 3rem;">Špičková péče o váš majetek v detailech</h2>
              <div class="w-20 h-1 bg-amber-500 mx-auto rounded-full"></div>
          </div>
      </div>

        <div style="position: relative; width: 100%; max-width: 1400px; margin: 0 auto;">
          <button id="gallery-prev" 
            class="hidden md:flex"
            style="position: absolute; left: -25px; top: 50%; transform: translateY(-50%); z-index: 10; width: 60px; height: 60px; border-radius: 30px; background: #f59e0b !important; border: none; cursor: pointer; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3); transition: all 0.3s ease; padding: 0 !important;"
            onmouseover="this.style.scale='1.1'; this.style.backgroundColor='#d97706';"
            onmouseout="this.style.scale='1'; this.style.backgroundColor='#f59e0b';"
          > 
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white !important" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="stroke: white !important;"><path d="M15 18l-6-6 6-6"></path></svg> 
          </button>
          
          <button id="gallery-next" 
            class="hidden md:flex"
            style="position: absolute; right: -25px; top: 50%; transform: translateY(-50%); z-index: 10; width: 60px; height: 60px; border-radius: 30px; background: #f59e0b !important; border: none; cursor: pointer; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3); transition: all 0.3s ease; padding: 0 !important;"
            onmouseover="this.style.scale='1.1'; this.style.backgroundColor='#d97706';"
            onmouseout="this.style.scale='1'; this.style.backgroundColor='#f59e0b';"
          > 
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white !important" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="stroke: white !important;"><path d="M9 18l6-6-6-6"></path></svg> 
          </button>

        <div id="gallery-scroller-inner" style="display: flex; gap: 1.5rem; overflow-x: auto; scroll-behavior: smooth; padding: 1rem 0 3rem; -ms-overflow-style: none; scrollbar-width: none; min-height: 400px;">
          <style>#gallery-scroller-inner::-webkit-scrollbar { display: none; }</style>
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
      scroller.scrollBy({left: dir * jumpAmount, behavior: 'smooth'});
    };

    setInterval(() => {
      if (!isPaused) {
          if (scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 100) {
             scroller.scrollTo({left: 0, behavior: 'smooth'});
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

const clearPreloader = () => {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('fade-out')) {
    preloader.classList.add('fade-out');
    setTimeout(() => { if(preloader.parentNode) preloader.remove(); }, 600);
  }
  document.body.style.opacity = '1';
  document.body.style.overflow = 'auto';
};

const initApp = () => {
  observeAll();
  domObserver.observe(document.body, { childList: true, subtree: true });
  setTimeout(clearPreloader, 100); 
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

setTimeout(clearPreloader, 4000); // Fallback
