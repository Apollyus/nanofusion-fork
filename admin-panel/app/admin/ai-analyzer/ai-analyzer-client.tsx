'use client'

import { useState } from 'react'
import { updateAnalysisStatus, updateAnalysisNotes, deleteAnalysis } from './actions'
import { toast } from 'sonner'
import { 
  Brain, 
  Trash2, 
  Search, 
  Mail, 
  Phone, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  User, 
  Home, 
  Calendar,
  Sparkles,
  ExternalLink,
  MessageSquare,
  FileText,
  X,
  Save,
  Loader2
} from 'lucide-react'

interface AIAnalysis {
  id: string
  name: string
  email: string
  phone: string | null
  object_type: string | null
  analysis_type: string | null
  urgency: string | null
  original_photo_url: string
  before_photo_url: string | null
  after_photo_url: string | null
  analysis_result: string | null
  additional_notes: string | null
  status: 'new' | 'in_progress' | 'contacted' | 'resolved'
  created_at: string
  updated_at: string
}

export function AIAnalyzerClient({ 
  initialAnalyses 
}: { 
  initialAnalyses: AIAnalysis[] 
}) {
  const [analyses, setAnalyses] = useState<AIAnalysis[]>(initialAnalyses)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all')
  const [selectedAnalysis, setSelectedAnalysis] = useState<AIAnalysis | null>(null)
  
  // States for detailed edit
  const [noteText, setNoteText] = useState('')
  const [isSavingNote, setIsSavingNote] = useState(false)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null)

  const statusLabels: Record<AIAnalysis['status'], string> = {
    new: 'Nová',
    in_progress: 'V řešení',
    contacted: 'Kontaktováno',
    resolved: 'Vyřešeno'
  }

  const statusColors: Record<AIAnalysis['status'], { bg: string; text: string; dot: string }> = {
    new: { bg: '#eff6ff', text: '#2563eb', dot: '#3b82f6' },
    in_progress: { bg: '#fffbeb', text: '#d97706', dot: '#f59e0b' },
    contacted: { bg: '#fdf4ff', text: '#a855f7', dot: '#c084fc' },
    resolved: { bg: '#f0fdf4', text: '#16a34a', dot: '#22c55e' }
  }

  const urgencyColors: Record<string, { bg: string; text: string }> = {
    vysoká: { bg: '#fee2e2', text: '#dc2626' },
    střední: { bg: '#fef3c7', text: '#d97706' },
    nízká: { bg: '#f1f5f9', text: '#475569' }
  }

  const handleStatusChange = async (id: string, newStatus: AIAnalysis['status']) => {
    setIsUpdatingStatus(id)
    try {
      await updateAnalysisStatus(id, newStatus)
      setAnalyses(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a))
      if (selectedAnalysis?.id === id) {
        setSelectedAnalysis(prev => prev ? { ...prev, status: newStatus } : null)
      }
      toast.success('Stav analýzy byl úspěšně aktualizován')
    } catch (e) {
      toast.error('Chyba při aktualizaci stavu')
    } finally {
      setIsUpdatingStatus(null)
    }
  }

  const handleSaveNotes = async () => {
    if (!selectedAnalysis) return
    setIsSavingNote(true)
    try {
      await updateAnalysisNotes(selectedAnalysis.id, noteText)
      setAnalyses(prev => prev.map(a => a.id === selectedAnalysis.id ? { ...a, additional_notes: noteText } : a))
      setSelectedAnalysis(prev => prev ? { ...prev, additional_notes: noteText } : null)
      toast.success('Poznámky byly uloženy')
    } catch (e) {
      toast.error('Chyba při ukládání poznámek')
    } finally {
      setIsSavingNote(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Opravdu chcete tuto analýzu smazat?')) return
    try {
      await deleteAnalysis(id)
      setAnalyses(prev => prev.filter(a => a.id !== id))
      if (selectedAnalysis?.id === id) {
        setSelectedAnalysis(null)
      }
      toast.success('Analýza byla smazána')
    } catch (e) {
      toast.error('Chyba při mazání analýzy')
    }
  }

  const openDetails = (analysis: AIAnalysis) => {
    setSelectedAnalysis(analysis)
    setNoteText(analysis.additional_notes || '')
  }

  // Filter analyses
  const filteredAnalyses = analyses.filter(a => {
    const matchesSearch = 
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      (a.phone && a.phone.includes(search)) ||
      (a.analysis_type && a.analysis_type.toLowerCase().includes(search.toLowerCase())) ||
      (a.object_type && a.object_type.toLowerCase().includes(search.toLowerCase()))

    const matchesStatus = statusFilter === 'all' || a.status === statusFilter
    const matchesUrgency = urgencyFilter === 'all' || a.urgency === urgencyFilter

    return matchesSearch && matchesStatus && matchesUrgency
  })

  const newCount = analyses.filter(a => a.status === 'new').length

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>AI Analyzátor fasád a střech</h1>
            {newCount > 0 && (
              <span className="bg-amber-500 text-white font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                {newCount} {newCount === 1 ? 'nová' : newCount < 5 ? 'nové' : 'nových'}
              </span>
            )}
          </div>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Správa poptávek s automatickým vyhodnocením stavu a simulací před / po NANOfusion zásahu.
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div 
        className="rounded-2xl p-5 border flex flex-col lg:flex-row gap-4 items-center justify-between shadow-sm"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
      >
        <div className="relative w-full lg:max-w-md">
          <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Hledat podle jména, e-mailu, telefonu, typu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-sm font-medium"
            style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          />
        </div>

        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Stav:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border text-sm font-semibold focus:ring-2 focus:ring-amber-500/20 outline-none cursor-pointer"
              style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              <option value="all">Všechny stavy</option>
              <option value="new">Nové</option>
              <option value="in_progress">V řešení</option>
              <option value="contacted">Kontaktováno</option>
              <option value="resolved">Vyřešeno</option>
            </select>
          </div>

          {/* Urgency Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Urgence:</span>
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border text-sm font-semibold focus:ring-2 focus:ring-amber-500/20 outline-none cursor-pointer"
              style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              <option value="all">Všechny urgence</option>
              <option value="vysoká">Vysoká</option>
              <option value="střední">Střední</option>
              <option value="nízká">Nízká</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: List & Details */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* List of Analyses */}
        <div className="xl:col-span-2 space-y-3">
          {filteredAnalyses.map((a) => {
            const colors = statusColors[a.status] || statusColors.new
            const urgColors = urgencyColors[a.urgency?.toLowerCase() || 'střední'] || urgencyColors.střední

            return (
              <div
                key={a.id}
                onClick={() => openDetails(a)}
                className={`rounded-2xl border p-5 transition-all duration-150 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:shadow-md ${selectedAnalysis?.id === a.id ? 'border-amber-500 ring-2 ring-amber-500/10' : ''}`}
                style={{ 
                  background: 'var(--bg-surface)', 
                  borderColor: selectedAnalysis?.id === a.id ? 'var(--brand-primary)' : 'var(--border)',
                  boxShadow: 'var(--shadow-sm)' 
                }}
              >
                <div className="flex gap-4 items-center min-w-0">
                  {/* Photo thumbnail */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 relative border">
                    <img 
                      src={a.original_photo_url} 
                      alt="Thumbnail" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                    />
                    <div className="absolute inset-0 bg-black/5" />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                        {a.name}
                      </p>
                      <span 
                        className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full" 
                        style={{ background: urgColors.bg, color: urgColors.text }}
                      >
                        {a.urgency || 'střední'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <span className="flex items-center gap-1.5">
                        <Mail size={12} className="opacity-60" />
                        {a.email}
                      </span>
                      {a.phone && (
                        <span className="flex items-center gap-1.5">
                          <Phone size={12} className="opacity-60" />
                          {a.phone}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-slate-400 uppercase mt-1">
                      <span className="flex items-center gap-1 bg-slate-50 border px-1.5 py-0.5 rounded">
                        <Home size={10} />
                        {a.object_type || 'objekt'}
                      </span>
                      <span className="flex items-center gap-1 bg-slate-50 border px-1.5 py-0.5 rounded">
                        <Sparkles size={10} className="text-amber-500" />
                        {a.analysis_type || 'analýza'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0">
                  <span className="text-[10px] text-slate-400 font-medium md:hidden block">
                    {new Date(a.created_at).toLocaleDateString('cs-CZ')}
                  </span>
                  
                  <div className="flex items-center gap-3">
                    <select
                      value={a.status}
                      disabled={isUpdatingStatus === a.id}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleStatusChange(a.id, e.target.value as AIAnalysis['status'])}
                      className="px-2.5 py-1 rounded-lg border text-xs font-bold focus:ring-1 focus:ring-amber-500/20 cursor-pointer transition-colors"
                      style={{ 
                        background: colors.bg, 
                        color: colors.text, 
                        borderColor: colors.text + '30' 
                      }}
                    >
                      <option value="new">Nová</option>
                      <option value="in_progress">V řešení</option>
                      <option value="contacted">Kontaktováno</option>
                      <option value="resolved">Vyřešeno</option>
                    </select>

                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(a.id) }}
                      className="p-2 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}

          {filteredAnalyses.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed rounded-2xl bg-slate-50/50">
              <Brain size={48} className="mb-2 opacity-10" />
              <p className="font-bold text-sm">Nebyly nalezeny žádné AI analýzy</p>
              <p className="text-xs">Zkuste změnit filtry vyhledávání.</p>
            </div>
          )}
        </div>

        {/* Selected Details Drawer/Card */}
        <div className="xl:col-span-1">
          {selectedAnalysis ? (
            <div 
              className="rounded-2xl border p-6 space-y-6 sticky top-6 shadow-md"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-500">
                    <Brain size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Detail AI analýzy</h3>
                    <p className="text-[10px] text-slate-400 font-mono">ID: {selectedAnalysis.id.slice(0, 8)}...</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedAnalysis(null)} 
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Client Info Block */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Kontaktní údaje</h4>
                <div className="bg-slate-50 rounded-xl p-4 border space-y-2.5">
                  <div className="flex items-center gap-2 text-sm">
                    <User size={16} className="text-slate-400" />
                    <span className="font-bold text-slate-700">{selectedAnalysis.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Mail size={14} className="text-slate-400" />
                    <a href={`mailto:${selectedAnalysis.email}`} className="hover:text-amber-500 transition-colors font-medium">
                      {selectedAnalysis.email}
                    </a>
                  </div>
                  {selectedAnalysis.phone && (
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Phone size={14} className="text-slate-400" />
                      <a href={`tel:${selectedAnalysis.phone}`} className="hover:text-amber-500 transition-colors font-medium">
                        {selectedAnalysis.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Before/After Photo Simulator Preview */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Simulace nano-ošetření (před a po)</h4>
                
                <div className="grid grid-cols-2 gap-3">
                  {/* Original / Before */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Původní stav</span>
                    <div className="aspect-[4/3] rounded-xl overflow-hidden border bg-black relative group">
                      <img 
                        src={selectedAnalysis.original_photo_url} 
                        alt="Před" 
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-all" 
                      />
                      <a 
                        href={selectedAnalysis.original_photo_url} 
                        target="_blank" 
                        className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                  {/* After Simulation */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase text-green-600 bg-green-50 px-1.5 py-0.5 rounded">Po ošetření</span>
                    <div className="aspect-[4/3] rounded-xl overflow-hidden border bg-black relative group">
                      <img 
                        src={selectedAnalysis.after_photo_url || selectedAnalysis.original_photo_url} 
                        alt="Po" 
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-all" 
                      />
                      <a 
                        href={selectedAnalysis.after_photo_url || selectedAnalysis.original_photo_url} 
                        target="_blank" 
                        className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Diagnostic Text */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-500" />
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">AI Diagnostická Zpráva</h4>
                </div>
                <div className="p-4 rounded-xl border leading-relaxed text-xs font-medium text-slate-600 border-amber-100 bg-amber-50/20">
                  {selectedAnalysis.analysis_result || 'Diagnostika se zpracovává nebo chybí.'}
                </div>
              </div>

              {/* Admin Notes */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <FileText size={14} />
                    <h4 className="text-[10px] font-black uppercase tracking-wider">Interní poznámky administrátora</h4>
                  </div>
                  <button
                    onClick={handleSaveNotes}
                    disabled={isSavingNote}
                    className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-amber-600 hover:text-amber-700 transition-all disabled:opacity-50"
                  >
                    {isSavingNote ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <Save size={12} />
                    )}
                    Uložit
                  </button>
                </div>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Přidejte interní poznámku k tomuto klientovi (např. termín realizace, detaily z telefonátu...)"
                  className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-xs font-medium"
                  style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                  rows={4}
                />
              </div>
            </div>
          ) : (
            <div 
              className="rounded-2xl border p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2 shadow-sm"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', borderStyle: 'dashed' }}
            >
              <Brain size={48} className="opacity-15 animate-pulse" />
              <p className="font-bold text-sm">Vyberte analýzu ze seznamu</p>
              <p className="text-xs">Kliknutím na kartu zobrazíte kompletní data, náhledy před/po a AI diagnostický report.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
