/* Pokročilá kalkulačka s napojením na Supabase (Admin Panel) pro NANOfusion */

const injectCalculator = async () => {
  const contactSection = document.getElementById('kontakt');
  if (contactSection && !document.getElementById('kalkulacka')) {
    
    // Defaultní ceny jako záloha (kdyby Supabase neodpovídal)
    let services = [
      { id: 'roof', name: 'Čištění střech', price: 190, desc: 'Čištění + nano-ochrana' },
      { id: 'facade', name: 'Čištění fasád', price: 150, desc: 'Čištění + nano-ochrana' },
      { id: 'pavement', name: 'Čištění dlažeb', price: 120, desc: 'Čištění + ochrana' },
      { id: 'pv', name: 'Solární panely', price: 80, desc: 'Čištění panelů' },
      { id: 'graffiti', name: 'Odstranění graffiti', price: 250, desc: 'Čištění + prevence' },
      { id: 'industrial', name: 'Průmyslové čištění', price: 130, desc: 'Haly a konstrukce' },
      { id: 'facade-paint', name: 'Nátěry fasád', price: 200, desc: 'Caparol barvy' },
      { id: 'roof-paint', name: 'Nátěry střech', price: 180, desc: 'Dvousložkové barvy' },
      { id: 'impregnation', name: 'Nano impregnace', price: 70, desc: 'Ochrana povrchů' },
      { id: 'antislip', name: 'Protiskluz', price: 120, desc: 'Bezpečnost povrchů' },
      { id: 'ceramfloor', name: 'IG CeramFloor', price: 250, desc: 'Ochrana podlah' },
      { id: 'antibac', name: 'Antibakteriální', price: 80, desc: 'Ochrana 120 dní' }
    ];

    // --- LIVE SYNC S ADMINEM (SUPABASE) ---
    try {
      const { supabase } = await import('./supabase-config.js');
      const { data: remotePrices, error } = await supabase.from('configurator_prices').select('*');
      
      if (!error && remotePrices && remotePrices.length > 0) {
        console.log('NANOfusion: Ceny načteny z Admin Panelu');
        // Přepíšeme defaultní ceny těmi z databáze
        services = services.map(localS => {
          const remoteS = remotePrices.find(r => r.item_key === localS.id);
          return remoteS ? { ...localS, price: remoteS.price } : localS;
        });
      }
    } catch (e) {
      console.warn('NANOfusion: Cloud Sync nedostupný, používám lokální ceny.');
    }

    const objectTypes = [
      { id: 'rd', name: 'Rodinný dům' },
      { id: 'bd', name: 'Bytový dům' },
      { id: 'com', name: 'Komerční objekt' }
    ];

    const calculatorHtml = `
      <section class="calc-section animate-fade-in" id="kalkulacka" style="scroll-margin-top: 100px; background: #ffffff; border-radius: 2rem; border: 1px solid #edf2f7; box-shadow: 0 10px 30px rgba(0,0,0,0.05); margin-bottom: 4rem;">
        <div class="calc-container" id="calc-steps" style="max-width: 700px; margin: 0 auto; padding: 2rem 1rem;">
          <h2 class="calc-title" style="margin-bottom: 2rem; text-align: center;">Konfigurátor</h2>
          
          <div style="display: flex; gap: 8px; margin-bottom: 3rem; justify-content: center;">
            <div class="calc-progress-bar" id="progress-1" style="flex: 1; height: 6px; background: #F59E0B; border-radius: 10px;"></div>
            <div class="calc-progress-bar" id="progress-2" style="flex: 1; height: 6px; background: #e2e8f0; border-radius: 10px;"></div>
            <div class="calc-progress-bar" id="progress-3" style="flex: 1; height: 6px; background: #e2e8f0; border-radius: 10px;"></div>
          </div>

          <div id="step-1">
            <p class="calc-label" style="text-align: center; margin-bottom: 1.5rem;">1. Co budeme čistit?</p>
            <div class="calc-service-grid" style="display: grid; gap: 0.75rem; margin-bottom: 2rem;">
              ${services.map(s => `
                <div class="calc-service-card" data-price="${s.price}" data-id="${s.id}" style="padding: 1rem; border: 2px solid #e2e8f0; border-radius: 1rem; text-align: center; cursor: pointer; transition: all 0.2s;">
                  <div style="font-weight: 700; font-size: 0.875rem; color: #1e293b;">${s.name}</div>
                  <div style="font-size: 0.7rem; color: #64748b; margin-top: 2px;">${s.desc}</div>
                </div>
              `).join('')}
            </div>

            <p class="calc-label" style="text-align: center; margin-bottom: 1.25rem;">Typ objektu</p>
            <div style="display: flex; gap: 1rem; margin-bottom: 2.5rem; justify-content: center;">
              ${objectTypes.map(o => `
                <div class="calc-obj-card" data-id="${o.id}" style="flex: 1; padding: 1rem; border: 2px solid #e2e8f0; border-radius: 1rem; text-align: center; cursor: pointer; transition: all 0.2s;">
                  <div style="font-weight: 600; font-size: 0.875rem; color: #1e293b;">${o.name}</div>
                </div>
              `).join('')}
            </div>

            <button class="calc-cta" id="go-to-step-2" style="border: none; cursor: pointer; font-size: 1.125rem;">Pokračovat k ploše →</button>
          </div>

          <div id="step-2" style="display: none;">
            <p class="calc-label" style="text-align: center; margin-bottom: 2rem;">2. Upřesněte zadání</p>
            
            <div class="calc-field" style="margin-bottom: 1.5rem;">
              <label class="calc-label" for="area">Odhadovaná plocha (m²)</label>
              <div style="position: relative;">
                <input class="calc-input" id="area" placeholder="Zadejte m²" style="width: 100%; border-radius: 1rem; padding: 1.25rem; font-size: 1.25rem;" type="number" value="100">
                <span style="position: absolute; right: 1.25rem; top: 50%; transform: translateY(-50%); font-weight: 700; color: #94a3b8;">m²</span>
              </div>
              <label style="display: flex; align-items: center; cursor: pointer; margin-top: 1rem; font-size: 0.875rem; color: #64748b;">
                <input type="checkbox" id="area-unknown" style="margin-right: 0.75rem; width: 1.25rem; height: 1.25rem;">
                Nevím přesně, změřte mi to zdarma
              </label>
            </div>

            <div style="background: #f8fafc; padding: 2rem; border-radius: 1.5rem; margin: 2rem 0;">
              <p class="calc-label" style="margin-bottom: 1rem; text-align: center;">Uveďte kontakt pro zaslání kalkulace</p>
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <input class="calc-input" id="calc-name" name="name" placeholder="Vaše jméno" style="width: 100%; border-radius: 0.75rem;" type="text">
                <input class="calc-input" id="calc-email" name="email" placeholder="E-mail" style="width: 100%; border-radius: 0.75rem;" type="email">
                <input class="calc-input" id="calc-phone" name="phone" placeholder="Telefon" style="width: 100%; border-radius: 0.75rem;" type="tel">
                <input class="calc-input" id="calc-address" name="address" placeholder="Adresa zaměření" style="width: 100%; border-radius: 0.75rem; display: none;" type="text">
              </div>
            </div>

            <div style="display: flex; gap: 1rem; align-items: stretch;">
              <button id="back-to-step-1" style="flex: 1; height: 60px; background: #e2e8f0; color: #475569; border-radius: 1rem; border: none; font-weight: 800; cursor: pointer; text-transform: uppercase; font-size: 0.875rem; display: flex; align-items: center; justify-content: center; margin: 0; transition: all 0.2s;">Zpět</button>
              <button class="calc-cta" id="reveal-price" style="flex: 1; height: 60px; border: none; cursor: pointer; background: #f97316; color: white; border-radius: 1rem; font-weight: 800; text-transform: uppercase; font-size: 0.875rem; display: flex; align-items: center; justify-content: center; margin: 0; transition: all 0.2s;">Zobrazit kalkulaci</button>
            </div>
          </div>

          <div id="step-3" style="display: none;">
            <div class="calc-result-box" style="margin-top: 0; background: #0f172a; border-radius: 2rem; padding: 3rem 1rem; text-align: center;">
              <div class="calc-result-label" id="result-user-name" style="color: #94a3b8; font-size: 1.125rem; margin-bottom: 0.5rem;">Děkujeme!</div>
              <div class="calc-result-label" style="color: #ffffff; margin-bottom: 1rem;">Předběžné rozmezí ceny (bez DPH):</div>
              <div class="calc-result-value" id="result" style="font-size: 2.5rem; color: #F59E0B; font-weight: 800;">0 Kč</div>
              <p style="font-size: 0.813rem; color: #64748b; margin-top: 1rem;">
                * Uvedené ceny jsou bez DPH. Sazba DPH se liší dle typu objektu (12 % nebo 21 %).
              </p>
              <p style="font-size: 0.938rem; color: #94a3b8; margin-top: 1.5rem; line-height: 1.6; max-width: 450px; margin-left: auto; margin-right: auto;">
                Specialista NanoFusion Vás bude kontaktovat pro zjištění potřebných detailů pro vypracování cenové nabídky a domluvení termínu **bezplatného zaměření**.
              </p>
            </div>
            <button id="restart-calc" style="display: block; width: 100%; margin-top: 2rem; background: none; border: none; color: #64748b; font-weight: 500; cursor: pointer; text-decoration: underline;">Začít znovu</button>
          </div>
        </div>
      </section>
    `;

    const calcWrapper = document.createElement('div');
    calcWrapper.innerHTML = calculatorHtml;
    contactSection.parentNode.insertBefore(calcWrapper, contactSection);
    
    // Logika
    const serviceCards = document.querySelectorAll('.calc-service-card');
    const objCards = document.querySelectorAll('.calc-obj-card');
    const areaInput = document.getElementById('area');
    const areaUnknown = document.getElementById('area-unknown');
    
    let state = {
      pricePerUnit: services[0].price,
      serviceName: services[0].name,
      objName: 'Rodinný dům',
      userName: ''
    };

    // Initial highlight
    if (serviceCards[0]) {
      serviceCards[0].style.borderColor = '#F59E0B';
      serviceCards[0].style.backgroundColor = '#FEF3C7';
    }
    if (objCards[0]) {
      objCards[0].style.borderColor = '#F59E0B';
      objCards[0].style.backgroundColor = '#FEF3C7';
    }

    serviceCards.forEach(card => {
      card.addEventListener('click', () => {
        serviceCards.forEach(c => { c.style.borderColor = '#e2e8f0'; c.style.backgroundColor = 'transparent'; });
        card.style.borderColor = '#f97316';
        card.style.backgroundColor = '#fff7ed';
        state.pricePerUnit = parseInt(card.dataset.price);
        state.serviceName = card.innerText.split('\n')[0];
      });
    });

    objCards.forEach(card => {
      card.addEventListener('click', () => {
        objCards.forEach(c => { c.style.borderColor = '#e2e8f0'; c.style.backgroundColor = 'transparent'; });
        card.style.borderColor = '#f97316';
        card.style.backgroundColor = '#fff7ed';
        state.objName = card.innerText;
      });
    });

    areaUnknown.addEventListener('change', () => {
      areaInput.disabled = areaUnknown.checked;
      areaInput.style.opacity = areaUnknown.checked ? '0.5' : '1';
      document.getElementById('calc-address').style.display = areaUnknown.checked ? 'block' : 'none';
      if (areaUnknown.checked) document.getElementById('calc-address').focus();
    });

    document.getElementById('go-to-step-2').addEventListener('click', () => {
      if (!state.serviceName || !state.objName) { alert('Prosím vyberte službu a typ objektu.'); return; }
      document.getElementById('step-1').style.display = 'none';
      document.getElementById('step-2').style.display = 'block';
      document.getElementById('progress-2').style.background = '#F59E0B';
    });

    document.getElementById('back-to-step-1').addEventListener('click', () => {
      document.getElementById('step-2').style.display = 'none';
      document.getElementById('step-1').style.display = 'block';
      document.getElementById('progress-2').style.background = '#e2e8f0';
    });

    document.getElementById('reveal-price').addEventListener('click', () => {
      state.userName = document.getElementById('calc-name').value;
      const email = document.getElementById('calc-email').value;
      const phone = document.getElementById('calc-phone').value;
      const address = document.getElementById('calc-address').value;
      
      if (!state.userName || !email || !phone) {
        alert('Prosím vyplňte kontaktní údaje, abychom vám mohli odeslat kalkulaci.');
        return;
      }

      if (areaUnknown.checked && !address) {
        alert('Prosím uveďte adresu pro bezplatné zaměření.');
        return;
      }

      const areaValue = areaUnknown.checked ? 0 : (parseInt(areaInput.value) || 0);
      
      const baseTotal = state.pricePerUnit * areaValue;
      const minTotal = Math.round(baseTotal * 1.05 / 10) * 10;
      const maxTotal = Math.round(baseTotal * 1.15 / 10) * 10;
      
      const totalDisplay = areaUnknown.checked ? 'ZDARMA (Individuální nabídka*)' : `${minTotal.toLocaleString('cs-CZ')} – ${maxTotal.toLocaleString('cs-CZ')} Kč`;
      
      document.getElementById('result').textContent = totalDisplay;
      document.getElementById('result-user-name').textContent = `Děkujeme, ${state.userName}!`;
      
      // Save Lead
      import('./supabase-config.js').then(({ supabase }) => {
        supabase.from('inquiries').insert({
          name: state.userName,
          email: email,
          phone: phone,
          service: state.serviceName,
          message: `Kalkulačka: ${state.objName}, Plocha: ${areaUnknown.checked ? 'Neznámo' : areaValue + 'm2'}, Cena: ${totalDisplay}`,
          source: 'Konfigurátor',
          status: 'new'
        }).then(({ error }) => {
          if (error) console.error('[Kalkulačka] Chyba při ukládání poptávky:', error.message, error.code);
          else console.log('[Kalkulačka] Poptávka uložena do databáze');
        });
      });

      document.getElementById('step-2').style.display = 'none';
      document.getElementById('step-3').style.display = 'block';
      document.getElementById('progress-3').style.background = '#F59E0B';
      
      window.scrollTo({ top: document.getElementById('kalkulacka').offsetTop - 50, behavior: 'smooth' });
    });

    // Reset Calculator Logic (CTO Fix)
    const restartBtn = document.getElementById('restart-calc');
    if (restartBtn) {
      restartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // 1. Reset visibility
        document.getElementById('step-3').style.display = 'none';
        document.getElementById('step-1').style.display = 'block';
        document.getElementById('progress-2').style.background = '#e2e8f0';
        document.getElementById('progress-3').style.background = '#e2e8f0';

        // 2. Clear inputs
        document.getElementById('calc-name').value = '';
        document.getElementById('calc-email').value = '';
        document.getElementById('calc-phone').value = '';
        document.getElementById('calc-address').value = '';
        document.getElementById('area').value = '100';
        document.getElementById('area-unknown').checked = false;
        document.getElementById('area').disabled = false;
        document.getElementById('area').style.opacity = '1';
        document.getElementById('calc-address').style.display = 'none';

        // 3. Reset state
        state.pricePerUnit = services[0].price;
        state.serviceName = services[0].name;
        state.objName = 'Rodinný dům';
        state.userName = '';

        // 4. Reset selection visuals
        serviceCards.forEach(c => { c.style.borderColor = '#e2e8f0'; c.style.backgroundColor = 'transparent'; });
        if (serviceCards[0]) {
          serviceCards[0].style.borderColor = '#F59E0B';
          serviceCards[0].style.backgroundColor = '#FEF3C7';
        }
        objCards.forEach(c => { c.style.borderColor = '#e2e8f0'; c.style.backgroundColor = 'transparent'; });
        if (objCards[0]) {
          objCards[0].style.borderColor = '#F59E0B';
          objCards[0].style.backgroundColor = '#FEF3C7';
        }

        // 5. Precise scroll
        window.scrollTo({ 
          top: document.getElementById('kalkulacka').offsetTop - 100, 
          behavior: 'smooth' 
        });
      });
    }

    return true;
  }
  return false;
};

