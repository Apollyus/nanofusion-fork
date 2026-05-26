'use client'

import { useState } from 'react'
import { Plus, Trash2, Edit2, Brain, Save, X, Lightbulb, FileUp, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { saveKnowledge, deleteKnowledge, toggleKnowledgeActive, uploadBotDocument } from './actions'
import { TiptapEditor } from '@/components/admin/editor'

interface Knowledge {
  id: string
  title: string
  content: string
  category: string
  is_active: boolean
  created_at: string
}

export function BotTrainingClient({ initialKnowledge }: { initialKnowledge: any[] }) {
  const [knowledge, setKnowledge] = useState<Knowledge[]>(initialKnowledge)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'obecné'
  })

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const dataToSave = {
        ...formData,
        id: isEditing || undefined
      }
      await saveKnowledge(dataToSave)
      toast.success(isEditing ? 'Znalost byla aktualizována' : 'Nová znalost byla přidána')
      window.location.reload()
    } catch (error) {
      toast.error('Chyba při ukládání')
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      toast.error('Podporovány jsou pouze PDF soubory')
      return
    }

    setIsUploading(true)
    const toastId = toast.loading('Čtu PDF a učím Nanobota...')
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      await uploadBotDocument(formData)
      toast.success('Dokument byl úspěšně zpracován a naučen', { id: toastId })
      window.location.reload()
    } catch (error) {
      console.error(error)
      toast.error('Chyba při zpracování PDF', { id: toastId })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Opravdu chcete tuto znalost smazat?')) return
    try {
      await deleteKnowledge(id)
      setKnowledge(knowledge.filter(k => k.id !== id))
      toast.success('Smazáno')
    } catch (error) {
      toast.error('Chyba při mazání')
    }
  }

  const handleToggle = async (id: string, current: boolean) => {
    try {
      await toggleKnowledgeActive(id, !current)
      setKnowledge(knowledge.map(k => k.id === id ? { ...k, is_active: !current } : k))
      toast.success(current ? 'Deaktivováno' : 'Aktivováno')
    } catch (error) {
      toast.error('Chyba při změně stavu')
    }
  }

  const startEdit = (k: Knowledge) => {
    setIsEditing(k.id)
    setFormData({ title: k.title, content: k.content, category: k.category })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
            <Brain className="text-amber-500" size={32} />
            Trénink Nanobota
          </h1>
          <p className="text-slate-500 mt-2">
            Naučte AI asistenta fakta o vaší firmě, službách a cenách.
          </p>
        </div>
      </div>

      {/* Editor Card */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
              <Lightbulb size={20} />
            </div>
            <h2 className="text-xl font-bold">{isEditing ? 'Upravit znalost' : 'Nová znalost pro Nanobota'}</h2>
          </div>
          {isEditing && (
            <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider animate-pulse">
              Režim úprav
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Název / Téma</label>
              <input
                type="text"
                required
                placeholder="Např. O firmě NANOfusion"
                className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Kategorie</label>
              <select
                className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-amber-500 outline-none transition-all appearance-none bg-white"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="obecné">Obecné</option>
                <option value="služby">Služby</option>
                <option value="ceny">Ceny a platby</option>
                <option value="předdefinované">Předdefinované (FAQ)</option>
                <option value="technologie">Technologie</option>
                <option value="kontakt">Kontakt a lokalita</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-700">
                {formData.category === 'předdefinované' ? 'Odpověď (pouze text)' : 'Obsah (Fakta pro AI)'}
              </label>
              {formData.category === 'předdefinované' && (
                <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded-lg">
                  REŽIM ČISTÉHO TEXTU
                </span>
              )}
            </div>
            
            {formData.category === 'předdefinované' ? (
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Napište odpověď, kterou má bot poslat..."
                className="w-full h-48 px-5 py-4 rounded-2xl border border-slate-200 focus:border-amber-500 outline-none transition-all font-medium"
                style={{ background: 'var(--bg-surface-2)' }}
              />
            ) : (
              <TiptapEditor 
                content={formData.content} 
                onChange={(html) => setFormData({ ...formData, content: html })} 
              />
            )}
            
            {formData.category === 'předdefinované' && (
              <p className="text-[11px] text-slate-400 italic">
                * Pro tuto kategorii nepoužívejte formátování, bot pošle přesně to, co napíšete.
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: 'var(--brand-primary)' }}
            >
              <Save size={20} />
              {isEditing ? 'Uložit změny' : 'Naučit Nanobota'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(null)
                  setFormData({ title: '', content: '', category: 'obecné' })
                }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-slate-600 bg-slate-100 transition-all hover:bg-slate-200"
              >
                <X size={20} />
                Zrušit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* PDF Upload Card */}
      <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <FileUp size={120} className="text-white" />
        </div>
        
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <FileUp className="text-amber-500" size={24} />
            Hromadné učení z dokumentů
          </h3>
          <p className="text-slate-400 mb-6 max-w-xl">
            Nahrajte ceníky, technické listy nebo obchodní podmínky v PDF. Nanobot si je sám přečte a naučí se z nich odpovídat.
          </p>
          
          <label className={`
            inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all cursor-pointer
            ${isUploading ? 'bg-slate-800 text-slate-500 pointer-events-none' : 'bg-white text-slate-900 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-white/5'}
          `}>
            {isUploading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Zpracovávám PDF...
              </>
            ) : (
              <>
                <Plus size={20} />
                Vybrat PDF soubor
              </>
            )}
            <input 
              type="file" 
              className="hidden" 
              accept=".pdf" 
              onChange={handleFileUpload} 
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 px-2">Aktuální znalostní báze</h3>
        <div className="grid grid-cols-1 gap-4">
          {knowledge.length === 0 ? (
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-12 text-center">
              <p className="text-slate-400 font-medium text-lg">Zatím jste bota nic nenaučili. Začněte přidáním prvního bloku informací výše.</p>
            </div>
          ) : (
            knowledge.map(k => (
              <div 
                key={k.id} 
                className="bg-white p-6 rounded-3xl border border-slate-100 flex items-start justify-between gap-6 transition-all hover:shadow-md group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                      {k.category}
                    </span>
                    <h4 className="font-bold text-slate-900 truncate">{k.title}</h4>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                    {k.content.replace(/<[^>]*>/g, '')}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggle(k.id, k.is_active)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                      k.is_active ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {k.is_active ? 'Aktivní' : 'Vypnuto'}
                  </button>
                  <button 
                    onClick={() => startEdit(k)}
                    className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(k.id)}
                    className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
