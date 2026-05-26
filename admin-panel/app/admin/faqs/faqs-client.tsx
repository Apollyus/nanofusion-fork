'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp, AlertTriangle, Save, X } from 'lucide-react'
import { Tables } from '@/lib/database.types'
import { createFaq, updateFaq, deleteFaq } from './actions'
import { TiptapEditor } from '@/components/admin/editor'

type Faq = Tables<'faqs'>

interface FaqsClientProps {
  initialFaqs: Faq[]
}

interface EditingFaq {
  id: string
  question: string
  answer: string
  page_section: string
}

const PAGE_SECTIONS = [
  { value: 'home', label: 'Hlavní stránka (sekce Časté dotazy)', color: 'bg-amber-100 text-amber-600 font-bold' },
  { value: 'subpage', label: 'Podstránka', color: 'bg-blue-100 text-blue-600' },
]

export function FaqsClient({ initialFaqs }: FaqsClientProps) {
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs)
  const [editing, setEditing] = useState<EditingFaq | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', page_section: 'home' })
  const [saving, setSaving] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  const handleAdd = async () => {
    if (!newFaq.question || !newFaq.answer) {
      toast.error('Vyplňte otázku i odpověď')
      return
    }
    setSaving(true)
    try {
      await createFaq({ ...newFaq, order_index: faqs.length })
      toast.success('FAQ přidána')
      setShowAdd(false)
      setNewFaq({ question: '', answer: '', page_section: 'home' })
      // Optimistic update would need a router refresh for full accuracy
    } catch {
      toast.error('Nepodařilo se přidat FAQ')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveEdit = async () => {
    if (!editing) return
    setSaving(true)
    try {
      await updateFaq(editing.id, { 
        question: editing.question, 
        answer: editing.answer,
        page_section: editing.page_section 
      })
      setFaqs((prev) =>
        prev.map((f) =>
          f.id === editing.id ? { 
            ...f, 
            question: editing.question, 
            answer: editing.answer,
            page_section: editing.page_section 
          } : f
        )
      )
      toast.success('FAQ aktualizována')
      setEditing(null)
    } catch {
      toast.error('Nepodařilo se uložit FAQ')
    } finally {
      setSaving(false)
    }
  }

  const handleToggleActive = async (faq: Faq) => {
    try {
      await updateFaq(faq.id, { is_active: !faq.is_active })
      setFaqs((prev) =>
        prev.map((f) => (f.id === faq.id ? { ...f, is_active: !f.is_active } : f))
      )
      toast.success(faq.is_active ? 'FAQ deaktivována' : 'FAQ aktivována')
    } catch {
      toast.error('Nepodařilo se aktualizovat FAQ')
    }
  }

  const handleDelete = async (id: string) => {
    setSaving(true)
    try {
      await deleteFaq(id)
      setFaqs((prev) => prev.filter((f) => f.id !== id))
      toast.success('FAQ smazána')
      setDeleteConfirm(null)
    } catch {
      toast.error('Nepodařilo se smazat FAQ')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Časté dotazy
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {faqs.length} otázek · klikněte na otázku pro editaci
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'var(--brand-primary)' }}
        >
          <Plus size={16} />
          Přidat FAQ
        </button>
      </div>

      {/* Add Form */}
      {showAdd && (
        <div
          className="rounded-xl p-5 animate-fade-in space-y-4"
          style={{ background: 'var(--bg-surface)', border: '2px solid var(--brand-primary)' }}
        >
          <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            Nová otázka
          </h2>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
              Otázka
            </label>
            <input
              type="text"
              value={newFaq.question}
              onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
              placeholder="Jaká je vaše otázka?"
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
              Zobrazit na stránce
            </label>
            <select
              value={newFaq.page_section}
              onChange={(e) => setNewFaq({ ...newFaq, page_section: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}
            >
              {PAGE_SECTIONS.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
              Odpověď
            </label>
            <TiptapEditor 
              content={newFaq.answer} 
              onChange={(html) => setNewFaq({ ...newFaq, answer: html })} 
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setShowAdd(false); setNewFaq({ question: '', answer: '', page_section: 'home' }) }}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold"
              style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}
            >
              Zrušit
            </button>
            <button
              onClick={handleAdd}
              disabled={saving}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ background: 'var(--brand-primary)' }}
            >
              {saving ? 'Přidávám...' : 'Přidat'}
            </button>
          </div>
        </div>
      )}

      {/* FAQ List */}
      {faqs.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 rounded-xl gap-3"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <p style={{ color: 'var(--text-muted)' }}>Žádné FAQ zatím</p>
        </div>
      ) : (
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="rounded-xl overflow-hidden transition-all duration-150"
              style={{
                background: 'var(--bg-surface)',
                border: faq.id === editing?.id
                  ? '2px solid var(--brand-primary)'
                  : '1px solid var(--border)',
                opacity: faq.is_active ? 1 : 0.5,
              }}
            >
              {faq.id === editing?.id ? (
                /* Edit Mode */
                <div className="p-5 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                      Otázka
                    </label>
                    <input
                      type="text"
                      value={editing.question}
                      onChange={(e) => setEditing({ ...editing, question: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ border: '1px solid var(--brand-primary)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                      Odpověď
                    </label>
                    <TiptapEditor 
                      content={editing.answer} 
                      onChange={(html) => setEditing({ ...editing, answer: html })} 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                      Stránka
                    </label>
                    <select
                      value={editing.page_section}
                      onChange={(e) => setEditing({ ...editing, page_section: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ border: '1px solid var(--brand-primary)', color: 'var(--text-primary)' }}
                    >
                      {PAGE_SECTIONS.map(s => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setEditing(null)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm"
                      style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                    >
                      <X size={14} /> Zrušit
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      disabled={saving}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-60"
                      style={{ background: 'var(--brand-primary)' }}
                    >
                      <Save size={14} /> Uložit
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div>
                  <div
                    className="flex items-center gap-3 px-5 py-4 cursor-pointer"
                    onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
                  >
                    <GripVertical size={18} style={{ color: 'var(--text-muted)', cursor: 'grab' }} />
                    <span
                      className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                      style={{ background: 'var(--bg-surface-2)', color: 'var(--text-muted)' }}
                    >
                      {index + 1}
                    </span>
                    <p className="flex-1 font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                      {faq.question}
                    </p>
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {/* Toggle active */}
                      <span
                        className={`text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest ${faq.page_section === 'home' ? 'bg-amber-100 text-amber-600 font-bold' : 'bg-blue-100 text-blue-600'}`}
                      >
                        {faq.page_section === 'home' ? 'Hlavní' : 'Podstránka'}
                      </span>
                      <button
                        onClick={() => handleToggleActive(faq)}
                        className="text-xs px-2.5 py-1 rounded-full font-semibold"
                        style={{
                          background: faq.is_active ? '#f0fdf4' : '#f1f5f9',
                          color: faq.is_active ? '#16a34a' : '#94a3b8',
                        }}
                      >
                        {faq.is_active ? 'Aktivní' : 'Skrytá'}
                      </button>
                      <button
                        onClick={() => setEditing({ id: faq.id, question: faq.question, answer: faq.answer, page_section: faq.page_section === 'home' ? 'home' : 'subpage' })}
                        className="text-xs px-2.5 py-1 rounded-full font-semibold"
                        style={{ background: 'var(--bg-surface-2)', color: 'var(--text-secondary)' }}
                      >
                        Upravit
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(faq.id)}
                        className="p-1 rounded"
                        style={{ color: '#ef4444' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    {expanded === faq.id ? (
                      <ChevronUp size={16} style={{ color: 'var(--text-muted)' }} />
                    ) : (
                      <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />
                    )}
                  </div>
                  {expanded === faq.id && (
                    <div
                      className="px-5 pb-4 text-sm leading-relaxed prose prose-sm max-w-none"
                      style={{ color: 'var(--text-secondary)', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-6 animate-fade-in"
            style={{ background: 'var(--bg-surface)', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full flex items-center justify-center" style={{ width: 44, height: 44, background: '#fef2f2' }}>
                <AlertTriangle size={22} style={{ color: '#ef4444' }} />
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Smazat FAQ?</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Tato akce je nevratná</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                Zrušit
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={saving}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
                style={{ background: '#ef4444' }}
              >
                Smazat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
