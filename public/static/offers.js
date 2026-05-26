/* Clean Interactivity for NANOfusion Services - Extended */

let servicesData = [
  {
    id: 'facade', title: 'Čištění fasád', tag: 'Prémiová ochrana',
    detail: 'Hloubkové odstranění řas, plísní a atmosférických nečistot. Nano-ochrana se zárukou až 10 let.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800',
    beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600',
    afterImg: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600',
    involves: 'Proces zahrnuje aplikaci speciálního přípravku na odstranění organických nečistot, následné nanesení aktivní pěny, oplach studenou vodou pod nízkým tlakem, chemické ošetření povrchu a závěrečnou impregnaci, která fasádu chrání před vlhkostí a nečistotami.',
    faq: [
      { q: 'Proč investovat do čištění a impregnace fasády?', a: 'Čištění a impregnace zlepší estetický vzhled domu a prodlouží životnost fasády. Vyhnete se nákladným opravám způsobeným plísněmi, řasami nebo vlhkostí.' },
      { q: 'Jaké metody používáte?', a: 'Používáme nízkotlaké čištění a speciální čisticí prostředky přizpůsobené typu fasády. Na omítkové fasády nikdy nepoužíváme horkou vodu!' },
      { q: 'Je impregnace nutná?', a: 'Ano. Po vyčištění je povrch zranitelný. Impregnace vytvoří neviditelnou vrstvu odpuzující vodu a snižující přilnavost nečistot.' },
      { q: 'Jak dlouho vydrží impregnace?', a: 'Účinek se pohybuje kolem 5–10 let v závislosti na typu fasády a povětrnostních podmínkách.' },
      { q: 'Jaké typy fasád čistíte?', a: 'Čistíme téměř všechny typy – omítky, zateplovací systémy, cihlové i kamenné povrchy.' },
      { q: 'Je to bezpečné pro okolní prostředí?', a: 'Ano, používáme ekologicky nezávadné prostředky. Okolní keře a rostliny zakrýváme.' },
      { q: 'Jak dlouho trva realizace?', a: 'Rodinný dům (250 m²) cca 2 dny. Bytový dům (2 500 m²) cca 4–5 dní. Závisí na počasí.' },
      { q: 'Mohu službu využít v zimě?', a: 'V zimě fasády nečistíme. Ideální sezóna je od jara do podzimu.' }
    ]
  },
  {
    id: 'roof', title: 'Čištění střech', tag: 'Prodloužení životnosti',
    detail: 'Kompletní renovace krytiny a hydrofobní nátěr, který chrání před mechem a degradací.',
    image: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?w=800',
    beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600',
    afterImg: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600',
    involves: 'Šetrné čištění střešní krytiny od mechů, lišejníků a nečistot. Po vyčištění následuje sanace a aplikace nano impregnace, která chrání střechu až na 7 let.',
    faq: [
      { q: 'Poškodí čištění moji střechu?', a: 'Ne. Používáme šetrné metody s regulovaným tlakem, které krytinu nepoškodí.' },
      { q: 'Jak často je potřeba střechu čistit?', a: 'Doporučujeme cca každých 5–7 let v závislosti na lokalitě a typu krytiny.' },
      { q: 'Čistíte i okapy?', a: 'Ano, čištění okapů je součástí naší služby.' },
      { q: 'Jakou impregnaci používáte?', a: 'Používáme špičkovou nano impregnaci s ochranou až na 7 let.' }
    ]
  },
  {
    id: 'pavement', title: 'Čištění dlažeb', tag: 'Vzhled nového povrchu',
    detail: 'Odstranění mechů, mastnoty i zašlé špíny. Po vyčištění ošetřujeme impregnací nebo oživovacími nátěry.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
    beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600',
    afterImg: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600',
    involves: 'Hloubkové čištění dlažby pomocí chemie a tlakové vody. Následuje sanace proti mechům a lišejníkům a aplikace hydrofobní impregnace nebo oživovacího nátěru.',
    faq: [
      { q: 'Čistíte i zámkovou dlažbu?', a: 'Ano, specializujeme se na zámkovou dlažbu, betonové plochy i přírodní kámen.' },
      { q: 'Doplníte písek do spár?', a: 'Ano, doplnění písku do spár je volitelná služba za 40 Kč/m².' },
      { q: 'Jaký je minimální rozsah zakázky?', a: 'Minimální výjezdový paušál je 20 000 Kč bez DPH.' }
    ]
  },
  {
    id: 'pv', title: 'Solární panely', tag: 'Vyšší účinnost',
    detail: 'Profesionální čištění solárních panelů pomocí šetrných kartáčů a demineralizované vody. Keramická nano ochrana.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600',
    afterImg: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600',
    involves: 'Čištění pomocí demineralizované vody a speciálních kartáčů, které nepoškrábeú povrch panelů. Následná aplikace keramické nano ochrany pro samočistící efekt.',
    faq: [
      { q: 'Zvýší čištění výkon panelů?', a: 'Ano, znečištěné panely mohou ztrácet až 25 % výkonu. Po vyčištění se výkon vrátí na optimální úroveň.' },
      { q: 'Jak často čistit panely?', a: 'Doporučujeme čištění 1–2× ročně v závislosti na okolním prostředí.' }
    ]
  },
  {
    id: 'graffiti', title: 'Odstranění graffiti', tag: 'Rychlá pomoc',
    detail: 'Šetrné odstranění nápisů z různých povrchů. Aplikace vysoce účinných antigraffiti nátěrů s dlouhou životností.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600',
    afterImg: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600',
    involves: 'Odstraňujeme graffiti z betonu, fasád, pískovce, cihel, vagonů a dalších povrchů. Po odstranění aplikujeme antigraffiti nátěr s dlouhou životností.',
    faq: [
      { q: 'Z jakých povrchů odstraňujete graffiti?', a: 'Z betonu, fasád, pískovce, cihel, vagonů i dalších povrchů.' },
      { q: 'Co je antigraffiti nátěr?', a: 'Ochranný nátěr, díky kterému lze budoucí graffiti snadno smýt bez poškození povrchu.' }
    ]
  },
  {
    id: 'industrial', title: 'Průmyslové čištění', tag: 'B2B řešení',
    detail: 'Čištění průmyslových hal od podlahy ke stropu. Práce i za provozu. Technologické rozvody a konstrukce. Likvidace odpadu.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
    beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600',
    afterImg: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600',
    involves: 'Komplexní čištění průmyslových objektů včetně podlah, stěn, stropů, technologických rozvodů a konstrukcí. Schopni pracovat i za plného provozu.',
    faq: [
      { q: 'Můžete čistit za provozu?', a: 'Ano, jsme schopni provádět práce i za plného provozu závodu.' },
      { q: 'Likvidujete odpad?', a: 'Ano, likvidaci veškerého odpadu zajistíme.' }
    ]
  },
  {
    id: 'facade-paint', title: 'Nátěry fasád', tag: 'Nový vzhled',
    detail: 'Ve spolupráci s firmou Caparol nabízíme nátěry fasád té nejvyšší kvality. Zdravá a čistá fasáda se zárukou až 14 let.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600',
    afterImg: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600',
    involves: 'Profesionální nátěry fasád prémiovou barvou Caparol. Čistá fasáda bez plísní, řas a ztráty pigmentu.',
    isBulletStyle: true,
    bulletPoints: [
      'Prémiové barvy Caparol',
      'Záruka pigmentu až 14 let',
      'Ochrana proti plísním a řasám',
      'Čištění fasády před nátěrem v ceně',
      'Vhodné pro rodinné i bytové domy'
    ],
    faq: []
  },
  {
    id: 'roof-paint', title: 'Nátěry střech', tag: 'Dlouhá životnost',
    detail: 'Nátěry všech druhů střech pomocí vysoce kvalitních dvousložkových barev se samočistícím efektem. Životnost 20 let!',
    image: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?w=800',
    beforeImg: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?w=600',
    afterImg: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600',
    involves: 'Dvousložkové barvy se samočisticím efektem, životnost uváděná výrobcem až 20 let.',
    isBulletStyle: true,
    bulletPoints: [
      'Dvousložkové barvy nejvyšší kvality',
      'Samočistící efekt',
      'Životnost až 20 let',
      'Všechny druhy střešních krytin',
      'Čištění střechy před nátěrem v ceně'
    ],
    faq: []
  },
  {
    id: 'impregnation', title: 'Nano impregnace', tag: 'Ochrana povrchů',
    detail: 'Inovativní technologie chrání a prodlužují životnost ošetřených materiálů.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
    beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600',
    afterImg: 'https://images.unsplash.com/photo-1520004434532-668416a08753?w=600',
    involves: 'Aplikace hydrofobní nano impregnace na různé povrchy pro dlouhodobou ochranu proti vlhkosti a nečistotám.',
    isBulletStyle: true,
    bulletPoints: [
      'Hydrofobní ochrana povrchů',
      'Prodloužení životnosti materiálů',
      'Odpuzuje vodu a nečistoty',
      'Ochrana až 10 let',
      'Vhodné pro fasády, střechy, dlažby'
    ],
    faq: []
  },
  {
    id: 'antislip', title: 'Protiskluzová úprava', tag: 'Bezpečnost',
    detail: 'Protiskluzová úprava pro mokré povrchy. Funguje na keramice, žule, mramoru, terasu, linoleu a PVC.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
    beforeImg: 'https://images.unsplash.com/photo-1520004434532-668416a08753?w=600',
    afterImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600',
    involves: 'Aplikace protiskluzové úpravy na mokré povrchy – bazény, chodby, koupelny, obchodní centra.',
    isBulletStyle: true,
    bulletPoints: [
      'Keramika, žula, mramor, teraso',
      'Nově i linoleum a PVC',
      'Bazény a wellness centra',
      'Koupelny a chodby',
      'Bez změny vzhledu povrchu'
    ],
    faq: []
  },
  {
    id: 'ceramfloor', title: 'IG CeramFloor', tag: 'Průmyslová ochrana',
    detail: 'Vysoce účinná polymerní ochrana podlah s protiskluzovým efektem. Odolnost i v extrémních průmyslových podmínkách.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
    beforeImg: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
    afterImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600',
    involves: 'Polymerní ochrana průmyslových podlah s protiskluzovým efektem. Lepší než epoxid či polyuretany.',
    isBulletStyle: true,
    bulletPoints: [
      'Lepší než epoxid a polyuretany',
      'Plně zatížitelná po 24 hodinách',
      'Odolnost proti chemickým látkám',
      'Výrovní závody a logistická centra',
      'Potravinářské provozy a zemědělství',
      'Vyrobeno v ČR'
    ],
    faq: []
  },
  {
    id: 'antibac', title: 'Antibakteriální ochrana', tag: 'Hygiena',
    detail: 'Antibakteriální a antivirová ochrana povrchů s účinností až 120 dní.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
    beforeImg: 'https://images.unsplash.com/photo-1581092916357-5896ebc48073?w=600',
    afterImg: 'https://images.unsplash.com/photo-1581092916357-5896ebc48073?w=600',
    involves: 'Aplikace IMPAGUARD GCA – antibakteriální a antivirová ochrana povrchů s účinností až 120 dní.',
    isBulletStyle: true,
    bulletPoints: [
      'Účinnost až 120 dní',
      'Antibakteriální i antivirová ochrana',
      'Zdravotnická zařízení',
      'Kanceláře a veřejné prostory',
      'Školy a školky'
    ],
    faq: []
  }
];

