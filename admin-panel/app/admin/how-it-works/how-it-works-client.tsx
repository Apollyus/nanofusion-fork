'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import {
  Plus,
  Trash2,
  Save,
  Undo,
  Type,
  Box,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  Info,
  Brain,
  Hash,
  Layout
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { TiptapEditor } from '@/components/admin/editor'

interface Step {
  id: string
  step_number: string
  title: string
  description: string
  icon: string
  order_index: number
}

interface Section {
  title: string
  subtitle: string
}

interface HowItWorksClientProps {
  initialSection: Section
  initialSteps: Step[]
}

export function HowItWorksClient({ initialSection, initialSteps }: HowItWorksClientProps) {
  const [section, setSection] = useState<Section>(initialSection)
  const [steps, setSteps] = useState<Step[]>(initialSteps)
  const [savingSection, setSavingSection] = useState(false)
  const [savingSteps, setSavingSteps] = useState(false)
  const [editingStep, setEditingStep] = useState<string | null>(null)
  
  const supabase = createClient()

  const handleSaveSection = async () => {
    setSavingSection(true)
    try {
      const { error } = await (supabase.from('site_sections') as any).upsert({
        section_key: 'how_it_works',
        title: section.title,
        subtitle: section.subtitle,
        updated_at: new Date().toISOString()
      }, { onConflict: 'section_key' })

      if (error) throw error
      toast.success('Hlavička sekce uložena')
    } catch (err) {
      toast.error('Nepodařilo se uložit hlavičku')
      console.error(err)
    } finally {
      setSavingSection(false)
    }
  }

  const handleAddStep = () => {
    const newStep: Step = {
      id: `new-${Date.now()}`,
      step_number: `0${steps.length + 1}`,
      title: 'Nový krok',
      description: '',
      icon: 'ArrowRight',
      order_index: steps.length
    }
    setSteps([...steps, newStep])
    setEditingStep(newStep.id)
  }

  const handleDeleteStep = async (id: string) => {
    if (id.startsWith('new-')) {
      setSteps(steps.filter(s => s.id !== id))
      return
    }

    if (!confirm('Opravdu chcete tento krok smazat?')) return

    try {
      const { error } = await (supabase.from('how_it_works_steps') as any).delete().eq('id', id)
      if (error) throw error
      setSteps(steps.filter(s => s.id !== id))
      toast.success('Krok smazán')
    } catch (err) {
      toast.error('Nepodařilo se smazat krok')
      console.error(err)
    }
  }

  const handleSaveSteps = async () => {
    setSavingSteps(true)
    try {
      // Upsert all steps
      const stepsToSave = steps.map((s, idx) => ({
        ...s,
        id: s.id.startsWith('new-') ? undefined : s.id,
        order_index: idx
      }))

      for (const step of stepsToSave) {
        if (!step.id) {
          const { error } = await (supabase.from('how_it_works_steps') as any).insert(step)
          if (error) throw error
        } else {
          const { error } = await (supabase.from('how_it_works_steps') as any).update(step).eq('id', step.id)
          if (error) throw error
        }
      }

      toast.success('Kroky uloženy')
      window.location.reload()
    } catch (err) {
      toast.error('Nepodařilo se uložit kroky')
      console.error(err)
    } finally {
      setSavingSteps(false)
    }
  }

  const moveStep = (idx: number, direction: 'up' | 'down') => {
    const newSteps = [...steps]
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1
    if (targetIdx < 0 || targetIdx >= steps.length) return
    
    const [moved] = newSteps.splice(idx, 1)
    newSteps.splice(targetIdx, 0, moved)
    setSteps(newSteps)
  }

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Jak to funguje</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Upravte hlavní nadpis a jednotlivé kroky procesu, který se zobrazuje v sekci "Jak to funguje".
        </p>
      </div>

      {/* 1. Section Header Editor */}
      <div className="rounded-2xl p-6 shadow-sm border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
            <Layout size={20} />
          </div>
          <h2 className="text-lg font-bold">Hlavička sekce</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 mb-1.5 block">Sekce (malý nadpis)</label>
            <input
              type="text"
              value={section.title}
              onChange={(e) => setSection({ ...section, title: e.target.value })}
              className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-amber-500/20 outline-none transition-all font-medium"
              style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              placeholder="Např. Jak to funguje"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 mb-1.5 block">Hlavní nadpis</label>
            <input
              type="text"
              value={section.subtitle}
              onChange={(e) => setSection({ ...section, subtitle: e.target.value })}
              className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-amber-500/20 outline-none transition-all font-medium"
              style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              placeholder="Např. 3 jednoduché kroky ke změně"
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSaveSection}
            disabled={savingSection}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-all disabled:opacity-50"
          >
            <Save size={18} />
            {savingSection ? 'Ukládám...' : 'Uložit hlavičku'}
          </button>
        </div>
      </div>

      {/* 2. Steps Editor */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">Jednotlivé kroky</h3>
          <div className="flex gap-3">
            <button
              onClick={handleAddStep}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border font-semibold hover:bg-slate-50 transition-all text-sm"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
            >
              <Plus size={18} />
              Přidat krok
            </button>
            <button
              onClick={handleSaveSteps}
              disabled={savingSteps}
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50 text-sm"
            >
              <Save size={18} />
              {savingSteps ? 'Ukládám...' : 'Uložit vše'}
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className="group rounded-2xl border shadow-sm overflow-hidden transition-all"
              style={{ background: 'var(--bg-surface)', borderColor: editingStep === step.id ? 'var(--brand-primary)' : 'var(--border)' }}
            >
              <div className="flex items-center p-4 bg-slate-50/50 border-b transition-colors group-hover:bg-slate-50" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-white border flex items-center justify-center font-bold text-amber-600 shadow-sm" style={{ borderColor: 'var(--border)' }}>
                    {step.step_number}
                  </div>
                  <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{step.title || 'Nový krok'}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex border rounded-lg overflow-hidden mr-2" style={{ borderColor: 'var(--border)' }}>
                    <button
                      onClick={() => moveStep(idx, 'up')}
                      disabled={idx === 0}
                      className="p-2 bg-white hover:bg-slate-50 disabled:opacity-30 border-r"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      onClick={() => moveStep(idx, 'down')}
                      disabled={idx === steps.length - 1}
                      className="p-2 bg-white hover:bg-slate-50 disabled:opacity-30"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => setEditingStep(editingStep === step.id ? null : step.id)}
                    className={`p-2.5 rounded-xl transition-all border ${editingStep === step.id ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-slate-400 hover:bg-slate-50'}`}
                    style={{ borderColor: editingStep === step.id ? 'transparent' : 'var(--border)' }}
                  >
                    <MoreVertical size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteStep(step.id)}
                    className="p-2.5 rounded-xl transition-all hover:bg-red-50 text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {editingStep === step.id && (
                <div className="p-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400 mb-1.5 block">Číslo kroku</label>
                      <input
                        type="text"
                        value={step.step_number}
                        onChange={(e) => {
                          const newSteps = [...steps]
                          newSteps[idx].step_number = e.target.value
                          setSteps(newSteps)
                        }}
                        className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-amber-500/20 outline-none transition-all font-medium text-sm"
                        style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                        placeholder="Např. 01"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase text-slate-400 mb-1.5 block">Název kroku</label>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => {
                          const newSteps = [...steps]
                          newSteps[idx].title = e.target.value
                          setSteps(newSteps)
                        }}
                        className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-amber-500/20 outline-none transition-all font-medium text-sm"
                        style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                        placeholder="Např. Kontaktujte nás"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400 mb-1.5 block">Ikona (Lucide)</label>
                      <input
                        type="text"
                        value={step.icon}
                        onChange={(e) => {
                          const newSteps = [...steps]
                          newSteps[idx].icon = e.target.value
                          setSteps(newSteps)
                        }}
                        className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-amber-500/20 outline-none transition-all font-medium text-sm"
                        style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                        placeholder="Phone, ClipboardCheck, ShieldCheck..."
                      />
                      <p className="text-[10px] text-slate-400 mt-1 italic flex items-center gap-1">
                        <Info size={10} /> Používejte názvy z lucide-react (např. Phone)
                      </p>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400 mb-1.5 block">Popis kroku</label>
                      <TiptapEditor
                        content={step.description}
                        onChange={(html) => {
                          const newSteps = [...steps]
                          newSteps[idx].description = html
                          setSteps(newSteps)
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {steps.length === 0 && (
            <div className="text-center py-20 rounded-3xl border-2 border-dashed bg-slate-50/50" style={{ borderColor: 'var(--border)' }}>
              <Brain size={48} className="mx-auto mb-4 opacity-10" />
              <p className="text-slate-400 font-bold">Zatím nebyly přidány žádné kroky.</p>
              <button onClick={handleAddStep} className="mt-4 text-amber-500 font-black uppercase text-xs tracking-widest hover:underline">
                + Přidat první krok
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
