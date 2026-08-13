import { Suspense } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { ArticlesCarousel } from "@/components/home/ArticlesCarousel";
import { supabase } from "@/lib/supabase";

async function ArticlesData() {
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(10);

  if (!articles || articles.length === 0) {
    return null;
  }

  return <ArticlesCarousel articles={articles} />;
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-20 w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-100 border-t-amber-500"></div>
    </div>
  );
}

export function Articles() {
  return (
    <section id="blog" className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          title="Nano-Magazín & Tipy"
          subtitle="Sledujte rady a novinky, jak pečovat o váš dům s moderními technologiemi."
          variant="default"
          className="mb-8"
        />

        <Suspense fallback={<LoadingSpinner />}>
          <ArticlesData />
        </Suspense>

      </div>
    </section>
  );
}
