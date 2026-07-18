import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

process.on('unhandledRejection', (reason, promise) => {
    fs.writeSync(1, `❌ Unhandled Rejection: ${reason && (reason.stack || reason.message || reason)}\n`);
    process.exit(1);
});
process.on('uncaughtException', (err) => {
    fs.writeSync(1, `❌ Uncaught Exception: ${err && (err.stack || err.message || err)}\n`);
    process.exit(1);
});

const supabaseUrl = 'https://mgmtkdwvhgrzefmyucvr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nbXRrZHd2aGdyemVmbXl1Y3ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMjc1NTUsImV4cCI6MjA5MTkwMzU1NX0.yWlwZvuTXmx8Op6BXR6t3z-xwXa1xWqwvklNLP1mOuk';
const supabase = createClient(supabaseUrl, supabaseKey);

// --- High-fidelity Catalog static fallbacks ---
const localCatalog = {
    'facade': {
        title: 'Čištění fasád',
        badge: 'PRÉMIOVÁ OCHRANA',
        subtitle: 'Hloubkové odstranění řas, plísní a atmosférických nečistot. Ochrana se zárukou až 10 let.',
        what_included: 'Řasy, plísně, smog a vlhkost fasády nejen oškliví, ale postupně ji poškozují. Včasné čištění a ochrana vás ušetří od drahých oprav. Naneseme speciální přípravek na organické nečistoty, naneseme aktivní pěnu a fasádu šetrně opláchneme nízkotlakým paprskem s regulovaným tlakem (max 60 barů). Tento tlak je dost silný na to, aby fasádu vyčistil, a zároveň ji nepoškodil. Na závěr fasádu ošetříme a naneseme prémiovou nano impregnaci.',
        benefits: [
            { title: 'Odstranění řas a plísní', desc: 'Vyčistíme fasádu od smogu, plísní, řas, prachu a organických nánosů.' },
            { title: 'Nano-ochrana až 10 let', desc: 'Špičková impregnace odpuzuje vodu a chrání povrch před špínou.' },
            { title: 'Nízkotlaké mytí', desc: 'Čistíme šetrně s regulovaným tlakem bez poškození fasádních omítek.' },
            { title: 'Záruka a garance', desc: 'Dlouhodobá záruka na opětovný výskyt organických nečistot.' }
        ],
        process: [
            { step: '01', title: 'Posouzení', desc: 'Zhodnotíme stav omítky a navrhneme vhodný čisticí postup.' },
            { step: '02', title: 'Zakrytí', desc: 'Bezpečně ochráníme okna, rostliny a bezprostřední okolí domu.' },
            { step: '03', title: 'Mytí', desc: 'Aplikace aktivní pěny a šetrné očištění nízkotlakou vodou.' },
            { step: '04', title: 'Impregnace', desc: 'Nanesení finální ochranné nano-impregnace s dlouhou životností.' }
        ],
        quote: 'Fasáda našeho domu vypadá jako nově natřená. Odvedli vynikající, rychlou a velmi čistou práci.',
        process_note: 'Běžný rodinný dům stihneme vyčistit a naimpregnovat za 1 až 2 dny.',
        beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800',
        afterImg: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        gallery: [
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600',
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600'
        ]
    },
    'roof': {
        title: 'Čištění střech',
        badge: 'PRODLOUŽENÍ ŽIVOTNOSTI',
        subtitle: 'Šetrné čištění střešní krytiny od mechů a lišejníků. Nano impregnace s garancí až 7 let.',
        what_included: 'Odstraňujeme mechy, řasy a lišejníky ze všech druhů střešních krytin. Používáme šetrné metody a regulovaný tlak vody, který krytinu nepoškodí. Po vyčištění aplikujeme dezinfekční postřik proti mechům a následně špičkovou nano impregnaci, která zamezí usazování nečistot a pronikání vody.',
        benefits: [
            { title: 'Všechny typy krytin', desc: 'Čistíme tašky pálené, betonové, plechové, šindel i eternit.' },
            { title: 'Prevence zatékání', desc: 'Odstraněním mechu zamezíme zadržování vody a degradaci krytiny.' },
            { title: 'Hydrofobní ochrana', desc: 'Nano impregnace odpuzuje vodu a poskytuje samočistící efekt.' },
            { title: 'Čištění okapů', desc: 'Součástí každé realizace je vyčištění a kontrola okapových žlabů.' }
        ],
        process: [
            { step: '01', title: 'Zajištění', desc: 'Kotvení lan a příprava na bezpečnou práci ve výškách.' },
            { step: '02', title: 'Čištění', desc: 'Hloubkový oplach střechy shora dolů tlakovou vodou.' },
            { step: '03', title: 'Dezinfekce', desc: 'Postřik proti mechům hubící mikroskopické zárodky a spory.' },
            { step: '04', title: 'Impregnace', desc: 'Aplikace hydrofobního nano nátěru s ochranou až na 7 let.' }
        ],
        quote: 'Střecha byla plná mechu a lišejníků. Po zásahu NANOfusion je opět jako nová. Skvělá a bezpečná práce.',
        process_note: 'Čištění a ochranu střechy rodinného domu dokončíme za 1 až 2 pracovní dny.',
        beforeImg: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?w=800',
        afterImg: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
        gallery: [
            'https://images.unsplash.com/photo-1632759145351-1d592919f522?w=600',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600',
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600',
            'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600'
        ]
    },
    'pavement': {
        title: 'Čištění dlažeb',
        badge: 'VZHLED NOVÉHO POVRCHU',
        subtitle: 'Odstranění mechů, plevele, olejových skvrn a zašlé špíny ze zámkové dlažby a betonu.',
        what_included: 'Čistíme zámkovou dlažbu, betonové plochy, terasy a přírodní kámen pomocí horké vody a speciálních rotačních čističů. Spáry zbavíme plevele a mechu. Po vyschnutí doplníme křemičitý písek do spár a dlažbu ošetříme impregnací nebo oživovacím nátěrem.',
        benefits: [
            { title: 'Horkovodní mytí', desc: 'Teplota vody až 90 °C rozpustí i hluboko zažranou mastnotu a oleje.' },
            { title: 'Likvidace plevele', desc: 'Kompletně vyčistíme spáry a zamezíme dalšímu růstu vegetace.' },
            { title: 'Ochrana povrchu', desc: 'Impregnace brání vsakování olejů a výrazně usnadňuje údržbu.' },
            { title: 'Doplnění spár', desc: 'Zasypání spár křemičitým pískem pro stabilitu a pevnost dlažby.' }
        ],
        process: [
            { step: '01', title: 'Příprava', desc: 'Odklizení překážek, hrubé zametení plochy a příprava techniky.' },
            { step: '02', title: 'Horké čištění', desc: 'Hloubkové mytí rotačním strojem bez rozstřiku nečistot.' },
            { step: '03', title: 'Zásyp spár', desc: 'Po vyschnutí plochy spáry kompletně zasypeme křemičitým pískem.' },
            { step: '04', title: 'Impregnace', desc: 'Aplikace hydrofobního nátěru pro trvalou čistotu a oživení barev.' }
        ],
        quote: 'Vyčištěná zámková dlažba a chodníky kolem domu prokoukly. Profesionální přístup i technika.',
        process_note: 'Dlažbu kolem běžného domu vyčistíme, zapískujeme a ošetříme za 1 den.',
        beforeImg: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
        afterImg: 'https://images.unsplash.com/photo-1520004434532-668416a08753?w=800',
        gallery: [
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
            'https://images.unsplash.com/photo-1520004434532-668416a08753?w=600',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
            'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600',
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600'
        ]
    },
    'pv': {
        title: 'Solární panely',
        badge: 'VYŠŠÍ ÚČINNOST',
        subtitle: 'Profesionální čištění solárních panelů pomocí šetrných kartáčů a demineralizované vody.',
        what_included: 'Odstraňujeme prach, pyl, ptačí trus a smog z fotovoltaických panelů. Používáme výhradně demineralizovanou vodu a speciální rotační kartáče, které povrch nepoškrábou. Na čisté panely nanášíme keramickou nano ochranu se samočistícím efektem.',
        benefits: [
            { title: 'Zvýšení výkonu FVE', desc: 'Čisté panely generují až o 25 % více elektrické energie.' },
            { title: 'Demineralizovaná voda', desc: 'Voda zbavená minerálů nezanechává šmouhy ani vodní kámen.' },
            { title: 'Keramická ochrana', desc: 'Keramická vrstva odpuzuje nečistoty a prach spláchne déšť.' },
            { title: 'Šetrný postup', desc: 'Měkké kartáče bezpečné pro antireflexní vrstvu panelů.' }
        ],
        process: [
            { step: '01', title: 'Kontrola', desc: 'Vizuální inspekce stavu a zapojení panelů před zahájením mytí.' },
            { step: '02', title: 'Mytí vodou', desc: 'Mytí demineralizovanou vodou bez chemických přísad.' },
            { step: '03', title: 'Aplikace', desc: 'Nanesení tekuté keramické nano ochrany na povrch panelů.' },
            { step: '04', title: 'Měření', desc: 'Zadokumentování čistého stavu panelů pro vyhodnocení.' }
        ],
        quote: 'Výkon naší domácí elektrárny po vyčištění stoupl o 18 %. Rychlá domluva a precizní práce.',
        process_note: 'Realizaci na rodinném domě stíháme obvykle za 2 až 4 hodiny.',
        beforeImg: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800',
        afterImg: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
        gallery: [
            'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600',
            'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600',
            'https://images.unsplash.com/photo-1508514224674-8f614a87c3f5?w=600',
            'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600',
            'https://images.unsplash.com/photo-1509390219972-e220b57700cf?w=600',
            'https://images.unsplash.com/photo-1548613053-220e2a8596ee?w=600',
            'https://images.unsplash.com/photo-1509390977259-247545b736b4?w=600',
            'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600'
        ]
    },
    'graffiti': {
        title: 'Odstranění graffiti',
        badge: 'RYCHLÁ POMOC',
        subtitle: 'Šetrné a rychlé odstranění graffiti ze všech typů povrchů a aplikace antigraffiti nátěru.',
        what_included: 'Odstraňujeme graffiti a tagy z fasád, betonu, cihel, kamene i plastu. Používáme speciální čisticí gely šetrné k podkladu. Po vyčištění doporučujeme aplikovat antigraffiti nátěr, ze kterého lze příští graffiti smýt pouhou teplou vodou.',
        benefits: [
            { title: 'Šetrná chemie', desc: 'Odstraňujeme barvy bez porušení podkladové omítky.' },
            { title: 'Antigraffiti ochrana', desc: 'Ochranný nátěr usnadní budoucí čištění a šetří náklady.' },
            { title: 'Rychlý výjezd', desc: 'Graffiti odstraňujeme co nejrychleji, aby neprovokovalo další.' },
            { title: 'Všechny materiály', desc: 'Poradíme si s cihlou, pískovcem, zateplením i dřevem.' }
        ],
        process: [
            { step: '01', title: 'Testování', desc: 'Zkušební vzorek pro výběr správného rozpouštědla.' },
            { step: '02', title: 'Aplikace', desc: 'Nanesení gelu na graffiti a rozpuštění barev.' },
            { step: '03', title: 'Oplach', desc: 'Opláchnutí horkou vodou pod regulovaným tlakem.' },
            { step: '04', title: 'Prevence', desc: 'Aplikace transparentní antigraffiti ochrany.' }
        ],
        quote: 'Graffiti z fasády naší prodejny zmizelo beze stopy. Skvělá a velmi rychlá služba.',
        process_note: 'Běžné graffiti na fasádě odstraníme a ošetříme během 2 až 5 hodin.',
        beforeImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
        afterImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800', // same fallback
        gallery: [
            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600',
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
            'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600',
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600'
        ]
    },
    'industrial': {
        title: 'Průmyslové čištění',
        badge: 'B2B ŘEŠENÍ',
        subtitle: 'Komplexní čištění průmyslových hal, výrobních provozů a skladů za plného chodu.',
        what_included: 'Nabízíme průmyslové mytí podlah, ocelových konstrukcí, opláštění hal, rozvodů a technologií. Používáme těžkou techniku a certifikovanou průmyslovou chemii. Práce provádíme i o víkendech nebo za provozu.',
        benefits: [
            { title: 'Práce za provozu', desc: 'Minimalizujeme omezení vaší výroby nebo skladování.' },
            { title: 'Profesionální technika', desc: 'Využíváme plošiny, podlahové mycí stroje a horkovodní čištění.' },
            { title: 'Bezpečnost práce', desc: 'Náš tým má veškerá školení pro práci ve výškách a s technikou.' },
            { title: 'Ekologická likvidace', desc: 'Likvidujeme odpadní vody a nečistoty dle platných norem.' }
        ],
        process: [
            { step: '01', title: 'Audit', desc: 'Prohlídka objektu a vypracování plánu prací.' },
            { step: '02', title: 'Zabezpečení', desc: 'Vymezení pracovních zón a ochrana technologií.' },
            { step: '03', title: 'Čištění', desc: 'Mytí konstrukcí, opláštění a hloubkové mytí podlah.' },
            { step: '04', title: 'Předání', desc: 'Kontrolní předání a ekologická likvidace odpadu.' }
        ],
        quote: 'Čištění naší výrobní haly proběhlo bez přerušení provozu. Výborná organizace a profesionalita.',
        process_note: 'Časový harmonogram přizpůsobíme plně vašim směnám a požadavkům.',
        gallery: [
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
            'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600',
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600',
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600',
            'https://images.unsplash.com/photo-1600566753382-b3414909a5e8?w=600'
        ]
    },
    'facade-paint': {
        title: 'Nátěry fasád',
        badge: 'NOVÝ VZHLED',
        subtitle: 'Prémiové nátěry fasád barvami Caparol se zárukou stálosti pigmentu až 14 let.',
        what_included: 'Ve spolupráci s německým výrobcem barev Caparol nabízíme kompletní renovaci a nátěry fasád rodinných a bytových domů. Před samotným nátěrem fasádu hloubkově vyčistíme, sanujeme trhliny a naneseme penetrační nátěr.',
        benefits: [
            { title: 'Barvy Caparol', desc: 'Používáme nejkvalitnější silikonové a nano-křemíkové barvy.' },
            { title: 'Garance 14 let', desc: 'Záruka na stálost barevného odstínu a ochranu před řasami.' },
            { title: 'Příprava v ceně', desc: 'Hloubkové očištění fasády před nátěrem je součástí služby.' },
            { title: 'Oprava prasklin', desc: 'Sanujeme drobné trhliny a nerovnosti omítky.' }
        ],
        process: [
            { step: '01', title: 'Příprava', desc: 'Čištění fasády tlakovou vodou a sanace řas.' },
            { step: '02', title: 'Opravy', desc: 'Tmelení prasklin a vysprávky poškozené omítky.' },
            { step: '03', title: 'Penetrace', desc: 'Nanesení podkladového nátěru pro sjednocení savosti.' },
            { step: '04', title: 'Nátěr', desc: 'Dvojitý nátěr prémiovou fasádní barvou Caparol.' }
        ],
        quote: 'Náš dům po nátěru vypadá naprosto úžasně. Oceňuji čistotu práce a dodržení termínů.',
        process_note: 'Nátěr rodinného domu trvá obvykle 3 až 5 dní v závislosti na počasí.',
        beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800',
        afterImg: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        gallery: [
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
            'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600',
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600',
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600'
        ]
    },
    'roof-paint': {
        title: 'Nátěry střech',
        badge: 'DLOUHODOBÁ OCHRANA',
        subtitle: 'Nátěry střešních krytin dvousložkovými barvami se samočistícím efektem a životností 20 let.',
        what_included: 'Provádíme nátěry betonových, taškových a plechových střech. Používáme dvousložkové polyuretanové a akrylátové barvy odolné vůči UV záření a krupobití. Střechu před nátěrem dokonale vyčistíme a odmastíme.',
        benefits: [
            { title: 'Životnost až 20 let', desc: 'Kvalitní dvousložkové barvy chrání střechu na dvě dekády.' },
            { title: 'Samočistící efekt', desc: 'Hladký povrch brání usazování mechů a prachu.' },
            { title: 'UV stabilita', desc: 'Barvy neblednou a chrání krytinu před popraskáním.' },
            { title: 'Příprava v ceně', desc: 'Hloubkové tlakové čištění střechy je v ceně nátěru.' }
        ],
        process: [
            { step: '01', title: 'Mytí', desc: 'Tlakové čištění a odmaštění povrchu krytiny.' },
            { step: '02', title: 'Penetrace', desc: 'Nanesení základové barvy pro vysokou přilnavost.' },
            { step: '03', title: 'První nátěr', desc: 'Aplikace první vrstvy ochranného nátěru.' },
            { step: '04', title: 'Druhý nátěr', desc: 'Finální nátěr pro dokonalý vzhled a trvanlivost.' }
        ],
        quote: 'Natření plechové střechy proběhlo perfektně. Střecha vypadá skvěle a mech už nemá šanci.',
        process_note: 'Nátěr střechy rodinného domu zabere 2 až 3 pracovní dny.',
        beforeImg: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?w=800',
        afterImg: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
        gallery: [
            'https://images.unsplash.com/photo-1632759145351-1d592919f522?w=600',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600',
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
            'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600',
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600',
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600'
        ]
    },
    'impregnation': {
        title: 'Nano impregnace',
        badge: 'NANO OCHRANA',
        subtitle: 'Dlouhodobá hydrofobní a oleofobní impregnace fasád, střech, kamene a dlažeb.',
        what_included: 'Aplikujeme nejmodernější hydrofobní nano impregnace na porézní stavební materiály. Nano částice proniknou hluboko do struktury materiálu, kde vytvoří neviditelnou ochrannou vrstvu, která odpuzuje vodu a nečistoty.',
        benefits: [
            { title: 'Odpuzování vody', desc: 'Voda stéká v kapkách (tzv. lotosový efekt) a nevsakuje se.' },
            { title: 'Paropropustnost', desc: 'Materiál zůstává prodyšný, což brání vzniku plísní uvnitř.' },
            { title: 'Prodloužení životnosti', desc: 'Chrání materiály před mrazem, UV zářením a zvětráváním.' },
            { title: 'Snadná údržba', desc: 'Povrch se čistí sám při každém dešti.' }
        ],
        process: [
            { step: '01', title: 'Očištění', desc: 'Povrch musí být dokonale čistý, suchý a odmaštěný.' },
            { step: '02', title: 'Aplikace', desc: 'Nástřik nano impregnace speciální nízkotlakou metodou.' },
            { step: '03', title: 'Penetrace', desc: 'Zajištění rovnoměrného vsáknutí přípravku do pórů.' },
            { step: '04', title: 'Vytvrzení', desc: 'Ochrana dosáhne plné účinnosti po 24 hodinách.' }
        ],
        quote: 'Naimpregnovaná terasa se udržuje neskutečně snadno. Voda na ní dělá krásné kuličky.',
        process_note: 'Aplikace na očištěný povrch rodinného domu trvá 1 den.',
        beforeImg: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
        afterImg: 'https://images.unsplash.com/photo-1520004434532-668416a08753?w=800',
        gallery: [
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
            'https://images.unsplash.com/photo-1520004434532-668416a08753?w=600',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
            'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600',
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600'
        ]
    },
    'antislip': {
        title: 'Protiskluzová úprava',
        badge: 'BEZPEČNOST',
        subtitle: 'Chemická protiskluzová úprava mokrých povrchů bez změny vzhledu materiálu.',
        what_included: 'Aplikujeme protiskluzovou úpravu na dlažbu, mramor, žulu, PVC a linoleum. Vhodné pro okolí bazénů, koupelny, wellness centra, chodby, schodiště a komerční prostory. Zvyšuje bezpečnost za mokra.',
        benefits: [
            { title: 'Zvýšení přilnavosti', desc: 'Výrazně snižuje riziko uklouznutí na mokrém povrchu.' },
            { title: 'Bez změny vzhledu', desc: 'Úprava je okem neviditelná a nemění barvu ani lesk dlažby.' },
            { title: 'Dlouhá účinnost', desc: 'Ochranná protiskluzová vrstva vydrží několik let.' },
            { title: 'Splňuje normy', desc: 'Certifikované řešení splňující české i evropské normy.' }
        ],
        process: [
            { step: '01', title: 'Mytí', desc: 'Důkladné očištění a odmaštění podlahové plochy.' },
            { step: '02', title: 'Aplikace', desc: 'Nanesení protiskluzového roztoku na povrch.' },
            { step: '03', title: 'Reakce', desc: 'Kontrolované působení přípravku (mikroskopické zdrsnění).' },
            { step: '04', title: 'Oplach', desc: 'Neutralizace a oplach čistou vodou.' }
        ],
        quote: 'Protiskluzová úprava kolem našeho bazénu funguje skvěle. Děti už na mokré dlažbě nekloužou.',
        process_note: 'Aplikaci v koupelně nebo u bazénu rodinného domu stihneme za 2 až 4 hodiny.',
        beforeImg: 'https://images.unsplash.com/photo-1520004434532-668416a08753?w=800',
        afterImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
        gallery: [
            'https://images.unsplash.com/photo-1520004434532-668416a08753?w=600',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600',
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
            'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600',
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600'
        ]
    },
    'ceramfloor': {
        title: 'IG CeramFloor',
        badge: 'PRŮMYSLOVÁ OCHRANA',
        subtitle: 'Vysoce odolná polymerní ochrana průmyslových podlah IG CeramFloor s protiskluzem.',
        what_included: 'Aplikujeme polymerní nátěrový systém IG CeramFloor na betonové a epoxidové podlahy v halách, skladech, potravinářských provozech a zemědělství. Nabízí extrémní chemickou a mechanickou odolnost.',
        benefits: [
            { title: 'Extrémní odolnost', desc: 'Odolává pojezdu vysokozdvižných vozíků a těžké techniky.' },
            { title: 'Chemická stálost', desc: 'Odolný vůči olejům, kyselinám, rozpouštědlům i dezinfekcím.' },
            { title: 'Rychlé vytvrzení', desc: 'Podlaha je plně zatížitelná již po 24 hodinách od aplikace.' },
            { title: 'Hygienická nezávadnost', desc: 'Vhodné i do potravinářských a zdravotnických provozů.' }
        ],
        process: [
            { step: '01', title: 'Broušení', desc: 'Mechanická příprava povrchu (broušení nebo tryskání).' },
            { step: '02', title: 'Opravy', desc: 'Sanace výtluků, prasklin a dilatací v betonu.' },
            { step: '03', title: 'Základ', desc: 'Aplikace penetrační a adhezní vrstvy.' },
            { step: '04', title: 'Nátěr', desc: 'Nanesení vysoce odolného systému IG CeramFloor.' }
        ],
        quote: 'Podlaha v našem autoservisu po aplikaci CeramFloor drží skvěle a velmi snadno se čistí.',
        process_note: 'Doba realizace závisí na ploše, obvykle 1 až 3 pracovní dny.',
        beforeImg: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
        afterImg: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800', // same
        gallery: [
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
            'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600',
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600',
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600',
            'https://images.unsplash.com/photo-1600566753382-b3414909a5e8?w=600'
        ]
    },
    'antibac': {
        title: 'Antibakteriální ochrana',
        badge: 'HYGIENA',
        subtitle: 'Dlouhodobá dezinfekce a ochrana všech typů povrchů se samočistícím a antivirovým efektem.',
        what_included: 'Aplikujeme certifikovaný polymerní antibakteriální a antivirový přípravek IMPAGUARD GCA s účinností až 120 dní. Aktivně ničí viry, bakterie a plísně. Ideální pro zdravotnická zařízení, kanceláře, školy, školky a rodinné domy.',
        benefits: [
            { title: 'Účinnost až 120 dní', desc: 'Dlouhodobá aktivní ochrana povrchů proti virům a bakteriím.' },
            { title: 'Antibakteriální i antivirová', desc: 'Certifikovaná chemie ničící patogeny včetně obalených virů.' },
            { title: 'Vysoká zátěž', desc: 'Vhodné pro často dotýkané plochy (kliky, stoly, zábradlí).' },
            { title: 'Bezpečné pro zdraví', desc: 'Přípravek je hypoalergenní a naprosto bezpečný pro člověka.' },
            { title: 'Neviditelná vrstva', desc: 'Nemění vzhled, omak ani lesk ošetřených materiálů.' }
        ],
        process: [
            { step: '01', title: 'Posouzení', desc: 'Vyšetříme stav povrchů a navrhneme optimální pokrytí.' },
            { step: '02', title: 'Příprava', desc: 'Důkladné očištění a odmaštění ploch před aplikací.' },
            { step: '03', title: 'Aplikace', desc: 'Nástřik aktivního dezinfekčního nano-přípravku IMPAGUARD.' },
            { step: '04', title: 'Zaschnutí', desc: 'Vytvoření stabilní, dlouhodobě aktivní ochranné vrstvy během minut.' }
        ],
        quote: 'Po aplikaci antibakteriální ochrany v naší ordinaci se cítíme bezpečněji. Profesionální přístup a rychlá realizace.',
        process_note: 'Aplikaci v rodinném domě nebo menší kanceláři stihneme za 2 až 4 hodiny.',
        beforeImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
        afterImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800', // same
        gallery: [
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600',
            'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600',
            'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
            'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600',
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600'
        ]
    }
};

