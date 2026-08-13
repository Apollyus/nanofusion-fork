import { SectionHeader } from "@/components/ui/section-header";
import { VideosCarousel } from "./VideosCarousel";
import { supabase } from "@/lib/supabase";

export async function Videos() {
  const { data: videos } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('type', 'youtube')
    .eq('is_active', true)
    .order('order_index', { ascending: true });

  if (!videos || videos.length === 0) return null;

  return (
    <section className="py-24 bg-white font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Špičková péče o váš majetek v detailech"
          variant="default"
        />
        <VideosCarousel videos={videos} />
      </div>
    </section>
  );
}
