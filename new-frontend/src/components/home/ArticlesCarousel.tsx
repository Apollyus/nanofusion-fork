"use client";

import Link from "next/link";
import { useCarousel } from "@/hooks/useCarousel";
import { CarouselArrows } from "@/components/ui/carousel-arrows";

function ArticleCard({ article }: { article: any }) {
  let dateString = article.published_at || article.created_at;
  let formattedDate = "Neznámé datum";
  if (dateString) {
    const d = new Date(dateString);
    if (!isNaN(d.getTime())) {
      formattedDate = d.toLocaleDateString('cs-CZ', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      });
    } else {
      formattedDate = dateString;
    }
  }

  return (
    <Link 
      href={`/magazin/${article.slug}`}
      className="group/card flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 h-auto w-[85vw] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] shrink-0 snap-center md:snap-start"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-slate-100">
        {article.hero_image_url ? (
          <img 
            src={article.hero_image_url} 
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-300">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <div className="text-amber-500 font-bold text-xs uppercase tracking-wider mb-3">
          AKTUALITA • {formattedDate}
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-6 group-hover/card:text-amber-600 transition-colors line-clamp-3 leading-snug">
          {article.title}
        </h3>
        
        <div className="mt-auto flex items-center text-amber-500 font-bold text-sm transition-colors">
          Číst článek 
          <svg className="ml-1 w-4 h-4 transition-transform group-hover/card:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export function ArticlesCarousel({ articles }: { articles: any[] }) {
  const { scrollRef, scrollByAmount, canScrollLeft, canScrollRight } = useCarousel(0);

  if (!articles || articles.length === 0) return null;

  return (
    <div className="relative group">
      <CarouselArrows 
        onScroll={scrollByAmount} 
        canScrollLeft={canScrollLeft} 
        canScrollRight={canScrollRight} 
      />

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 sm:gap-8 snap-x snap-mandatory hide-scrollbar pb-8 pt-4 px-[7.5vw] md:px-1"
      >
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
