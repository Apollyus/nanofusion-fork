"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";

export default function KalkulacePage() {
  const [area, setArea] = useState(100);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [showPrice, setShowPrice] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const calculatePrice = () => {
    const pricePerSqm = 120;
    const total = area * pricePerSqm;
    setEstimatedPrice(total);
    setShowPrice(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Prosím vyplňte povinná pole (Jméno, Telefon).");
      return;
    }

    setSubmitting(true);

    try {
      await supabase.from("inquiries").insert({
        name,
        phone,
        email: "",
        service: "Kalkulačka",
        message: `Plocha: ${area} m², Lokace: ${location}`,
        source: "Kalkulačka",
        status: "new",
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Omlouváme se, nastala chyba při odesílání. Zkuste to prosím znovu.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-amber-500 font-bold text-sm uppercase tracking-widest block mb-3">
                Bezplatná konzultace po celé ČR
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Nezávazná poptávka{" "}
                <span className="text-amber-500">NANOFusion</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-lg mx-auto">
                Získejte přesnou cenovou nabídku a bezplatnou konzultaci do 24
                hodin.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-amber-500">
              <div className="mb-8">
                <div className="font-bold text-xl mb-1">Kalkulace zdarma do 24 h</div>
                <div className="text-slate-500 text-sm">
                  Získejte okamžitý odhad ceny pro váš projekt.
                </div>
              </div>

              <div className="mb-6">
                <label className="block font-bold text-xs uppercase text-slate-500 mb-2">
                  Plocha v m²
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    min={10}
                    max={10000}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl font-bold text-lg bg-slate-50 outline-none focus:border-amber-500"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">
                    m²
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block font-bold text-xs uppercase text-slate-500 mb-2">
                  Vaše jméno
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Vaše jméno"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 outline-none focus:border-amber-500"
                />
              </div>

              <div className="mb-6">
                <label className="block font-bold text-xs uppercase text-slate-500 mb-2">
                  Město / Lokace
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Např. Praha, Brno, Beroun..."
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 outline-none focus:border-amber-500"
                />
              </div>

              <div className="mb-6">
                <label className="block font-bold text-xs uppercase text-slate-500 mb-2">
                  Telefonní číslo
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefonní číslo"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 outline-none focus:border-amber-500"
                />
              </div>

              <div className="mb-8">
                <label className="block font-bold text-xs uppercase text-slate-500 mb-2">
                  Fotografie objektu (nepovinné)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                  className="w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm bg-slate-50 cursor-pointer"
                />
              </div>

              {!showPrice ? (
                <button
                  onClick={calculatePrice}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl text-lg uppercase transition-colors"
                >
                  Zobrazit cenu
                </button>
              ) : (
                <div className="text-center">
                  <span className="text-sm text-slate-500 font-semibold">
                    Předběžná cena pro vaši plochu:
                  </span>
                  <div className="text-5xl font-bold text-amber-500 my-2">
                    {estimatedPrice.toLocaleString()} Kč
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4 text-emerald-700 font-bold text-sm border border-emerald-200 mb-8">
                    ✓ Úspěšně odesláno. Zavoláme vám.
                  </div>
                </div>
              )}

              <div className="text-center text-xs text-slate-500 mt-4">
                Nezávazné a zdarma · odpověď do 24 h
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
