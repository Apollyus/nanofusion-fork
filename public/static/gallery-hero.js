/**
 * NANOfusion — Galerie realizací + Hero média z Supabase
 * TASK 3A: Náhrada hardcoded galleryShowcaseData čtením z DB (gallery_items)
 *           + načtení aktivního hero media (hero_media)
 */

import { supabase } from './supabase-config.js';

// ============================================================
// HERO MEDIA — načti aktivní hero médium z DB
// ============================================================
export const loadHeroMedia = async () => {
  try {
    // Hero sekce = první <section> na stránce
    const heroSection = document.querySelector('section:first-of-type')
      || document.querySelector('.hero, #hero, [data-hero]');
    if (!heroSection) {
      return;
    }

    // Zabráníme vícenásobnému spuštění na stejné sekci
    if (heroSection.dataset.mediaLoaded === 'true') {
      return;
    }
    heroSection.dataset.mediaLoaded = 'true';

    const { data, error } = await supabase
      .from('hero_media')
      .select('*')
      .eq('is_active', true)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      console.warn('NANOfusion: Žádné aktivní hero médium v DB');
      return;
    }

    const isYoutube = data.url.includes('youtube.com') || data.url.includes('youtu.be');
    const isVideo = data.type === 'video' || data.url.match(/\.(mp4|webm|ogg|mov)(?:\?.*)?$/i) || data.url.includes('/heroes/');
    
    const fadeOutExisting = () => {
      // Získáme obrázky dynamicky (po načtení React SPA)
      const imgs = heroSection.querySelectorAll('img');
      imgs.forEach(img => {
        // Ignorujeme naše vlastní přidané prvky
        if (img.closest('.video-wrap') || img.dataset.patched) return;
        
        img.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1)';
        img.style.opacity = '0';
        // Po dokončení transition skryjeme z layoutu
        setTimeout(() => { img.style.display = 'none'; }, 1000);
      });
      // Plynule odstraníme případné pozadí sekce
      heroSection.style.transition = 'background-image 1s ease';
      setTimeout(() => { heroSection.style.backgroundImage = 'none'; }, 1000);
    };

    if (isYoutube) {
      let videoId = '';
      if (data.url.includes('youtu.be/')) videoId = data.url.split('youtu.be/')[1].split('?')[0];
      else if (data.url.includes('v=')) videoId = data.url.split('v=')[1].split('&')[0];
      
      const existingMedia = heroSection.querySelector('video, iframe');
      if (existingMedia) existingMedia.parentElement.remove();
      
      const videoWrap = document.createElement('div');
      videoWrap.style.cssText = 'position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none;opacity:0;transition:opacity 1s cubic-bezier(0.4, 0, 0.2, 1);';
      
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=${videoId}&modestbranding=1`;
      iframe.style.cssText = 'width:100vw;height:56.25vw;min-height:100vh;min-width:177.77vh;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);';
      iframe.frameBorder = '0';
      iframe.allow = 'autoplay; fullscreen; encrypted-media';
      
      videoWrap.appendChild(iframe);
      heroSection.style.position = 'relative';
      heroSection.prepend(videoWrap);

      // YouTube Iframe se prolné až když se kompletně načte do DOMu
      iframe.onload = () => {
        videoWrap.style.opacity = '0.55'; // Příjemná ambientní průhlednost pro text
        fadeOutExisting();
        console.log('NANOfusion: Hero YouTube video plynule zobrazeno:', videoId);
      };
      
    } else if (isVideo) {
      const existingVideo = heroSection.querySelector('video');
      if (existingVideo) {
        // Pokud video element už existuje, plynule změníme src a přehrajeme
        existingVideo.style.transition = 'opacity 0.5s ease';
        existingVideo.style.opacity = '0';
        setTimeout(() => {
          existingVideo.src = data.url;
          existingVideo.load();
          existingVideo.play().catch(() => {});
          existingVideo.style.opacity = '1';
        }, 50);
        console.log('NANOfusion: Hero video plynule nahrazeno z DB:', data.url);
      } else {
        const videoWrap = document.createElement('div');
        videoWrap.style.cssText = 'position:absolute;inset:0;z-index:0;overflow:hidden;opacity:0;transition:opacity 1s cubic-bezier(0.4, 0, 0.2, 1);';
        
        const video = document.createElement('video');
        video.src = data.url;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.style.cssText = 'width:100%;height:100%;object-fit:cover;';
        
        videoWrap.appendChild(video);
        heroSection.style.position = 'relative';
        heroSection.prepend(videoWrap);

        // HTML5 video se zobrazí až ve chvíli, kdy má dostatek stažených dat
        video.oncanplaythrough = () => {
          videoWrap.style.opacity = '1';
          fadeOutExisting();
          console.log('NANOfusion: Hero HTML5 video plynule zobrazeno:', data.url);
        };

        // Fallback: Pokud by canplaythrough trval příliš dlouho
        setTimeout(() => {
          if (videoWrap.style.opacity === '0') {
            videoWrap.style.opacity = '1';
            fadeOutExisting();
          }
        }, 2000); // Rychlejší fallback
      }
    } else if (data.type === 'image') {
      const existingMedia = heroSection.querySelector('video, iframe');
      if (existingMedia) {
        const wrap = existingMedia.parentElement;
        existingMedia.remove();
        const img = document.createElement('img');
        img.src = data.url;
        img.alt = 'NANOfusion hero';
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;inset:0;opacity:0;transition:opacity 1s ease;';
        wrap?.appendChild(img);
        setTimeout(() => { img.style.opacity = '1'; }, 50);
      } else {
        heroSection.style.backgroundImage = `url('${data.url}')`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
      }
      console.log('NANOfusion: Hero obrázek načten z DB:', data.url);
    }
  } catch (e) {
    console.warn('Hero media load failed:', e);
  }
};


// ============================================================
// GALERIE — načti položky z gallery_items tabulky
// ============================================================
export const loadGalleryFromDB = async () => {
  try {
    const [itemsRes, albumsRes] = await Promise.all([
      supabase.from('gallery_items').select('*').eq('is_active', true).order('order_index', { ascending: true }),
      supabase.from('gallery_albums').select('*').eq('is_active', true).order('order_index', { ascending: true })
    ]);

    if (itemsRes.error || !itemsRes.data) {
      console.warn('NANOfusion: Žádné gallery_items v DB nebo chyba RLS');
      return false;
    }

    const allItems = itemsRes.data;
    const albums = albumsRes.data || [];
    const standaloneItems = allItems.filter(i => !i.album_id);
    
    console.log(`NANOfusion: Načteno ${standaloneItems.length} samostatných položek a ${albums.length} alb z DB`);

    const scroller = document.getElementById('gallery-scroller-inner');
    if (!scroller) return false;

    // Combine for unified rendering
    const mixed = [
      ...albums.map(a => ({ ...a, _isAlbum: true })),
      ...standaloneItems.map(i => ({ ...i, _isAlbum: false }))
    ].sort((a, b) => a.order_index - b.order_index);

    let html = '';

    mixed.forEach(item => {
      if (item._isAlbum) {
        const albumPhotos = allItems.filter(i => i.album_id === item.id && i.type === 'image');
        if (albumPhotos.length === 0) return;
        const cover = albumPhotos[0];

        html += `
          <div class="gallery-item-v" style="flex:0 0 450px;background:#0f172a;border-radius:2rem;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.1);cursor:pointer;transition:transform 0.3s ease;position:relative;"
               onclick="if(window.__nnfLightboxAlbums && window.__nnfLightboxAlbums['${item.id}']) window.__nnfLightboxAlbums['${item.id}'].open('${cover.id}'); else console.log('Lightbox neni ready pro album ${item.id}');">
            <div style="height:250px;position:relative;overflow:hidden;pointer-events:none;">
              <img src="${cover.url}" alt="${item.title}" style="width:100%;height:100%;object-fit:cover;transition:transform 0.45s ease;" loading="lazy">
              <div style="position:absolute;top:16px;left:16px;background:rgba(15,23,42,0.85);backdrop-filter:blur(4px);border-radius:8px;padding:6px 12px;display:flex;align-items:center;gap:6px;">
                <span style="color:white;font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;">Album (${albumPhotos.length})</span>
              </div>
            </div>
            <div style="padding:2rem;pointer-events:none;">
              <h3 style="color:white;font-weight:800;font-size:1.25rem;margin-bottom:0.25rem;">${item.title}</h3>
              ${item.caption ? `<p style="color:rgba(255,255,255,0.6);font-size:0.9rem;font-weight:500;">${item.caption}</p>` : ''}
            </div>
          </div>`;
      } else {
        if (item.type === 'youtube') {
          html += `
            <div class="gallery-item-v" style="flex:0 0 450px;background:#0f172a;border-radius:2rem;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.1);cursor:pointer;transition:transform 0.3s ease;">
              <div style="height:250px;position:relative;">
                <iframe
                  src="https://www.youtube.com/embed/${item.youtube_id}"
                  title="${item.caption || 'Video'}"
                  frameborder="0"
                  allowfullscreen
                  loading="lazy"
                  style="width:100%;height:100%;border:0;"
                ></iframe>
              </div>
              <div style="padding:2rem;">
                <div style="color:#f59e0b;font-weight:800;font-size:0.75rem;letter-spacing:0.1em;margin-bottom:0.5rem;">VIDEO</div>
                ${item.caption ? `<h3 style="color:white;font-weight:800;font-size:1.1rem;">${item.caption}</h3>` : ''}
              </div>
            </div>`;
        } else {
          html += `
            <div class="gallery-item-v" style="flex:0 0 450px;background:#0f172a;border-radius:2rem;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.1);cursor:pointer;transition:transform 0.3s ease;position:relative;"
                 onclick="if(window.__nnfLightboxStandalone) window.__nnfLightboxStandalone.open('${item.id}')">
              <div style="height:250px;position:relative;overflow:hidden;pointer-events:none;">
                <img src="${item.url}" alt="${item.caption || 'Galerie'}" style="width:100%;height:100%;object-fit:cover;transition:transform 0.45s ease;" loading="lazy">
              </div>
              <div style="padding:2rem;pointer-events:none;">
                ${item.caption ? `<h3 style="color:white;font-weight:800;font-size:1.1rem;">${item.caption}</h3>` : ''}
              </div>
            </div>`;
        }
      }
    });

    scroller.innerHTML = html;

    const standaloneImages = standaloneItems.filter(i => i.type === 'image');
    if (standaloneImages.length > 0) {
      window.__nnfLightboxStandalone = _createLightboxInstance(standaloneImages, 'lb-standalone');
    }
    
    window.__nnfLightboxAlbums = {};
    albums.forEach(album => {
      const albumPhotos = allItems.filter(i => i.album_id === album.id && i.type === 'image');
      if (albumPhotos.length > 0) {
        window.__nnfLightboxAlbums[album.id] = _createLightboxInstance(albumPhotos, `lb-album-${album.id}`);
      }
    });

    return true;
  } catch (e) {
    console.warn('Gallery DB load failed:', e);
    return false;
  }
};

// ============================================================
// LIGHTBOX — full-screen zobrazení s klávesnicí + šipkami
// ============================================================
const _createLightboxInstance = (items, instanceId) => {
  let cur = 0;

  const build = () => {
    let el = document.getElementById(`nnf-gallery-lb-${instanceId}`);
    if (el) { el._items = items; return el; }

    el = document.createElement('div');
    el.id = `nnf-gallery-lb-${instanceId}`;
    el.style.cssText = 'display:none;position:fixed;inset:0;z-index:9999999;background:rgba(9,12,22,0.97);backdrop-filter:blur(12px);align-items:center;justify-content:center;';

    el.innerHTML = `
      <button id="nnf-lb-x-${instanceId}"   style="position:absolute;top:18px;right:18px;background:rgba(255,255,255,0.1);border:none;width:46px;height:46px;border-radius:50%;cursor:pointer;color:white;font-size:22px;display:flex;align-items:center;justify-content:center;transition:background .2s;" title="Zavrit (Esc)">&#10005;</button>
      <button id="nnf-lb-lft-${instanceId}" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.1);border:none;width:52px;height:52px;border-radius:50%;cursor:pointer;color:white;font-size:28px;display:flex;align-items:center;justify-content:center;transition:background .2s;" title="Predchozi (&#8592;)">&#8249;</button>
      <button id="nnf-lb-rgt-${instanceId}" style="position:absolute;right:14px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.1);border:none;width:52px;height:52px;border-radius:50%;cursor:pointer;color:white;font-size:28px;display:flex;align-items:center;justify-content:center;transition:background .2s;" title="Dalsi (&#8594;)">&#8250;</button>
      <div style="display:flex;flex-direction:column;align-items:center;gap:14px;padding:20px 72px;">
        <img id="nnf-lb-img-${instanceId}" src="" alt="" style="max-width:88vw;max-height:76vh;object-fit:contain;border-radius:14px;box-shadow:0 30px 80px rgba(0,0,0,0.7);transition:opacity .22s;">
        <div style="display:flex;gap:10px;align-items:center;">
          <span id="nnf-lb-cap-${instanceId}" style="color:rgba(255,255,255,0.65);font-size:13px;font-weight:500;"></span>
          <span id="nnf-lb-cnt-${instanceId}" style="color:rgba(255,255,255,0.3);font-size:12px;"></span>
        </div>
      </div>`;

    document.body.appendChild(el);

    const amber = 'rgba(245,158,11,0.75)';
    const dim   = 'rgba(255,255,255,0.1)';
    [`nnf-lb-x-${instanceId}`,`nnf-lb-lft-${instanceId}`,`nnf-lb-rgt-${instanceId}`].forEach(id => {
      const b = document.getElementById(id);
      b.onmouseenter = () => (b.style.background = amber);
      b.onmouseleave = () => (b.style.background = dim);
    });

    const close = () => { el.style.display = 'none'; document.body.style.overflow = ''; };

    const go = (idx) => {
      const list = el._items;
      cur = ((idx % list.length) + list.length) % list.length;
      const it  = list[cur];
      const img = document.getElementById(`nnf-lb-img-${instanceId}`);
      img.style.opacity = '0';
      setTimeout(() => { img.src = it.url; img.alt = it.caption || ''; img.style.opacity = '1'; }, 160);
      document.getElementById(`nnf-lb-cap-${instanceId}`).textContent = it.caption || '';
      document.getElementById(`nnf-lb-cnt-${instanceId}`).textContent = list.length > 1 ? `${cur + 1} / ${list.length}` : '';
      const multi = list.length > 1;
      document.getElementById(`nnf-lb-lft-${instanceId}`).style.display = multi ? 'flex' : 'none';
      document.getElementById(`nnf-lb-rgt-${instanceId}`).style.display = multi ? 'flex' : 'none';
    };

    document.getElementById(`nnf-lb-x-${instanceId}`).onclick   = close;
    document.getElementById(`nnf-lb-lft-${instanceId}`).onclick = () => go(cur - 1);
    document.getElementById(`nnf-lb-rgt-${instanceId}`).onclick = () => go(cur + 1);
    el.onclick = (e) => { if (e.target === el) close(); };

    document.addEventListener('keydown', (e) => {
      if (el.style.display === 'none') return;
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  go(cur - 1);
      if (e.key === 'ArrowRight') go(cur + 1);
    });

    el._go    = go;
    el._items = items;
    return el;
  };

  const overlay = build();

  return {
    open: (itemId) => {
      const list = overlay._items;
      const idx  = list.findIndex(i => String(i.id) === String(itemId));
      if (idx === -1) return;
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      overlay._go(idx);
    },
  };
};

// Exponujeme funkce pro globální okamžité volání z main.js MutationObserveru
window.nnf_loadHeroMedia = loadHeroMedia;
window.nnf_loadGalleryFromDB = loadGalleryFromDB;

// Inicializace — spouští se okamžitě pro maximální rychlost
document.addEventListener('DOMContentLoaded', () => {
  loadHeroMedia();
  loadGalleryFromDB();
});

// Při změně viditelnosti stránky (tab focus) se data aktualizují
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) loadGalleryFromDB();
});
