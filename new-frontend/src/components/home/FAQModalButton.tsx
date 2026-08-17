"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { FAQAccordion } from "./FAQAccordion";

interface FAQModalButtonProps {
  allFaqs: any[];
}

export function FAQModalButton({ allFaqs }: FAQModalButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="primary-glow"
        size="lg"
        className="gap-2 text-lg"
        onClick={() => setIsOpen(true)}
      >
        Zobrazit všechny dotazy
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Všechny dotazy"
      >
        <div className="py-4">
          <FAQAccordion items={allFaqs} />
        </div>
      </Modal>
    </>
  );
}
