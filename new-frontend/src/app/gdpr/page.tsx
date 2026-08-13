import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Zásady ochrany osobních údajů (GDPR) | NANOfusion",
  description:
    "Zásady ochrany osobních údajů společnosti Nano Fusion s.r.o. v souladu s nařízením GDPR.",
  alternates: {
    canonical: "/gdpr",
  },
  openGraph: {
    title: "Zásady ochrany osobních údajů (GDPR) | NANOfusion",
    description:
      "Zásady ochrany osobních údajů společnosti Nano Fusion s.r.o. v souladu s nařízením GDPR.",
    type: "website",
    url: "https://nanofusion.cz/gdpr",
    siteName: "NANOFusion",
    images: [
      {
        url: "https://nanofusion.cz/static/logo.jpg",
        width: 1200,
        height: 630,
        alt: "GDPR - NANOFusion",
      },
    ],
    locale: "cs_CZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zásady ochrany osobních údajů (GDPR) | NANOFusion",
    description: "Zásady ochrany osobních údajů NANOFusion.",
    images: ["https://nanofusion.cz/static/logo.jpg"],
  },
};

export default function GDPRPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
            <div className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-600 rounded-full font-bold text-xs uppercase tracking-wider mb-4">
              Právní Dokumenty
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
              Zásady ochrany osobních údajů
            </h1>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-slate-700 text-sm mb-10 leading-relaxed">
              <p className="font-bold text-slate-900 text-base mb-2">
                Nano Fusion s.r.o.
              </p>
              <p>Pod Nádražím 370, 664 01 Bílovice nad Svitavou</p>
              <p className="mt-2">IČ: 29375363</p>
              <p>
                E-mail:{' '}
                <a
                  href="mailto:info@nanofusion.cz"
                  className="text-amber-600 font-bold hover:underline"
                >
                  info@nanofusion.cz
                </a>{' '}
                | Tel:{' '}
                <a
                  href="tel:+420775420935"
                  className="text-amber-600 font-bold hover:underline"
                >
                  +420 775 420 935
                </a>
              </p>
            </div>

            <div className="space-y-8 text-slate-700 text-base leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  I. Základní ustanovení
                </h2>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>
                    Správcem osobních údajů podle čl. 4 bod 7 nařízení Evropského
                    parlamentu a Rady (EU) 2016/679 o ochraně fyzických osob v
                    souvislosti se zpracováním osobních údajů a o volném pohybu
                    těchto údajů (dále jen: „GDPR") je{' '}
                    <strong>Nano Fusion s.r.o.</strong>, IČ: 29375363, se sídlem
                    Pod Nádražím 370, 664 01 Bílovice nad Svitavou (dále jen:
                    „správce").
                  </li>
                  <li>
                    Kontaktní údaje správce jsou: adresa: Nano Fusion s.r.o., Pod
                    Nádražím 370, 664 01 Bílovice nad Svitavou, email:{' '}
                    info@nanofusion.cz, telefon: +420 775 420 935.
                  </li>
                  <li>
                    Osobními údaji se rozumí veškeré informace o identifikované
                    nebo identifikovatelné fyzické osobě; identifikovatelnou fyzickou
                    osobou je fyzická osoba, kterou lze přímo či nepřímo
                    identifikovat, zejména odkazem na určitý identifikátor,
                    například jméno, identifikační číslo, lokační údaje, síťový
                    identifikátor nebo na jeden či více zvláštních prvků fyzické,
                    fyziologické, genetické, psychické, ekonomické, kulturní nebo
                    společenské identity této fyzické osoby.
                  </li>
                  <li>Správce nejmenoval pověřence pro ochranu osobních údajů.</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  II. Zdroje a kategorie zpracovávaných osobních údajů
                </h2>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>
                    Správce zpracovává osobní údaje, které jste mu poskytl/a nebo
                    osobní údaje, které správce získal na základě plnění Vaší
                    objednávky či poptávky.
                  </li>
                  <li>
                    Správce zpracovává Vaše identifikační a kontaktní údaje a údaje
                    nezbytné pro plnění smlouvy a vyhotovení nabídky.
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  III. Zákonný důvod a účel zpracování osobních údajů
                </h2>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>
                    Zákonným důvodem zpracování osobních údajů je:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>
                        plnění smlouvy mezi Vámi a správcem podle čl. 6 odst. 1
                        písm. b) GDPR,
                      </li>
                      <li>
                        oprávněný zájem správce na poskytování přímého marketingu
                        (zejména pro zasílání obchodních sdělení a newsletterů)
                        podle čl. 6 odst. 1 písm. f) GDPR,
                      </li>
                      <li>
                        Váš souhlas se zpracováním pro účely poskytování přímého
                        marketingu (zejména pro zasílání obchodních sdělení a
                        newsletterů) podle čl. 6 odst. 1 písm. a) GDPR ve spojení
                        s § 7 odst. 2 zákona č. 480/2004 Sb., o některých službách
                        informační společnosti v případě, že nedošlo k objednávce
                        zboží nebo služby.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Ze strany správce nedochází k automatickému individuálnímu
                    rozhodování ve smyslu čl. 22 GDPR. S takovým zpracováním jste
                    poskytl/a svůj výslovný souhlas.
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  IV. Doba uchovávání údajů
                </h2>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>
                    Správce uchovává osobní údaje:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>
                        po dobu nezbytnou k výkonu práv a povinností vyplývajících
                        ze smluvního vztahu mezi Vámi a správcem a uplatňování
                        nároků z těchto smluvních vztahů (po dobu 15 let od
                        ukončení smluvního vztahu).
                      </li>
                      <li>
                        po dobu, než je odvolán souhlas se zpracováním osobních
                        údajů pro účely marketingu, nejdéle 3 let, jsou-li osobní
                        údaje zpracovávány na základě souhlasu.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Po uplynutí doby uchovávání osobních údajů správce osobní údaje
                    vymaže.
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  V. Příjemci osobních údajů (subdodavatelé správce)
                </h2>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>
                    Příjemci osobních údajů jsou osoby:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>
                        podílející se na dodání zboží / služeb / realizaci plateb na
                        základě smlouvy,
                      </li>
                      <li>podílející se na zajištění provozu služeb,</li>
                      <li>zajišťující marketingové služby.</li>
                    </ul>
                  </li>
                  <li>
                    Správce nemá v úmyslu předat osobní údaje do třetí země (do
                    země mimo EU) nebo mezinárodní organizaci. Příjemci osobních
                    údajů ve třetích zemích jsou poskytovatelé mailingových služeb /
                    cloudových služeb.
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  VI. Vaše práva
                </h2>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>
                    Za podmínek stanovených v GDPR máte:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>právo na přístup ke svým osobním údajům dle čl. 15 GDPR,</li>
                      <li>
                        právo na opravu osobních údajů dle čl. 16 GDPR, popřípadě
                        omezení zpracování dle čl. 18 GDPR,
                      </li>
                      <li>právo na výmaz osobních údajů dle čl. 17 GDPR,</li>
                      <li>právo vznést námitku proti zpracování dle čl. 21 GDPR,</li>
                      <li>právo na přenositelnost údajů dle čl. 20 GDPR,</li>
                      <li>
                        právo odvolat souhlas se zpracováním písemně nebo
                        elektronicky na adresu nebo email správce uvedený v čl. I
                        těchto podmínek.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Dále máte právo podat stížnost u Úřadu pro ochranu osobních
                    údajů v případě, že se domníváte, že bylo porušeno Vaše právo
                    na ochranu osobních údajů.
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  VII. Podmínky zabezpečení osobních údajů
                </h2>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>
                    Správce prohlašuje, že přijal veškerá vhodná technická a
                    organizační opatření k zabezpečení osobních údajů.
                  </li>
                  <li>
                    Správce přijal technická opatření k zabezpečení datových úložišť
                    a úložišť osobních údajů v listinné podobě.
                  </li>
                  <li>
                    Správce prohlašuje, že k osobním údajům mají přístup pouze jím
                    pověřené osoby.
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  VIII. Závěrečná ustanovení
                </h2>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>
                    Odesláním objednávky z internetového objednávkového formuláře
                    potvrzujete, že jste seznámen/a s podmínkami ochrany osobních
                    údajů a že je v celém rozsahu přijímáte.
                  </li>
                  <li>
                    S těmito podmínkami souhlasíte zaškrtnutím souhlasu prostřednictvím
                    internetového formuláře. Zaškrtnutím souhlasu potvrzujete, že
                    jste seznámen/a s podmínkami ochrany osobních údajů a že je v
    celém rozsahu přijímáte.
                  </li>
                  <li>
                    Správce je oprávněn tyto podmínky změnit. Novou verzi podmínek
                    ochrany osobních údajů zveřejní na svých internetových stránkách,
                    případně Vám zašle novou verzi těchto podmínek na e-mailovou
                    adresu, kterou jste správci poskytl/a.
                  </li>
                </ol>
                <p className="font-bold text-slate-900 mt-4">
                  Tyto podmínky nabývají účinnosti dnem 25.5.2018.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
