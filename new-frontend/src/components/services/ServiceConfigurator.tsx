"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface ServiceConfiguratorProps {
  basePrice: number;
  serviceName: string;
}

export function ServiceConfigurator({ basePrice, serviceName }: ServiceConfiguratorProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ min: number; max: number } | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    location: "",
    phone: "",
    email: "",
    gdpr: false,
    area: 100,
  });

  const [photo, setPhoto] = useState<File | null>(null);

  const handleNext = () => {
    if (!formData.firstName || formData.firstName.length < 2) return alert("Prosím zadejte Vaše jméno a příjmení.");
    if (!formData.location || formData.location.length < 2) return alert("Prosím zadejte přesnou lokaci.");
    if (!formData.phone || formData.phone.length < 9) return alert("Prosím zadejte telefonní číslo.");
    if (!formData.email || !formData.email.includes("@")) return alert("Prosím zadejte platnou e-mailovou adresu.");
    if (!formData.gdpr) return alert("Prosím potvrďte souhlas se zpracováním osobních údajů (GDPR).");
    
    setStep(2);
  };

  const handleCalculate = async () => {
    setIsSubmitting(true);
    const area = formData.area || 0;
    const calcBase = basePrice * area;
    const min = Math.round((calcBase * 1.05) / 10) * 10;
    const max = Math.round((calcBase * 1.15) / 10) * 10;

    let photoUrl = "";
    if (photo) {
      try {
        const ext = photo.name.split(".").pop()?.toLowerCase() || "jpg";
        const fileName = `inquiry_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
        const { data: uploadData, error: uploadErr } = await supabase.storage
          .from("gallery")
          .upload(fileName, photo, { upsert: true, cacheControl: "3600" });

        if (!uploadErr && uploadData) {
          const { data: pubData } = supabase.storage.from("gallery").getPublicUrl(fileName);
          if (pubData && pubData.publicUrl) photoUrl = pubData.publicUrl;
        }
      } catch (e) {
        console.warn("Storage upload failed:", e);
      }
    }

    const payload = {
      name: formData.firstName || "Zákazník",
      phone: formData.phone,
      email: formData.email,
      service: serviceName,
      message: `Lokace: ${formData.location}, E-mail: ${formData.email}, Plocha: ${area} m², Odhad ceny: ${min} - ${max} Kč${photoUrl ? "\nFotografie: " + photoUrl : ""}`,
      source: "Subpage 2-Step Calculator",
      status: "new",
      ...(photoUrl ? { original_photo_url: photoUrl } : {}),
    };

    try {
      await supabase.from("inquiries").insert(payload);
      setResult({ min, max });
    } catch (e) {
      console.error(e);
      alert("Omlouváme se, odeslání selhalo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="bg-white rounded-[1.35rem] p-[1.15rem] sm:p-[1.35rem] shadow-[0_20px_50px_rgba(245,158,11,0.18)] border-[2.5px] border-amber-500 relative text-center">
        <span className="text-sm text-slate-500 font-semibold">Předběžná cena pro vaši plochu:</span>
        <div className="text-4xl font-black text-amber-500 my-2">
          {result.min.toLocaleString("cs-CZ")} – {result.max.toLocaleString("cs-CZ")} Kč
        </div>
        <div className="p-4 bg-green-50 rounded-2xl text-green-800 text-sm font-bold border border-green-100 mt-4">
          ✓ Úspěšně odesláno. Zavoláme vám.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[1.35rem] p-[1.15rem] sm:p-[1.35rem] shadow-[0_20px_50px_rgba(245,158,11,0.18)] border-[2.5px] border-amber-500 relative text-slate-900">
      <div className="flex justify-between items-center mb-[0.85rem]">
        <span className="bg-amber-500/10 text-amber-600 font-extrabold text-[0.725rem] py-[0.3rem] px-[0.8rem] rounded-full uppercase tracking-widest">
          Část {step} ze 2: {step === 1 ? "Kontakty" : "Metry a foto"}
        </span>
        <span className="text-[0.725rem] font-extrabold text-amber-600 bg-amber-500/10 py-[0.3rem] px-[0.8rem] rounded-full uppercase tracking-widest">
          Kalkulace zdarma
        </span>
      </div>

      {step === 1 ? (
        <div className="space-y-[0.65rem]">
          <div className="font-black text-[1.15rem] mb-[0.35rem] text-amber-500">Konfigurátor</div>
          <div className="text-slate-500 text-[0.8rem] mb-[0.85rem] leading-relaxed">
            Tento konfigurátor slouží ke zjištění orientační ceny. Ceny jsou uvedeny bez DPH, které činí 12 % nebo 21 % dle typu subjektu. Po vyplnění formuláře vás bude kontaktovat náš technik a na základě informací vám vytvoří finální cenovou nabídku, která vás k ničemu nezavazuje a je zcela ZDARMA.
          </div>

          <div>
            <label className="block font-extrabold mb-[0.3rem] text-[0.725rem] uppercase text-slate-600">Jméno a Příjmení *</label>
            <input 
              type="text" 
              placeholder="Jan Novák" 
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full p-[0.65rem_0.85rem] border-[1.5px] border-slate-300 rounded-[0.6rem] text-[0.9rem] bg-white outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block font-extrabold mb-[0.3rem] text-[0.725rem] uppercase text-slate-600">Přesná lokace *</label>
            <input 
              type="text" 
              placeholder="Např. Praha 4, U Lesa 12" 
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-[0.65rem_0.85rem] border-[1.5px] border-slate-300 rounded-[0.6rem] text-[0.9rem] bg-white outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block font-extrabold mb-[0.3rem] text-[0.725rem] uppercase text-slate-600">Telefon *</label>
            <input 
              type="tel" 
              placeholder="+420 777 123 456" 
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-[0.65rem_0.85rem] border-[1.5px] border-slate-300 rounded-[0.6rem] text-[0.9rem] bg-white outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div className="mb-[0.85rem]">
            <label className="block font-extrabold mb-[0.3rem] text-[0.725rem] uppercase text-slate-600">E-mail *</label>
            <input 
              type="email" 
              placeholder="jan.novak@email.cz" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-[0.65rem_0.85rem] border-[1.5px] border-slate-300 rounded-[0.6rem] text-[0.9rem] bg-white outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div className="mb-[0.85rem]">
            <label className="flex items-start gap-2 text-[0.725rem] text-slate-600 cursor-pointer leading-relaxed">
              <input 
                type="checkbox" 
                checked={formData.gdpr}
                onChange={(e) => setFormData({ ...formData, gdpr: e.target.checked })}
                className="mt-0.5 cursor-pointer w-[15px] h-[15px] shrink-0" 
              />
              <span>Souhlasím se zpracováním osobních údajů v souladu s <a href="/gdpr" className="text-amber-500 font-bold underline hover:text-amber-600 transition-colors">GDPR</a> pro účely vytvoření cenové nabídky. *</span>
            </label>
          </div>
          <button 
            onClick={handleNext}
            className="block text-center w-full bg-gradient-to-br from-amber-500 to-amber-600 text-white p-[0.8rem] rounded-[0.6rem] font-black cursor-pointer uppercase text-[0.9rem] shadow-[0_4px_15px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02]"
          >
            Pokračovat →
          </button>
        </div>
      ) : (
        <div>
          <div className="font-black text-[1.15rem] mb-[0.25rem] text-slate-900">Specifikace zakázky</div>
          <div className="text-slate-500 text-[0.825rem] mb-[0.85rem]">
            Zadejte výměru plochy a přiložte fotografii, abychom si udělali lepší představu o stavu povrchu (pokud fotku nemáte, nic se neděje).
          </div>
          
          <div className="mb-[0.85rem]">
            <label className="block font-extrabold mb-[0.4rem] text-[0.75rem] uppercase text-slate-600">Plocha v m² *</label>
            <div className="relative">
              <input 
                type="number" 
                min="10" 
                max="10000"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: parseInt(e.target.value) || 0 })}
                className="w-full p-[0.75rem] border-[1.5px] border-orange-200 rounded-[0.6rem] text-[1.1rem] font-extrabold bg-amber-50/50 text-slate-900 outline-none focus:border-amber-500 transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-extrabold text-amber-600">m²</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-extrabold mb-[0.4rem] text-[0.75rem] uppercase text-slate-600">Fotografie objektu (nepovinné)</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setPhoto(e.target.files[0]);
                }
              }}
              className="w-full p-[0.65rem_0.85rem] border-[1.5px] border-dashed border-amber-500 rounded-[0.6rem] text-[0.85rem] bg-amber-50/50 text-slate-900 cursor-pointer"
            />
          </div>

          <div className="flex gap-[0.65rem]">
            <button 
              onClick={() => setStep(1)}
              className="flex-none w-[75px] bg-slate-100 text-slate-600 p-[0.8rem_0.4rem] border border-slate-300 rounded-[0.6rem] font-bold cursor-pointer text-[0.825rem] transition-colors hover:bg-slate-200"
            >
              ← Zpět
            </button>
            <button 
              onClick={handleCalculate}
              disabled={isSubmitting}
              className="flex-1 text-center bg-gradient-to-br from-amber-500 to-amber-600 text-white p-[0.8rem] rounded-[0.6rem] font-black cursor-pointer uppercase text-[0.9rem] shadow-[0_4px_15px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
            >
              {isSubmitting ? "Odesílám..." : "Zobrazit cenu"}
            </button>
          </div>
        </div>
      )}
      
      <div className="text-center text-slate-500 text-[0.775rem] mt-[0.65rem]">
        Nezávazné a zdarma · odpovídáme do 24 h
      </div>
    </div>
  );
}
