// STRV-Grade Legal Pop-Up Modals (Obchodní podmínky & GDPR)
// Prevents page scroll, maintains exact viewport position, and displays formatted legal documents in a modal overlay.

const termsContent = `
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 1.25rem; border-radius: 1rem; margin-bottom: 1.75rem; font-size: 0.875rem; color: #475569; line-height: 1.6;">
    <p style="font-weight: 800; color: #0f172a; font-size: 1rem; margin-bottom: 0.25rem;">NANO FUSION s.r.o.</p>
    <p style="margin: 0;">Pod Nádražím 370, 664 01 Bílovice nad Svitavou, Česká republika</p>
    <p style="margin: 0.25rem 0 0;">IČ: 29375363</p>
    <p style="margin: 0.25rem 0 0;">
      Web: <a href="https://www.nanofusion.cz" target="_blank" style="color: #f59e0b; font-weight: 700; text-decoration: none;">www.nanofusion.cz</a> | 
      E-mail: <a href="mailto:info@nanofusion.cz" style="color: #f59e0b; font-weight: 700; text-decoration: none;">info@nanofusion.cz</a> | 
      Tel: <a href="tel:+420774509409" style="color: #f59e0b; font-weight: 700; text-decoration: none;">+420 774 509 409</a>
    </p>
  </div>

  <div style="display: flex; flex-direction: column; gap: 1.5rem; color: #334155; font-size: 0.95rem; line-height: 1.65;">
    <section>
      <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">1. Úvodní ustanovení</h3>
      <p style="margin: 0;">Tyto Všeobecné obchodní podmínky (dále jen „VOP“) upravují právní vztahy mezi společností Nano Fusion s.r.o. (dále jen „Zhotovitel“) a jejími zákazníky (dále jen „Zákazník“) při poskytování služeb v oblasti nátěrů a čištění fasád, střech a dlažeb.</p>
    </section>

    <section>
      <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">2. Uzavření smlouvy</h3>
      <p style="margin: 0;">Smlouva mezi Zhotovitelem a Zákazníkem je uzavřena na základě písemného potvrzení objednávky ze strany Zhotovitele. Objednávka může být učiněna písemně, elektronickou poštou nebo prostřednictvím webových stránek Zhotovitele.</p>
    </section>

    <section>
      <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">3. Cena a platební podmínky</h3>
      <p style="margin-bottom: 0.75rem;">Ceny za poskytované služby jsou stanoveny dle aktuálního ceníku Zhotovitele nebo na základě individuální nabídky. Zákazník je povinen uhradit cenu za služby ve lhůtě stanovené ve faktuře.</p>
      
      <div style="padding-left: 1rem; border-left: 3px solid #f59e0b; display: flex; flex-direction: column; gap: 0.75rem;">
        <div>
          <strong style="color: #0f172a; display: block; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.03em;">1. Splatnost faktur</strong>
          <ul style="margin: 0.25rem 0 0; padding-left: 1.25rem; font-size: 0.9rem;">
            <li>Faktury jsou splatné do 14 dnů od data jejich vystavení, pokud není dohodnuto jinak.</li>
            <li>V případě prodlení s platbou je Zákazník povinen uhradit úrok z prodlení ve výši 0,05 % z dlužné částky za každý den prodlení.</li>
          </ul>
        </div>

        <div>
          <strong style="color: #0f172a; display: block; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.03em;">2. Možnosti platebních metod</strong>
          <ul style="margin: 0.25rem 0 0; padding-left: 1.25rem; font-size: 0.9rem;">
            <li>Platby mohou být prováděny bankovním převodem na účet Zhotovitele uvedený na faktuře.</li>
            <li>Hotovostní platby jsou akceptovány pouze po předchozí domluvě a potvrzení ze strany Zhotovitele.</li>
            <li>Platby kartou a dalšími elektronickými metodami jsou možné, pokud jsou uvedeny jako akceptované platební metody na faktuře.</li>
          </ul>
        </div>

        <div>
          <strong style="color: #0f172a; display: block; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.03em;">3. Sankce za prodlení s platbou</strong>
          <ul style="margin: 0.25rem 0 0; padding-left: 1.25rem; font-size: 0.9rem;">
            <li>V případě prodlení s platbou je Zhotovitel oprávněn pozastavit další práce až do doby úhrady dlužné částky.</li>
            <li>Pokud Zákazník neuhradí dlužnou částku ani po písemné výzvě, je Zhotovitel oprávněn odstoupit od smlouvy a požadovat náhradu škody.</li>
          </ul>
        </div>
      </div>
    </section>

    <section>
      <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">4. Odstoupení od smlouvy a výpověď smlouvy</h3>
      <div style="padding-left: 1rem; border-left: 3px solid #f59e0b; display: flex; flex-direction: column; gap: 0.75rem;">
        <div>
          <strong style="color: #0f172a; display: block; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.03em;">1. Podmínky a postup pro odstoupení ze strany Zákazníka</strong>
          <ul style="margin: 0.25rem 0 0; padding-left: 1.25rem; font-size: 0.9rem;">
            <li>Zákazník může odstoupit od smlouvy písemným oznámením Zhotoviteli nejpozději 14 dní před zahájením prací.</li>
            <li>Při odstoupení od potvrzené smlouvy ze strany Zákazníka si Zhotovitel účtuje 15 % s 12% nebo 21% DPH manipulační poplatek z celkové ceny zakázky.</li>
          </ul>
        </div>

        <div>
          <strong style="color: #0f172a; display: block; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.03em;">2. Podmínky a postup pro odstoupení ze strany Zhotovitele</strong>
          <ul style="margin: 0.25rem 0 0; padding-left: 1.25rem; font-size: 0.9rem;">
            <li>Zhotovitel si vyhrazuje právo odstoupit od realizace práce bez udání důvodu, bez finančního vyrovnání objednatelem.</li>
            <li>V případě, že Zhotovitel odstoupí od smlouvy z důvodů na straně Zákazníka, je oprávněn účtovat vzniklé náklady.</li>
            <li>Pokud Zhotovitel odstoupí z jiných důvodů, vrátí Zákazníkovi veškeré uhrazené platby za neprovedené služby.</li>
          </ul>
        </div>
      </div>
    </section>

    <section>
      <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">5. Práva a povinnosti Zhotovitele</h3>
      <p style="margin-bottom: 0.35rem;">Zhotovitel se zavazuje:</p>
      <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem;">
        <li>Provést služby v dohodnutém rozsahu a kvalitě.</li>
        <li>Informovat Zákazníka o jakýchkoli změnách nebo problémech, které mohou ovlivnit realizaci služeb.</li>
        <li>V případě domluvených víceprací informovat Zákazníka o předpokládaném navýšení ceny a získat jeho souhlas.</li>
      </ul>
    </section>

    <section>
      <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">6. Práva a povinnosti Zákazníka</h3>
      <p style="margin-bottom: 0.35rem;">Zákazník je povinen:</p>
      <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem;">
        <li>Poskytnout Zhotoviteli potřebné informace a součinnost pro realizaci služeb.</li>
        <li>Uhradit cenu za poskytnuté služby ve stanovené lhůtě.</li>
        <li>Uhradit fakturovanou částku za domluvené vícepráce i bez písemného potvrzení víceprací. Provedení prací znamená souhlas.</li>
        <li>Uhradit navýšení výsledné ceny, pokud je způsobeno pigmentací barvy.</li>
      </ul>
    </section>

    <section>
      <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">7. Reklamace</h3>
      <p style="margin: 0;">Reklamace na provedené služby je Zákazník povinen uplatnit písemně bez zbytečného odkladu po zjištění vady, nejpozději však do 14 dnů od jejího vzniku. Zhotovitel se zavazuje reklamaci vyřídit v co nejkratší možné době, nejdéle však do 30 dnů.</p>
    </section>

    <section>
      <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">8. Ochrana osobních údajů</h3>
      <p style="margin: 0;">Zhotovitel zpracovává osobní údaje Zákazníků v souladu s platnými právními předpisy (GDPR).</p>
    </section>

    <section>
      <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">9. Odpovědnost za škody</h3>
      <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem;">
        <li>Zhotovitel nenese odpovědnost za škody způsobené vyšší mocí nebo nedodržením pokynů ze strany Zákazníka.</li>
        <li>Zákazník je povinen zajistit bezpečné a vhodné prostředí pro provádění prací.</li>
      </ul>
    </section>

    <section>
      <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">10. Závěrečná ustanovení</h3>
      <p style="margin: 0;">Tyto VOP jsou nedílnou součástí každé smlouvy uzavřené mezi Zhotovitelem a Zákazníkem.</p>
      <p style="font-weight: 800; color: #0f172a; margin-top: 0.5rem;">Tyto VOP nabývají účinnosti dne 1.1.2024.</p>
    </section>
  </div>
`;

