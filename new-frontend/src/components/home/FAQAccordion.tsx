"use client";

import { useState } from "react";

export function FAQAccordion({ items }: { items: any[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-4">
      {items.map((item, index) => (
        <div 
          key={item.id} 
          className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 bg-white hover:border-amber-300"
        >
          <button 
            className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-slate-800 transition-colors"
            onClick={() => toggle(index)}
          >
            <span className="text-[15px] pr-4">{item.question}</span>
            <div className={`w-6 h-6 rounded-full border flex flex-shrink-0 items-center justify-center transition-all duration-300 border-amber-500 text-amber-500`}>
              <svg className={`w-4 h-4 transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </button>
          
          <div 
            className={`px-6 overflow-hidden transition-all duration-300 ease-in-out`}
            style={{ 
              maxHeight: openIndex === index ? '500px' : '0px',
              paddingBottom: openIndex === index ? '1.25rem' : '0px',
              opacity: openIndex === index ? 1 : 0
            }}
          >
            <div 
              className="text-slate-600 prose prose-sm max-w-none text-[15px]" 
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
