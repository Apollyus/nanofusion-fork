"use client";

import { useState } from "react";
import { useCarousel } from "@/hooks/useCarousel";
import { CarouselArrows } from "@/components/ui/carousel-arrows";
import { Modal } from "@/components/ui/modal";

export function VideosCarousel({ videos }: { videos: any[] }) {
  const { scrollRef, scrollByAmount, canScrollLeft, canScrollRight } = useCarousel(1);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  if (!videos || videos.length === 0) return null;

  return (
    <>
      <div className="relative group/carousel">
        <CarouselArrows 
          onScroll={scrollByAmount} 
          canScrollLeft={canScrollLeft} 
          canScrollRight={canScrollRight} 
        />

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 sm:gap-6 lg:gap-8 hide-scrollbar pb-12 pt-4 px-[7.5vw] md:px-1"
        >
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} onClick={() => setSelectedItem(video)} />
          ))}
        </div>
      </div>

      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.title || selectedItem?.caption || "Detail"}>
        {selectedItem && (
          <div className="flex flex-col gap-6">
            <div className="w-full relative rounded-2xl overflow-hidden bg-black flex items-center justify-center min-h-[50vh]">
              {(selectedItem.type === 'youtube' || !!selectedItem.youtube_id) ? (
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedItem.youtube_id}?autoplay=1`} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              ) : (
                <img 
                  src={selectedItem.url} 
                  alt={selectedItem.title || selectedItem.caption}
                  className="max-w-full max-h-[75vh] object-contain"
                />
              )}
            </div>
            {(selectedItem.caption || selectedItem.title) && (
              <div className="text-lg text-slate-700">
                {selectedItem.caption || selectedItem.title}
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}

function VideoCard({ video, onClick }: { video: any; onClick: () => void }) {
  const isVideo = video.type === 'youtube' || !!video.youtube_id;
  const title = video.caption || video.title || (isVideo ? 'Video' : 'Fotografie');
  const youtubeId = video.youtube_id;
  const imageUrl = isVideo ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : video.url;
  
  return (
    <div 
      onClick={onClick}
      className="group/card flex flex-col bg-[#121826] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 w-[85vw] md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.333rem)] shrink-0 cursor-pointer"
    >
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        <img 
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105 opacity-90"
        />
        
        {/* Play Button (YouTube red) */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center transition-colors duration-500 pointer-events-none">
            <div className="w-[68px] h-[48px] bg-[#FF0000] rounded-xl flex items-center justify-center shadow-lg group-hover/card:scale-110 transition-transform duration-300 pointer-events-none">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        )}

        {/* Link icon bottom left */}
        <div className="absolute bottom-4 left-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center">
          {isVideo ? (
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>

        {/* "View Photo/Video" bottom right */}
        {isVideo ? (
          <div className="absolute bottom-4 right-4 bg-black/80 text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-2 border border-white/10">
            Přehrát video
          </div>
        ) : (
          <div className="absolute bottom-4 right-4 bg-black/80 text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-2 border border-white/10">
            Zobrazit fotografii
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <div className="text-amber-500 font-bold text-xs uppercase tracking-wider mb-2">
          {isVideo ? 'VIDEO' : 'FOTOGRAFIE'}
        </div>
        <h3 className="text-lg font-bold text-white transition-colors leading-snug truncate">
          {title}
        </h3>
      </div>
    </div>
  );
}
