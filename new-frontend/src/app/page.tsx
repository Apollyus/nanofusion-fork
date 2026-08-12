import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { Reviews } from "@/components/home/Reviews";
import { Videos } from "@/components/home/Videos";
import { Articles } from "@/components/home/Articles";
import { FAQ } from "@/components/home/FAQ";
import { supabase } from "@/lib/supabase";

export const revalidate = 3600; // Pro vývoj nastaveno na 0 (v produkci pak vrátíme na 3600 pro zrychlení)

export default async function Home() {
  // Zkusíme načíst recenze z DB (tabulka 'reviews' nebo 'service_reviews', zde používám 'reviews')
  const { data: reviews } = await supabase.from('reviews').select('*');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Process />
        <Reviews initialReviews={reviews || []} />
        <Articles />
        <Videos />
        <FAQ />
      </main>
    </div>
  );
}
