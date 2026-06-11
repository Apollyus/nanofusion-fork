'use client'

import { useState } from 'react'
import { updateAnalyzerTips } from './actions'
import type { NanoTip } from './actions'
import { 
  updateInquiryStatus, 
  updateInquiryNotes, 
  deleteInquiry 
} from '../inquiries/actions'
import { toast } from 'sonner'
import { 
  Save, 
  Plus, 
  Trash2, 
  Lightbulb,
  Info,
  Brain,
  ClipboardList,
  Mail,
  Phone,
  Home,
  Calendar,
  X,
  ChevronDown,
  AlertTriangle
} from 'lucide-react'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  surface?: string
  analysis_type?: string
  property_type?: string
  score?: number
  label?: string
  urgency?: string
  original_photo_url?: string
  image_url?: string
  analysis_result?: string
  additional_notes?: string
  timeline?: string
  status: string
  created_at: string
  updated_at: string
  description?: string // internal notes are stored in 'description' column on leads table
}

interface AnalyzerClientProps {
  initialTips: NanoTip[]
  initialLeads: Lead[]
}

const STATUS_LABELS: Record<string, string> = {
  new: 'Nová',
  in_progress: 'V řešení',
  resolved: 'Vyřešeno',
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  new: { bg: '#eff6ff', text: '#2563eb' },
  in_progress: { bg: '#fffbeb', text: '#d97706' },
  resolved: { bg: '#f0fdf4', text: '#16a34a' },
}

