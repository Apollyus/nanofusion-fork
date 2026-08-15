import { notFound } from "next/navigation";
import { supabase, optimizeImg } from "@/lib/supabase";
import { Reviews } from "@/components/home/Reviews";
import { FAQ } from "@/components/home/FAQ";
import { ServiceBeforeAfter } from "@/components/ui/ServiceBeforeAfter";
import { ServiceGallery } from "@/components/ui/ServiceGallery";
import { Phone, Mail, Clock } from "lucide-react";
import { ServiceConfigurator } from "@/components/services/ServiceConfigurator";
import { Button } from "@/components/ui/button";
import { localCatalog } from "@/data/localCatalog";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 3600; // 1 hour ISR

export async function generateStaticParams() {
  const { data: services } = await supabase
    .from("services")
    .select("slug");

  return (services || []).map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!service) return { title: "Služba nenalezena | NANOfusion" };

  // Generate short description for meta
  const rawDesc = service.description || "";
  const plainText = rawDesc.replace(/<[^>]*>?/gm, '');
  const metaDesc = plainText.substring(0, 160).trim() + "...";

  const title = `${service.name} | NANOfusion`;
  const url = `https://nanofusion.cz/sluzby/${slug}`;
  const defaultImage = "https://nanofusion.cz/static/logo.jpg";
  // Pokusíme se vzít obrázek z hero nebo z fotek, jinak použijeme logo
  const ogImage = service.hero_image_url || defaultImage;

  return {
    title,
    description: metaDesc,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: metaDesc,
      type: "website",
      url,
      siteName: "NANOfusion",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: service.name,
        },
      ],
      locale: "cs_CZ",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: metaDesc,
      images: [ogImage],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;

  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!service || !service.is_active) {
    notFound();
  }

  const serviceId = service.id;

  const [faqsRes, beforeAfterRes, reviewsRes, configRes] = await Promise.all([
    supabase
      .from("service_faqs")
      .select("*")
      .eq("service_id", serviceId)
      .eq("is_active", true)
      .order("order_index", { ascending: true }),
    supabase
      .from("service_before_after")
      .select("*")
      .eq("service_id", serviceId)
      .order("order_index", { ascending: true }),
    supabase
      .from("service_reviews")
      .select("*")
      .eq("service_id", serviceId)
      .eq("is_visible", true)
      .order("created_at", { ascending: false }),
    supabase
      .from("site_config")
      .select("*")
      .in("key", [`service_process_${serviceId}`, `service_process_${slug}`])
  ]);

  const faqs = faqsRes.data || [];
  const beforeAfterPhotos = beforeAfterRes.data || [];
  const specificReviews = reviewsRes.data || [];

  // Použijeme localCatalog pro bohatý obsah, který není v Supabase tabulce (jako na starém webu)
  const localData = localCatalog[slug] || {};

  const priceKey = localData.price_key || slug;
  const { data: priceData } = await supabase
    .from("configurator_prices")
    .select("price")
    .eq("item_key", priceKey)
    .single();
  const basePrice = priceData?.price || 150;

  let customProcessSteps = localData.process || [];
  // Zkusíme přepsat z databáze, pokud tam něco je (pro zpětnou kompatibilitu)
  const processConfig = configRes.data?.find(c => c.key === `service_process_${serviceId}` || c.key === `service_process_${slug}`);
  if (processConfig && processConfig.value) {
    try {
      const parsed = JSON.parse(processConfig.value);
      if (Array.isArray(parsed) && parsed.length > 0) {
        customProcessSteps = parsed;
      }
    } catch (e) {
      console.error("Failed to parse custom process steps", e);
    }
  }

  const beforeImg = beforeAfterPhotos.length > 0 ? beforeAfterPhotos[0].before_url : null;
  const afterImg = beforeAfterPhotos.length > 0 ? beforeAfterPhotos[0].after_url : null;
  const hasBeforeAfter = beforeImg && afterImg && beforeImg !== afterImg;

  let ytId = null;
  if (service.video_url) {
    const ytMatch = service.video_url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    if (ytMatch) ytId = ytMatch[1];
  }

  // Načtení bohatého obsahu (když není v databázi plný text, použijeme lokální)
  const processDescription = service.process_description || localData.what_included || "";
  const benefits = localData.benefits || (service.features || []).map((f: string) => ({ title: f, desc: "" }));
  const gallery = localData.gallery || [];
  const quote = localData.quote;
  const processNote = localData.process_note;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "provider": {
      "@type": "LocalBusiness",
      "name": "NANOfusion",
      "url": "https://nanofusion.cz",
      "telephone": "+420774509409",
      "email": "info@nanofusion.cz",
    },
    "description": service.description ? service.description.replace(/<[^>]*>?/gm, '').substring(0, 160) : "",
    "areaServed": "CZ",
    "url": `https://nanofusion.cz/sluzby/${slug}`,
  };

  return (
    <main className="font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceHero service={service} ytId={ytId} basePrice={basePrice} />

      <ServiceBenefits service={service} processDescription={processDescription} benefits={benefits} />

      <ServiceProcess serviceName={service.name} steps={customProcessSteps} processNote={processNote} />

      {hasBeforeAfter && (
        <ServiceBeforeAfter beforeImg={beforeImg!} afterImg={afterImg!} />
      )}

      {gallery.length > 0 && (
        <ServiceGallery images={gallery} />
      )}

      <Reviews initialReviews={specificReviews.length > 0 ? specificReviews : undefined} />

      {faqs.length > 0 && (
        <FAQ initialFaqs={faqs} />
      )}

      <ServiceCTA />
    </main>
  );
}