const gdprContent = `
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 1.25rem; border-radius: 1rem; margin-bottom: 1.75rem; font-size: 0.875rem; color: #475569; line-height: 1.6;">
    <p style="font-weight: 800; color: #0f172a; font-size: 1rem; margin-bottom: 0.25rem;">Nano Fusion s.r.o.</p>
    <p style="margin: 0;">Pod Nádražím 370, 664 01 Bílovice nad Svitavou</p>
    <p style="margin: 0.25rem 0 0;">IČ: 29375363</p>
    <p style="margin: 0.25rem 0 0;">
      E-mail: <a href="mailto:info@nanofusion.cz" style="color: #f59e0b; font-weight: 700; text-decoration: none;">info@nanofusion.cz</a> | 
      Tel: <a href="tel:+420774509409" style="color: #f59e0b; font-weight: 700; text-decoration: none;">+420 774 509 409</a>
    </p>
  </div>

  <div style="display: flex; flex-direction: column; gap: 1.5rem; color: #334155; font-size: 0.95rem; line-height: 1.65;">
    <section>
      <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">I. Základní ustanovení</h3>
      <ol style="margin: 0; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.9rem;">
        <li>Správcem osobních údajů podle čl. 4 bod 7 nařízení Evropského parlamentu a Rady (EU) 2016/679 (dále jen „GDPR“) je <strong>Nano Fusion s.r.o.</strong>, IČ: 29375363, se sídlem Pod Nádražím 370, 664 01 Bílovice nad Svitavou (dále jen „správce“).</li>
        <li>Kontaktní údaje správce: adresa: Pod Nádražím 370, 664 01 Bílovice nad Svitavou, email: info@nanofusion.cz, tel: +420 774 509 409.</li>
        <li>Osobními údaji se rozumí veškeré informace o identifikované nebo identifikovatelné fyzické osobě.</li>
      </ol>
    </section>

    <section>
      <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">II. Zdroje a kategorie zpracovávaných osobních údajů</h3>
      <ol style="margin: 0; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.9rem;">
        <li>Správce zpracovává osobní údaje, které jste mu poskytl/a nebo které správce získal na základě plnění Vaší poptávky/objednávky.</li>
        <li>Správce zpracovává Vaše identifikační a kontaktní údaje nezbytné pro plnění smlouvy a vyhotovení cenové nabídky.</li>
      </ol>
    </section>

    <section>
      <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">III. Zákonný důvod a účel zpracování osobních údajů</h3>
      <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem;">
        <li>Plnění smlouvy nebo vyhotovení cenové nabídky podle čl. 6 odst. 1 písm. b) GDPR.</li>
        <li>Oprávněný zájem správce na poskytování přímého marketingu podle čl. 6 odst. 1 písm. f) GDPR.</li>
        <li>Váš souhlas se zpracováním osobních údajů pro účely vytvoření cenové nabídky a komunikace.</li>
      </ul>
    </section>

    <section>
      <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">IV. Doba uchovávání údajů</h3>
      <p style="margin: 0; font-size: 0.9rem;">Správce uchovává osobní údaje po dobu nezbytnou k výkonu práv a povinností vyplývajících ze smluvního vztahu (po dobu 15 let od ukončení smluvního vztahu) nebo do odvolání souhlasu.</p>
    </section>

    <section>
      <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">V. Příjemci osobních údajů</h3>
      <p style="margin: 0; font-size: 0.9rem;">Příjemci osobních údajů jsou osoby podílející se na dodání služeb, realizaci plateb a zajištění provozu webu a CRM systémů.</p>
    </section>

    <section>
      <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">VI. Vaše práva</h3>
      <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem;">
        <li>Právo na přístup ke svým osobním údajům dle čl. 15 GDPR.</li>
        <li>Právo na opravu osobních údajů dle čl. 16 GDPR.</li>
        <li>Právo na výmaz osobních údajů dle čl. 17 GDPR.</li>
        <li>Právo vznést námitku proti zpracování a právo na přenositelnost údajů.</li>
      </ul>
    </section>

    <section>
      <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">VII. Závěrečná ustanovení</h3>
      <p style="margin: 0; font-size: 0.9rem;">Odesláním formuláře potvrdíte, že jste seznámen/a s podmínkami ochrany osobních údajů a v celém rozsahu je přijímáte.</p>
      <p style="font-weight: 800; color: #0f172a; margin-top: 0.5rem;">Tyto podmínky nabývají účinnosti dnem 25.5.2018.</p>
    </section>
  </div>
`;

