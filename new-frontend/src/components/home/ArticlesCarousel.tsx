"use client";

import { useState } from "react";
import { useCarousel } from "@/hooks/useCarousel";
import { CarouselArrows } from "@/components/ui/carousel-arrows";
import { Modal } from "@/components/ui/modal";

function ArticleCard({ article, onClick }: { article: any; onClick: () => void }) {
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
    <div 
      onClick={onClick}
      className="group/card flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 h-auto w-[85vw] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] shrink-0 cursor-pointer"
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
    </div>
  );
}

function ArticleModalContent({ article }: { article: any }) {
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
    <div className="flex flex-col">
      <div className="w-full aspect-video md:h-[400px] relative rounded-3xl overflow-hidden bg-slate-100">
        {article.hero_image_url ? (
          <img 
            src={article.hero_image_url}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">Bez obrázku</span>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-50 text-amber-500 px-4 py-2 rounded-full uppercase tracking-wide text-xs font-bold">
              AKTUALITA
            </div>
            <div className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-xs font-bold">
              {formattedDate}
            </div>
          </div>
          
          <h2 className="text-3xl font-extrabold text-[#1a1a24] mb-6 leading-tight">
            {article.title}
          </h2>
        </div>

        {article.content && (
          <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content }} />
        )}

        {article.excerpt && (
          <p className="text-lg text-gray-700 font-medium leading-relaxed border-l-4 border-amber-500 pl-6">
            {article.excerpt}
          </p>
        )}
      </div>
    </div>
  );
}

export function ArticlesCarousel({ articles }: { articles: any[] }) {
  const { scrollRef, scrollByAmount, canScrollLeft, canScrollRight } = useCarousel(1);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  if (!articles || articles.length === 0) return null;

  return (
    <>
      <div className="relative group">
        <CarouselArrows 
          onScroll={scrollByAmount} 
          canScrollLeft={canScrollLeft} 
          canScrollRight={canScrollRight} 
        />

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 sm:gap-8 hide-scrollbar pb-8 pt-4 px-[7.5vw] md:px-1"
        >
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} onClick={() => setSelectedArticle(article)} />
          ))}
        </div>
      </div>

      <Modal isOpen={!!selectedArticle} onClose={() => setSelectedArticle(null)} title="">
        {selectedArticle && <ArticleModalContent article={selectedArticle} />}
      </Modal>
    </>
  );
}
