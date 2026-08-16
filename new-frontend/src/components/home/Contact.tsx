"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

// Lokální komponenty
const ContactInfoItem = ({ icon, title, content, href }: { icon: React.ReactNode, title: string, content: string, href?: string }) => (
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 text-amber-500">
      {icon}
    </div>
    <div>
      <div className="text-sm text-slate-500 mb-0.5">{title}</div>
      {href ? (
        <a href={href} className="text-slate-900 font-bold hover:text-amber-500 transition-colors">{content}</a>
      ) : (
        <div className="text-slate-900 font-bold">{content}</div>
      )}
    </div>
  </div>
);

interface ContactInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> {
  label: string;
  as?: 'input' | 'select' | 'textarea';
  children?: React.ReactNode;
  rows?: number;
}

const ContactInput = ({ label, as = 'input', className = '', children, ...props }: ContactInputProps) => {
  const baseClasses = "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-medium placeholder:text-slate-400 outline-none focus:border-amber-500 transition-colors";
  return (
    <div className={className}>
      <label className="block text-sm font-bold text-slate-900 mb-2">{label}</label>
      {as === 'textarea' ? (
        <textarea 
          className={`${baseClasses} resize-y`} 
          rows={(props as any).rows}
          {...(props as any)} 
        />
      ) : as === 'select' ? (
        <select 
          className={`${baseClasses} text-slate-600 appearance-none`}
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2rem' }}
          {...(props as any)}
        >
          {children}
        </select>
      ) : (
        <input className={baseClasses} {...(props as any)} />
      )}
    </div>
  );
};

export function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      alert("Prosím vyplňte povinná pole (Jméno, Telefon, E-mail).");
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.from('inquiries').insert({
        name,
        phone,
        email,
        service,
        message,
        source: 'Kontaktní formulář',
        status: 'new'
      });

      if (error) throw error;
      
      setSuccess(true);
      setName("");
      setPhone("");
      setEmail("");
      setService("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Omlouváme se, nastala chyba při odesílání. Zkuste to prosím znovu nebo nám zavolejte.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-white" id="kontakt">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Column: Info */}
          <div className="flex flex-col justify-center items-start">
            <SectionHeader
              title={<>Získejte cenovou nabídku <span className="text-amber-500">zdarma</span></>}
              preTitle="KONTAKTUJTE NÁS"
              variant="left"
              className="mb-10 w-full"
            />
            <p className="text-slate-600 text-lg mb-10 leading-relaxed max-w-lg">
              Vyplňte formulář a my se vám ozveme do 24 hodin s nezávaznou cenovou nabídkou. Konzultace a zaměření je zcela zdarma.
            </p>

            <div className="space-y-6">
              <ContactInfoItem 
                title="Zavolejte nám"
                content="+420 774 509 409"
                href="tel:+420774509409"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              />
              <ContactInfoItem 
                title="Napište nám"
                content="info@nanofusion.cz"
                href="mailto:info@nanofusion.cz"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />
              <ContactInfoItem 
                title="Působnost"
                content="Celá Česká republika"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              />
              <ContactInfoItem 
                title="Otevírací doba"
                content="Po–Pá 7:00–18:00"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
            </div>
          </div>

          {/* Right Column: Form */}
          <div>
            <form 
              onSubmit={handleSubmit}
              className="bg-white border-2 border-amber-500 rounded-3xl p-6 sm:p-8 shadow-sm"
            >
              {success ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Děkujeme!</h3>
                  <p className="text-slate-600">Vaše poptávka byla úspěšně odeslána. Brzy se vám ozveme.</p>
                  <Button 
                    type="button" 
                    className="mt-6"
                    onClick={() => setSuccess(false)}
                  >
                    Odeslat další poptávku
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <ContactInput
                      label="Jméno a příjmení *"
                      type="text"
                      required
                      value={name}
                      onChange={(e: any) => setName(e.target.value)}
                      placeholder="Jan Novák"
                    />
                    <ContactInput
                      label="Telefon *"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e: any) => setPhone(e.target.value)}
                      placeholder="+420 ..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <ContactInput
                      label="E-mail *"
                      type="email"
                      required
                      value={email}
                      onChange={(e: any) => setEmail(e.target.value)}
                      placeholder="jan@email.cz"
                    />
                    <ContactInput
                      label="O jakou službu máte zájem?"
                      as="select"
                      value={service}
                      onChange={(e: any) => setService(e.target.value)}
                    >
                      <option value="">Vyberte službu</option>
                      <option value="Čištění střech">Čištění střech</option>
                      <option value="Čištění fasád">Čištění fasád</option>
                      <option value="Čištění dlažeb">Čištění dlažeb</option>
                      <option value="Solární panely">Solární panely</option>
                      <option value="Nano-ochrana">Nano-ochrana</option>
                      <option value="Jiné">Jiné</option>
                    </ContactInput>
                  </div>

                  <ContactInput
                    label="Zpráva"
                    as="textarea"
                    rows={4}
                    value={message}
                    onChange={(e: any) => setMessage(e.target.value)}
                    placeholder="Popište nám prosím vaše potřeby..."
                    className="mb-6"
                  />

                  <Button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full h-12 text-sm justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    {submitting ? "Odesílání..." : "Odeslat nezávaznou poptávku"}
                  </Button>
                  
                  <p className="text-center text-xs text-slate-500 mt-4">
                    Odesláním souhlasíte se zpracováním osobních údajů. Odpovíme do 24 hodin.
                  </p>
                </>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