function ensureModalContainer() {
  let modalOverlay = document.getElementById('nnf-legal-modal-overlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'nnf-legal-modal-overlay';
    modalOverlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 999999;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.25rem;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.25s ease-out, visibility 0.25s ease-out;
    `;

    modalOverlay.innerHTML = `
      <div id="nnf-legal-modal-card" style="
        background: #ffffff;
        width: 100%;
        max-width: 840px;
        max-height: 85vh;
        border-radius: 1.75rem;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        position: relative;
        transform: scale(0.95);
        transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        border: 1px solid rgba(226, 232, 240, 0.8);
      ">
        <!-- Header -->
        <div style="padding: 1.25rem 1.75rem; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;">
          <div>
            <span style="background: rgba(245, 158, 11, 0.15); color: #d97706; font-size: 0.725rem; font-weight: 800; padding: 0.25rem 0.65rem; border-radius: 99px; text-transform: uppercase; letter-spacing: 0.05em;">Právní dokumenty</span>
            <h2 id="nnf-legal-modal-title" style="margin: 0.35rem 0 0; font-size: 1.35rem; font-weight: 900; color: #0f172a; font-family: inherit;"></h2>
          </div>
          <button id="nnf-legal-modal-close-x" style="background: #e2e8f0; border: none; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.25rem; font-weight: 700; color: #475569; transition: all 0.2s;" onmouseover="this.style.background='#cbd5e1'" onmouseout="this.style.background='#e2e8f0'">&times;</button>
        </div>

        <!-- Body -->
        <div id="nnf-legal-modal-body" style="padding: 1.75rem; overflow-y: auto; flex-grow: 1; font-family: inherit;">
        </div>

        <!-- Footer -->
        <div style="padding: 1rem 1.75rem; background: #f8fafc; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; flex-shrink: 0;">
          <button id="nnf-legal-modal-close-btn" style="background: #f59e0b; color: #ffffff; border: none; padding: 0.65rem 1.75rem; border-radius: 99px; font-weight: 800; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);" onmouseover="this.style.background='#d97706'" onmouseout="this.style.background='#f59e0b'">Zavřít</button>
        </div>
      </div>
    `;

    document.body.appendChild(modalOverlay);

    const closeModal = () => {
      modalOverlay.style.opacity = '0';
      modalOverlay.style.visibility = 'hidden';
      const card = document.getElementById('nnf-legal-modal-card');
      if (card) card.style.transform = 'scale(0.95)';
      document.body.style.overflow = '';
    };

    document.getElementById('nnf-legal-modal-close-x').onclick = closeModal;
    document.getElementById('nnf-legal-modal-close-btn').onclick = closeModal;
    modalOverlay.onclick = (e) => {
      if (e.target === modalOverlay) closeModal();
    };

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.style.visibility === 'visible') {
        closeModal();
      }
    });

    window.nnf_closeLegalModal = closeModal;
  }
}

export function openTermsModal(e) {
  if (e && e.preventDefault) {
    e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }
  ensureModalContainer();

  const titleEl = document.getElementById('nnf-legal-modal-title');
  const bodyEl = document.getElementById('nnf-legal-modal-body');
  const overlay = document.getElementById('nnf-legal-modal-overlay');
  const card = document.getElementById('nnf-legal-modal-card');

  if (titleEl) titleEl.innerText = 'Všeobecné obchodní podmínky';
  if (bodyEl) bodyEl.innerHTML = termsContent;

  if (overlay) {
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';
  }
  if (card) card.style.transform = 'scale(1)';
  document.body.style.overflow = 'hidden';
}

export function openGdprModal(e) {
  if (e && e.preventDefault) {
    e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }
  ensureModalContainer();

  const titleEl = document.getElementById('nnf-legal-modal-title');
  const bodyEl = document.getElementById('nnf-legal-modal-body');
  const overlay = document.getElementById('nnf-legal-modal-overlay');
  const card = document.getElementById('nnf-legal-modal-card');

  if (titleEl) titleEl.innerText = 'Zásady ochrany osobních údajů (GDPR)';
  if (bodyEl) bodyEl.innerHTML = gdprContent;

  if (overlay) {
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';
  }
  if (card) card.style.transform = 'scale(1)';
  document.body.style.overflow = 'hidden';
}

window.nnf_openTermsModal = openTermsModal;
window.nnf_openGdprModal = openGdprModal;

// Global Delegated Interceptor for Legal Links (Prevents page scroll)
document.addEventListener('click', (e) => {
  const btn = e.target.closest('a, button, [role="button"]');
  if (!btn) return;

  const href = (btn.getAttribute('href') || '').toLowerCase();
  const text = (btn.textContent || '').trim().toLowerCase();

  const isTerms = href.includes('obchodni-podminky') || href.includes('obchodní-podmínky') || text === 'obchodní podmínky' || text.includes('obchodní podmínky');
  const isGdpr = href.includes('gdpr') || text === 'gdpr' || text.includes('zpracováním osobních údajů') || text.includes('ochrana osobních údajů');

  if (isTerms) {
    e.preventDefault();
    e.stopPropagation();
    openTermsModal(e);
    return;
  }

  if (isGdpr) {
    // Only intercept if it's explicitly a link or clickable text for GDPR
    if (btn.tagName === 'A' || href.length > 0 || text === 'gdpr' || text.includes('ochrana osobních údajů')) {
      e.preventDefault();
      e.stopPropagation();
      openGdprModal(e);
      return;
    }
  }
}, true); // Use capture phase to intercept before default browser scroll jumps!
