// SectionHeader is not used
import { FAQAccordion } from "./FAQAccordion";
import { FAQModalButton } from "./FAQModalButton";
import { supabase } from "@/lib/supabase";

export async function FAQ({ initialFaqs }: { initialFaqs?: any[] }) {
  let homeFaqs = initialFaqs;
  let allFaqs = initialFaqs || [];

  if (!homeFaqs) {
    const { data } = await supabase
      .from('faqs')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });
    
    if (data) {
      allFaqs = data;
      homeFaqs = data.filter(f => f.page_section === 'home');
      if (homeFaqs.length === 0) homeFaqs = data.slice(0, 5);
    }
  }

  if (!homeFaqs || homeFaqs.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-white font-sans relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl md:text-[32px] font-bold mb-3 font-heading text-amber-500">
            Na co se nás nejčastěji ptáte
          </h2>
          <p className="text-base font-light text-slate-600">
            Vše, co potřebujete vědět o našich technologiích a postupech.
          </p>
        </div>

        <FAQAccordion items={homeFaqs} />

        <div className="mt-10 text-center">
          <FAQModalButton allFaqs={allFaqs} />
        </div>

      </div>
    </section>
  );
}
