"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";

const gdprHtml = `<div class="prose prose-slate max-w-none space-y-8 text-slate-700 text-base leading-relaxed">
          
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">I. Základní ustanovení</h2>
            <ol class="list-decimal pl-5 space-y-2 text-sm">
              <li>Správcem osobních údajů podle čl. 4 bod 7 nařízení Evropského parlamentu a Rady (EU) 2016/679 o ochraně fyzických osob v souvislosti se zpracováním osobních údajů a o volném pohybu těchto údajů (dále jen: „GDPR”) je <strong>Nano Fusion s.r.o.</strong>, IČ: 29375363, se sídlem Pod Nádražím 370, 664 01 Bílovice nad Svitavou (dále jen: „správce“).</li>
              <li>Kontaktní údaje správce jsou: adresa: Nano Fusion s.r.o., Pod Nádražím 370, 664 01 Bílovice nad Svitavou, email: info@nanofusion.cz, telefon: +420 775 420 935.</li>
              <li>Osobními údaji se rozumí veškeré informace o identifikované nebo identifikovatelné fyzické osobě; identifikovatelnou fyzickou osobou je fyzická osoba, kterou lze přímo či nepřímo identifikovat, zejména odkazem na určitý identifikátor, například jméno, identifikační číslo, lokační údaje, síťový identifikátor nebo na jeden či více zvláštních prvků fyzické, fyziologické, genetické, psychické, ekonomické, kulturní nebo společenské identity této fyzické osoby.</li>
              <li>Správce nejmenoval pověřence pro ochranu osobních údajů.</li>
            </ol>
          </section>

          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">II. Zdroje a kategorie zpracovávaných osobních údajů</h2>
            <ol class="list-decimal pl-5 space-y-2 text-sm">
              <li>Správce zpracovává osobní údaje, které jste mu poskytl/a nebo osobní údaje, které správce získal na základě plnění Vaší objednávky či poptávky.</li>
              <li>Správce zpracovává Vaše identifikační a kontaktní údaje a údaje nezbytné pro plnění smlouvy a vyhotovení nabídky.</li>
            </ol>
          </section>

          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">III. Zákonný důvod a účel zpracování osobních údajů</h2>
            <ol class="list-decimal pl-5 space-y-2 text-sm">
              <li>Zákonným důvodem zpracování osobních údajů je:
                <ul class="list-disc pl-5 mt-1 space-y-1">
                  <li>plnění smlouvy mezi Vámi a správcem podle čl. 6 odst. 1 písm. b) GDPR,</li>
                  <li>oprávněný zájem správce na poskytování přímého marketingu (zejména pro zasílání obchodních sdělení a newsletterů) podle čl. 6 odst. 1 písm. f) GDPR,</li>
                  <li>Váš souhlas se zpracováním pro účely poskytování přímého marketingu (zejména pro zasílání obchodních sdělení a newsletterů) podle čl. 6 odst. 1 písm. a) GDPR ve spojení s § 7 odst. 2 zákona č. 480/2004 Sb., o některých službách informační společnosti v případě, že nedošlo k objednávce zboží nebo služby.</li>
                </ul>
              </li>
              <li>Ze strany správce nedochází k automatickému individuálnímu rozhodování ve smyslu čl. 22 GDPR. S takovým zpracováním jste poskytl/a svůj výslovný souhlas.</li>
            </ol>
          </section>

          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">IV. Doba uchovávání údajů</h2>
            <ol class="list-decimal pl-5 space-y-2 text-sm">
              <li>Správce uchovává osobní údaje:
                <ul class="list-disc pl-5 mt-1 space-y-1">
                  <li>po dobu nezbytnou k výkonu práv a povinností vyplývajících ze smluvního vztahu mezi Vámi a správcem a uplatňování nároků z těchto smluvních vztahů (po dobu 15 let od ukončení smluvního vztahu).</li>
                  <li>po dobu, než je odvolán souhlas se zpracováním osobních údajů pro účely marketingu, nejdéle 3 let, jsou-li osobní údaje zpracovávány na základě souhlasu.</li>
                </ul>
              </li>
              <li>Po uplynutí doby uchovávání osobních údajů správce osobní údaje vymaže.</li>
            </ol>
          </section>

          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">V. Příjemci osobních údajů (subdodavatelé správce)</h2>
            <ol class="list-decimal pl-5 space-y-2 text-sm">
              <li>Příjemci osobních údajů jsou osoby:
                <ul class="list-disc pl-5 mt-1 space-y-1">
                  <li>podílející se na dodání zboží / služeb / realizaci plateb na základě smlouvy,</li>
                  <li>podílející se na zajištění provozu služeb,</li>
                  <li>zajišťující marketingové služby.</li>
                </ul>
              </li>
              <li>Správce nemá v úmyslu předat osobní údaje do třetí země (do země mimo EU) nebo mezinárodní organizaci. Příjemci osobních údajů ve třetích zemích jsou poskytovatelé mailingových služeb / cloudových služeb.</li>
            </ol>
          </section>

          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">VI. Vaše práva</h2>
            <ol class="list-decimal pl-5 space-y-2 text-sm">
              <li>Za podmínek stanovených v GDPR máte:
                <ul class="list-disc pl-5 mt-1 space-y-1">
                  <li>právo na přístup ke svým osobním údajům dle čl. 15 GDPR,</li>
                  <li>právo na opravu osobních údajů dle čl. 16 GDPR, popřípadě omezení zpracování dle čl. 18 GDPR,</li>
                  <li>právo na výmaz osobních údajů dle čl. 17 GDPR,</li>
                  <li>právo vznést námitku proti zpracování dle čl. 21 GDPR,</li>
                  <li>právo na přenositelnost údajů dle čl. 20 GDPR,</li>
                  <li>právo odvolat souhlas se zpracováním písemně nebo elektronicky na adresu nebo email správce uvedený v čl. I těchto podmínek.</li>
                </ul>
              </li>
              <li>Dále máte právo podat stížnost u Úřadu pro ochranu osobních údajů v případě, že se domníváte, že bylo porušeno Vaše právo na ochranu osobních údajů.</li>
            </ol>
          </section>

          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">VII. Podmínky zabezpečení osobních údajů</h2>
            <ol class="list-decimal pl-5 space-y-2 text-sm">
              <li>Správce prohlašuje, že přijal veškerá vhodná technická a organizační opatření k zabezpečení osobních údajů.</li>
              <li>Správce přijal technická opatření k zabezpečení datových úložišť a úložišť osobních údajů v listinné podobě.</li>
              <li>Správce prohlašuje, že k osobním údajům mají přístup pouze jím pověřené osoby.</li>
            </ol>
          </section>

          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">VIII. Závěrečná ustanovení</h2>
            <ol class="list-decimal pl-5 space-y-2 text-sm">
              <li>Odesláním objednávky z internetového objednávkového formuláře potvrzujete, že jste seznámen/a s podmínkami ochrany osobních údajů a že je v celém rozsahu přijímáte.</li>
              <li>S těmito podmínkami souhlasíte zaškrtnutím souhlasu prostřednictvím internetového formuláře. Zaškrtnutím souhlasu potvrzujete, že jste seznámen/a s podmínkami ochrany osobních údajů a že je v celém rozsahu přijímáte.</li>
              <li>Správce je oprávněn tyto podmínky změnit. Novou verzi podmínek ochrany osobních údajů zveřejní na svých internetových stránkách, případně Vám zašle novou verzi těchto podmínek na e-mailovou adresu, kterou jste správci poskytl/a.</li>
            </ol>
            <p class="font-bold text-slate-900 mt-4">Tyto podmínky nabývají účinnosti dnem 25.5.2018.</p>
          </section>`;
