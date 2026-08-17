import { Suspense } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { RealizationsCarousel } from "@/components/home/RealizationsCarousel";
import { supabase } from "@/lib/supabase";

async function RealizationsData() {
  const { data: realizations } = await supabase
    .from('realizations')
    .select('*, realization_photos(*)')
    .eq('is_published', true)
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false });

  if (!realizations || realizations.length === 0) {
    return null;
  }

  return <RealizationsCarousel realizations={realizations} />;
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-20 w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-100 border-t-amber-500"></div>
    </div>
  );
}

export function Realizations() {
  return (
    <section id="realizace" className="py-12 md:py-16 bg-slate-50 font-sans overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          title="Naše realizace v detailu"
          subtitle="Sledujte, jak vracíme povrchům jejich původní vzhled a krásu"
          variant="default"
          className="mb-10"
        />

        <Suspense fallback={<LoadingSpinner />}>
          <RealizationsData />
        </Suspense>

      </div>
    </section>
  );
}
