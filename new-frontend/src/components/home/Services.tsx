import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { SectionHeader } from "@/components/ui/section-header";

// Local component (Helper / Colocated Component) for cleaner code
function ServiceCard({ service }: { service: any }) {
  let ytId = null;
  if (service.video_url) {
    const ytMatch = service.video_url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    if (ytMatch) ytId = ytMatch[1];
  }

  return (
    <Link 
      href={`/sluzby/${service.slug}#kalkulacka`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[4/3] overflow-hidden bg-gray-100">
        {ytId ? (
          <>
            <img 
              src={service.hero_image_url || `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`} 
              alt={service.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 z-10">
              <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                 <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                 </svg>
              </div>
            </div>
          </>
        ) : service.hero_image_url ? (
          <img 
            src={service.hero_image_url} 
            alt={service.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-amber-500 mb-3">
          {service.name}
        </h3>
        
        <div 
          className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: service.description }}
        />

        <div className="mt-auto pt-4 flex items-center text-amber-500 font-bold text-sm group-hover:text-amber-600 transition-colors">
          Spočítat cenu
          <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export async function Services() {
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("order_index", { ascending: true });

  if (!services?.length) return null;

  return (
    <section id="sluzby" className="py-12 md:py-16 bg-white font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader 
          title="Dočista kvalitní služby"
          subtitle="Komplexní péče o váš majetek – od čištění po dlouhodobou ochranu povrchů"
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