async function syncContent() {
    console.log('🚀 Starting NANOfusion Content Sync...');

    try {
        // 1. Fetch Data (Extended table queries)
        console.log('📡 Fetching data from Supabase...');
        const [
            configRes,
            servicesRes,
            portfolioRes,
            reviewsRes,
            faqsRes,
            serviceFaqsRes,
            serviceBeforeAfterRes,
            serviceReviewsRes
        ] = await Promise.all([
            supabase.from('site_config').select('*'),
            supabase.from('services').select('*').eq('is_active', true).order('order_index', { ascending: true }),
            supabase.from('realizations').select('*, realization_photos(*)').eq('is_published', true).order('created_at', { ascending: false }),
            supabase.from('external_reviews').select('*').eq('approved', true).order('published_at', { ascending: false }),
            supabase.from('faqs').select('*').eq('is_active', true).order('order_index', { ascending: true }),
            supabase.from('service_faqs').select('*').eq('is_active', true).order('order_index', { ascending: true }),
            supabase.from('service_before_after').select('*').order('order_index', { ascending: true }),
            supabase.from('service_reviews').select('*').eq('is_visible', true).order('created_at', { ascending: false })
        ]);

        const dbServices = servicesRes.data || [];
        const dbServiceFaqs = serviceFaqsRes.data || [];
        const dbBeforeAfter = serviceBeforeAfterRes.data || [];
        const dbServiceReviews = serviceReviewsRes.data || [];

        // 2. Generate Sections HTML

        // --- SERVICES LISTING (Homepage Grid) ---
        const servicesHtml = `
        <section id="sluzby" class="py-24 bg-white">
            <div class="container mx-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${dbServices.map(s => {
            const tag = s.category || s.tag || 'Služba';
            const image = s.hero_image_url || s.image;
            const title = s.name || s.title;
            const desc = s.description || s.detail;
            return `
                        <div onclick="window.location.href='/sluzby/${s.slug}'" class="group relative bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in">
                            <div class="aspect-[16/9] overflow-hidden">
                                <img src="${image}" alt="${title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                            </div>
                            <div class="p-6">
                                <div class="flex items-center gap-2 mb-3">
                                    <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">${tag}</span>
                                </div>
                                <h3 class="text-xl font-bold mb-2">${title}</h3>
                                <div class="text-muted-foreground text-sm line-clamp-2">${desc}</div>
                                <div class="mt-4 flex items-center text-primary font-bold text-sm">
                                    Zjistit více 
                                    <svg class="ml-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M5 12h14m-7-7l7 7-7 7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        `;
        }).join('')}
                </div>
            </div>
        </section>`;

        // --- PORTFOLIO ---
        const portfolioHtml = `
        <section id="realizace" class="py-32 bg-slate-50 relative overflow-hidden">
            <div class="container mx-auto px-6">
                <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-heading">Naše realizace</h2>
                        <p class="text-slate-500 text-lg max-w-xl">Ukázky naší práce z celé České republiky.</p>
                    </div>
                </div>
                <div style="display: flex; gap: 1.5rem; overflow-x: auto; padding: 1rem 0 3rem; scrollbar-width: none;">
                    ${(portfolioRes.data || []).map(p => `
                        <div style="flex: 0 0 400px; background: white; border-radius: 1.5rem; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                            <img src="${p.realization_photos?.[0]?.url}" alt="${p.title}" style="width: 100%; height: 250px; object-fit: cover;">
                            <div style="padding: 2rem;">
                                <span style="color: #f59e0b; font-weight: 800; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;">${p.work_type}</span>
                                <h3 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin-top: 0.5rem;">${p.title}</h3>
                                <p style="color: #64748b; font-size: 0.875rem; margin-top: 1rem;">${p.location}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>`;

        // --- REVIEWS ---
        const reviewsHtml = `
        <section id="reference" class="py-24 bg-slate-950 text-white">
            <div class="container mx-auto px-6 text-center">
                <h2 class="text-4xl md:text-5xl font-bold mb-16">Co o nás říkají naši klienti</h2>
                <div style="display: flex; gap: 1.5rem; overflow-x: auto; padding-bottom: 2rem; scrollbar-width: none;">
                    ${(reviewsRes.data || []).map(r => {
                        const stars = '★'.repeat(r.rating || 5) + '☆'.repeat(5 - (r.rating || 5));
                        const sourceText = r.source === 'google' ? 'recenze z Google' : r.source === 'firmy' ? 'recenze z Firmy.cz' : 'Ověřená recenze';
                        return `
                        <div style="flex: 0 0 350px; background: #1e293b; border-radius: 1.5rem; padding: 2.5rem; text-align: left;">
                            <div style="color: #f59e0b; margin-bottom: 1rem;">${stars}</div>
                            <p style="color: #cbd5e1; font-style: italic; margin-bottom: 1.5rem;">"${r.content || ''}"</p>
                            <h4 style="font-weight: 700;">${r.author || 'Ověřený zákazník'}</h4>
                            <p style="color: #64748b; font-size: 0.85rem;">${sourceText}</p>
                        </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </section>`;

        // --- ABOUT US ---
        const configData = configRes.data || [];
        const configMap = configData.reduce((acc, item) => {
            acc[item.key] = item.value;
            return acc;
        }, {});

        const aboutTitle = configMap.about_title || 'Příběh preciznosti a inovace';
        const aboutSubtitle = configMap.about_subtitle || '14 let pečujeme o to, co jste usilovně vybudovali';
        const aboutDescription = configMap.about_description || 'NANOfusion vznikla z vášně pro detail a potřeby chránit to, co naši klienti usilovně vybudovali.';

        let aboutStats = [];
        try {
            aboutStats = configMap.about_stats ? JSON.parse(configMap.about_stats) : [
                { label: 'Realizací', value: '950+' },
                { label: 'Let garance', value: '10' },
                { label: 'Let zkušeností', value: '14' }
            ];
        } catch (e) {
            aboutStats = [
                { label: 'Realizací', value: '950+' },
                { label: 'Let garance', value: '10' },
                { label: 'Let zkušeností', value: '14' }
            ];
        }

        let aboutCerts = [];
        try {
            aboutCerts = configMap.about_certificates ? JSON.parse(configMap.about_certificates) : [];
        } catch (e) {
            aboutCerts = [];
        }

        const statsHtml = aboutStats.map(s => `
            <div class="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center">
                <div class="text-amber-500 font-bold text-4xl mb-2">${s.value}</div>
                <h3 class="text-slate-500 text-sm uppercase tracking-wider font-bold">${s.label}</h3>
            </div>
        `).join('');

        const certsHtml = aboutCerts.length > 0
            ? `
            <h2 class="text-3xl font-bold text-slate-900 mt-16 mb-6">Naše certifikace a odbornost</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                ${aboutCerts.map(c => `
                    <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
                        <img src="${c.imageUrl ? c.imageUrl.replace(/\s+/g, '') : ''}" alt="${c.title}" class="w-full h-48 object-cover rounded-2xl mb-4">
                        <h3 class="text-xl font-bold text-slate-900 mb-2">${c.title}</h3>
                        <p class="text-slate-500 text-sm leading-relaxed">${c.description}</p>
                    </div>
                `).join('')}
            </div>`
            : '';

        const aboutUsHtml = `
            <h1 class="text-4xl md:text-6xl font-bold text-slate-900 mb-8 font-heading">${aboutTitle}</h1>
            <div class="prose prose-slate lg:prose-xl max-w-none">
                <p class="text-xl text-slate-600 leading-relaxed mb-8">${aboutSubtitle}</p>
                <div style="white-space: pre-wrap;" class="text-slate-600 mb-8">${aboutDescription}</div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">${statsHtml}</div>
                ${certsHtml}
                <div class="bg-slate-900 text-white p-12 rounded-[2rem] my-16 relative overflow-hidden">
                    <div class="relative z-10">
                        <h3 class="text-2xl font-bold mb-4">Proč NANOfusion?</h3>
                        <ul class="space-y-4 opacity-90">
                            <li class="flex items-center gap-3"><span class="text-amber-500">✔</span> Vlastní prověřené postupy a certifikovaná chemie</li>
                            <li class="flex items-center gap-3"><span class="text-amber-500">✔</span> Zaměření a konzultace po celé ČR zdarma</li>
                            <li class="flex items-center gap-3"><span class="text-amber-500">✔</span> Tým specialistů s mnohaletou praxí</li>
                        </ul>
                    </div>
                    <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
                </div>
            </div>`;

        // --- FAQ ---
        const faqsResData = faqsRes.data || [];
        const faqsHtml = `
        <section id="faq" class="py-24 bg-slate-50">
            <div class="container mx-auto px-6">
                <div class="max-w-4xl mx-auto" style="margin-bottom: 3.5rem;">
                    <h1 class="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-heading">Často kladené dotazy</h1>
                    <p class="text-xl text-slate-600 leading-relaxed">Vše, co potřebujete vědět o našich technologiích, postupech a zárukách.</p>
                </div>
                <div class="max-w-4xl mx-auto">
                    ${faqsResData.map(f => `
                        <div class="faq-item" style="margin-bottom: 1.25rem; border: 1px solid #e2e8f0; border-radius: 0.875rem; overflow: hidden; background: white; transition: all 0.3s ease;">
                            <button onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('svg').classList.toggle('rotate-180')"
                                    style="width: 100%; text-align: left; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; background: none; border: none; cursor: pointer;">
                                <span style="font-weight: 700; color: #1e293b; font-size: 0.938rem;">${f.question}</span>
                                <svg class="transition-transform flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </button>
                            <div class="hidden" style="padding: 0 1.5rem 1.25rem; color: #64748b; line-height: 1.6; font-size: 0.875rem;">
                                ${f.answer}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>`;

        // 3. Update HTML files (Robust Multi-Path Support)
        const filesToUpdate = [
            'index.html',
            'o-nas.html',
            'faq/index.html',
            'public/o-nas.html',
            'public/faq/index.html',
            'admin-panel/public/o-nas.html',
            'admin-panel/public/faq/index.html'
        ];

        for (const filename of filesToUpdate) {
            if (!fs.existsSync(filename)) continue;
            let content = fs.readFileSync(filename, 'utf8');

            content = replaceSyncBlock(content, 'SERVICES', servicesHtml);
            content = replaceSyncBlock(content, 'PORTFOLIO', portfolioHtml);
            content = replaceSyncBlock(content, 'REVIEWS', reviewsHtml);
            content = replaceSyncBlock(content, 'ABOUT_US', aboutUsHtml);
            content = replaceSyncBlock(content, 'FAQ', faqsHtml);

            if (filename === 'index.html') {
                const heroTitleText = configMap.hero_title || 'Špičková péče o to, co jste usilovně vybudovali';
                const fallbackHtml = `
                <header style="padding: 1rem; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                    <a href="/" style="font-weight: bold; font-size: 1.5rem; text-decoration: none; color: #0f172a;">NANOfusion</a>
                    <nav style="display: flex; gap: 1.5rem;">
                        <a href="/" style="text-decoration: none; color: #0f172a; font-weight: 500;">Domů</a>
                        <a href="#sluzby" style="text-decoration: none; color: #0f172a; font-weight: 500;">Služby</a>
                        <a href="#realizace" style="text-decoration: none; color: #0f172a; font-weight: 500;">Reference</a>
                        <a href="/o-nas" style="text-decoration: none; color: #0f172a; font-weight: 500;">O nás</a>
                        <a href="/faq" style="text-decoration: none; color: #0f172a; font-weight: 500;">Časté dotazy</a>
                    </nav>
                </header>
                <main style="max-width: 1200px; margin: 0 auto; padding: 2rem 1rem;">
                    <section class="hero" style="text-align: center; padding: 4rem 1rem; background: #f8fafc; border-radius: 2rem; margin-bottom: 3rem;">
                        <h1 style="font-size: 3rem; font-weight: 900; color: #0f172a; line-height: 1.2; margin-bottom: 1.5rem;">${heroTitleText}</h1>
                        <p style="font-size: 1.25rem; color: #64748b; max-width: 800px; margin: 0 auto;">Specialisté na profesionální čištění a dlouhodobou nano-ochranu střech, fasád, dlažeb a fotovoltaiky.</p>
                    </section>
                    <section id="sluzby-sec" style="margin-bottom: 4rem;">
                        <h2 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 2rem;">Naše služby</h2>
                        ${servicesHtml}
                    </section>
                    <section id="realizace-sec" style="margin-bottom: 4rem;">${portfolioHtml}</section>
                    <section id="reference-sec" style="margin-bottom: 4rem;">${reviewsHtml}</section>
                    <section id="o-nas-sec" style="margin-bottom: 4rem; padding: 3rem; background: #fafafa; border-radius: 2rem;">${aboutUsHtml}</section>
                    <section id="faq-sec" style="margin-bottom: 4rem;">${faqsHtml}</section>
                </main>
                <footer style="background: #111; color: white; padding: 3rem 1rem; text-align: center; border-radius: 2rem 2rem 0 0;">
                    <h3 style="font-weight: bold; margin-bottom: 1rem;">NANOfusion s.r.o.</h3>
                    <p style="color: #94a3b8; font-size: 0.9rem;">Telefon: +420 774 509 409 | Email: info@nanofusion.cz</p>
                </footer>`;
                content = replaceSyncBlock(content, 'FALLBACK', fallbackHtml);
            }

            fs.writeFileSync(filename, content);
            console.log(`✅ ${filename} synchronized.`);
        }

        // 4. Generate Service Detail Subpages
        console.log('🏗️ Generating Service Detail Subpages...');

        // Read template file
        const templatePath = 'public/sluzby/template.html';
        if (!fs.existsSync(templatePath)) {
            throw new Error(`Template file missing at ${templatePath}`);
        }
        const templateHtml = fs.readFileSync(templatePath, 'utf8');

        // Loop through all active services from Supabase
        for (const s of dbServices) {
            const slug = s.slug;
            const catalog = localCatalog[slug] || {
                title: s.name,
                badge: 'Služba',
                subtitle: s.description || '',
                what_included: s.process_description || '',
                benefits: (s.features || []).map(f => ({ title: f, desc: '' })),
                process: [
                    { step: '01', title: 'Posouzení', desc: 'Vyšetříme stav povrchu.' },
                    { step: '02', title: 'Příprava', desc: 'Připravíme okolní plochy.' },
                    { step: '03', title: 'Realizace', desc: 'Provedeme samotné práce.' },
                    { step: '04', title: 'Předání', desc: 'Zkontrolujeme kvalitu a předáme hotové dílo.' }
                ],
                quote: 'Profesionální přístup od začátku do konce. S výsledkem jsme velmi spokojeni.',
                process_note: 'Běžnou realizaci stihneme za 1 den.',
                gallery: [
                    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600',
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600',
                    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
                    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
                    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
                    'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600',
                    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600'
                ]
            };

            const title = s.name || s.title || catalog.title;
            const badge = s.category || s.tag || catalog.badge || 'Služba';
            const rawDesc = s.description || catalog.subtitle;
            const description = rawDesc.replace(/<[^>]*>/g, '').length > 0 ? rawDesc : catalog.subtitle;
            const whatIncluded = s.process_description || catalog.what_included || '';

            // Meta description compilation
            const metaDescription = description.replace(/<[^>]*>/g, '').substring(0, 160).trim();

            // Benefits HTML compilation (Features)
            let benefitsHtml = '';
            if (s.features && s.features.length > 0 && s.features[0] !== '') {
                benefitsHtml = s.features.map(f => `
                <div style="display: flex; gap: 1rem;">
                    <span style="color: #f59e0b; font-weight: 900; flex-shrink: 0; font-size: 1.2rem;">✓</span>
                    <div>
                        <div style="font-weight: 800; color: var(--text-main); font-size: 1.02rem;">${f}</div>
                    </div>
                </div>`).join('');
            } else if (catalog.benefits && catalog.benefits.length > 0) {
                benefitsHtml = catalog.benefits.map(b => `
                <div style="display: flex; gap: 1rem;">
                    <span style="color: #f59e0b; font-weight: 900; flex-shrink: 0; font-size: 1.2rem;">✓</span>
                    <div>
                        <div style="font-weight: 800; color: var(--text-main); font-size: 1.02rem;">${b.title}</div>
                        <div style="color: var(--text-muted); font-size: 0.98rem; line-height: 1.6;">${b.desc}</div>
                    </div>
                </div>`).join('');
            }

            // Process HTML compilation
            const processHtml = (catalog.process || []).map(p => `
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 1.5rem; padding: 2.25rem; transition: transform 0.2s, box-shadow 0.2s;">
                <div style="width: 3rem; height: 3rem; border-radius: 50%; background: var(--bg-dark); color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.15rem; margin-bottom: 1.25rem;">${p.step}</div>
                <h3 style="font-size: 1.15rem; margin-bottom: 0.6rem;">${p.title}</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${p.desc}</p>
            </div>`).join('');

            // Before & After image slider compilation
            let beforeAfterHtml = '';
            const dbPhotos = dbBeforeAfter.filter(item => item.service_id === s.id);
            let beforeImg = '';
            let afterImg = '';

            if (dbPhotos.length > 0 && dbPhotos[0].before_url && dbPhotos[0].after_url) {
                beforeImg = dbPhotos[0].before_url;
                afterImg = dbPhotos[0].after_url;
            } else if (catalog.beforeImg && catalog.afterImg) {
                beforeImg = catalog.beforeImg;
                afterImg = catalog.afterImg;
            }

            // Render slider only if different before/after exist and are not identical
            if (beforeImg && afterImg && beforeImg !== afterImg) {
                beforeAfterHtml = `
                <!-- BEFORE & AFTER -->
                <section style="padding: 7.5rem 2.5rem; background: #f8fafc;">
                    <div style="max-width: 640px; margin: 0 auto;">
                        <h2 class="service-section-title" style="text-align: center; margin-bottom: 1.25rem; color: var(--bg-dark);">Před a po</h2>
                        <p style="text-align: center; color: var(--text-muted); margin-bottom: 3.5rem; font-size: 1.15rem; line-height: 1.7;">Táhněte posuvníkem a porovnejte sami</p>
                        <div style="position: relative; border-radius: 1.5rem; overflow: hidden; aspect-ratio: 4/3; user-select: none; box-shadow: 0 20px 40px rgba(0,0,0,0.08);">
                            <img src="${afterImg}" alt="Po" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;">
                            <div id="${s.slug}-clip" style="position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; clip-path: inset(0 50% 0 0);">
                                <img src="${beforeImg}" alt="Před" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;">
                            </div>
                            <div id="${s.slug}-handle" style="position: absolute; top: 0; bottom: 0; left: 50%; width: 3px; background: white; box-shadow: 0 0 0 1px rgba(0,0,0,0.1); pointer-events: none; z-index: 5;">
                                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 2.75rem; height: 2.75rem; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.25); color: var(--text-main); font-size: 0.9rem;">⟷</div>
                            </div>
                            <div style="position: absolute; top: 1.25rem; left: 1.25rem; background: #ef4444; color: white; padding: 0.5rem 1.1rem; border-radius: 99px; font-weight: 900; font-size: 0.85rem; z-index: 6; pointer-events: none;">PŘED</div>
                            <div style="position: absolute; top: 1.25rem; right: 1.25rem; background: #22c55e; color: white; padding: 0.5rem 1.1rem; border-radius: 99px; font-weight: 900; font-size: 0.85rem; z-index: 6; pointer-events: none;">PO</div>
                            <input class="ba-range" data-slug="${s.slug}" type="range" min="0" max="100" value="50" style="position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: ew-resize; z-index: 10;">
                        </div>
                    </div>
                </section>`;
            }

            // Realization Photo Gallery HTML compilation
            let galleryHtml = '';
            const galleryPhotos = catalog.gallery || [];
            if (galleryPhotos.length > 0) {
                galleryHtml = `
                <!-- GALLERY -->
                <section style="padding: 7.5rem 2.5rem; background: #f8fafc;">
                    <div style="max-width: 1200px; margin: 0 auto;">
                        <h2 class="service-section-title" style="text-align: center; margin-bottom: 1.25rem; color: var(--bg-dark);">Z realizací</h2>
                        <p style="text-align: center; color: var(--text-muted); margin-bottom: 4rem; font-size: 1.15rem;">Ukázky z naší práce</p>
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem;" class="grid grid-cols-2 md:grid-cols-4">
                            ${galleryPhotos.map((url, i) => `
                            <div style="border-radius: 1rem; overflow: hidden; aspect-ratio: 1; border: 1px solid #e2e8f0; cursor: pointer;" onclick="window.nnf_openLightbox('${url}')">
                                <img src="${url}" alt="Realizace ${i + 1}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            </div>`).join('')}
                        </div>
                    </div>
                </section>`;
            }

            // Dynamic Quote review compilation using service_reviews table (with fallback to external_reviews)
            const serviceSpecificReviews = dbServiceReviews.filter(r => r.service_id === s.id && r.is_visible !== false);
            
            let quote = '';
            let quoteAuthor = 'recenze na Google';
            
            if (serviceSpecificReviews.length > 0) {
              quote = serviceSpecificReviews[0].content;
              quoteAuthor = `${serviceSpecificReviews[0].author || 'Ověřený zákazník'} · zákaznická recenze`;
            } else {
              // Fallback to keyword match from external_reviews (reviewsRes)
              const serviceKeywords = {
                'facade': ['fasád', 'fasad', 'fasádu', 'smog', 'plísn'],
                'roof': ['střech', 'střechy', 'střeše', 'mech'],
                'pavement': ['dlažeb', 'dlažba', 'dlažby', 'chodník', 'beton'],
                'pv': ['panely', 'solár', 'fotovolt', 'fve'],
                'graffiti': ['graffiti', 'grafit', 'nápis'],
                'industrial': ['hala', 'průmysl', 'haly', 'provoz'],
                'facade-paint': ['nátěr fasá', 'malování fasá', 'barva fasá'],
                'roof-paint': ['nátěr střech', 'barva střech', 'stříkání střech'],
                'antislip': ['protiskluz', 'smyk', 'kluzk'],
                'ceramfloor': ['ceram', 'ceramfloor', 'dlaždice'],
                'antibac': ['antibakteriál', 'ochrana', 'bakteri']
              };
              
              const keywords = serviceKeywords[slug] || [];
              const dbReviews = reviewsRes.data || [];
              const matchedReview = dbReviews.find(r => 
                keywords.some(kw => (r.content || '').toLowerCase().includes(kw))
              );
              
              if (matchedReview) {
                quote = matchedReview.content;
                quoteAuthor = `${matchedReview.author || 'Ověřený zákazník'} · recenze z ${matchedReview.source === 'google' ? 'Google' : matchedReview.source === 'firmy' ? 'Firmy.cz' : 'NANOfusion'}`;
              } else if (dbReviews.length > 0) {
                // Fallback to latest global review
                quote = dbReviews[0].content;
                quoteAuthor = `${dbReviews[0].author || 'Ověřený zákazník'} · recenze z ${dbReviews[0].source === 'google' ? 'Google' : dbReviews[0].source === 'firmy' ? 'Firmy.cz' : 'NANOfusion'}`;
              } else {
                quote = catalog.quote;
                quoteAuthor = 'recenze na Google';
              }
            }

            // FAQ Accordion HTML compilation (DB FAQs with Local Fallbacks)
            const dbFaqs = dbServiceFaqs.filter(faq => faq.service_id === s.id);
            let faqHtml = '';

            if (dbFaqs.length > 0) {
                faqHtml = dbFaqs.map(f => `
                <div class="faq-item" style="border: 1px solid #e2e8f0; border-radius: 0.875rem; overflow: hidden; background: white; transition: all 0.3s ease;">
                    <button class="faq-toggle" style="width: 100%; text-align: left; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; background: none; border: none; cursor: pointer;">
                        <span style="font-weight: 700; color: #1e293b; font-size: 0.938rem;">${f.question}</span>
                        <svg class="faq-arrow transition-transform flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(0deg); transition: transform 0.2s;">
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </button>
                    <div class="faq-answer" style="display: none; padding: 0 1.5rem 1.25rem; color: #64748b; line-height: 1.6; font-size: 0.875rem;">
                        ${f.answer}
                    </div>
                </div>`).join('');
            } else if (catalog.faq && catalog.faq.length > 0) {
                faqHtml = catalog.faq.map(f => `
                <div class="faq-item" style="border: 1px solid #e2e8f0; border-radius: 0.875rem; overflow: hidden; background: white; transition: all 0.3s ease;">
                    <button class="faq-toggle" style="width: 100%; text-align: left; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; background: none; border: none; cursor: pointer;">
                        <span style="font-weight: 700; color: #1e293b; font-size: 0.938rem;">${f.q}</span>
                        <svg class="faq-arrow transition-transform flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(0deg); transition: transform 0.2s;">
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </button>
                    <div class="faq-answer" style="display: none; padding: 0 1.5rem 1.25rem; color: #64748b; line-height: 1.6; font-size: 0.875rem;">
                        ${f.a}
                    </div>
                </div>`).join('');
            } else {
                // Global fallback FAQs
                faqHtml = `
                <div class="faq-item" style="border: 1px solid #e2e8f0; border-radius: 0.875rem; overflow: hidden; background: white; transition: all 0.3s ease;">
                    <button class="faq-toggle" style="width: 100%; text-align: left; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; background: none; border: none; cursor: pointer;">
                        <span style="font-weight: 700; color: #1e293b; font-size: 0.938rem;">Jak dlouho trvá realizace?</span>
                        <svg class="faq-arrow transition-transform flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(0deg); transition: transform 0.2s;">
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </button>
                    <div class="faq-answer" style="display: none; padding: 0 1.5rem 1.25rem; color: #64748b; line-height: 1.6; font-size: 0.875rem;">
                        Většinu standardních rodinných domů stihneme ošetřit za 1-2 dny. U větších objektů nebo průmyslových hal se doba realizace stanovuje individuálně.
                    </div>
                </div>
                <div class="faq-item" style="border: 1px solid #e2e8f0; border-radius: 0.875rem; overflow: hidden; background: white; transition: all 0.3s ease;">
                    <button class="faq-toggle" style="width: 100%; text-align: left; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; background: none; border: none; cursor: pointer;">
                        <span style="font-weight: 700; color: #1e293b; font-size: 0.938rem;">Je vaše chemie bezpečná?</span>
                        <svg class="faq-arrow transition-transform flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(0deg); transition: transform 0.2s;">
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </button>
                    <div class="faq-answer" style="display: none; padding: 0 1.5rem 1.25rem; color: #64748b; line-height: 1.6; font-size: 0.875rem;">
                        Ano, používáme výhradně ekologicky odbouratelnou a certifikovanou chemii, která je naprosto bezpečná pro lidi, domácí mazlíčky i zahradní výsadbu.
                    </div>
                </div>`;
            }

            // Fill placeholders in template
            let compiledPage = templateHtml
                .replace(/\{\{title\}\}/g, title)
                .replace(/\{\{badge\}\}/g, badge)
                .replace(/\{\{subtitle\}\}/g, catalog.subtitle)
                .replace(/\{\{description\}\}/g, description)
                .replace(/\{\{what_included\}\}/g, whatIncluded)
                .replace(/\{\{benefits_html\}\}/g, benefitsHtml)
                .replace(/\{\{process_html\}\}/g, processHtml)
                .replace(/\{\{process_note\}\}/g, catalog.process_note || 'Běžnou realizaci stihneme za 1 den.')
                .replace(/\{\{before_after_html\}\}/g, beforeAfterHtml)
                .replace(/\{\{gallery_html\}\}/g, galleryHtml)
                .replace(/\{\{quote\}\}/g, quote)
                .replace(/\{\{quote_author\}\}/g, quoteAuthor)
                .replace(/\{\{faq_html\}\}/g, faqHtml)
                .replace(/\{\{slug\}\}/g, slug)
                .replace(/\{\{price_key\}\}/g, slug)
                .replace(/\{\{hero_image\}\}/g, s.hero_image_url || s.image || catalog.beforeImg || '')
                .replace(/\{\{meta_description\}\}/g, metaDescription);

            // Write static file in sluzby/[slug]/index.html (project root - so Vite dev server resolves it)
            const rootDestDir = path.join('sluzby', slug);
            if (!fs.existsSync(rootDestDir)) {
                fs.mkdirSync(rootDestDir, { recursive: true });
            }
            fs.writeFileSync(path.join(rootDestDir, 'index.html'), compiledPage);

            // Write static file in public/sluzby/[slug]/index.html
            const publicDestDir = path.join('public', 'sluzby', slug);
            if (!fs.existsSync(publicDestDir)) {
                fs.mkdirSync(publicDestDir, { recursive: true });
            }
            fs.writeFileSync(path.join(publicDestDir, 'index.html'), compiledPage);

            // Synchronize copies to admin panel folders
            const syncDestinations = [
                path.join('admin-panel', 'public', 'sluzby', slug),
            ];

            for (const dest of syncDestinations) {
                if (!fs.existsSync(dest)) {
                    fs.mkdirSync(dest, { recursive: true });
                }
                fs.writeFileSync(path.join(dest, 'index.html'), compiledPage);
            }

            console.log(`✅ Generated subpage: /sluzby/${slug}`);
        }

        console.log('✨ NANOfusion Sync Complete!');

    } catch (err) {
        fs.writeSync(1, `❌ Sync failed: ${err && (err.stack || err.message || err)}\n`);
        process.exit(1);
    }
}

function replaceSyncBlock(content, key, newHtml) {
    const startMarker = `<!-- SYNC:${key}:START -->`;
    const endMarker = `<!-- SYNC:${key}:END -->`;
    const regex = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`, 'g');

    if (content.includes(startMarker)) {
        return content.replace(regex, `${startMarker}\n${newHtml}\n${endMarker}`);
    }
    return content;
}

syncContent();
