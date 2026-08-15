"use client";

import Link from "next/link";
import { useCarousel } from "@/hooks/useCarousel";
import { CarouselArrows } from "@/components/ui/carousel-arrows";
import { optimizeImg } from "@/lib/supabase";

function RealizationCard({ item }: { item: any }) {
  const rawUrl = item.realization_photos?.[0]?.url || item.image_url;
  const imageUrl = rawUrl ? optimizeImg(rawUrl, 600) : `https://placehold.co/600x400/eeeeee/999999?text=${encodeURIComponent(item.title)}`;
  
  const CardWrapper = item.slug ? Link : "div";
  const wrapperProps = item.slug ? { href: `/realizace/${item.slug}` } : {};

  return (
    <CardWrapper {...wrapperProps} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 w-[85vw] md:w-[320px] lg:w-[380px] shrink-0 snap-start cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img 
          src={imageUrl} 
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="inline-block bg-amber-50 text-amber-500 font-bold text-[10px] md:text-xs uppercase tracking-wider mb-3 px-3 py-1 rounded-full w-fit">
          {item.work_type || item.category || "Realizace"}
        </div>
        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 line-clamp-2 leading-snug group-hover:text-amber-500 transition-colors">
          {item.title}
        </h3>
        <div className="mt-auto flex items-center text-gray-500 text-sm font-medium">
          <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {item.location || "Neznámá lokalita"}
        </div>
      </div>
    </CardWrapper>
  );
}

export function RealizationsCarousel({ realizations }: { realizations: any[] }) {
  const { scrollRef, scrollByAmount, canScrollLeft, canScrollRight } = useCarousel(0);

  if (!realizations || realizations.length === 0) return null;

  return (
    <div className="relative group">
      <CarouselArrows 
        onScroll={scrollByAmount} 
        canScrollLeft={canScrollLeft} 
        canScrollRight={canScrollRight} 
      />

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 sm:gap-6 lg:gap-8 snap-x snap-mandatory hide-scrollbar pb-8 pt-4 px-1"
      >
        {realizations.map((item) => (
          <RealizationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