// --- Dynamic Prices Sync ---
let remotePrices = {
  roof: 190, facade: 150, pavement: 120, pv: 80, graffiti: 250, industrial: 130,
  'facade-paint': 200, 'roof-paint': 180, impregnation: 70, antislip: 120, ceramfloor: 250, antibac: 80
};

const syncRemotePrices = async () => {
  try {
    const { supabase } = await import('./supabase-config.js');
    const { data, error } = await supabase.from('configurator_prices').select('item_key, price');
    if (!error && data) {
      data.forEach(item => {
        if (remotePrices[item.item_key] !== undefined) {
          remotePrices[item.item_key] = item.price;
        }
      });
      console.log('Offers: Ceny synchronizovány s Adminem');
    }
  } catch (e) {
    console.warn('Offers: Cloud Sync cen nedostupný.');
  }
};
syncRemotePrices();

// --- Cloud Hydration (Supabase) ---
const hydrateFromCloud = async () => {
  try {
    const { supabase } = await import('./supabase-config.js');

    // Načti služby, FAQs a Before/After paralelně
    const [servicesRes, faqsRes, beforeAfterRes] = await Promise.all([
      supabase.from('services').select('*').eq('is_active', true),
      supabase.from('service_faqs').select('*').eq('is_active', true).order('order_index', { ascending: true }),
      supabase.from('service_before_after').select('*').order('order_index', { ascending: true }),
    ]);

    // Merge služby
    if (!servicesRes.error && servicesRes.data && servicesRes.data.length > 0) {
      console.log('Hydrating services from Cloud...');
      servicesRes.data.forEach(cloudService => {
        const cloudSlug = (cloudService.slug || '').replace(/^\//, '') // strip leading /
        const index = servicesData.findIndex(s =>
          s.id === cloudService.id ||
          s.id === cloudSlug ||
          s.id === cloudService.slug
        );
        if (index !== -1) {
          servicesData[index] = {
            ...servicesData[index],
            _dbId: cloudService.id, // uložíme UUID pro FAQ lookup
            title: cloudService.name || cloudService.title || servicesData[index].title,
            detail: cloudService.description || cloudService.detail || servicesData[index].detail,
            image: cloudService.hero_image_url || cloudService.image || servicesData[index].image,
            tag: cloudService.category || cloudService.tag || servicesData[index].tag,
            involves: cloudService.process_description || servicesData[index].involves,
            bulletPoints: cloudService.features || servicesData[index].bulletPoints,
            isBulletStyle: !!cloudService.features || servicesData[index].isBulletStyle,
            order_index: cloudService.order_index ?? 999,
          };
        } else {
          const mapped = {
            id: cloudService.slug || cloudService.id,
            _dbId: cloudService.id,
            title: cloudService.name || cloudService.title,
            detail: cloudService.description || cloudService.detail,
            image: cloudService.hero_image_url || cloudService.image,
            tag: cloudService.category || cloudService.tag,
            involves: cloudService.process_description,
            bulletPoints: cloudService.features,
            isBulletStyle: !!cloudService.features,
            faq: [],
            order_index: cloudService.order_index ?? 999,
          };
          if (mapped.title && mapped.detail) servicesData.push(mapped);
        }
      });
      
      // Seřadíme pole podle admin panelu
      servicesData.sort((a, b) => (a.order_index ?? 999) - (b.order_index ?? 999));
    }

    // Napoj FAQs na příslušné služby (podle service_id = _dbId)
    if (!faqsRes.error && faqsRes.data && faqsRes.data.length > 0) {
      faqsRes.data.forEach(faq => {
        const svc = servicesData.find(s => s._dbId === faq.service_id);
        if (svc) {
          // Pokud poprvé narážíme na cloud FAQ pro tuto službu, vymažeme ty lokální (hardkódované)
          if (!svc._faqsHydrated) {
            svc.faq = [];
            svc._faqsHydrated = true;
          }
          
          // Přidej dotaz z cloudu
          svc.faq.push({ q: faq.question, a: faq.answer });
        }
      });
      console.log('Service FAQs loaded from Cloud');
    }

    // Napoj Before/After fotky na příslušné služby
    if (!beforeAfterRes.error && beforeAfterRes.data && beforeAfterRes.data.length > 0) {
      beforeAfterRes.data.forEach(item => {
        const svc = servicesData.find(s => s._dbId === item.service_id);
        if (svc && item.before_url && item.after_url) {
          if (!svc.beforeAfterPairs) svc.beforeAfterPairs = [];
          svc.beforeAfterPairs.push({ beforeImg: item.before_url, afterImg: item.after_url });
          
          // Zpětná kompatibilita pro první pár (nebo pokud by modal selhal)
          if (svc.beforeAfterPairs.length === 1) {
            svc.beforeImg = item.before_url;
            svc.afterImg = item.after_url;
          }
        }
      });
      console.log('Service Before/After loaded from Cloud');
    }

  } catch (e) {
    console.warn('Cloud hydration skipped (offline or not configured)');
  }
};
hydrateFromCloud();


const openServiceModal = (data) => {
  let modal = document.getElementById('service-modal-overlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'service-modal-overlay';
    document.body.appendChild(modal);
  }

  // Build Before/After section
  let beforeAfterHtml = '';
  const pairsToRender = data.beforeAfterPairs || [];
  if (pairsToRender.length === 0 && data.beforeImg && data.afterImg) {
    // fallback for statically defined items
    pairsToRender.push({ beforeImg: data.beforeImg, afterImg: data.afterImg });
  }

  if (pairsToRender.length > 0) {
    const gridsHtml = pairsToRender.map(pair => `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem;">
        <div style="position: relative; border-radius: 1rem; overflow: hidden; border: 2px solid #fee2e2; cursor: pointer;" onclick="window.nnf_openLightbox('${pair.beforeImg}')">
          <img src="${pair.beforeImg}" alt="Před" style="width: 100%; height: 140px; object-fit: cover;" onerror="this.parentElement.style.display='none'">
          <span style="position: absolute; bottom: 0.5rem; left: 0.5rem; background: #ef4444; color: white; padding: 0.15rem 0.5rem; border-radius: 99px; font-size: 0.7rem; font-weight: 800;">PŘED</span>
        </div>
        <div style="position: relative; border-radius: 1rem; overflow: hidden; border: 2px solid #bbf7d0; cursor: pointer;" onclick="window.nnf_openLightbox('${pair.afterImg}')">
          <img src="${pair.afterImg}" alt="Po" style="width: 100%; height: 140px; object-fit: cover;" onerror="this.parentElement.style.display='none'">
          <span style="position: absolute; bottom: 0.5rem; left: 0.5rem; background: #22c55e; color: white; padding: 0.15rem 0.5rem; border-radius: 99px; font-size: 0.7rem; font-weight: 800;">PO</span>
        </div>
      </div>
    `).join('');

    beforeAfterHtml = `
      <div class="before-after-section" style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #e2e8f0;">
        <h4 style="font-size: 0.875rem; font-weight: 800; text-transform: uppercase; color: #94a3b8; margin-bottom: 1rem; letter-spacing: 0.05em;">📷 Před a po</h4>
        ${gridsHtml}
      </div>
    `;
  }

  // Build "Co to obnáší" section
  const involvesHtml = data.involves ? `
    <div style="margin-top: 1.25rem; padding: 1.25rem; background: #f0f9ff; border-radius: 1rem; border: 1px solid #e0f2fe;">
      <h4 style="font-size: 0.813rem; font-weight: 800; text-transform: uppercase; color: #0369a1; margin-bottom: 0.5rem; letter-spacing: 0.05em;">📋 Co to obnáší?</h4>
      <div style="color: #334155; font-size: 0.875rem; line-height: 1.6; margin: 0;">${data.involves}</div>
    </div>
  ` : '';

  // Build Bullet Points section (for coating/secondary services)
  const bulletHtml = (data.isBulletStyle && data.bulletPoints && data.bulletPoints.length > 0) ? `
    <div style="margin-top: 1rem;">
      <ul style="list-style: none; padding: 0; margin: 0;">
        ${data.bulletPoints.map(bp => `
          <li style="display: flex; align-items: center; gap: 0.5rem; color: #1e293b; margin-bottom: 0.4rem; font-weight: 500; font-size: 0.875rem;">
            <span style="color: #F59E0B; font-size: 0.875rem; font-weight: 800;">✓</span> ${bp}
          </li>
        `).join('')}
      </ul>
    </div>
  ` : `
    <ul style="list-style: none; padding: 0; margin-top: 1rem;">
      <li style="display: flex; align-items: center; gap: 0.75rem; color: #1e293b; margin-bottom: 0.5rem; font-weight: 600;"> <span style="color: #F59E0B;">✓</span> Certifikovaná technologie </li>
      <li style="display: flex; align-items: center; gap: 0.75rem; color: #1e293b; margin-bottom: 0.5rem; font-weight: 600;"> <span style="color: #F59E0B;">✓</span> Záruka až 10 let </li>
      <li style="display: flex; align-items: center; gap: 0.75rem; color: #1e293b; font-weight: 600;"> <span style="color: #F59E0B;">✓</span> Zaměření zdarma </li>
    </ul>
  `;

  // Build FAQ section
  const faqHtml = (data.faq && data.faq.length > 0) ? `
    <div class="service-faq-section" style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #e2e8f0;">
      <h4 style="font-size: 0.875rem; font-weight: 800; text-transform: uppercase; color: #94a3b8; margin-bottom: 1rem; letter-spacing: 0.05em;">❓ Často kladené otázky</h4>
      <div class="faq-accordion" style="display: flex; flex-direction: column; gap: 0.5rem;">
        ${data.faq.map((item, idx) => `
          <div class="faq-item" style="border: 1px solid #e2e8f0; border-radius: 0.75rem; overflow: hidden;">
            <button class="faq-toggle" data-idx="${idx}" style="width: 100%; text-align: left; padding: 0.875rem 1rem; background: #fafafa; border: none; cursor: pointer; font-weight: 600; font-size: 0.813rem; color: #1e293b; display: flex; justify-content: space-between; align-items: center;">
              <span>${item.q}</span>
              <svg class="faq-arrow transition-transform flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(0deg); transition: transform 0.2s;">
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </button>
            <div class="faq-answer" style="display: none; padding: 0.75rem 1rem; background: white; font-size: 0.813rem; color: #475569; line-height: 1.6;">
              ${item.a}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  modal.innerHTML = `
    <div class="modal-content">
      <button class="close-modal-btn">&times;</button>
      <div class="modal-grid">
        <div class="modal-info-pane" style="overflow-y: auto; max-height: 90vh;">
          <div id="modal-image" class="service-image-header" style="background-image: url('${data.image}')">
            <div class="service-image-overlay"></div>
          </div>
          <div style="padding: 2.5rem; padding-top: 0;">
            <span class="service-tag" style="position: relative; z-index: 5; margin-top: -1rem; background: #FEF3C7; color: #F59E0B; padding: 0.25rem 0.75rem; border-radius: 99px; font-weight: 700; display: inline-block;">${data.tag}</span>
            <h3 class="modal-service-title">${data.title}</h3>
            <style>
              .rich-text p { margin-bottom: 1em; }
              .rich-text p:last-child { margin-bottom: 0; }
              .rich-text ul { list-style: disc; margin-left: 1.5rem; margin-bottom: 1em; }
              .rich-text ol { list-style: decimal; margin-left: 1.5rem; margin-bottom: 1em; }
              .rich-text strong { font-weight: 700; color: #1e293b; }
            </style>
            <div class="rich-text" style="line-height: 1.6; margin-bottom: 1.5rem; color: #475569;">${data.detail}</div>
            <div class="rich-text">${involvesHtml}</div>
            ${bulletHtml}
            ${beforeAfterHtml}
            ${faqHtml}
          </div>
        </div>
        <div class="modal-calc-pane" style="background: #f8fafc; padding: 2rem;">
          <h4 style="font-size: 1.125rem; font-weight: 700; color: #1e293b; margin-bottom: 0.5rem; text-transform: uppercase;">Kalkulátor ceny</h4>
          <p style="color: #64748b; font-size: 0.875rem; margin-bottom: 1.5rem;">Získejte okamžitý odhad ceny pro váš projekt.</p>
          
          <div id="m-form" style="background: white; padding: 1.5rem; border-radius: 1.5rem; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
            <div style="margin-bottom: 1rem;">
              <label style="display: block; font-size: 0.75rem; font-weight: 700; color: #94a3b8; margin-bottom: 0.4rem; text-transform: uppercase;">Plocha v m²</label>
              <div style="position: relative;">
                <input id="m-area" type="number" value="100" style="width: 100%; padding: 0.875rem; border: 2px solid #f1f5f9; background: #f8fafc; border-radius: 1rem; font-size: 1.25rem; font-weight: 700;">
                <span style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); font-weight: 700; color: #cbd5e1;">m²</span>
              </div>
            </div>
            <input id="m-name" type="text" placeholder="Vaše jméno" style="width: 100%; padding: 0.875rem; border: 2px solid #f1f5f9; background: #f8fafc; border-radius: 1rem; margin-bottom: 0.75rem;">
            <input id="m-phone" type="tel" placeholder="Telefonní číslo" style="width: 100%; padding: 0.875rem; border: 2px solid #f1f5f9; background: #f8fafc; border-radius: 1rem; margin-bottom: 1rem;">
            
            <button id="m-reveal" class="calc-cta" style="width: 100%; padding: 1.125rem; border-radius: 1rem; border: none; font-weight: 800; cursor: pointer; background: #F59E0B; color: white;">
              ZOBRAZIT CENU
            </button>
            <p style="margin-top: 0.75rem; font-size: 0.625rem; color: #94a3b8; text-align: center;">Odesláním získáte orientační kalkulaci.</p>
          </div>

          <div id="m-result" style="display: none; text-align: center; padding: 2rem 1rem;">
            <span style="font-size: 0.875rem; color: #64748b; font-weight: 600;">Předběžná cena pro vaši plochu:</span>
            <div id="m-price" style="font-size: 2.25rem; font-weight: 900; color: #F59E0B; margin: 0.5rem 0;">0 Kč</div>
            <div style="padding: 1rem; background: #f0fdf4; border-radius: 1rem; color: #166534; font-size: 0.813rem; font-weight: 700; border: 1px solid #dcfce7;">✓ Úspěšně odesláno. Zavoláme vám.</div>
          </div>

          <!-- Nanobot Bridge -->
          <div style="margin-top: 2rem; text-align: center; padding-top: 1.5rem; border-top: 1px dashed #e2e8f0;">
             <p style="font-size: 0.813rem; color: #64748b; margin-bottom: 0.75rem; font-weight: 500;">Máte k této službě dotazy?</p>
             <button onclick="document.getElementById('service-modal-overlay').style.display='none'; setTimeout(() => document.getElementById('ai-chat-launcher').click(), 200);" style="background: transparent; border: 2px solid #F59E0B; color: #F59E0B; padding: 0.6rem 1.25rem; border-radius: 12px; font-weight: 800; cursor: pointer; font-size: 0.813rem; display: inline-flex; align-items: center; gap: 0.5rem;">
                Zkusit Nanobota <span style="font-size: 1rem;">💬</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.style.display = 'flex';
  modal.dataset.activeId = data.id;

  // Event Listeners
  modal.querySelector('.close-modal-btn').onclick = () => modal.style.display = 'none';
  modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

  // FAQ accordion toggle
  modal.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.onclick = () => {
      const answer = btn.nextElementSibling;
      const arrow = btn.querySelector('.faq-arrow');
      const isOpen = answer.style.display === 'block';
      // Close all other answers
      modal.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
      modal.querySelectorAll('.faq-arrow').forEach(a => a.style.transform = 'rotate(0deg)');
      if (!isOpen) {
        answer.style.display = 'block';
        arrow.style.transform = 'rotate(180deg)';
      }
    };
  });

  // Calculator logic
  document.getElementById('m-reveal').onclick = () => {
    const name = document.getElementById('m-name').value;
    const phone = document.getElementById('m-phone').value;
    const area = parseInt(document.getElementById('m-area').value) || 0;
    if (!name || !phone) return alert('Prosím vyplňte jméno a telefon.');

    const base = (remotePrices[data.id] || 150) * area;
    const min = Math.round(base * 1.05 / 10) * 10;
    const max = Math.round(base * 1.15 / 10) * 10;

    document.getElementById('m-price').innerText = `${min.toLocaleString('cs-CZ')} – ${max.toLocaleString('cs-CZ')} Kč`;
    document.getElementById('m-price').style.color = '#F59E0B';
    document.getElementById('m-form').style.display = 'none';
    document.getElementById('m-result').style.display = 'block';

    // --- Supabase Inquiry Saving ---
    import('./supabase-config.js').then(({ supabase }) => {
      supabase.from('inquiries').insert({
        name: name,
        phone: phone,
        service: data.title,
        message: `Plocha: ${area} m2, Odhad ceny: ${min} - ${max} Kč`,
        source: 'Modal / Kalkulačka',
        status: 'new'
      }).then(({ error }) => {
        if (error) console.error('Cloud Save Error:', error);
        else console.log('Service inquiry saved to STRV Cloud');
      });
    });
  };
};

// Injection logic for supplemental services
document.addEventListener('DOMContentLoaded', () => {
  const injectSupplementalServices = () => {
    const serviceGrid = document.querySelector('#sluzby .grid');
    if (!serviceGrid) return;

    // Vymažeme statický React grid a nahradíme ho aktuálními daty
    serviceGrid.innerHTML = '';

    // Vykreslíme všechny služby seřazené podle pořadí, s aplikovanými úpravami z admin panelu
    servicesData.forEach(service => {
      const card = document.createElement('div');
      card.className = 'group relative bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in';
      card.innerHTML = `
        <div class="aspect-[16/9] overflow-hidden">
          <img src="${service.image}" alt="${service.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
        </div>
        <div class="p-6">
          <div class="flex items-center gap-2 mb-3">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">${service.tag}</span>
          </div>
          <h3 class="text-xl font-bold mb-2">${service.title}</h3>
          <div class="text-muted-foreground text-sm line-clamp-2">${service.detail}</div>
          <div class="mt-4 flex items-center text-primary font-bold text-sm">
            Zjistit více 
            <svg class="ml-2 transition-transform group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14m-7-7l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      `;
      card.onclick = () => openServiceModal(service);
      serviceGrid.appendChild(card);
    });
  };

  // Run with delay to ensure React has finished rendering the initial grid
  setTimeout(injectSupplementalServices, 1500);
});

