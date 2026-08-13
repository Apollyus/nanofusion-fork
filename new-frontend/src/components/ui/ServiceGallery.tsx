"use client";

import { optimizeImg } from "@/lib/supabase";

interface ServiceGalleryProps {
  images: string[];
}

export function ServiceGallery({ images }: ServiceGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-black text-amber-500 mb-2 text-center">
          Z realizací
        </h2>
        <p className="text-center text-gray-500 mb-12 text-lg">
          Reálné ukázky našich dokončených prací
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((url, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-sm border border-gray-100 group cursor-pointer"
            >
              <img
                src={optimizeImg(url, 400)}
                alt={`Realizace ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
