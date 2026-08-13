"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { CarouselArrows } from "@/components/ui/carousel-arrows";
import { Pill } from "@/components/ui/pill";
import { useCarousel } from "@/hooks/useCarousel";

function ReviewCard({ review }: { review: any }) {
  return (
    <div 
      className="flex-none w-[320px] md:w-[350px] bg-slate-800 rounded-2xl p-8 flex flex-col snap-start"
    >
      <div className="text-amber-500 mb-4 flex gap-1">
        {Array.from({ length: review.rating }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>
      <p className="text-slate-300 italic mb-6 leading-relaxed flex-1">
        "{review.text}"
      </p>
      <div>
        <h4 className="text-white font-bold">{review.name}</h4>
        <p className="text-slate-400 text-sm">{review.source}</p>
      </div>
    </div>
  );
}

export function Reviews({ initialReviews }: { initialReviews?: any[] }) {
  const { scrollRef, scrollByAmount, canScrollLeft, canScrollRight } = useCarousel(0.5, 350);

  // Statická data z původního webu jako záloha
  const defaultReviews = [
    {
      id: 1,
      name: "Jan Novák",
      text: "Skvělá práce, střecha vypadá jako nová!",
      rating: 5,
      source: "Ověřený zákazník"
    },
    {
      id: 2,
      name: "Marie Dvořáková",
      text: "Profesionální přístup a perfektní výsledek čištění fasády.",
      rating: 5,
      source: "Ověřená recenze"
    },
    {
      id: 3,
      name: "Martin K.",
      text: "Nanofusion nám dělali nano-ochranu fotovoltaiky. Od té doby se panely méně špiní a výkon je stabilnější. Super technologie.",
      rating: 5,
      source: "Ověřená recenze"
    },
    {
      id: 4,
      name: "Jana Hasalová",
      text: "Vynikající servis při čištění zámkové dlažby. Vypadá jako nová. Děkujeme za profesionální práci.",
      rating: 5,
      source: "Ověřená recenze"
    },
    {
      id: 5,
      name: "Janina",
      text: "Čištění střechy proběhlo rychle a precizně. Firma dodržela vše, co slíbila. Velmi spokojená.",
      rating: 5,
      source: "Ověřená recenze"
    },
    {
      id: 6,
      name: "Hrabalova Blanka",
      text: "Profesionální přístup, skvělá komunikace a výsledek čištění fasády předčil naše očekávání. Doporučuji!",
      rating: 5,
      source: "Ověřená recenze"
    }
  ];

  const reviews = initialReviews && initialReviews.length > 0 ? initialReviews : defaultReviews;

  return (
    <section id="reference" className="py-24 bg-[#111111] font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <SectionHeader
          title="Co o nás říkají naši klienti"
          subtitle="Reference čerpáme z portálů Firmy.cz a Google. Spokojenost našich klientů je pro nás prioritou číslo jedna."
          variant="light"
        />

        <div className="flex flex-wrap justify-center gap-4 mb-12 relative z-10">
          <Pill
            href="https://www.firmy.cz/detail/12954501-nanofusion-s-r-o-blucina.html#hodnoceni"
            external
            icon={<span className="text-amber-500 font-black">★ 4,9</span>}
          >
            Recenze na Firmy.cz ↗
          </Pill>
          <Pill
            href="https://www.google.com/search?q=NANOfusion+recenze"
            external
            icon={<span className="text-blue-400 font-black">★ 5,0</span>}
          >
            Recenze na Google ↗
          </Pill>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          
          <CarouselArrows 
            onScroll={scrollByAmount} 
            canScrollLeft={canScrollLeft} 
            canScrollRight={canScrollRight} 
          />

          {/* Gradient Edges */}
          <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />

          {/* Reviews Scroll Area */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar relative z-0"
          >
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
