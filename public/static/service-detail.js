import { supabase } from './supabase-config.js';

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

  if (btnReveal) {
    btnReveal.onclick = async () => {
      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const area = areaInput ? parseFloat(areaInput.value) || 0 : 0;

      if (!name || !phone) {
        alert('Prosím vyplňte vaše jméno a telefonní číslo.');
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

      try {
        const { error } = await supabase.from('inquiries').insert({
          name: name,
          phone: phone,
          service: meta.title || 'Služba Detail',
          message: `Plocha: ${area} m², Odhad ceny: ${min} - ${max} Kč`,
          source: 'Subpage / Kalkulačka',
          status: 'new'
        });

        if (error) throw error;

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
