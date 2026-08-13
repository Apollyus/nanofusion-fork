import { notFound } from "next/navigation";
import { supabase, optimizeImg } from "@/lib/supabase";
import { Process } from "@/components/home/Process";
import { Reviews } from "@/components/home/Reviews";
import { FAQ } from "@/components/home/FAQ";
import { Contact } from "@/components/home/Contact";
import { ServiceBeforeAfter } from "@/components/ui/ServiceBeforeAfter";
import { ServiceGallery } from "@/components/ui/ServiceGallery";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
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

  return {
    title: `${service.name} | NANOfusion`,
    description: metaDesc,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;

  // 1. Fetch Service Data
  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!service || !service.is_active) {
    notFound();
  }

  const serviceId = service.id;

  // 2. Fetch specific data in parallel
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
  
  let customProcessSteps = undefined;
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

  // Extract variables
  const beforeImg = beforeAfterPhotos.length > 0 ? beforeAfterPhotos[0].before_url : null;
  const afterImg = beforeAfterPhotos.length > 0 ? beforeAfterPhotos[0].after_url : null;
  const hasBeforeAfter = beforeImg && afterImg && beforeImg !== afterImg;

  // Render video or hero image
  let ytId = null;
  if (service.video_url) {
    const ytMatch = service.video_url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    if (ytMatch) ytId = ytMatch[1];
  }

  const benefits: string[] = service.features || [];
  const gallery: string[] = []; // Default empty, later can fetch from realizations if needed. Currently keeping simple.

  return (
    <main className="font-sans">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-slate-900">
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
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 font-bold text-sm mb-6 border border-amber-500/20 backdrop-blur-sm">
              {service.category || "Služba"}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              {service.name}
            </h1>
            <div 
              className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light"
              dangerouslySetInnerHTML={{ __html: service.description || "" }}
            />
            
            <div className="flex flex-wrap gap-4">
              <Button href="#kontakt" variant="primary-glow" className="h-14 px-8 text-lg font-bold rounded-xl">
                Nezávazně poptat
              </Button>
              <Button href="#vyhody" variant="white" className="h-14 px-8 text-lg font-bold rounded-xl bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20">
                Zjistit více ↓
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS & WHAT'S INCLUDED */}
      {benefits.length > 0 && (
        <section id="vyhody" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8">
                  Proč si vybrat <span className="text-amber-500">naši službu?</span>
                </h2>
                <div className="space-y-6">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 font-black">
                        ✓
                      </div>
                      <div className="text-lg font-bold text-slate-800 pt-0.5">
                        {benefit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {service.process_description && (
                <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                  <h3 className="text-2xl font-black text-slate-900 mb-6">Co služba zahrnuje?</h3>
                  <div 
                    className="text-slate-600 space-y-4 prose prose-amber max-w-none"
                    dangerouslySetInnerHTML={{ __html: service.process_description }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* PROCESS */}
      <Process initialSteps={customProcessSteps} />

      {/* BEFORE & AFTER */}
      {hasBeforeAfter && (
        <ServiceBeforeAfter beforeImg={beforeImg!} afterImg={afterImg!} />
      )}

      {/* GALLERY */}
      {gallery.length > 0 && (
        <ServiceGallery images={gallery} />
      )}

      {/* REVIEWS */}
      <Reviews initialReviews={specificReviews.length > 0 ? specificReviews : undefined} />

      {/* FAQ */}
      {faqs.length > 0 && (
        <FAQ initialFaqs={faqs} />
      )}

      {/* CONTACT CTA */}
      <Contact />
    </main>
  );
}
