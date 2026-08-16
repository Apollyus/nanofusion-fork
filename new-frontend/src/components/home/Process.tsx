import { supabase } from "@/lib/supabase";
import { SectionHeader } from "@/components/ui/section-header";

function ProcessStep({ step }: { step: any }) {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Phone":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case "ClipboardCheck":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        );
      case "ArrowRight":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        );
    }
  };

  return (
    <div className="relative flex flex-col items-center text-center group">
      {/* Icon & Number Box */}
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-amber-50 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all duration-300 relative z-10">
          {renderIcon(step.icon)}
        </div>
        {/* Number Badge */}
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-amber-500 text-white font-bold text-sm rounded-full flex items-center justify-center shadow-md z-20">
          {step.step_number}
        </div>
      </div>

      {/* Text Content */}
      <h3 className="text-xl font-bold text-slate-900 mb-4">
        {step.title}
      </h3>
      <div 
        className="text-gray-500 leading-relaxed text-sm max-w-xs mx-auto"
        dangerouslySetInnerHTML={{ __html: step.description }}
      />
    </div>
  );
}

export async function Process({ initialSteps }: { initialSteps?: any[] }) {
  let steps = initialSteps;
  
  if (!steps) {
    const { data } = await supabase
      .from("how_it_works_steps")
      .select("*")
      .order("order_index", { ascending: true });
    steps = data || undefined;
  }

  if (!steps?.length) return null;

  return (
    <section className="py-12 bg-gray-50 font-sans relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeader
          preTitle="Jak to funguje"
          title="3 jednoduché kroky ke změně"
          variant="dark"
          swapColors={true}
          className="mb-12"
        />

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Dashed Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-amber-200" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step) => (
              <ProcessStep key={step.id} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