// Lead Capture Logic
const setupLeadCapture = () => {
  const form = document.querySelector('form');
  if (form && !form.dataset.captured) {
    form.dataset.captured = 'true';
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get('name') || document.querySelector('input[name="name"]')?.value || 'N/A';
      const email = formData.get('email') || document.querySelector('input[name="email"]')?.value || 'N/A';
      const phone = formData.get('phone') || document.querySelector('input[name="phone"]')?.value || 'N/A';

      import('./supabase-config.js').then(({ supabase }) => {
        supabase.from('inquiries').insert({
          name, email, phone,
          source: 'Kontaktní formulář',
          status: 'new'
        }).then(({ error }) => {
          if (error) {
            console.error('[Formulář] Chyba při ukládání poptávky:', error.message, error.code);
            alert('Omlouváme se, nastala chyba. Zavolejte nám prosím přímo.');
          } else {
            console.log('[Formulář] Poptávka uložena do databáze');
            alert('Děkujeme! Ozveme se vám.');
            form.reset();
          }
        });
      });
    });
  }
};

const runInjection = () => {
  injectCalculator();
  setupLeadCapture();
};

// MutationObserver — čeká dokud main.js nevytvoří #kontakt v DOM
const initCalculator = () => {
  // Pokud #kontakt již existuje, spusť rovnou
  if (document.getElementById('kontakt')) {
    runInjection();
    return;
  }

  // Jinak sleduj DOM a čekej
  const observer = new MutationObserver(() => {
    if (document.getElementById('kontakt')) {
      observer.disconnect();
      runInjection();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Fallback po 8s — spusť i bez #kontakt (vloží na konec body)
  setTimeout(() => {
    observer.disconnect();
    if (!document.getElementById('kalkulacka')) {
      // Pokud #kontakt stále neexistuje, vlož před footer
      const footer = document.querySelector('footer');
      if (footer) footer.parentNode.insertBefore(document.createElement('div'), footer);
      runInjection();
    }
  }, 8000);
};

initCalculator();

