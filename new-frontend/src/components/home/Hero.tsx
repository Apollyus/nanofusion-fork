import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const Badge = ({ icon, text }: { icon: React.ReactNode; text: React.ReactNode }) => (
  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-4 py-1.5 text-sm font-medium">
    {icon}
    <span>{text}</span>
  </div>
);

const Stats = () => {
  const stats = [
    { value: "950+", label: "Dokončených projektů" },
    { value: "745 000", label: "m² ošetřených ploch" },
    { value: "14", label: "Let zkušeností" },
    { value: "100%", label: "Bezplatná konzultace" },
  ];

  return (
    <div className="bg-white pt-16 pb-20 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="text-4xl md:text-5xl font-bold text-amber-500">{stat.value}</div>
            <div className="text-gray-500 text-sm md:text-base font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Hero = () => {
  return (
    <section className="relative w-full flex flex-col font-sans">
      {/* Hero Background and Content */}
      <div className="relative w-full min-h-[600px] flex flex-col justify-center bg-zinc-900 overflow-hidden pt-12 pb-24 lg:pt-0 lg:pb-0">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80")' }}
        >
          {/* Gradient Overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-start gap-8">
          
          {/* Badges */}
          <div className="flex flex-wrap gap-3">
            <Badge 
              icon={<span className="text-amber-500 text-lg leading-none tracking-widest">★★★★★</span>}
              text={<><span className="text-amber-500 font-bold">950+</span> dokončených projektů</>} 
            />
            <Badge 
              icon={<span className="text-blue-400/90 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </span>}
              text={<span className="text-amber-500 font-bold">Pojištění odpovědnosti</span>} 
            />
            <Badge 
              icon={<span className="text-amber-500 text-lg leading-none">★</span>}
              text={<><span className="text-amber-500 font-bold">4,9</span> na Firmy.cz</>} 
            />
          </div>

          {/* Headlines */}
          <div className="max-w-3xl mt-4">
            <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold text-white leading-[1.1] tracking-tight mb-6">
              Špičková péče o to, <br/>
              <span className="text-amber-500">co jste usilovně vybudovali</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
              Profesionální vysokotlaké čištění, impregnace a nátěry střech, fasád a dlažeb. 14 let zkušeností po celé ČR.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-6">
            <Button href="/kalkulace" size="lg" className="flex items-center gap-2">
              Spočítat cenu 
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Button>
            <Button href="/sluzby" variant="white" size="lg">
              Prozkoumat služby
            </Button>
          </div>
        </div>

        {/* Bottom Curved Wave Separator */}
        <div className="absolute bottom-[-2px] left-0 w-full overflow-hidden leading-none z-10 text-white">
          <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C71.35,33.56,155.67,53.28,236.4,59.39Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <Stats />
    </section>
  );
};
