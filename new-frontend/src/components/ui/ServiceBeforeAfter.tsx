"use client";

import { useState, useRef, useEffect } from "react";
import { optimizeImg } from "@/lib/supabase";

interface ServiceBeforeAfterProps {
  beforeImg: string;
  afterImg: string;
}

export function ServiceBeforeAfter({ beforeImg, afterImg }: ServiceBeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (hasInteracted) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const animate = (time: number) => {
      if (startTimeRef.current === null) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current!;
      
      // Oscillate faster (speed up by lowering the divisor, e.g., 400 instead of 700)
      const oscillation = Math.sin(elapsed / 400) * 18; 
      setSliderPosition(50 + oscillation);

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [hasInteracted]);

  const handleMove = (clientX: number) => {
    if (!hasInteracted) setHasInteracted(true);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return; // Only if mouse is pressed
    handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-amber-500 mb-2">
          Před a Po
        </h2>
        <p className="text-gray-500 mb-10 text-lg">
          Táhněte posuvníkem a porovnejte rozdíl sami
        </p>

        <div
          ref={containerRef}
          className="relative rounded-2xl overflow-hidden aspect-[16/10] select-none shadow-xl border-2 border-amber-500 cursor-ew-resize touch-none"
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
          onMouseDown={(e) => handleMove(e.clientX)}
          onTouchStart={(e) => handleMove(e.touches[0].clientX)}
        >
          {/* After Image (Background) */}
          <img
            src={optimizeImg(afterImg, 1000)}
            alt="Po"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />

          {/* Before Image (Clipped) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src={optimizeImg(beforeImg, 1000)}
              alt="Před"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.7)] pointer-events-none z-10"
            style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-amber-500 border-2 border-white rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(245,158,11,0.6)] text-white font-bold text-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full font-bold text-xs shadow-md pointer-events-none z-10">
            PŘED
          </div>
          <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full font-bold text-xs shadow-md pointer-events-none z-10">
            PO
          </div>

          {/* Fallback Range Input for accessibility and native mobile feeling */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => {
              if (!hasInteracted) setHasInteracted(true);
              setSliderPosition(Number(e.target.value));
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
            aria-label="Porovnání před a po"
          />
        </div>
      </div>
    </section>
  );
}