function ServiceHero({ service, ytId, basePrice }: { service: any; ytId: string | null; basePrice: number }) {
  const stats = [
    "14 let zkušeností",
    "950+ dokončených projektů",
    "100% bezplatná konzultace"
  ];

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-slate-900 min-h-[80vh] flex items-center">
      <div className="absolute inset-0 z-0 opacity-40">
        {ytId ? (
          <img src={`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`} className="w-full h-full object-cover" alt="" />
        ) : service.hero_image_url ? (
          <img src={optimizeImg(service.hero_image_url, 1600)} className="w-full h-full object-cover" alt="" />
        ) : (
          <div className="w-full h-full bg-slate-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-black text-white mb-6 leading-tight drop-shadow-xl">
              {(() => {
                const parts = service.name.trim().split(" ");
                if (parts.length > 1) {
                  return (
                    <>
                      <span className="text-white">{parts[0]}</span>{" "}
                      <span className="text-amber-500">{parts.slice(1).join(" ")}</span>
                    </>
                  );
                }
                return <span className="text-amber-500">{service.name}</span>;
              })()}
            </h1>
            <div
              className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed font-light drop-shadow-md"
              dangerouslySetInnerHTML={{ __html: service.description || "" }}
            />

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10 text-amber-500 font-bold text-sm md:text-base">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  {stat}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+420774509409"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all font-bold"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                +420 774 509 409
              </a>
              <a
                href="mailto:info@nanofusion.cz"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all font-bold"
              >
                <Mail className="w-4 h-4 text-amber-500" />
                info@nanofusion.cz
              </a>
            </div>
          </div>

          <div className="relative w-full max-w-xl mx-auto lg:mr-0 z-20">
            <ServiceConfigurator basePrice={basePrice} serviceName={service.name} />
          </div>

        </div>
      </div>
    </section>
  );
}

function ServiceBenefits({ service, processDescription, benefits }: { service: any; processDescription: string; benefits: any[] }) {
  if (!processDescription && benefits.length === 0) return null;

  return (
    <section id="vyhody" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-amber-500 p-8 md:p-12 shadow-xl shadow-amber-500/5">
          <h2 className="text-xl md:text-2xl font-black text-amber-500 mb-6 uppercase">
            Co to obsahuje?
          </h2>

          {processDescription && (
            <div
              className="text-slate-700 text-lg leading-relaxed mb-10 prose prose-amber max-w-none prose-p:mb-6"
              dangerouslySetInnerHTML={{ __html: processDescription }}
            />
          )}

          {benefits.length > 0 && (
            <>
              <h3 className="text-xl font-bold text-slate-900 mb-6">Co je součástí:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1 bg-amber-100 rounded-full p-1.5">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-slate-800 mb-1">
                        {benefit.title}
                      </div>
                      {benefit.desc && (
                        <div className="text-slate-600 text-sm leading-relaxed">
                          {benefit.desc}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function ServiceProcess({ serviceName, steps, processNote }: { serviceName: string; steps: any[]; processNote?: string }) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">
            Jak čištění probíhá
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={step.id || idx} className="bg-white rounded-2xl border-2 border-amber-500 p-8 shadow-xl shadow-amber-500/5 flex flex-col items-center text-center relative">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-2xl font-black text-white mb-6 shadow-lg shadow-amber-500/30">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
              <p className="text-slate-600">{step.desc || step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full shadow-md border border-slate-100">
            <Clock className="w-6 h-6 text-amber-500" />
            <span className="text-lg font-medium text-slate-800">
              {processNote ? (
                <span dangerouslySetInnerHTML={{ __html: processNote.replace(/\d+\s*(?:až|do|a)?\s*\d*\s*(?:dny|dní|hodiny|hodin|den)/g, (match) => `<strong class="text-amber-500">${match}</strong>`) }} />
              ) : (
                <>Čištění a ochranu {serviceName.toLowerCase().includes("střech") ? "střechy" : "povrchu"} stihneme za <strong className="text-amber-500">1 až 2 pracovní dny</strong></>
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCTA() {
  return (
    <section className="py-20 bg-slate-900 border-t-4 border-amber-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-black text-white mb-6">Chcete vědět více?</h2>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light">
          Zanechte nám na sebe kontakt a my se vám co nejdříve ozveme s nezávaznou nabídkou pro vaši konkrétní situaci.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Button href="#kalkulacka" className="h-16 px-10 text-lg font-black rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-xl shadow-amber-500/20">
            SPOČÍTEJTE SI CENU <span className="ml-2">→</span>
          </Button>
          <a href="tel:+420774509409" className="inline-flex items-center justify-center gap-3 h-16 px-10 text-lg font-bold rounded-xl bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all">
            <Phone className="w-5 h-5 text-amber-500" />
            +420 774 509 409
          </a>
        </div>
      </div>
    </section>
  );
}
