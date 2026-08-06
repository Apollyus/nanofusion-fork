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

  // --- 2-Step Calculator Logic ---
  const areaInput = document.getElementById('m-area');
  const firstNameInput = document.getElementById('m-firstname') || document.getElementById('m-name');
  const lastNameInput = document.getElementById('m-lastname');
  const locationInput = document.getElementById('m-location');
  const phoneInput = document.getElementById('m-phone');
  const emailInput = document.getElementById('m-email');

  const step1Container = document.getElementById('m-step1-container');
  const step2Container = document.getElementById('m-step2-container');
  const stepBadge = document.getElementById('m-step-badge');

  const btnNext = document.getElementById('m-next-btn');
  const btnBack = document.getElementById('m-back-btn');
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

  // --- Step 1 -> Step 2 Transition ---
  if (btnNext) {
    btnNext.onclick = () => {
      const fullName = firstNameInput ? firstNameInput.value.trim() : '';
      const location = locationInput ? locationInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';

      if (!fullName || fullName.length < 2) {
        alert('Prosím zadejte Vaše jméno a příjmení.');
        if (firstNameInput) firstNameInput.focus();
        return;
      }
      const fnLetters = fullName.replace(/[^a-zA-Zá-žÁ-Ž\s]/g, '');
      if (fnLetters.length < 2 || /^\d+$/.test(fullName)) {
        alert('Prosím zadejte platné jméno a příjmení.');
        if (firstNameInput) firstNameInput.focus();
        return;
      }

      if (!location || location.length < 2) {
        alert('Prosím zadejte přesnou lokaci.');
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
        alert('Prosím zadejte platné a reálné telefonní číslo (např. +420 777 123 456).');
        if (phoneInput) phoneInput.focus();
        return;
      }

      if (!email || !email.includes('@') || !email.includes('.')) {
        alert('Prosím zadejte platnou e-mailovou adresu.');
        if (emailInput) emailInput.focus();
        return;
      }

      const gdprInput = document.getElementById('m-gdpr');
      if (gdprInput && !gdprInput.checked) {
        alert('Prosím potvrďte souhlas se zpracováním osobních údajů (GDPR).');
        if (gdprInput) gdprInput.focus();
        return;
      }

      // Smooth transition to Step 2
      if (step1Container) step1Container.style.display = 'none';
      if (step2Container) step2Container.style.display = 'block';
      if (stepBadge) stepBadge.innerText = 'Část 2 ze 2: Metry a foto';
    };
  }

  // --- Step 2 -> Step 1 Back Button ---
  if (btnBack) {
    btnBack.onclick = () => {
      if (step2Container) step2Container.style.display = 'none';
      if (step1Container) step1Container.style.display = 'block';
      if (stepBadge) stepBadge.innerText = 'Část 1 ze 2: Kontakty';
    };
  }

  // --- Step 2 Final Submission ---
  if (btnReveal) {
    btnReveal.onclick = async () => {
      const gdprInput = document.getElementById('m-gdpr');
      if (gdprInput && !gdprInput.checked) {
        alert('Prosím potvrďte souhlas se zpracováním osobních údajů (GDPR).');
        return;
      }
      const firstName = firstNameInput ? firstNameInput.value.trim() : '';
      const lastName = lastNameInput ? lastNameInput.value.trim() : '';
      const fullName = `${firstName} ${lastName}`.trim();
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const location = locationInput ? locationInput.value.trim() : '';
      const area = areaInput ? parseFloat(areaInput.value) || 0 : 0;

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
        name: fullName || 'Zákazník',
        phone: phone,
        email: email,
        service: meta.title || 'Služba Detail',
        message: `Lokace: ${location}, E-mail: ${email}, Plocha: ${area} m², Odhad ceny: ${min} - ${max} Kč${photoUrl ? '\nFotografie: ' + photoUrl : ''}`,
        source: 'Subpage 2-Step Calculator',
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

  // --- Before & After Slider Logic & Attention-grabbing Intro Animation ---
  document.querySelectorAll('.ba-range').forEach((input) => {
    const slug = input.dataset.slug;
    const clip = document.getElementById(slug + '-clip');
    const handle = document.getElementById(slug + '-handle');

    const updateSlider = (valOverride) => {
      const val = valOverride !== undefined ? valOverride : input.value;
      if (clip) clip.style.clipPath = `inset(0 ${100 - val}% 0 0)`;
      if (handle) handle.style.left = val + '%';
    };

    input.addEventListener('input', () => updateSlider());
    input.addEventListener('change', () => updateSlider());
    updateSlider(); // Initial alignment

    // Attention-grabbing intro sweep animation when user scrolls into view
    let hasAnimated = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          let startTime = null;
          const duration = 1800; // 1.8s intro sweep animation

          const animateSweep = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / duration;

            if (progress < 1) {
              // Smooth sine wave sweep: 50% -> 25% -> 75% -> 50%
              const currentVal = 50 + Math.sin(progress * Math.PI * 2) * 25;
              input.value = currentVal;
              updateSlider(currentVal);
              requestAnimationFrame(animateSweep);
            } else {
              input.value = 50;
              updateSlider(50);
            }
          };
          requestAnimationFrame(animateSweep);
        }
      });
    }, { threshold: 0.3 });

    const parentBox = input.closest('section') || input.parentElement;
    if (parentBox) observer.observe(parentBox);
  });

  // --- Collapsible Accordion (FAQs) ---
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.onclick = () => {
      const answer = btn.nextElementSibling;
      const arrow = btn.querySelector('.faq-arrow');
      const isOpen = answer.style.display === 'block';

      // Toggle display
      answer.style.display = isOpen ? 'none' : 'block';
      btn.classList.toggle('faq-open', !isOpen);

      // Toggle rotation classes if legacy arrow exists
      if (arrow) {
        arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
      }
    };
  });
});