const opHtml = `<div class="prose prose-slate max-w-none space-y-8 text-slate-700 text-base leading-relaxed">
          
          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">1. Úvodní ustanovení</h2>
            <p>Tyto Všeobecné obchodní podmínky (dále jen „VOP“) upravují právní vztahy mezi společností Nano Fusion s.r.o. (dále jen „Zhotovitel“) a jejími zákazníky (dále jen „Zákazník“) při poskytování služeb v oblasti nátěrů a čištění fasád, střech a dlažeb.</p>
          </section>

          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">2. Uzavření smlouvy</h2>
            <p>Smlouva mezi Zhotovitelem a Zákazníkem je uzavřena na základě písemného potvrzení objednávky ze strany Zhotovitele. Objednávka může být učiněna písemně, elektronickou poštou nebo prostřednictvím webových stránek Zhotovitele.</p>
          </section>

          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">3. Cena a platební podmínky</h2>
            <p class="mb-4">Ceny za poskytované služby jsou stanoveny dle aktuálního ceníku Zhotovitele nebo na základě individuální nabídky. Zákazník je povinen uhradit cenu za služby ve lhůtě stanovené ve faktuře.</p>

            <div class="space-y-4 pl-4 border-l-2 border-amber-500/30">
              <div>
                <h3 class="font-bold text-slate-900 text-sm uppercase tracking-wide">1. Splatnost faktur</h3>
                <ul class="list-disc pl-5 space-y-1 mt-1 text-sm">
                  <li>Faktury jsou splatné do 14 dnů od data jejich vystavení, pokud není dohodnuto jinak.</li>
                  <li>V případě prodlení s platbou je Zákazník povinen uhradit úrok z prodlení ve výši 0,05 % z dlužné částky za každý den prodlení.</li>
                </ul>
              </div>

              <div>
                <h3 class="font-bold text-slate-900 text-sm uppercase tracking-wide">2. Možnosti platebních metod</h3>
                <ul class="list-disc pl-5 space-y-1 mt-1 text-sm">
                  <li>Platby mohou být prováděny bankovním převodem na účet Zhotovitele uvedený na faktuře.</li>
                  <li>Hotovostní platby jsou akceptovány pouze po předchozí domluvě a potvrzení ze strany Zhotovitele.</li>
                  <li>Platby kartou a dalšími elektronickými metodami jsou možné, pokud jsou uvedeny jako akceptované platební metody na faktuře.</li>
                </ul>
              </div>

              <div>
                <h3 class="font-bold text-slate-900 text-sm uppercase tracking-wide">3. Sankce za prodlení s platbou</h3>
                <ul class="list-disc pl-5 space-y-1 mt-1 text-sm">
                  <li>V případě prodlení s platbou je Zhotovitel oprávněn pozastavit další práce až do doby úhrady dlužné částky.</li>
                  <li>Pokud Zákazník neuhradí dlužnou částku ani po písemné výzvě, je Zhotovitel oprávněn odstoupit od smlouvy a požadovat náhradu škody.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">4. Odstoupení od smlouvy a výpověď smlouvy</h2>
            <div class="space-y-4 pl-4 border-l-2 border-amber-500/30">
              <div>
                <h3 class="font-bold text-slate-900 text-sm uppercase tracking-wide">1. Podmínky a postup pro odstoupení ze strany Zákazníka</h3>
                <ul class="list-disc pl-5 space-y-1 mt-1 text-sm">
                  <li>Zákazník může odstoupit od smlouvy písemným oznámením Zhotoviteli nejpozději 14 dní před zahájením prací.</li>
                  <li>Při odstoupení od potvrzené smlouvy ze strany Zákazníka si Zhotovitel účtuje 15 % s 12% nebo 21% DPH manipulační poplatek z celkové ceny zakázky.</li>
                </ul>
              </div>

              <div>
                <h3 class="font-bold text-slate-900 text-sm uppercase tracking-wide">2. Podmínky a postup pro odstoupení ze strany Zhotovitele</h3>
                <ul class="list-disc pl-5 space-y-1 mt-1 text-sm">
                  <li>Zhotovitel si vyhrazuje právo odstoupit od realizace práce bez udání důvodu, bez finančního vyrovnání objednatelem.</li>
                  <li>V případě, že Zhotovitel odstoupí od smlouvy z důvodů na straně Zákazníka (např. neposkytnutí potřebné součinnosti nebo nesprávné informace), je Zhotovitel oprávněn účtovat Zákazníkovi náklady vzniklé v souvislosti s přípravou nebo částečným provedením služeb.</li>
                  <li>Pokud Zhotovitel odstoupí od smlouvy z jiných než výše uvedených důvodů, vrátí Zákazníkovi veškeré platby uhrazené za neprovedené služby.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">5. Práva a povinnosti Zhotovitele</h2>
            <p class="mb-2">Zhotovitel se zavazuje:</p>
            <ul class="list-disc pl-5 space-y-1.5 text-sm">
              <li>Provést služby v dohodnutém rozsahu a kvalitě.</li>
              <li>Informovat Zákazníka o jakýchkoli změnách nebo problémech, které mohou ovlivnit realizaci služeb.</li>
              <li>V případě domluvených víceprací informovat Zákazníka o předpokládaném navýšení ceny a získat jeho souhlas s provedením víceprací.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">6. Práva a povinnosti Zákazníka</h2>
            <p class="mb-2">Zákazník je povinen:</p>
            <ul class="list-disc pl-5 space-y-1.5 text-sm">
              <li>Poskytnout Zhotoviteli potřebné informace a součinnost pro realizaci služeb.</li>
              <li>Uhradit cenu za poskytnuté služby ve stanovené lhůtě.</li>
              <li>Uhradit fakturovanou částku za domluvené vícepráce i bez písemného potvrzení víceprací. Provedení samotných prací znamená souhlas.</li>
              <li>Uhradit navýšení výsledné ceny, pokud je způsobeno pigmentací barvy.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">7. Reklamace</h2>
            <p>Reklamace na provedené služby je Zákazník povinen uplatnit písemně bez zbytečného odkladu po zjištění vady, nejpozději však do 14 dnů od jejího vzniku. Zhotovitel se zavazuje reklamaci vyřídit v co nejkratší možné době, nejdéle však do 30 dnů.</p>
          </section>

          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">8. Ochrana osobních údajů</h2>
            <p>Zhotovitel zpracovává osobní údaje Zákazníků v souladu s platnými právními předpisy. Podrobnosti naleznete v záložce <a href="/gdpr" class="text-amber-600 font-bold hover:underline">Ochrana osobních údajů (GDPR)</a>.</p>
          </section>

          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">9. Odpovědnost za škody</h2>
            <div class="space-y-4 pl-4 border-l-2 border-amber-500/30">
              <div>
                <h3 class="font-bold text-slate-900 text-sm uppercase tracking-wide">1. Limitace odpovědnosti Zhotovitele</h3>
                <ul class="list-disc pl-5 space-y-1 mt-1 text-sm">
                  <li>Zhotovitel nenese odpovědnost za škody způsobené vyšší mocí, nedodržením pokynů ze strany Zákazníka nebo třetími stranami.</li>
                  <li>Maximální odpovědnost Zhotovitele za škody způsobené z titulu smlouvy je omezena na částku odpovídající ceně poskytnutých služeb.</li>
                </ul>
              </div>

              <div>
                <h3 class="font-bold text-slate-900 text-sm uppercase tracking-wide">2. Povinnost Zákazníka nahradit škody</h3>
                <ul class="list-disc pl-5 space-y-1 mt-1 text-sm">
                  <li>Zákazník je povinen nahradit škody způsobené nepravdivými nebo neúplnými informacemi poskytnutými Zhotoviteli.</li>
                  <li>Zákazník je povinen zajistit bezpečné a vhodné prostředí pro provádění prací. V případě nedodržení této povinnosti nese odpovědnost za vzniklé škody.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">10. Doba plnění</h2>
            <div class="space-y-4 pl-4 border-l-2 border-amber-500/30">
              <div>
                <h3 class="font-bold text-slate-900 text-sm uppercase tracking-wide">1. Přibližné termíny realizace</h3>
                <ul class="list-disc pl-5 space-y-1 mt-1 text-sm">
                  <li>Termíny zahájení a dokončení prací jsou uvedeny ve smlouvě nebo potvrzení objednávky.</li>
                  <li>Zhotovitel se zavazuje dodržet dohodnuté termíny, pokud nedojde k nepředvídatelným okolnostem.</li>
                </ul>
              </div>

              <div>
                <h3 class="font-bold text-slate-900 text-sm uppercase tracking-wide">2. Možnosti změn termínů a jejich důsledky</h3>
                <ul class="list-disc pl-5 space-y-1 mt-1 text-sm">
                  <li>V případě, že dojde ke změně termínů z důvodů na straně Zákazníka, je Zhotovitel oprávněn účtovat náklady spojené s touto změnou.</li>
                  <li>Pokud dojde k prodlení ze strany Zhotovitele, je Zákazník oprávněn požadovat slevu z ceny služeb nebo odstoupit od smlouvy.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">11. Řešení sporů</h2>
            <div class="space-y-4 pl-4 border-l-2 border-amber-500/30">
              <div>
                <h3 class="font-bold text-slate-900 text-sm uppercase tracking-wide">1. Možnost mediace nebo arbitráže</h3>
                <p class="text-sm mt-1">V případě vzniku sporu mají obě strany možnost využít mediaci nebo arbitráž jako alternativní způsoby řešení sporů.</p>
              </div>
              <div>
                <h3 class="font-bold text-slate-900 text-sm uppercase tracking-wide">2. Příslušnost soudů</h3>
                <p class="text-sm mt-1">Pro případ soudního řešení sporů je příslušným soudem soud v místě sídla Zhotovitele.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">12. Změny VOP</h2>
            <ul class="list-disc pl-5 space-y-1.5 text-sm">
              <li>Zhotovitel si vyhrazuje právo na změnu těchto VOP. O změnách bude Zákazník informován nejméně 30 dní před jejich účinností.</li>
              <li>Změny VOP budou zveřejněny na webových stránkách Zhotovitele a Zákazník bude informován prostřednictvím e-mailu.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-bold text-slate-900 mb-3">13. Závěrečná ustanovení</h2>
            <p>Tyto VOP jsou nedílnou součástí každé smlouvy uzavřené mezi Zhotovitelem a Zákazníkem. Změny a doplňky těchto VOP mohou být provedeny pouze písemnou formou a musí být schváleny oběma smluvními stranami.</p>
            <p class="font-bold text-slate-900 mt-4">Tyto VOP nabývají účinnosti dne 1.1.2024.</p>
          </section>`;

export function FooterModals() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <>
      <button 
        onClick={() => setOpenModal('op')}
        className="hover:text-amber-500 transition-all focus:outline-none underline underline-offset-4 decoration-amber-500/30 hover:decoration-amber-500"
      >
        Obchodní podmínky
      </button>
      <span className="hidden sm:inline">|</span>
      <button 
        onClick={() => setOpenModal('gdpr')}
        className="hover:text-amber-500 transition-all focus:outline-none underline underline-offset-4 decoration-amber-500/30 hover:decoration-amber-500"
      >
        GDPR
      </button>

      <Modal 
        isOpen={openModal === 'op'} 
        onClose={() => setOpenModal(null)}
        title="Obchodní podmínky"
      >
        <div 
          className="prose prose-slate max-w-none text-slate-700"
          dangerouslySetInnerHTML={{ __html: opHtml }} 
        />
      </Modal>

      <Modal 
        isOpen={openModal === 'gdpr'} 
        onClose={() => setOpenModal(null)}
        title="Zásady ochrany osobních údajů"
      >
        <div 
          className="prose prose-slate max-w-none text-slate-700"
          dangerouslySetInnerHTML={{ __html: gdprHtml }} 
        />
      </Modal>
    </>
  );
}
