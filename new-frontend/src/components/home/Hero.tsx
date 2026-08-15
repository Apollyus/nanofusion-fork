import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { supabase, optimizeImg } from "@/lib/supabase";

async function getConfig() {
  const { data } = await supabase.from("site_config").select("key, value");
  return (data || []).reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {} as Record<string, string>);
}

import { Pill } from "@/components/ui/pill";
import { FloatingReview } from "@/components/ui/floating-review";

const Stats = ({ config }: { config: Record<string, string> }) => {
  let stats = [
    { value: "950+", label: "Dokončených projektů" },
    { value: "745 000", label: "m² ošetřených ploch" },
    { value: "14", label: "Let zkušeností" },
    { value: "100%", label: "Bezplatná konzultace" },
  ];

  if (config.about_stats) {
    try {
      const parsed = JSON.parse(config.about_stats);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Map DB stats which have {label: string, value: string}
        stats = parsed.map((s: any) => ({ value: s.value, label: s.label }));
      }
    } catch (e) {
      console.error("Failed to parse about_stats", e);
    }
  }

  return (
    <div className="bg-white pt-16 pb-20 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-12 md:gap-20 text-center">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col gap-2 min-w-[200px]">
            <div className="text-4xl md:text-5xl font-bold text-amber-500">{stat.value}</div>
            <div className="text-gray-500 text-sm md:text-base font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Hero = async () => {
  const config = await getConfig();

  const { data: mediaData } = await supabase
    .from("hero_media")
    .select("*")
    .eq("is_active", true)
    .maybeSingle();

  const ytMatch = mediaData?.url?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  const ytId = ytMatch ? ytMatch[1] : null;

  const heroTitle =
    config.hero_title ||
    `Špičková péče o to, <br/><span class="text-amber-500">co jste usilovně vybudovali</span>`;

  const heroSubtitle =
    config.hero_subtitle ||
    "Profesionální vysokotlaké čištění, impregnace a nátěry střech, fasád a dlažeb. 14 let zkušeností po celé ČR.";

  return (
    <section className="relative w-full flex flex-col font-sans">
      {/* Hero Background and Content */}
      <div className="relative w-full min-h-[500px] h-[70vh] max-h-[750px] flex flex-col justify-center bg-[#1f1f1f] overflow-hidden pt-4 pb-32 lg:pb-24">

        {/* Background Video/Image */}
        {mediaData && (
          <div className="absolute inset-0 z-0 overflow-hidden">
            {ytId ? (
              <iframe
                className="w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytId}&modestbranding=1&playsinline=1&rel=0&enablejsapi=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : mediaData.type === 'video' ? (
              <video
                src={mediaData.url}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <img
                src={mediaData.url}
                alt="Hero background"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
          </div>
        )}

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-start gap-6">

          {/* Badge */}
          <div className="flex flex-wrap gap-3">
            <Pill
              icon={<span className="text-amber-500 text-sm tracking-tighter">★★★★★</span>}
            >
              <span className="text-gray-300">950+ spokojených zákazníků</span>
            </Pill>
          </div>

          {/* Headlines */}
          <div className="max-w-3xl mt-4">
            <h1
              className="text-5xl md:text-6xl lg:text-[5rem] font-extrabold text-white leading-[1.1] tracking-tight mb-6"
              dangerouslySetInnerHTML={{ __html: heroTitle }}
            />
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-normal leading-relaxed">
              {heroSubtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-6">
            <Button href="/kalkulace" size="lg" className="flex items-center gap-2">
              Nezávazná cenová nabídka
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
            <Button href="/sluzby" variant="white" size="lg">
              Prozkoumat služby
            </Button>
          </div>
        </div>
        
        {/* Floating Review on Video */}
        <FloatingReview />


        {/* Bottom Curved Wave Separator */}
        <div className="absolute bottom-[-2px] left-0 w-full overflow-hidden leading-none z-10 text-white">
          <svg
            className="relative block w-full h-[80px] md:h-[120px]"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C71.35,33.56,155.67,53.28,236.4,59.39Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <Stats config={config} />
    </section>
  );
};
