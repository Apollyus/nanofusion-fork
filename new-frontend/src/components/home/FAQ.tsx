import { SectionHeader } from "@/components/ui/section-header";
import { FAQAccordion } from "./FAQAccordion";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export async function FAQ({ initialFaqs }: { initialFaqs?: any[] }) {
  let faqs = initialFaqs;

  if (!faqs) {
    const { data } = await supabase
      .from('faqs')
      .select('*')
      .eq('is_active', true)
      .eq('page_section', 'home')
      .order('order_index', { ascending: true });
    faqs = data || undefined;
  }

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-24 bg-white font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          title="Na co se nás nejčastěji ptáte"
          subtitle="Vše, co potřebujete vědět o našich technologiích a postupech."
          variant="default"
          className="mb-12"
        />

        <FAQAccordion items={faqs} />

        <div className="mt-10 text-center">
          <Button
            href="/faq"
            variant="primary-glow"
            className="gap-2"
          >
            Zobrazit všechny dotazy
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>
        </div>

      </div>
    </section>
  );
}
