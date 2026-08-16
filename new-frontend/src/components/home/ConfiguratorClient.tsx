"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

interface PriceItem {
  item_key: string;
  label: string;
  price: number;
}

interface ConfiguratorClientProps {
  prices: PriceItem[];
}

export function ConfiguratorClient({ prices }: ConfiguratorClientProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Z fallback pole bereme služby a pokud jsou v DB, použijeme cenu z DB
  const defaultServices = [
    { id: 'roof', name: 'Čištění střech', desc: 'Čištění + ochrana', price: 190 },
    { id: 'facade', name: 'Čištění fasád', desc: 'Čištění + ochrana', price: 150 },
    { id: 'pavement', name: 'Čištění dlažby', desc: 'Čištění + ochrana', price: 120 },
    { id: 'pv', name: 'Čištění FVE panelů', desc: 'Čištění panelů', price: 80 },
    { id: 'graffiti', name: 'Odstranění graffiti', desc: 'Čištění + antigraffiti nátěry', price: 250 },
    { id: 'industrial', name: 'Průmyslové čištění', desc: 'Stropy, opláštění a podlahy', price: 130 },
    { id: 'facade-paint', name: 'Nátěry fasád', desc: 'Čištění, penetrace a 2 vrstvy barvy', price: 200 },
    { id: 'roof-paint', name: 'Nátěry střech', desc: 'Kvalitními barvami', price: 180 },
    { id: 'impregnation', name: 'Nano impregnace', desc: 'Ochrana různých povrchů', price: 70 },
    { id: 'antislip', name: 'Protiskluz', desc: 'Pro bezpečnou podlahu', price: 120 },
    { id: 'ceramfloor', name: 'IG CeramFloor', desc: 'Revoluční ochrana podlah', price: 250 }
  ];

  const services = defaultServices.map(s => {
    const dbItem = prices.find(p => p.item_key === s.id);
    return { ...s, price: dbItem ? dbItem.price : s.price };
  });

  const objectTypes = [
    { id: 'rd', name: 'Rodinný dům' },
    { id: 'bd', name: 'Bytový dům' },
    { id: 'com', name: 'Komerční objekt' }
  ];

  // State Step 1
  const [selectedServiceId, setSelectedServiceId] = useState(services[0].id);
  const [selectedObjId, setSelectedObjId] = useState(objectTypes[0].id);

  // State Step 2
  const [area, setArea] = useState("100");
  const [areaUnknown, setAreaUnknown] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  
  const [submitting, setSubmitting] = useState(false);
  const [priceResult, setPriceResult] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedService = services.find(s => s.id === selectedServiceId)!;
  const selectedObj = objectTypes.find(o => o.id === selectedObjId)!;

  const handleNext = () => {
    if (selectedServiceId && selectedObjId) {
      setStep(2);
      setTimeout(() => {
        const el = document.getElementById('kalkulacka');
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 0);
    }
  };

  const handleBack = () => {
    setStep(1);
    setTimeout(() => {
      const el = document.getElementById('kalkulacka');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 0);
  };

  const handleSubmit = async () => {
    if (!name || name.length < 2) return alert("Prosím zadejte Vaše jméno.");
    if (!address || address.length < 2) return alert("Prosím zadejte přesnou adresu realizace.");
    if (!phone || phone.length < 9) return alert("Prosím zadejte platné telefonní číslo.");
    if (!email || !email.includes('@')) return alert("Prosím zadejte platný e-mail.");
    if (!gdpr) return alert("Prosím potvrďte souhlas se zpracováním osobních údajů.");

    setSubmitting(true);
    
    // Výpočet
    const areaValue = areaUnknown ? 0 : (parseInt(area) || 0);
    const baseTotal = selectedService.price * areaValue;
    const minTotal = Math.round(baseTotal * 1.05 / 10) * 10;
    const maxTotal = Math.round(baseTotal * 1.15 / 10) * 10;
    
    const totalDisplay = areaUnknown 
      ? 'ZDARMA (Individuální nabídka*)' 
      : `${minTotal.toLocaleString('cs-CZ')} – ${maxTotal.toLocaleString('cs-CZ')} Kč`;

    setPriceResult(totalDisplay);
    setStep(3);

    // Save to DB in background
    const message = `Lokace: ${address}, Kalkulačka: ${selectedObj.name}, Plocha: ${areaUnknown ? 'Neznámo' : areaValue + ' m²'}, Odhad ceny: ${totalDisplay}\nFotografie: ${photos.length > 0 ? photos.length + ' souborů (v budoucnu nahrát do storage)' : 'žádné'}`;
    
    try {
      await supabase.from('inquiries').insert({
        name,
        email,
        phone,
        service: selectedService.name,
        message,
        source: 'Konfigurátor',
        status: 'new'
      });
    } catch (e) {
      console.warn("Chyba uložení", e);
    }

    setSubmitting(false);
  };

  const handleRestart = () => {
    setStep(1);
    setName("");
    setAddress("");
    setPhone("");
    setEmail("");
    setGdpr(false);
    setArea("100");
    setAreaUnknown(false);
    setPhotos([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-100" id="kalkulacka">
      <h2 className="text-2xl font-bold text-left text-amber-500 mb-2">Konfigurátor</h2>
      <p className="text-slate-500 text-sm text-left mb-8 max-w-lg">
        Tento konfigurátor slouží ke zjištění orientační ceny. Ceny jsou uvedeny bez DPH, které činí 12 % nebo 21 % dle typu subjektu. Po vyplnění formuláře vás bude kontaktovat náš technik a na základě informací vám vytvoří finální cenovou nabídku, která vás k ničemu nezavazuje a je zcela ZDARMA.
      </p>

      {/* Progress */}
      <div className="flex gap-2 mb-10">
        <div className={`flex-1 h-1.5 rounded-full ${step >= 1 ? 'bg-amber-500' : 'bg-slate-200'}`} />
        <div className={`flex-1 h-1.5 rounded-full ${step >= 2 ? 'bg-amber-500' : 'bg-slate-200'}`} />
        <div className={`flex-1 h-1.5 rounded-full ${step >= 3 ? 'bg-amber-500' : 'bg-slate-200'}`} />
      </div>

      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-left font-bold text-slate-800 mb-6">1. Co budeme provádět?</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {services.map(s => (
              <div 
                key={s.id} 
                onClick={() => setSelectedServiceId(s.id)}
                className={`p-4 border-2 rounded-2xl text-center cursor-pointer transition-all ${selectedServiceId === s.id ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-amber-300'}`}
              >
                <div className="font-bold text-sm text-slate-800">{s.name}</div>
                <div className="text-xs text-slate-500 mt-1">{s.desc}</div>
              </div>
            ))}
          </div>

          <p className="text-left font-bold text-slate-800 mb-4">Typ objektu</p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            {objectTypes.map(o => (
              <div 
                key={o.id} 
                onClick={() => setSelectedObjId(o.id)}
                className={`flex-1 p-4 border-2 rounded-2xl text-center cursor-pointer transition-all ${selectedObjId === o.id ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-amber-300'}`}
              >
                <div className="font-bold text-sm text-slate-800">{o.name}</div>
              </div>
            ))}
          </div>

          <Button onClick={handleNext} className="w-full h-14 text-lg">
            Pokračovat k ploše →
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-left font-bold text-slate-800 mb-6">2. Upřesněte zadání</p>
          
          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-700 mb-2">Odhadovaná plocha (m²)</label>
            <div className="relative">
              <input 
                type="number" 
                value={area}
                onChange={(e) => setArea(e.target.value)}
                disabled={areaUnknown}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 pr-12 text-lg outline-none focus:border-amber-500 transition-colors disabled:opacity-50 text-slate-900 font-bold placeholder:text-slate-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">m²</span>
            </div>
            <label className="flex items-center gap-2 mt-3 cursor-pointer text-sm text-slate-600">
              <input type="checkbox" checked={areaUnknown} onChange={(e) => setAreaUnknown(e.target.checked)} className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500" />
              Nevím přesně, změřte mi to zdarma
            </label>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl mb-8 border border-slate-100">
            <p className="text-center text-sm font-bold text-slate-600 mb-6 uppercase tracking-wider">Uveďte kontakt pro zaslání kalkulace</p>
            <div className="space-y-4">
              <input type="text" placeholder="Vaše jméno *" value={name} onChange={e => setName(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-amber-500 transition-colors text-slate-900 placeholder:text-slate-400 font-medium bg-white" />
              <input type="text" placeholder="Přesná adresa místa, kde by se práce prováděly *" value={address} onChange={e => setAddress(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-amber-500 transition-colors text-slate-900 placeholder:text-slate-400 font-medium bg-white" />
              <input type="tel" placeholder="Telefonní číslo *" value={phone} onChange={e => setPhone(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-amber-500 transition-colors text-slate-900 placeholder:text-slate-400 font-medium bg-white" />
              <input type="email" placeholder="E-mail *" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-amber-500 transition-colors text-slate-900 placeholder:text-slate-400 font-medium bg-white" />
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Fotografie objektu (nepovinné)</label>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  multiple 
                  accept="image/*"
                  onChange={e => setPhotos(Array.from(e.target.files || []))}
                  className="w-full p-2 border border-dashed border-slate-300 bg-white rounded-xl text-sm text-slate-900 font-medium file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 cursor-pointer" 
                />
                {photos.length > 0 && <div className="text-xs text-emerald-500 mt-2 font-bold">✅ Vybráno {photos.length} fotografií.</div>}
              </div>

              <label className="flex items-start gap-3 mt-4 cursor-pointer text-xs text-slate-600">
                <input type="checkbox" checked={gdpr} onChange={e => setGdpr(e.target.checked)} className="mt-0.5 w-4 h-4 text-amber-500 rounded focus:ring-amber-500" />
                <span>Souhlasím se zpracováním osobních údajů v souladu s <a href="/gdpr" className="text-amber-500 font-bold hover:underline">GDPR</a> pro účely vytvoření cenové nabídky. *</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={handleBack} className="w-1/3 h-14 bg-slate-200 text-slate-700 font-bold uppercase rounded-xl hover:bg-slate-300 transition-colors">
              Zpět
            </button>
            <Button onClick={handleSubmit} disabled={submitting} className="w-2/3 h-14 text-sm uppercase">
              {submitting ? 'Počkat...' : 'Zobrazit kalkulaci'}
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
          <div className="bg-slate-900 rounded-3xl p-10 mb-8">
            <div className="text-slate-400 text-lg mb-2">Děkujeme, {name}!</div>
            <div className="text-white mb-4">Předběžné rozmezí ceny (bez DPH):</div>
            <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-4">{priceResult}</div>
            <p className="text-xs text-slate-500">
              * Uvedené ceny jsou bez DPH. Sazba se liší dle objektu (12 % nebo 21 %).
            </p>
            <p className="text-slate-400 mt-6 text-sm max-w-sm mx-auto">
              Specialista NanoFusion Vás bude kontaktovat pro domluvení termínu <strong>bezplatného zaměření</strong>.
            </p>
          </div>
          
          <button onClick={handleRestart} className="text-slate-500 underline text-sm hover:text-slate-700 font-medium">
            Začít znovu
          </button>
        </div>
      )}
    </div>
  );
}
