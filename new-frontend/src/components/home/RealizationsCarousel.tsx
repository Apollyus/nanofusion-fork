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
    <div onClick={onClick} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 w-[85vw] md:w-[320px] lg:w-[380px] shrink-0 cursor-pointer">
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

      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.title || ""}>
        {selectedItem && (
          <div className="flex flex-col gap-6">
            <div className="w-full h-64 md:h-96 relative rounded-2xl overflow-hidden">
              <img 
                src={selectedItem.realization_photos?.[0]?.url ? optimizeImg(selectedItem.realization_photos[0].url, 1200) : selectedItem.image_url ? optimizeImg(selectedItem.image_url, 1200) : `https://placehold.co/1200x800/eeeeee/999999?text=${encodeURIComponent(selectedItem.title)}`}
                alt={selectedItem.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="bg-amber-50 text-amber-500 px-3 py-1 rounded-full">
                {selectedItem.work_type || selectedItem.category || "Realizace"}
              </div>
              <div className="flex items-center text-gray-500">
                <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {selectedItem.location || "Neznámá lokalita"}
              </div>
            </div>

            {selectedItem.content && (
              <div 
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedItem.content }}
              />
            )}
            
            {selectedItem.realization_photos?.length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {selectedItem.realization_photos.slice(1).map((photo: any, idx: number) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden">
                    <img 
                      src={optimizeImg(photo.url, 400)}
                      alt={`${selectedItem.title} - foto ${idx + 2}`}
                      className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
