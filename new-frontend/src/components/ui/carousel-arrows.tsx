import React from 'react';
import { cn } from '@/lib/utils';

interface CarouselArrowsProps {
  onScroll: (direction: 'left' | 'right') => void;
  canScrollLeft?: boolean;
  canScrollRight?: boolean;
}

export function CarouselArrows({ onScroll, canScrollLeft = true, canScrollRight = true }: CarouselArrowsProps) {
  return (
    <>
      {/* Left Arrow */}
      <button
        onClick={() => canScrollLeft && onScroll('left')}
        disabled={!canScrollLeft}
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-8 z-20 w-16 h-16 rounded-full flex items-center justify-center text-white transition-all duration-300 focus:outline-none",
          canScrollLeft 
            ? "bg-amber-500 shadow-[0_-5px_20px_rgba(245,158,11,0.5)] opacity-0 group-hover:opacity-100 hover:bg-amber-600 hover:shadow-[0_-8px_25px_rgba(245,158,11,0.8)] cursor-pointer"
            : "bg-slate-300 opacity-50 cursor-not-allowed hidden md:flex"
        )}
        aria-label="Předchozí"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => canScrollRight && onScroll('right')}
        disabled={!canScrollRight}
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-8 z-20 w-16 h-16 rounded-full flex items-center justify-center text-white transition-all duration-300 focus:outline-none",
          canScrollRight
            ? "bg-amber-500 shadow-[0_-5px_20px_rgba(245,158,11,0.5)] opacity-0 group-hover:opacity-100 hover:bg-amber-600 hover:shadow-[0_-8px_25px_rgba(245,158,11,0.8)] cursor-pointer"
            : "bg-slate-300 opacity-50 cursor-not-allowed hidden md:flex"
        )}
        aria-label="Další"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </>
  );
}