// Interceptor with improved matching
document.addEventListener('click', (e) => {
  const card = e.target.closest('.group.relative.bg-card, .bg-white, .bg-card, [class*="rounded"]');
  const serviceSection = document.getElementById('sluzby');

  if (card && serviceSection?.contains(card)) {
    // If it's a dynamic card we just added, it already has an onclick, but we can verify here too
    if (e.defaultPrevented) return;

    const heading = card.querySelector('h3, h4, [class*="font-bold"], [class*="font-semibold"]');
    const headingText = (heading ? heading.innerText : card.innerText).toLowerCase().trim();

    const detectedData = servicesData.find(s => {
      const titleLower = s.title.toLowerCase();
      return headingText.includes(titleLower) || titleLower.includes(headingText);
    });

    if (detectedData) {
      e.preventDefault();
      e.stopPropagation();
      openServiceModal(detectedData);
    }
  }
}, true);

// Senior CTO: Expose for footer links
window.nnf_openService = (id) => {
  const data = servicesData.find(s => s.id === id);
  if (data) openServiceModal(data);
};

// --- Lightbox Implementation ---
window.nnf_openLightbox = (url) => {
  let lb = document.getElementById('nnf-lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'nnf-lightbox';
    lb.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.9); z-index:999999; display:none; align-items:center; justify-content:center; cursor:zoom-out; padding:2rem;';
    lb.innerHTML = '<img id="nnf-lb-img" style="max-width:100%; max-height:100%; object-fit:contain; border-radius:0.5rem; box-shadow:0 0 50px rgba(0,0,0,0.5); transition:transform 0.3s ease;">';
    lb.onclick = () => lb.style.display = 'none';
    document.body.appendChild(lb);
  }
  const img = document.getElementById('nnf-lb-img');
  img.src = url;
  lb.style.display = 'flex';
};
