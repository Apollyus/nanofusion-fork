import { supabase } from './supabase-config.js';

async function getPhotoPayloadUrl(fileInput, supabaseClient) {
  if (!fileInput || !fileInput.files || !fileInput.files[0]) return null;
  const file = fileInput.files[0];

  // 1. Try Supabase storage upload
  if (supabaseClient && supabaseClient.storage) {
    try {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `inquiry_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const { data: uploadData, error: uploadErr } = await supabaseClient.storage
        .from('gallery')
        .upload(fileName, file, { upsert: true, cacheControl: '3600' });

      if (!uploadErr && uploadData) {
        const { data: pubData } = supabaseClient.storage.from('gallery').getPublicUrl(fileName);
        if (pubData && pubData.publicUrl) return pubData.publicUrl;
      }
    } catch (e) {
      console.warn('Storage upload fallback triggered:', e);
    }
  }

  // 2. Fallback: Compress image to compressed JPEG Data URL
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 1000;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.75));
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

// --- Price mapping ---
let localPrices = {
  roof: 190, 
  facade: 150, 
  pavement: 120, 
  pv: 80, 
  graffiti: 250, 
  industrial: 130,
  'facade-paint': 200, 
  'roof-paint': 180, 
  impregnation: 70, 
  antislip: 120, 
  ceramfloor: 250, 
  antibac: 80
};

// Fetch prices from DB to override defaults
const loadPrices = async () => {
  try {
    const { data, error } = await supabase.from('configurator_prices').select('item_key, price');
    if (!error && data) {
      data.forEach(item => {
        if (localPrices[item.item_key] !== undefined) {
          localPrices[item.item_key] = item.price;
        }
      });
      console.log('Prices loaded from Supabase:', localPrices);
    }
  } catch (e) {
    console.warn('Configurator prices sync failed, using fallbacks.');
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  await loadPrices();

  const meta = window.__nnf_service_meta || {};
  const priceKey = meta.price_key || meta.id;

  // --- Calculator Logic ---
  const areaInput = document.getElementById('m-area');
  const nameInput = document.getElementById('m-name');
  const phoneInput = document.getElementById('m-phone');
  const btnReveal = document.getElementById('m-reveal');

  const updatePrice = () => {
    if (!areaInput) return;
    const area = parseFloat(areaInput.value) || 0;
    const baseVal = localPrices[priceKey] || 150;
    const basePrice = baseVal * area;
    const min = Math.round(basePrice * 1.05 / 10) * 10;
    const max = Math.round(basePrice * 1.15 / 10) * 10;

    const priceDisplay = document.getElementById('m-price');
    if (priceDisplay) {
      priceDisplay.innerText = `${min.toLocaleString('cs-CZ')} – ${max.toLocaleString('cs-CZ')} Kč`;
    }
  };

  if (areaInput) {
    areaInput.addEventListener('input', updatePrice);
    areaInput.addEventListener('change', updatePrice);
    updatePrice(); // Init display
  }

  const locationInput = document.getElementById('m-location');

  if (btnReveal) {
    btnReveal.onclick = async () => {
      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const location = locationInput ? locationInput.value.trim() : '';
      const area = areaInput ? parseFloat(areaInput.value) || 0 : 0;

      // --- Strict Form Validation ---
      if (!name || name.length < 2) {
        alert('Prosím zadejte Vaše jméno.');
        if (nameInput) nameInput.focus();
        return;
      }
      const nameLetters = name.replace(/[^a-zA-Zá-žÁ-Ž]/g, '');
      if (nameLetters.length < 2 || /^\d+$/.test(name)) {
        alert('Prosím zadejte platné jméno.');
        if (nameInput) nameInput.focus();
        return;
      }

      if (!location || location.length < 2) {
        alert('Prosím zadejte město nebo lokaci objektu.');
        if (locationInput) locationInput.focus();
        return;
      }
      const locLetters = location.replace(/[^a-zA-Zá-žÁ-Ž]/g, '');
      if (locLetters.length < 2 || /^\d+$/.test(location)) {
        alert('Prosím zadejte platný název obce / města.');
        if (locationInput) locationInput.focus();
        return;
      }

      if (!phone || phone.length < 9) {
        alert('Prosím zadejte telefonní číslo.');
        if (phoneInput) phoneInput.focus();
        return;
      }
      const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, '');
      if (!/^\d{9,15}$/.test(cleanPhone) || /^(\d)\1+$/.test(cleanPhone) || cleanPhone === '123456789' || cleanPhone === '987654321') {
        alert('Prosím zadejte platné a reálné telefonní číslo (např. 774 509 409 nebo +420774509409).');
        if (phoneInput) phoneInput.focus();
        return;
      }

      // Calculations for db log
      const baseVal = localPrices[priceKey] || 150;
      const basePrice = baseVal * area;
      const min = Math.round(basePrice * 1.05 / 10) * 10;
      const max = Math.round(basePrice * 1.15 / 10) * 10;

      // Disable inputs and show spinner
      btnReveal.disabled = true;
      btnReveal.innerText = 'ODESÍLÁM...';

      // Upload Photo if present with guaranteed Data URL fallback
      const photoInput = document.getElementById('m-photo');
      const photoUrl = await getPhotoPayloadUrl(photoInput, supabase);

      const inquiryPayload = {
        name: name,
        phone: phone,
        service: meta.title || 'Služba Detail',
        message: `Lokace: ${location}, Plocha: ${area} m², Odhad ceny: ${min} - ${max} Kč${photoUrl ? '\nFotografie: ' + photoUrl : ''}`,
        source: 'Subpage / Kalkulačka',
        status: 'new'
      };

      try {
        const fullPayload = photoUrl ? { ...inquiryPayload, original_photo_url: photoUrl } : inquiryPayload;
        let { error } = await supabase.from('inquiries').insert(fullPayload);

        if (error) {
          console.warn('First insert failed, retrying standard payload:', error.message);
          const fallbackRes = await supabase.from('inquiries').insert(inquiryPayload);
          if (fallbackRes.error) throw fallbackRes.error;
        }

        // Hide form and display success price estimate
        const formBlock = document.getElementById('m-form');
        const resultBlock = document.getElementById('m-result');
        const finalPriceDisplay = document.getElementById('m-price');

        if (finalPriceDisplay) {
          finalPriceDisplay.innerText = `${min.toLocaleString('cs-CZ')} – ${max.toLocaleString('cs-CZ')} Kč`;
        }

        if (formBlock) formBlock.style.display = 'none';
        if (resultBlock) resultBlock.style.display = 'block';

      } catch (err) {
        console.error('Lead inquiry saving failed:', err);
        alert('Omlouváme se, odeslání poptávky selhalo. Prosím kontaktujte nás telefonicky.');
      } finally {
        btnReveal.disabled = false;
        btnReveal.innerText = 'ZOBRAZIT CENU';
      }
    };
  }

  // --- Before & After Slider Logic ---
  document.querySelectorAll('.ba-range').forEach((input) => {
    const slug = input.dataset.slug;
    const clip = document.getElementById(slug + '-clip');
    const handle = document.getElementById(slug + '-handle');

    const updateSlider = () => {
      const val = input.value;
      if (clip) clip.style.clipPath = `inset(0 ${100 - val}% 0 0)`;
      if (handle) handle.style.left = val + '%';
    };

    input.addEventListener('input', updateSlider);
    input.addEventListener('change', updateSlider);
    updateSlider(); // Initial alignment
  });

  // --- Collapsible Accordion (FAQs) ---
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.onclick = () => {
      const answer = btn.nextElementSibling;
      const arrow = btn.querySelector('.faq-arrow');
      const isOpen = answer.style.display === 'block';

      // Toggle display
      answer.style.display = isOpen ? 'none' : 'block';
      
      // Toggle rotation classes
      if (arrow) {
        arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
      }
    };
  });
});
