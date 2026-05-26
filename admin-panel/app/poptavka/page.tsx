import { InquiryForm } from '@/components/public/inquiry-form'

export default function PoptavkaPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-2">Kontaktujte nás</p>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Nezávazná poptávka <br className="hidden md:block"/> služeb NANOfusion
          </h1>
          <div className="w-24 h-2 bg-amber-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="bg-white rounded-[2rem] p-4 md:p-10 shadow-2xl shadow-slate-200 border border-slate-100">
           <InquiryForm />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Rychlost', value: 'Odezva do 24h', icon: '⚡' },
            { label: 'Doprava', value: 'Po celé ČR', icon: '📍' },
            { label: 'Záruka', value: '100% spokojenost', icon: '⭐' }
          ].map(item => (
            <div key={item.label} className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 flex items-center gap-4">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{item.label}</p>
                <p className="font-bold text-slate-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
