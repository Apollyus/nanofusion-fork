# Oprava Race Conditions & Flashingu — revize 2 (SPA zůstává)

## Ověřená fakta (z kódu, bez spuštění)

- **Homepage**: finální obsah = React SPA (`/assets/index-DnPFhj9u.js`). Bundle končí
  `createRoot(#root).render(...)` a běží dřív než `main.js` (obě `type="module"`, SPA v `<head>`,
  main.js na konci `<body>`, deferred moduly běží v pořadí podle dokumentu). SPA tak
  **vymaže statický HTML v `#root`** a vyrenderuje svoji landing.
- **o-nas/faq/gdpr/obchodni-podminky**: `#root` je prázdný, obsah je mimo v `<main>`. SPA tam
  taky jede a mountem do prázdného `#root` **přidává svoji landing/„Go Home" nad realný obsah**
  (router nemá cestu pro tyto podstránky → padne na `*` fallback).
- **Service stránky** bundle nemají záměrně — komentář „No SPA bundle imported to prevent route conflicts".
- `main.js` už má orchestraci (preloader state `nnf_preloaderState`, `nnf_checkPreloader`,
  MutationObserver re-patchingu po re-renderu) a `offers.js` už je flash-safe
  (opacity 0 → hydrate → fade-in).
- Zbývající zdroje flash:
  1. preloader mizí dřív, než SPA dodá obsah (1,5 s pojistka + title/media ready),
  2. 300 ms fade hero titulku v `syncHeroText`,
  3. `reviews.js` / `faq.js` innerHTML-přepis sekcí.

## Změny

### A. Homepage — jeden cover, autorita = SPA

1. **Preloader čeká na `spaReady`**: rozšířit `nnf_preloaderState` (`main.js:1586`) o flag
   `spaReady`, který nastaví detekce v MutationObserveru (`main.js:1574`): `#root > div` přestal
   být loader/spinner a obsahuje reálné sekce. `nnf_checkPreloader` pak odchází jen když
   `titleReady && mediaReady && spaReady`. Pojistka homepage = max **3 s** (ne 8 s).
2. **`syncHeroText`** (`main.js:274-286`): zrušit 300 ms opacity-fade, psát `innerHTML` přímo
   (žádný fázový skok).
3. **`reviews.js`**: `injectReviews` — pokud `#reference` už obsahuje karty
   (`[class*="1e293b"]`, `.review-card-premium`), **nevyprázdňovat** a jen `dataset.injected = 'true'`.
4. **`faq.js` (řádek 113)**: stejně — `#faq` už má `.faq-item`? → nepropisovat `innerHTML`,
   jen `dataset.injected = 'true'`.
5. `offers.js`, `gallery-hero.js`, `main.js` MutationObserver — **beze změny logiky**, jen
   navaznost z bodu 1.

### B. Statické podstránky — vyloučit SPA

6. Odebrat `<script ... src="/assets/index-DnPFhj9u.js">` z: `o-nas` (`index.html` + `o-nas.html`),
   `faq`, `gdpr`, `obchodni-podminky` (+ kopie v `public/*`). **CSS `/assets/index-*.css`
   PONECHAT** (statické HTML ho potřebuje pro třídy `bg-card`, `text-muted-foreground` atd.).
   - Pilíř SPA zůstává na homepage (kde je finální renderer). Na statických podstránkách funguje
     pilíř 1 (statický) + pilíř 3 (main.js) — přesně jako service stránky.
   - Pokud by se později ukázalo, že na nějaké stránce SPA něco dodává záměrně, vrátit ho tam
     a duplicitu skrýt CSS.

### C. Koordinace bez nového frameworku

7. Žádný nový `nnf.ready` orchestr — rozšířit existující state z bodu 1. `service-detail.js`,
   `calculator.js`, `about-us.js`, `ai-chat.js` se nemění (nepřepisují cizí sekce ani nezpůsobují
   prvoplanový flash).

## Akční kroky

1. Ověřit chování SPA v prohlížeči (console chyba `/api/apps/...`? obsah `#root` po load?) —
   homepage i `/o-nas`.
2. `index.html` → preloader čeká na `spaReady`, pojistka 3 s.
3. `main.js` → `syncHeroText` bez fade; do MutationObserveru detekce `spaReady`.
4. `reviews.js` → nereplace, když sekce už obsahuje karty.
5. `faq.js` → nereplace, když sekce už obsahuje `.faq-item`.
6. Odstranit SPA script z o-nas/faq/gdpr/obchodni-podminky (+ `public/*` kopie).
7. `npm run dev` test: homepage (jedna obrazovka preloader → SPA finální, bez flash),
   `/o-nas` (bez duplicity), service stránka (beze změny).
8. `npm run build && npm run preview` — totéž na produkčním buildu.

## Akceptační kritéria

