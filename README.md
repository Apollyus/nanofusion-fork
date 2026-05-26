# NANOfusion - Konverzní web a CMS

Tento projekt je profesionální webová prezentace a administrativní systém pro společnost NANOfusion.

## Spuštění lokálně

1. Nainstalujte závislosti:
   ```bash
   npm install
   ```

2. Spusťte vývojový server:
   ```bash
   npm run dev
   ```

3. Otevřete prohlížeč na adrese `http://localhost:5173`.

## Struktura projektu

- `index.html` - Hlavní dokument a SEO nastavení.
- `static/admin.js` - Logika administrativního panelu (přístup přes #admin).
- `static/calculator.js` - Logika interaktivní kalkulace ceny.
- `static/logo.jpg` - Oficiální logo společnosti.
- `assets/` - Kompilované styly a hlavní logika webu.

## Administrace (CMS)

Vstup do správy je možný přes odkaz v patičce nebo přidáním `#admin` do URL.
Heslo: `admin123`