export function AnalyzerClient({ initialTips, initialLeads }: AnalyzerClientProps) {
  const [activeTab, setActiveTab] = useState<'tips' | 'leads'>('tips')
  
  // Tips Tab State
  const [tips, setTips] = useState<NanoTip[]>(initialTips)
  const [isSavingTips, setIsSavingTips] = useState(false)

  // Leads Tab State
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [leadNotes, setLeadNotes] = useState('')
  const [savingLeadNotes, setSavingLeadNotes] = useState(false)
  const [updatingLeadStatus, setUpdatingLeadStatus] = useState(false)
  const [deleteLeadConfirm, setDeleteLeadConfirm] = useState<string | null>(null)
  const [deletingLead, setDeletingLead] = useState(false)

  // Handlers for Tips
  const handleAddTip = () => {
    const newTip: NanoTip = {
      id: crypto.randomUUID(),
      title: 'Nový tip',
      text: 'Popis tipu nebo zajímavá informace o nano technologii...'
    }
    setTips([...tips, newTip])
  }

  const handleRemoveTip = (id: string) => {
    setTips(tips.filter(t => t.id !== id))
  }

  const handleTipChange = (id: string, field: keyof NanoTip, value: string) => {
    setTips(tips.map(t => t.id === id ? { ...t, [field]: value } : t))
  }

  const handleSaveTips = async () => {
    setIsSavingTips(true)
    try {
      const invalid = tips.some(t => !t.title.trim() || !t.text.trim())
      if (invalid) {
        toast.error('Všechny tipy musí mít vyplněný název i text.')
        setIsSavingTips(false)
        return
      }

      await updateAnalyzerTips(tips)
      toast.success('Tipy pro AI analýzu byly úspěšně uloženy')
    } catch (e: any) {
      toast.error('Chyba při ukládání tipů: ' + e.message)
    } finally {
      setIsSavingTips(false)
    }
  }

  // Handlers for Leads
  const handleOpenLead = (lead: Lead) => {
    setSelectedLead(lead)
    setLeadNotes(lead.description || '')
  }

  const handleLeadStatusChange = async (id: string, status: string) => {
    setUpdatingLeadStatus(true)
    try {
      await updateInquiryStatus(id, status, 'ai_analyzer')
      toast.success('Stav poptávky byl aktualizován')
      setLeads(leads.map(l => l.id === id ? { ...l, status } : l))
      if (selectedLead?.id === id) {
        setSelectedLead({ ...selectedLead, status })
      }
    } catch (err) {
      toast.error('Nepodařilo se aktualizovat stav')
    } finally {
      setUpdatingLeadStatus(false)
    }
  }

  const handleSaveLeadNotes = async () => {
    if (!selectedLead) return
    setSavingLeadNotes(true)
    try {
      await updateInquiryNotes(selectedLead.id, leadNotes, 'ai_analyzer')
      toast.success('Poznámky byly uloženy')
      setLeads(leads.map(l => l.id === selectedLead.id ? { ...l, description: leadNotes } : l))
    } catch {
      toast.error('Nepodařilo se uložit poznámky')
    } finally {
      setSavingLeadNotes(false)
    }
  }

  const handleDeleteLead = async (id: string) => {
    setDeletingLead(true)
    try {
      await deleteInquiry(id, 'ai_analyzer')
      toast.success('Poptávka byla smazána')
      setLeads(leads.filter(l => l.id !== id))
      setDeleteLeadConfirm(null)
      if (selectedLead?.id === id) setSelectedLead(null)
    } catch {
      toast.error('Nepodařilo se smazat poptávku')
    } finally {
      setDeletingLead(false)
    }
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>AI Analýzátor</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Spravujte tipy zobrazované během načítání a prohlížejte poptávky z odeslaných AI analýz.
          </p>
        </div>
      </div>

      {/* Tabs Control */}
      <div className="flex border-b border-slate-200" style={{ borderColor: 'var(--border)' }}>
        <button
          onClick={() => setActiveTab('tips')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all outline-none ${
            activeTab === 'tips'
              ? 'border-amber-500 text-amber-500'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Lightbulb size={16} /> Tipy a doporučení ({tips.length})
        </button>
        <button
          onClick={() => setActiveTab('leads')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all outline-none ${
            activeTab === 'leads'
              ? 'border-amber-500 text-amber-500'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <ClipboardList size={16} /> Poptávky z AI analýz ({leads.length})
        </button>
      </div>

      {/* Tab 1: Tips */}
      {activeTab === 'tips' && (
        <div className="space-y-6">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex gap-3 text-amber-800 text-sm">
            <Info size={20} className="flex-shrink-0 mt-0.5 text-amber-600" />
            <div>
              <p className="font-bold">Jak se tipy zobrazují?</p>
              <p className="mt-1 opacity-90 leading-relaxed">
                Při spuštění analýzy fotky se vybere náhodný výchozí tip a následně se každých 4,5 sekundy zobrazí další v pořadí. Tipy by měly být krátké a úderné.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <div 
                key={tip.id} 
                className="rounded-2xl border p-6 space-y-4 relative group transition-all hover:shadow-md bg-white"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600">
                      <Lightbulb size={16} />
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tip #{index + 1}</span>
                  </div>
                  <button 
                    onClick={() => handleRemoveTip(tip.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    title="Odstranit tip"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block">Titulek tipu</label>
                    <input 
                      type="text"
                      value={tip.title}
                      onChange={(e) => handleTipChange(tip.id, 'title', e.target.value)}
                      className="w-full p-2.5 rounded-xl border text-sm font-semibold outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                      style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block">Obsah / Popis tipu</label>
                    <textarea 
                      value={tip.text}
                      onChange={(e) => handleTipChange(tip.id, 'text', e.target.value)}
                      rows={3}
                      className="w-full p-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
                      style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {tips.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed rounded-3xl bg-white" style={{ borderColor: 'var(--border)' }}>
              <Lightbulb size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium">Nebyly přidány žádné tipy.</p>
              <button
                onClick={handleAddTip}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-all text-sm"
              >
                <Plus size={16} /> Vytvořit první tip
              </button>
            </div>
          )}

          {/* Sticky Save Bar */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <button
              onClick={handleSaveTips}
              disabled={isSavingTips}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold shadow-2xl hover:bg-black transition-all disabled:opacity-50"
            >
              {isSavingTips ? 'Ukládám...' : (
                <>
                  <Save size={20} /> Uložit všechny tipy
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: AI Analyzer Leads */}
      {activeTab === 'leads' && (
        <div className="space-y-6">
          <div className="rounded-xl border overflow-hidden bg-white" style={{ borderColor: 'var(--border)' }}>
            {leads.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3 bg-white">
                <Brain size={44} className="text-slate-300" />
                <p className="font-medium text-slate-500">Zatím nebyly odeslány žádné poptávky z AI analýzátoru.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-base)' }}>
                      {['Datum', 'Klient', 'Povrch', 'Skóre / Urgence', 'Stav', 'Akce'].map((col) => (
                        <th
                          key={col}
                          className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead, i) => {
                      const st = lead.status
                      const colors = STATUS_COLORS[st] || STATUS_COLORS['new']
                      
                      // Safely parse score
                      const leadScore = lead.score !== undefined ? lead.score : (lead.analysis_result?.match(/Skóre znečištění:\s*(\d+)/)?.[1] || '—')
                      
                      return (
                        <tr
                          key={lead.id}
                          className="transition-colors duration-100 hover:bg-slate-50 cursor-pointer"
                          style={{
                            borderBottom: i < leads.length - 1 ? '1px solid var(--border)' : undefined,
                          }}
                          onClick={() => handleOpenLead(lead)}
                        >
                          <td className="px-5 py-4">
                            <span className="text-sm text-slate-500">
                              {new Date(lead.created_at).toLocaleDateString('cs-CZ')}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <p className="text-sm font-semibold text-slate-900">
                              {lead.name || '—'}
                            </p>
                            <p className="text-xs text-slate-500">
                              {lead.email || lead.phone || ''}
                            </p>
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-600">
                            {lead.surface || lead.analysis_type || '—'}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-800">{leadScore}/10</span>
                              {lead.urgency && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  lead.urgency === 'vysoká' ? 'bg-red-50 text-red-600' : 
                                  lead.urgency === 'střední' ? 'bg-amber-50 text-amber-600' : 
                                  'bg-green-50 text-green-600'
                                }`}>
                                  {lead.urgency}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className="text-xs font-semibold px-2.5 py-1 rounded-full"
                              style={{ background: colors.bg, color: colors.text }}
                            >
                              {STATUS_LABELS[st] || st}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => handleOpenLead(lead)}
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-all shadow-sm"
                              >
                                Detail
                              </button>
                              <button
                                onClick={() => setDeleteLeadConfirm(lead.id)}
                                className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="w-full max-w-3xl rounded-2xl overflow-hidden animate-fade-in bg-white"
            style={{
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  AI Analýza: {selectedLead.name || 'Poptávka'}
                </h2>
                <p className="text-sm mt-0.5 text-slate-500">
                  {new Date(selectedLead.created_at).toLocaleString('cs-CZ')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select
                    value={selectedLead.status || 'new'}
                    onChange={(e) => handleLeadStatusChange(selectedLead.id, e.target.value)}
                    disabled={updatingLeadStatus}
                    className="pl-3 pr-8 py-2 rounded-lg text-sm font-semibold appearance-none cursor-pointer outline-none border bg-white text-slate-800"
                  >
                    <option value="new">Nová</option>
                    <option value="in_progress">V řešení</option>
                    <option value="resolved">Vyřešeno</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Image and basic info grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Visual Image */}
                {(selectedLead.original_photo_url || selectedLead.image_url) && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Původní snímek</p>
                    <div className="relative w-full h-60 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center">
                      <img
                        src={selectedLead.original_photo_url || selectedLead.image_url}
                        alt="Snímek z AI analýzy"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Details & Contacts */}
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Kontaktní údaje</p>
                  <div className="rounded-2xl border p-4 space-y-3 bg-slate-50">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-slate-400" />
                      <div>
                        <p className="text-[10px] text-slate-400 leading-none">E-mail</p>
                        <p className="text-sm font-semibold text-slate-800 mt-1">{selectedLead.email || '—'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-slate-400" />
                      <div>
                        <p className="text-[10px] text-slate-400 leading-none">Telefon</p>
                        <p className="text-sm font-semibold text-slate-800 mt-1">{selectedLead.phone || '—'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Brain size={16} className="text-slate-400" />
                      <div>
                        <p className="text-[10px] text-slate-400 leading-none">Typ povrchu</p>
                        <p className="text-sm font-semibold text-slate-800 mt-1">{selectedLead.surface || selectedLead.analysis_type || '—'}</p>
                      </div>
                    </div>
                    {selectedLead.property_type && (
                      <div className="flex items-center gap-2">
                        <Home size={16} className="text-slate-400" />
                        <div>
                          <p className="text-[10px] text-slate-400 leading-none">Typ objektu</p>
                          <p className="text-sm font-semibold text-slate-800 mt-1">{selectedLead.property_type}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Analysis Result */}
              {selectedLead.analysis_result && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Výsledky vyhodnocení</p>
                  <div className="rounded-2xl border p-4 bg-slate-50 text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                    {selectedLead.analysis_result}
                  </div>
                </div>
              )}

              {/* Additional notes/quote details if completed */}
              {selectedLead.additional_notes && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Dodatečné informace k poptávce</p>
                  <div className="rounded-2xl border p-4 bg-amber-500/5 border-amber-500/20 text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                    {selectedLead.additional_notes}
                  </div>
                </div>
              )}

              {/* Admin notes */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Interní poznámky</p>
                <textarea
                  value={leadNotes}
                  onChange={(e) => setLeadNotes(e.target.value)}
                  placeholder="Zapište interní poznámky k této AI poptávce..."
                  rows={4}
                  className="w-full rounded-2xl p-4 text-sm outline-none border focus:ring-2 focus:ring-amber-500/20 resize-none bg-slate-50"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveLeadNotes}
                    disabled={savingLeadNotes}
                    className="px-4 py-2 rounded-xl text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-all shadow-md disabled:opacity-60"
                  >
                    {savingLeadNotes ? 'Ukládám...' : 'Uložit poznámky'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Lead Confirm Modal */}
      {deleteLeadConfirm && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        >
          <div className="w-full max-w-sm rounded-2xl p-6 bg-white shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full flex items-center justify-center bg-red-50" style={{ width: 44, height: 44 }}>
                <AlertTriangle size={22} className="text-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-950">Smazat poptávku?</h3>
                <p className="text-sm text-slate-500">Tato akce je nevratná</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteLeadConfirm(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border text-slate-800"
              >
                Zrušit
              </button>
              <button
                onClick={() => handleDeleteLead(deleteLeadConfirm)}
                disabled={deletingLead}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-60"
              >
                {deletingLead ? 'Mažu...' : 'Smazat'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
