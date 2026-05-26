'use client'

import { useState, useMemo } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'
import {
  Plus,
  Search,
  Trash2,
  Eye,
  EyeOff,
  X,
  AlertTriangle,
  Image,
  MapPin,
  Clock,
  Wrench,
  ExternalLink,
} from 'lucide-react'
import {
  createRealization,
  updateRealization,
  deleteRealization,
  togglePublished,
} from './actions'

export type Realization = {
  id: string
  title: string
  subtitle?: string | null
  description: string | null
  location: string | null
  duration: string | null
  work_type: string | null
  category?: string | null
  youtube_id?: string | null
  is_published: boolean
  created_at: string
  updated_at: string
  realization_photos?: { id: string; url: string; caption: string | null; order_index: number }[]
}

const WORK_TYPES = [
  'Čištění střech',
  'Čištění fasád',
  'Čištění dlažeb',
  'Solární panely',
  'Nano-ochrana',
  'Komplexní projekt',
  'Graffiti',
  'Jiné',
]

interface RealizationsClientProps {
  initialRealizations: Realization[]
}

type ModalMode = 'create' | 'edit' | null

export function RealizationsClient({ initialRealizations }: RealizationsClientProps) {
  const [realizations, setRealizations] = useState(initialRealizations)
  const [search, setSearch] = useState('')
  const [workTypeFilter, setWorkTypeFilter] = useState<string>('all')
  const [modal, setModal] = useState<ModalMode>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    location: '',
    duration: '',
    work_type: '',
    category: '',
    youtube_id: '',
  })

  const filtered = useMemo(() => {
    return realizations.filter((r) => {
      const matchSearch =
        !search ||
        [r.title, r.description, r.location, r.work_type]
          .filter(Boolean)
          .some((f) => f!.toLowerCase().includes(search.toLowerCase()))
      const matchType = workTypeFilter === 'all' || r.work_type === workTypeFilter
      return matchSearch && matchType
    })
  }, [realizations, search, workTypeFilter])

  const openCreate = () => {
    setForm({ title: '', subtitle: '', description: '', location: '', duration: '', work_type: '', category: '', youtube_id: '' })
    setEditingId(null)
    setModal('create')
  }

  const openEdit = (r: Realization) => {
    setForm({
      title: r.title,
      subtitle: r.subtitle || '',
      description: r.description || '',
      location: r.location || '',
      duration: r.duration || '',
      work_type: r.work_type || '',
      category: r.category || '',
      youtube_id: r.youtube_id || '',
    })
    setEditingId(r.id)
    setModal('edit')
  }

  const handleSave = async () => {
    if (!form.title) {
      toast.error('Název realizace je povinný')
      return
    }
    setSaving(true)
    try {
      if (modal === 'create') {
        const newRealization = await createRealization(form)
        setRealizations((prev) => [newRealization, ...prev])
        toast.success('Realizace vytvořena')
      } else if (editingId) {
        await updateRealization(editingId, form)
        setRealizations((prev) =>
          prev.map((r) => (r.id === editingId ? { ...r, ...form } : r))
        )
        toast.success('Realizace uložena')
      }
      setModal(null)
    } catch {
      toast.error('Nepodařilo se uložit realizaci')
    } finally {
      setSaving(false)
    }
  }

  const handleTogglePublished = async (r: Realization) => {
    try {
      await togglePublished(r.id, !r.is_published)
      setRealizations((prev) =>
        prev.map((x) => (x.id === r.id ? { ...x, is_published: !x.is_published } : x))
      )
      toast.success(r.is_published ? 'Realizace skryta' : 'Realizace zveřejněna')
    } catch {
      toast.error('Nepodařilo se aktualizovat stav')
    }
  }

  const handleDelete = async (id: string) => {
    setSaving(true)
    try {
      await deleteRealization(id)
      setRealizations((prev) => prev.filter((r) => r.id !== id))
      toast.success('Realizace smazána')
      setDeleteConfirm(null)
    } catch {
      toast.error('Nepodařilo se smazat realizaci')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Realizace</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {realizations.length} realizací · {realizations.filter((r) => r.is_published).length} zveřejněno
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'var(--brand-primary)' }}
        >
          <Plus size={16} />
          Nová realizace
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 p-4 rounded-xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <div className="flex-1 relative min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Hledat realizace..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none"
            style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}
          />
        </div>
        <select
          value={workTypeFilter}
          onChange={(e) => setWorkTypeFilter(e.target.value)}
          className="px-3 py-2.5 rounded-lg text-sm outline-none"
          style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}
        >
          <option value="all">Všechny typy</option>
          {WORK_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-xl gap-3" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <p style={{ color: 'var(--text-muted)' }}>Žádné realizace nenalezeny</p>
        </div>
      ) : (
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {filtered.map((r) => (
            <div
              key={r.id}
              className="rounded-xl overflow-hidden transition-all duration-150"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Photo or placeholder */}
              <div
                className="relative flex items-center justify-center"
                style={{
                  height: 160,
                  background: r.realization_photos?.[0]
                    ? `url(${r.realization_photos[0].url}) center/cover`
                    : 'var(--bg-surface-2)',
                }}
              >
                {!r.realization_photos?.[0] && (
                  <Image size={36} style={{ color: 'var(--text-muted)' }} />
                )}
                <div className="absolute top-3 right-3 flex gap-2">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: r.is_published ? '#f0fdf4' : '#f1f5f9',
                      color: r.is_published ? '#16a34a' : '#94a3b8',
                    }}
                  >
                    {r.is_published ? 'Zveřejněno' : 'Koncept'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--text-primary)' }}>
                  {r.title}
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
                  {r.work_type && (
                    <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <Wrench size={11} /> {r.work_type}
                    </span>
                  )}
                  {r.location && (
                    <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <MapPin size={11} /> {r.location}
                    </span>
                  )}
                  {r.duration && (
                    <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <Clock size={11} /> {r.duration}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/realizations/${r.id}`}
                    className="flex-1 py-1.5 rounded-lg text-xs font-bold text-center transition-all flex items-center justify-center gap-1"
                    style={{ background: 'var(--brand-primary)', color: 'white' }}
                  >
                    <ExternalLink size={12} /> Detail & Fotky
                  </Link>
                  <button
                    onClick={() => handleTogglePublished(r)}
                    className="p-1.5 rounded-lg transition-all"
                    style={{ color: r.is_published ? '#16a34a' : '#94a3b8' }}
                    title={r.is_published ? 'Skrýt' : 'Zveřejnit'}
                  >
                    {r.is_published ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(r.id)}
                    className="p-1.5 rounded-lg transition-all"
                    style={{ color: '#ef4444' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {modal && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        >
          <div
            className="w-full max-w-lg rounded-2xl overflow-hidden animate-fade-in"
            style={{ background: 'var(--bg-surface)', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
              <h2 className="font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
                {modal === 'create' ? 'Nová realizace' : 'Upravit realizaci'}
              </h2>
              <button onClick={() => setModal(null)} style={{ color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { key: 'title', label: 'Název *', placeholder: 'Název realizace' },
                { key: 'subtitle', label: 'Podnadpis', placeholder: 'Stručný podnadpis' },
                { key: 'location', label: 'Lokalita', placeholder: 'např. Praha, Brno' },
                { key: 'duration', label: 'Délka projektu', placeholder: 'např. 2 dny' },
                { key: 'youtube_id', label: 'YouTube ID', placeholder: 'ID videa (např. dQw4w9WgXcQ)' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                  Typ práce
                </label>
                <select
                  value={form.work_type}
                  onChange={(e) => setForm({ ...form, work_type: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                >
                  <option value="">-- Vyberte typ --</option>
                  {WORK_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>
                  Popis
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Popis realizace..."
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                />
              </div>

              {/* Photo Management Section (Edit mode only) */}
              {modal === 'edit' && editingId && (
                <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                    Fotografie realizace
                  </label>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {realizations.find(r => r.id === editingId)?.realization_photos?.map((photo) => (
                      <div key={photo.id} className="relative aspect-video rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                        <img src={photo.url} className="w-full h-full object-cover" />
                        <button 
                          onClick={async () => {
                            if (confirm('Smazat tuto fotku?')) {
                              const { deleteRealizationPhoto } = await import('./actions');
                              await deleteRealizationPhoto(photo.id);
                              toast.success('Fotka smazána');
                              setRealizations(prev => prev.map(r => r.id === editingId ? {
                                ...r, 
                                realization_photos: r.realization_photos?.filter(p => p.id !== photo.id)
                              } : r));
                            }
                          }}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                    <label className={`aspect-video rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black/5'}`} style={{ borderColor: 'var(--border)' }}>
                      {uploading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-amber-500 border-t-transparent" />
                      ) : (
                        <>
                          <Plus size={20} style={{ color: 'var(--text-muted)' }} />
                          <span className="text-[10px] mt-1 font-semibold" style={{ color: 'var(--text-muted)' }}>PŘIDAT</span>
                        </>
                      )}
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        disabled={uploading}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          
                          setUploading(true);
                          try {
                            const { uploadRealizationPhoto } = await import('./actions');
                            const formData = new FormData();
                            formData.append('file', file);
                            const url = await uploadRealizationPhoto(editingId, formData);
                            
                            // Update local state for immediate feedback
                            setRealizations(prev => prev.map(r => r.id === editingId ? {
                              ...r,
                              realization_photos: [
                                ...(r.realization_photos || []),
                                { id: Math.random().toString(), url, caption: null, order_index: (r.realization_photos?.length || 0) }
                              ]
                            } : r));
                            
                            toast.success('Fotka nahrána');
                          } catch (err: any) {
                            toast.error('Nahrávání selhalo: ' + err.message);
                          } finally {
                            setUploading(false);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setModal(null)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                >
                  Zrušit
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
                  style={{ background: 'var(--brand-primary)' }}
                >
                  {saving ? 'Ukládám...' : 'Uložit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-sm rounded-2xl p-6 animate-fade-in" style={{ background: 'var(--bg-surface)', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full flex items-center justify-center" style={{ width: 44, height: 44, background: '#fef2f2' }}>
                <AlertTriangle size={22} style={{ color: '#ef4444' }} />
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Smazat realizaci?</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Smaže se i všechny fotky</p>
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
