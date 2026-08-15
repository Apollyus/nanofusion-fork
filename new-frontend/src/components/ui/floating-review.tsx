import React from "react";

export function FloatingReview() {
  return (
    <a
      href="https://www.google.com/search?q=NANOfusion+recenze"
      target="_blank"
      rel="noopener noreferrer"
      className="hidden lg:flex absolute right-12 bottom-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 w-[320px] flex-col gap-3 z-30 shadow-2xl hover:bg-white/20 transition-all cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-1 text-amber-500 text-sm">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
        <span className="text-white/80 text-xs font-semibold bg-white/10 px-2 py-1 rounded-full">
          Google Recenze
        </span>
      </div>
      <p className="text-gray-200 text-sm italic font-medium leading-relaxed">
        "Profesionální přístup, skvělá komunikace a výsledek čištění fasády
        předčil naše očekávání. Doporučuji!"
      </p>
      <div className="flex items-center gap-2 mt-1">
        <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-xs font-bold text-white">
          H
        </div>
        <span className="text-gray-300 text-xs font-medium">
          Hrabalova Blanka
        </span>
      </div>
    </a>
  );
}
