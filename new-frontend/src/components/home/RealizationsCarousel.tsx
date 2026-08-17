"use client";

import { useState } from "react";
import { useCarousel } from "@/hooks/useCarousel";
import { CarouselArrows } from "@/components/ui/carousel-arrows";
import { optimizeImg } from "@/lib/supabase";
import { Modal } from "@/components/ui/modal";

function RealizationCard({ item, onClick }: { item: any; onClick: () => void }) {
  const rawUrl = item.realization_photos?.[0]?.url || item.image_url;
  const imageUrl = rawUrl ? optimizeImg(rawUrl, 600) : `https://placehold.co/600x400/eeeeee/999999?text=${encodeURIComponent(item.title)}`;
  
  return (
    <div onClick={onClick} className="group/card flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 w-[85vw] md:w-[320px] lg:w-[380px] shrink-0 cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img 
          src={imageUrl} 
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white text-slate-900 font-bold px-6 py-3 rounded-full text-sm tracking-widest uppercase shadow-xl transform translate-y-4 group-hover/card:translate-y-0 transition-all duration-300">
            Detail projektu
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="inline-block bg-amber-50 text-amber-500 font-bold text-[10px] md:text-xs uppercase tracking-wider mb-3 px-3 py-1 rounded-full w-fit">
          {item.work_type || item.category || "Realizace"}
        </div>
        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 line-clamp-2 leading-snug group-hover/card:text-amber-500 transition-colors">
          {item.title}
        </h3>
        <div className="mt-auto flex items-center text-gray-500 text-sm font-medium">
          <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {item.location || "Neznámá lokalita"}
        </div>
      </div>
    </div>
  );
}

function RealizationModalContent({ item, onClose }: { item: any; onClose: () => void }) {
  const allPhotos = item.realization_photos || [];
  // Include main image_url as fallback if no photos exist
  const photos = allPhotos.length > 0 
    ? allPhotos.map((p: any) => p.url) 
    : (item.image_url ? [item.image_url] : []);
    
  const [activeIndex, setActiveIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % photos.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Image */}
      <div className="w-full aspect-video md:h-[400px] relative rounded-3xl overflow-hidden bg-slate-100 group">
        {photos.length > 0 ? (
          <img 
            src={optimizeImg(photos[activeIndex], 1200)}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">Bez obrázku</span>
          </div>
        )}
        
        {/* Gallery Arrows */}
        {photos.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}
      </div>

      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-3xl font-extrabold text-[#1a1a24] mb-6 leading-tight">
            {item.title}
          </h2>
          
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-bold mb-8">
            <div className="bg-[#fff8eb] text-amber-500 px-4 py-2 rounded-full uppercase tracking-wide text-xs">
              {item.work_type || item.category || "Realizace"}
            </div>
            {item.duration && (
              <div className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full flex items-center gap-2 text-xs">
                <span>⏱</span>
                {item.duration}
              </div>
            )}
            <div className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full flex items-center gap-2 text-xs">
              <span>📍</span>
              {item.location || "Neznámá lokalita"}
            </div>
          </div>

          {/* Thumbnails */}
          {photos.length > 1 && (
            <div className="flex flex-wrap gap-4 mb-8">
              {photos.map((photo: string, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative w-24 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeIndex === idx ? 'border-amber-500 scale-105' : 'border-transparent hover:scale-105'}`}
                >
                  <img src={optimizeImg(photo, 200)} className="absolute inset-0 w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: CTA */}
        <div className="w-full lg:w-[320px] shrink-0">
          <div className="bg-amber-500 rounded-3xl p-8 text-white shadow-lg">
            <h3 className="text-xl font-bold mb-3">Zaujala vás tato práce?</h3>
            <p className="text-amber-50 text-sm mb-6 leading-relaxed">
              Rádi pro vás připravíme nezávaznou kalkulaci zdarma.
            </p>
            <button 
              onClick={() => {
                onClose();
                setTimeout(() => {
                  const el = document.getElementById("kalkulacka");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }, 100);
              }}
              className="block w-full bg-white text-amber-600 hover:bg-slate-50 hover:scale-105 active:scale-95 font-bold py-3.5 px-6 rounded-2xl text-center transition-all shadow-sm cursor-pointer"
            >
              MÁM ZÁJEM 💬
            </button>
          </div>
        </div>
      </div>

      {/* Description Box */}
      {(item.content || item.description) && (
        <div className="mt-8 border border-gray-200 rounded-3xl p-8 bg-white">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
            Detaily realizace
          </h4>
          <div 
            className="prose prose-slate max-w-none text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: item.content || item.description }}
          />
        </div>
      )}
    </div>
  );
}

export function RealizationsCarousel({ realizations }: { realizations: any[] }) {
  const { scrollRef, scrollByAmount, canScrollLeft, canScrollRight } = useCarousel(0);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  if (!realizations || realizations.length === 0) return null;

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
          className="flex overflow-x-auto gap-4 sm:gap-6 lg:gap-8 hide-scrollbar pb-8 pt-4 px-[7.5vw] md:px-1"
        >
          {realizations.map((item) => (
            <RealizationCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
          ))}
        </div>
      </div>

      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title="">
        {selectedItem && <RealizationModalContent item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </Modal>
    </>
  );
}
