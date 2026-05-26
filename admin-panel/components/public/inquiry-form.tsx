'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { inquirySchema, type InquiryInput } from '@/lib/validations/inquiry'
import { submitInquiry, calculateTrip } from '@/app/actions/inquiry'
import { toast } from 'sonner'
import { Loader2, CheckCircle2 } from 'lucide-react'

import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function InquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [distanceInfo, setDistanceInfo] = useState<{ distance: number; cost: number } | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    mode: 'onBlur'
  })

  const handleAddressBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const address = e.target.value
    if (address.length < 5) return
    
    setIsCalculating(true)
    try {
      const result = await calculateTrip(address)
      if (result.success) {
        setDistanceInfo({ distance: result.distanceKm!, cost: result.travelCost! })
        setValue('distance_km', result.distanceKm)
        setValue('travel_cost_czk', result.travelCost)
      }
    } catch (err) {
      console.error('Calculation failed', err)
    } finally {
      setIsCalculating(false)
    }
  }

  const onSubmit = async (data: InquiryInput) => {
    setIsSubmitting(true)
    try {
      const res = await submitInquiry(data)
      if (res.success) {
        setIsSubmitted(true)
        toast.success('Poptávka byla úspěšně odeslána')
      } else {
        toast.error(res.message || 'Něco se nepovedlo')
      }
    } catch (error: any) {
      toast.error(error.message || 'Něco se nepovedlo')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Dialog open={isSubmitted} onOpenChange={setIsSubmitted}>
        <DialogContent className="text-center max-w-sm">
          <div className="text-5xl mb-2">✅</div>
          <DialogTitle className="text-xl">Vaši poptávku jsme přijali!</DialogTitle>
          <DialogDescription className="text-base mt-2">
            Brzy se vám ozveme. Obvykle odpovídáme do 24 hodin v pracovní dny.
          </DialogDescription>
          <Button className="mt-4 w-full" variant="brand" size="lg" onClick={() => setIsSubmitted(false)}>
            Zavřít
          </Button>
        </DialogContent>
      </Dialog>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-slate-500 ml-1">Jméno a příjmení</label>
            <input 
              {...register('name')}
              placeholder="Jan Novák"
              className={`w-full px-5 py-4 rounded-2xl bg-white border-2 outline-none transition-all ${errors.name ? 'border-red-500' : 'border-slate-100 focus:border-amber-500'}`}
            />
            {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.name.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-slate-500 ml-1">Telefon</label>
            <input 
              {...register('phone')}
              placeholder="+420 777 123 456"
              className={`w-full px-5 py-4 rounded-2xl bg-white border-2 outline-none transition-all ${errors.phone ? 'border-red-500' : 'border-slate-100 focus:border-amber-500'}`}
            />
            {errors.phone && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase text-slate-500 ml-1">E-mail</label>
          <input 
            {...register('email')}
            placeholder="novak@email.cz"
            className={`w-full px-5 py-4 rounded-2xl bg-white border-2 outline-none transition-all ${errors.email ? 'border-red-500' : 'border-slate-100 focus:border-amber-500'}`}
          />
          {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase text-slate-500 ml-1">Adresa realizace (pro výpočet dopravy)</label>
          <div className="relative">
            <input 
              {...register('address', { onBlur: handleAddressBlur })}
              placeholder="Ulice 123, Město, PSČ"
              className={`w-full px-5 py-4 rounded-2xl bg-white border-2 outline-none transition-all ${errors.address ? 'border-red-500' : 'border-slate-100 focus:border-amber-500'}`}
            />
            {isCalculating && (
              <Loader2 className="absolute right-4 top-4 animate-spin text-amber-500" size={20} />
            )}
          </div>
          {errors.address && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.address.message}</p>}
          
          {distanceInfo && !isCalculating && (
            <p className="text-[11px] font-bold text-amber-600 ml-2 animate-fade-in">
              Vzdálenost: {distanceInfo.distance} km → příplatek za dojezd: ~{distanceInfo.cost} Kč
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase text-slate-500 ml-1">Typ služby</label>
          <select 
            {...register('service')}
            className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-100 outline-none focus:border-amber-500 appearance-none"
          >
            <option value="cleaning_roof">Čištění střechy</option>
            <option value="cleaning_facade">Čištění fasády</option>
            <option value="cleaning_pavement">Čištění dlažby</option>
            <option value="solar_panels">Ošetření FVE panelů</option>
            <option value="other">Jiné</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase text-slate-500 ml-1">Zpráva / Detaily</label>
          <textarea 
            {...register('message')}
            rows={4}
            placeholder="Popište nám váš projekt..."
            className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-100 outline-none focus:border-amber-500 resize-none"
          />
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full py-5 bg-amber-500 text-white rounded-2xl font-black text-lg transition-all hover:bg-amber-600 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 shadow-xl shadow-amber-500/30 mt-4"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={24} className="animate-spin" />
              ODESÍLÁM...
            </>
          ) : (
            'ODESLAT NEZÁVAZNOU POPTÁVKU'
          )}
        </button>
        <p className="text-center text-[10px] text-slate-400 mt-4 px-4">
          Odesláním formuláře souhlasíte se zpracováním osobních údajů v souladu s GDPR. Odhad ceny dopravy bude vypočten automaticky z naší centrály v Blučině.
        </p>
      </form>
    </>
  )
}