- Na homepage: jeden preloader → plynulý přechod do SPA obsahu; hero titulek bez skoku;
  recenze a FAQ bez swapu.
- Na `/o-nas` a spol.: žádný duplicitní blok nad obsahem, bez blikání.
- Žádné nové chyby v console.

## Stav implementace (2026-08-09)

### Empirické ověření z HAR (`localhost_Archive [26-08-09 12-19-25].har`)

- SPA bundle se načte a renderuje **default landing** z `media.base44.com` (4–7 fotografíí,
  1.4–2.2 MB), protože jeho API `/api/apps/...` vrací **404** (žádný proxy na `/api` neexistuje
  ani ve `vercel.json`).
- Všechna realná data (hero_title, services, reviews, faqs, realizations) teče z Supabase
  přímo do `main.js` + enhancerů (všechny REST = 200).
- Preloader mizel v ~1,5 s (pojistka `main.js`), data dorazila ~5,5 s → zobrazené mezistavy
  SPA default vs main.js data vs těžké obrázky (7+ MB) = ten brutalní flash.

### Provedené změny

1. `index.html` — emergency preloader fallback 4000 ms → **8000 ms**.
2. `public/static/main.js`:
   - `syncHeroText`: odstraněn 300 ms opacity-fade (píše se přímo).
   - `nnf_preloaderState` nový flag `spaSettled`; `nnf_checkPreloader` vyžaduje
     `titleReady && mediaReady && spaSettled`.
   - Detekce `spaSettled`: MutationObserver na `#root` čeká na reálné sekce (ne bootstrap
     spinner) s 200 ms debounce; pojistka 5 s.
   - Safety timeout homepage 1500 ms → **7000 ms**; fallback 4000 ms → **8000 ms**.
3. `public/static/reviews.js` — `injectReviews` **nevyprazdňuje** `#reference`, když už
   obsahuje `.review-card-premium` (SPA/statický HTML).
4. `public/static/faq.js` — `injectFaqs` **nepřepisuje** `#faq`, když už obsahuje `.faq-item`.
5. Odstraněn SPA script (`/assets/index-DnPFhj9u.js`) z 14 statických podstránek:
   `o-nas/*`, `o-nas.html`, `faq/index.html`, `gdpr/*`, `gdpr.html`,
   `obchodni-podminky/*`, `obchodni-podminky.html` + kopie v `public/*` a
   `admin-panel/public/*`. Na homepage (kde je finální renderer) **zůstává**.
   CSS `/assets/index-*.css` zůstává všude.

### Ověření (dev server 5173)

- Homepage: SPA script = 1, nový 8 s emergency = 1.
- `/o-nas`, `/faq`, `/gdpr`: SPA script = 0.
- `main.js`: `spaSettled` = 4×, opacity-fade = 0×.
- `reviews.js` / `faq.js`: guard přítomen.
- `node --check` na upravených JS = OK.

### Zbývá (manuální, v prohlížeči)

- Homepage: jeden bílý preloader → plynulé odhalení SPA finálního obsahu, bez mezistavů
  (průchod by měl trvat cca délku Supabase + SPA renderu, max ~7 s).
- Substránky: bez duplicitního SPA bloku.
- `npm run build && npm run preview` pro produkční verifikaci.

## Dodatek 2 — oprava `spaSettled` (reprodukovatelný flash v hero)

**Symptom uživatele:** na homepage "nadpis + bílé pozadí" → ~2 s → jiný (SPA) loader →
bg video + nadpis odskakuje + CTA. Tedy sled `statický fallback → SPA boot-spinner → SPA landing`.

**Příčina:** detekce `spaSettled` testovala jen "má `#root` sekce?". Statický fallback ale
sekce obsahuje a `main.js` ho vzápětí patchuje (badge row, CTA…) → mutace uvnitř `#root`
splnily podmínku PŘED tím, než se SPA vůbec stáhlo → preloader zmizel, fallback byl vidět,
a za ~2 s je SPA vytvořilo = flash.

**Oprava (`public/static/main.js`):** `spaSettled` se nyní nastaví jen když **oba** body:

1. `hasFallbackMarkers()` = z `#root` zmizely komentáře `<!-- SYNC:FALLBACK:... -->`
   (createRoot.render() vyprázdní celý `#root` = marker je pryč → SPA převzal stránku),
2. `hasRealSpaLayout()` = v `#root` je reálný layout (ne boot-spinner; guard na `.animate-spin`,
   childElementCount ≥ 2 / `<section>`),
3. + debounce 200 ms. Pojistka 5 s → **6 s** (kdyby SPA vůbec nenastartovalo, odhalí
   statický fallback).

Ověřeno na dev serveru: `hasFallbackMarkers` přítomen, starý `hasRealSections` pryč,
`node --check` OK.