import { SectionHeader } from "@/components/ui/section-header";

function AboutStory() {
  return (
    <div className="prose prose-slate lg:prose-lg max-w-none text-slate-600 space-y-6">
      <p><strong>Jak jsme začali a proč děláme to, co děláme?</strong></p>
      <p>Každá cesta má svůj začátek. Ta naše se rozjela v roce 2012, kdy vznikla NANOfusion s.r.o. Název možná zní trochu jako z vědeckého časopisu – a není to náhoda. Od prvního dne jsme se pohybovali ve světě ultratenkých nanotechnologických povrchových vrstev, které dokázaly dát materiálům zcela novou dimenzi ochrany. Fascinující území, kde se hranice možného posouvaly každý den.</p>
      <p>Jenže brzy nám došlo jedna klíčová věc: sebelepší technologie selže, pokud povrch není správně připravený. A tak jsme se pustili do hloubky – doslova i obrazně. Začali jsme zkoumat, testovat a porovnávat metody čištění a přípravy povrchů se stejnou vážností, s jakou jsme přistupovali k nanotechnologiím.</p>
      <p>Spolupráce s Přírodovědeckou fakultou Masarykovy univerzity v Brně nám otevřela dveře k mnohaletému výzkumu. Testovaly se stovky impregnací, ochranných vrstev i čistících přípravků na nejrůznějších površích a typech znečištění. Výsledkem nejsou jen znalosti – je to schopnost přesně poznat, co který povrch potřebuje.</p>
      <p>Začínali jsme skromně. Čistili jsme nerezové wellness prvky, aplikovali ochranu tam, kde to dávalo smysl. Postupně jsme ale rostli – a s námi i náš záběr. Fasády, střechy, zámková dlažba, průmyslové podlahy. Povrchy, které si zaslouží nejen péči, ale i ochranu na roky dopředu.</p>
      
      <p className="text-lg font-bold text-slate-900 mt-8">Dnes jsme tady – a naším posláním je čistit, renovovat a chránit to, co jste budovali.</p>
      
      <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4 font-heading">Naši ideální zákazníci?</h3>
      <p>Naši zákazníci jsou lidé, kteří chtějí, aby jejich domov nebo nemovitost zůstaly v perfektním stavu – a hledají někoho, na koho se prostě můžou spolehnout.</p>
      <p>Možná jste majitel rodinného domu s fasádou, která potřebuje nový dech. Nebo vás trápí střecha, zašlá zámková dlažba, nebo graffiti na průčelí budovy. Podnikáte a řešíte stav průmyslové podlahy nebo komerčních prostor?</p>
      <p>Ať jste kdokoliv – pokud hledáte profesionální přístup bez zbytečného povyku, jsme tady pro vás.</p>
      
      <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4 font-heading">Proč si vybrat právě nás?</h3>
      <p>Firem nabízejících čištění fasád nebo střech je dost. Co nás odlišuje?</p>
      <ul className="space-y-4 mt-6">
        <li><strong>Věda v praxi.</strong> Spolupráce s Masarykovou univerzitou a roky testování nám dávají výhodu, kterou jen tak někdo nemá. Nepracujeme metodou pokus-omyl – přesně víme, co funguje a proč.</li>
        <li><strong>Komplexní řešení.</strong> U nás to nekončí u čištění. Povrch také ochráníme – nanotechnologickou impregnací, antigraffiti nátěrem nebo kvalitními povrchovými úpravami, které vydrží.</li>
        <li><strong>Šetrný přístup.</strong> Respektujeme povrchy, se kterými pracujeme, i životní prostředí. Používáme efektivní, ale ekologicky zodpovědné technologie.</li>
        <li><strong>Lidský přístup.</strong> Nespolupracujeme s klienty – spolupracujeme s partnery. Nasloucháme, radíme a vždy vysvětlíme, co a proč děláme.</li>
      </ul>
      
      <p className="mt-8">Pokud hledáte někoho, kdo přinese skutečnou odbornost, pečlivost a řešení šitá na míru – jste na správném místě.</p>
      <p className="text-lg font-bold text-slate-900">Vaše nemovitost si zaslouží jen to nejlepší. A my jsme tady, abychom to zajistili.</p>
    </div>
  );
}

function AboutStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center">
        <div className="text-amber-500 font-bold text-4xl mb-2 font-heading">950+</div>
        <h3 className="text-slate-500 text-sm uppercase tracking-wider font-bold">Realizací</h3>
      </div>
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center">
        <div className="text-amber-500 font-bold text-4xl mb-2 font-heading">10</div>
        <h3 className="text-slate-500 text-sm uppercase tracking-wider font-bold">Let garance</h3>
      </div>
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center">
        <div className="text-amber-500 font-bold text-4xl mb-2 font-heading">14</div>
        <h3 className="text-slate-500 text-sm uppercase tracking-wider font-bold">Let zkušeností</h3>
      </div>
    </div>
  );
}

function AboutCertifications() {
  return (
    <>
      <h3 className="text-3xl font-extrabold text-slate-900 mt-16 mb-8 text-center font-heading">Naše certifikace a odbornost</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
          <img src="https://images.unsplash.com/photo-1589330694653-ded6df53f7bb?w=800" alt="Certifikát odbornosti ISG" className="w-full h-48 object-cover rounded-2xl mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2 font-heading">Certifikát odbornosti ISG</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Certifikace pro aplikaci pokročilých nano-nátěrů na fasády a střechy.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
          <img src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800" alt="Autorizovaný partner NANOfusion" className="w-full h-48 object-cover rounded-2xl mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2 font-heading">Autorizovaný partner NANOfusion</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Oficiální osvědčení o technické způsobilosti k provádění nano-ochrany povrchů.</p>
        </div>
      </div>
    </>
  );
}

function AboutWhyUs() {
  return (
    <div className="bg-slate-900 text-white p-8 md:p-12 rounded-[2rem] mt-16 relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-6 font-heading">Proč NANOfusion?</h3>
        <ul className="space-y-4 opacity-90 text-lg">
          <li className="flex items-center gap-3">
            <span className="text-amber-500 flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            Vlastní prověřené postupy a certifikovaná chemie
          </li>
          <li className="flex items-center gap-3">
            <span className="text-amber-500 flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            Zaměření a konzultace po celé ČR zdarma
          </li>
          <li className="flex items-center gap-3">
            <span className="text-amber-500 flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            Tým specialistů s mnohaletou praxí
          </li>
        </ul>
      </div>
      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
    </div>
  );
}

export function About() {
  return (
    <section id="o-nas" className="py-12 md:py-16 bg-slate-50 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Příběh preciznosti a inovace"
          subtitle="14 let pečujeme o to, co jste usilovně vybudovali"
        />

        <AboutStory />
        <AboutStats />
        <AboutCertifications />
        <AboutWhyUs />
      </div>
    </section>
  );
}
