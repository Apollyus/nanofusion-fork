import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { About } from "@/components/home/About";
import { Process } from "@/components/home/Process";
import { Reviews } from "@/components/home/Reviews";
import { Videos } from "@/components/home/Videos";
import { Articles } from "@/components/home/Articles";
import { FAQ } from "@/components/home/FAQ";
import { Configurator } from "@/components/home/Configurator";
import { Contact } from "@/components/home/Contact";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title:
    "NANOfusion | Čištění a nano-ochrana střech, fasád a dlažeb",
  description:
    "Specialisté na profesionální čištění a dlouhodobou nano-ochranu střech, fasád, dlažeb a fotovoltaiky. Více než 950 realizovaných projektů s garancí až 10 let.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NANOfusion | Čištění a nano-ochrana střech, fasád a dlažeb",
    description:
      "Specialisté na profesionální čištění a dlouhodobou nano-ochranu střech, fasád, dlažeb a fotovoltaiky. Více než 950 realizovaných projektů s garancí až 10 let.",
    type: "website",
    url: "https://nanofusion.cz",
    siteName: "NANOfusion",
    images: [
      {
        url: "https://nanofusion.cz/static/logo.jpg",
        width: 1200,
        height: 630,
        alt: "NANOfusion",
      },
    ],
    locale: "cs_CZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "NANOfusion | Čištění a nano-ochrana střech, fasád a dlažeb",
    description:
      "Specialisté na profesionální čištění a dlouhodobou nano-ochranu střech, fasád, dlažeb a fotovoltaiky.",
    images: ["https://nanofusion.cz/static/logo.jpg"],
  },
};

export const revalidate = 3600; // Pro vývoj nastaveno na 0 (v produkci pak vrátíme na 3600 pro zrychlení)

export default async function Home() {
  // Zkusíme načíst recenze z DB (tabulka 'reviews' nebo 'service_reviews', zde používám 'reviews')
  const { data: reviews } = await supabase.from('reviews').select('*');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Hero />
        <Services />
        <About />
        <Process />
        <Reviews initialReviews={reviews || []} />
        <Articles />
        <Videos />
        <FAQ />
        <Configurator />
        <Contact />
      </main>
    </div>
  );
}
