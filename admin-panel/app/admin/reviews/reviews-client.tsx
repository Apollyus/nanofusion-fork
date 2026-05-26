'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Star, CheckCircle, XCircle, Trash2, Plus, AlertTriangle } from 'lucide-react'
import { Tables } from '@/lib/database.types'
import { approveReview, rejectReview, deleteReview, addManualReview } from './actions'
import { TiptapEditor } from '@/components/admin/editor'

type Review = Tables<'external_reviews'>

function StarRating({ rating }: { rating: number | null }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={14}
          fill={n <= (rating ?? 0) ? '#f59e0b' : 'none'}
          stroke={n <= (rating ?? 0) ? '#f59e0b' : '#cbd5e1'}
        />
      ))}
    </div>
  )
}

export function ReviewsClient({ initialReviews }: { initialReviews: Review[] }) {
  const [tab, setTab] = useState<'approved' | 'pending'>('approved')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newReview, setNewReview] = useState({ author: '', rating: 5, content: '' })
  const [showBulkModal, setShowBulkModal] = useState(false)
  const [bulkText, setBulkText] = useState('')
  const [loading, setLoading] = useState<string | null>(null)

  const pending = initialReviews.filter((r) => !r.approved)
  const approved = initialReviews.filter((r) => r.approved)
  const displayed = tab === 'pending' ? pending : approved

  const handleBulkImport = async () => {
    if (!bulkText) return
    setLoading('bulk')
    try {
      const res = await (await import('./actions')).bulkAddReviews(bulkText)
      toast.success(`Importováno ${res.imported} recenzí`)
      setShowBulkModal(false)
      setBulkText('')
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setLoading(null)
    }
  }

  const handleApprove = async (id: string) => {
    setLoading(id)
    try {
      await approveReview(id)
      toast.success('Recenze schválena')
    } catch {
      toast.error('Chyba při schvalování')
    } finally {
      setLoading(null)
    }
  }

  const handleReject = async (id: string) => {
    setLoading(id)
    try {
      await rejectReview(id)
      toast.success('Recenze zamítnuta')
    } catch {
      toast.error('Chyba při zamítnutí')
    } finally {
      setLoading(null)
    }
  }

  const handleDelete = async (id: string) => {
    setLoading(id)
    try {
      await deleteReview(id)
      toast.success('Recenze smazána')
      setDeleteConfirm(null)
    } catch {
      toast.error('Chyba při mazání')
    } finally {
      setLoading(null)
    }
  }

  const handleAdd = async () => {
    if (!newReview.author || !newReview.content) {
      toast.error('Vyplňte jméno a text recenze')
      return
    }
    setLoading('add')
    try {
      await addManualReview(newReview)
      toast.success('Recenze přidána a zobrazena na webu ✅')
      setShowAddModal(false)
      setNewReview({ author: '', rating: 5, content: '' })
    } catch {
      toast.error('Chyba při přidávání')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Recenze</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {pending.length > 0 && (
              <span style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>
                {pending.length} čekají na schválení ·{' '}
              </span>
            )}
            {initialReviews.length} celkem
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              setLoading('sync')
              try {
                const res = await (await import('./actions')).syncFirmyReviews()
                toast.success(`Synchronizace dokončena: ${res.imported} nových recenzí`)
              } catch (e: any) {
                toast.error(e.message)
              } finally {
                setLoading(null)
              }
            }}
            disabled={loading === 'sync'}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-60 transition-all"
          >
            <Star size={15} />
            {loading === 'sync' ? 'Synchronizuji...' : 'Synchronizovat Firmy.cz'}
          </button>
          <button
            onClick={() => setShowBulkModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
          >
            Hromadný import
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'var(--brand-primary)' }}
          >
            <Plus size={15} />
            Přidat recenzi
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: 'var(--bg-surface-2)' }}>
        {(['approved', 'pending'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150"
            style={{
              background: tab === t ? 'var(--bg-surface)' : 'transparent',
              color: tab === t ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: tab === t ? 'var(--shadow-sm)' : undefined,
            }}
          >
            {t === 'approved' ? 'Schválené' : 'Čekající'}
            {t === 'pending' && pending.length > 0 && (
              <span
                className="ml-2 rounded-full px-1.5 py-0.5 text-xs font-bold text-white"
                style={{ background: 'var(--brand-primary)' }}
              >
                {pending.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Cards */}
      {displayed.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 rounded-xl gap-3"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <Star size={44} style={{ color: 'var(--text-muted)' }} />
          <p style={{ color: 'var(--text-muted)' }}>
            {tab === 'pending' ? 'Žádné recenze čekají na schválení' : 'Zatím žádné schválené recenze'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayed.map((review) => (
            <div
              key={review.id}
              className="rounded-xl p-5 flex gap-4"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
            >
              <div
                className="rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{ width: 44, height: 44, background: 'var(--brand-primary-light)', color: 'var(--brand-primary)' }}
              >
                {review.author?.charAt(0).toUpperCase() || '?'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                      {review.author || 'Anonymní'}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={review.rating} />
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {review.source || 'firmy.cz'}
                      </span>
                      {review.published_at && (
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          · {new Date(review.published_at).toLocaleDateString('cs-CZ')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {tab === 'pending' && (
                      <button
                        onClick={() => handleApprove(review.id)}
                        disabled={loading === review.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-60"
                        style={{ background: '#f0fdf4', color: '#16a34a' }}
                      >
                        <CheckCircle size={14} /> Schválit
                      </button>
                    )}
                    {tab === 'approved' && (
                      <button
                        onClick={() => handleReject(review.id)}
                        disabled={loading === review.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-60"
                        style={{ background: '#fffbeb', color: '#d97706' }}
                      >
                        <XCircle size={14} /> Skrýt
                      </button>
                    )}
                    <button
                      onClick={() => setDeleteConfirm(review.id)}
                      className="p-1.5 rounded-lg transition-all"
                      style={{ color: '#ef4444' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
                {review.content && (
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {review.content}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bulk Import Modal */}
      {showBulkModal && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        >
          <div
            className="w-full max-w-2xl rounded-2xl overflow-hidden"
            style={{ background: 'var(--bg-surface)', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}
          >
            <div className="px-6 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
              <h2 className="font-bold text-xl" style={{ color: 'var(--text-primary)' }}>Hromadný import recenzí</h2>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                Zkopírujte text recenzí z Firmy.cz (včetně jmen) a vložte je sem. Oddělte recenze prázdným řádkem.
              </p>
            </div>
            <div className="p-6 space-y-4">
              <textarea
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                placeholder="Jan Novák&#10;5 hvězd&#10;Skvělá práce, doporučuji!&#10;&#10;Petr Svoboda&#10;4 hvězdy&#10;Dobrá komunikace."
                className="w-full h-64 px-4 py-3 rounded-xl text-sm outline-none font-mono"
                style={{ border: '1px solid var(--border)', background: 'var(--bg-surface-2)', color: 'var(--text-primary)' }}
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowBulkModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                >
                  Zrušit
                </button>
                <button
                  onClick={handleBulkImport}
                  disabled={loading === 'bulk'}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
                  style={{ background: 'var(--brand-primary)' }}
                >
                  {loading === 'bulk' ? 'Importuji...' : 'Importovat vše'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        >
          <div
            className="w-full max-w-md rounded-2xl overflow-hidden"
            style={{ background: 'var(--bg-surface)', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}
          >
            <div className="px-6 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
              <h2 className="font-bold text-xl" style={{ color: 'var(--text-primary)' }}>Přidat recenzi</h2>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                Zkopírujte recenzi z Firmy.cz nebo Googlu a vložte ji sem
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                  Jméno zákazníka
                </label>
                <input
                  type="text"
                  value={newReview.author}
                  onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                  placeholder="Jan Novák"
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: '1px solid var(--border)', background: 'var(--bg-surface-2)', color: 'var(--text-primary)' }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                  Hodnocení
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} onClick={() => setNewReview({ ...newReview, rating: n })} className="p-1">
                      <Star size={26} fill={n <= newReview.rating ? '#f59e0b' : 'none'} stroke={n <= newReview.rating ? '#f59e0b' : '#cbd5e1'} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                  Text recenze
                </label>
                <TiptapEditor 
                  content={newReview.content} 
                  onChange={(html) => setNewReview({ ...newReview, content: html })} 
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => { setShowAddModal(false); setNewReview({ author: '', rating: 5, content: '' }) }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                >
                  Zrušit
                </button>
                <button
                  onClick={handleAdd}
                  disabled={loading === 'add'}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
                  style={{ background: 'var(--brand-primary)' }}
                >
                  {loading === 'add' ? 'Přidávám...' : 'Přidat na web'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-6"
            style={{ background: 'var(--bg-surface)', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full flex items-center justify-center" style={{ width: 44, height: 44, background: '#fef2f2' }}>
                <AlertTriangle size={22} style={{ color: '#ef4444' }} />
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Smazat recenzi?</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Tato akce je nevratná</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              >
                Zrušit
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={!!loading}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
                style={{ background: '#ef4444' }}
              >
                {loading ? 'Mažu...' : 'Smazat'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
