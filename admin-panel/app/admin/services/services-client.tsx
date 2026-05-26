'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'
import { 
  Plus, 
  GripVertical, 
  Settings2, 
  Eye, 
  EyeOff, 
  Trash2, 
  ChevronRight,
  Sparkles,
  Camera,
  MessageSquareQuote
} from 'lucide-react'
import { Tables } from '@/lib/database.types'
import { toggleServiceStatus, deleteService, createService } from './actions'

type Service = Tables<'services'> & {
  service_before_after: { count: number }[]
  service_reviews: { count: number }[]
}

export function ServicesClient({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [showAdd, setShowAdd] = useState(false)
  const [newServiceName, setNewServiceName] = useState('')
  const [creating, setCreating] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const handleCreate = async () => {
    if (!newServiceName) return
    setCreating(true)
    try {
      const slug = newServiceName.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
      await createService({ name: newServiceName, slug })
      toast.success('Služba vytvořena')
      setShowAdd(false)
      setNewServiceName('')
      // Reload effectively
      window.location.reload()
    } catch (err: any) {
      toast.error('Chyba při vytváření: ' + err.message)
    } finally {
      setCreating(false)
    }
  }

  const handleToggleStatus = async (item: Service) => {
    try {
      await toggleServiceStatus(item.id, !item.is_active)
      setServices(prev => prev.map(s => s.id === item.id ? { ...s, is_active: !s.is_active } : s))
      toast.success(item.is_active ? 'Služba deaktivována' : 'Služba aktivována')
    } catch {
      toast.error('Chyba při změně stavu')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteService(id)
      setServices(prev => prev.filter(s => s.id !== id))
      toast.success('Služba smazána')
      setDeleteConfirm(null)
    } catch {
      toast.error('Chyba při mazání')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Správa služeb</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Definujte služby, před/po fotky a specifické recenze.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-amber-500/20"
          style={{ background: 'var(--brand-primary)' }}
        >
          <Plus size={18} />
          Nová služba
        </button>
      </div>

      {showAdd && (
        <div className="p-6 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-300" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <h3 className="font-bold mb-4">Vytvořit novou službu</h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={newServiceName}
              onChange={(e) => setNewServiceName(e.target.value)}
              placeholder="Název služby (např. Keramická ochrana laku)"
              className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none border transition-all"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-base)' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--brand-primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
            <button
              onClick={handleCreate}
              disabled={creating || !newServiceName}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50"
              style={{ background: 'var(--brand-primary)' }}
            >
              Vytvořit
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold border"
              style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              Zrušit
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {services.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border-2 border-dashed" style={{ borderColor: 'var(--border)' }}>
            <Sparkles size={40} className="mx-auto mb-3 opacity-20" />
            <p style={{ color: 'var(--text-secondary)' }}>Zatím žádné služby.</p>
          </div>
        ) : (
          services.map((item) => (
            <div
              key={item.id}
              className="group p-5 rounded-2xl transition-all duration-200 flex items-center gap-5 hover:shadow-xl hover:scale-[1.005]"
              style={{ 
                background: 'var(--bg-surface)', 
                border: '1px solid var(--border)',
                opacity: item.is_active ? 1 : 0.7
              }}
            >
              <div className="cursor-grab p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical size={20} style={{ color: 'var(--text-muted)' }} />
              </div>

              <div 
                className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border"
                style={{ borderColor: 'var(--border)' }}
              >
                {item.hero_image_url ? (
                  <img src={item.hero_image_url} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-50">
                    <Camera size={24} className="opacity-20" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>{item.name}</h3>
                <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <span className="flex items-center gap-1.5">
                    <Camera size={14} /> {item.service_before_after?.[0]?.count ?? 0} fotky
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageSquareQuote size={14} /> {item.service_reviews?.[0]?.count ?? 0} recenzí
                  </span>
                  <span className="font-mono text-xs opacity-60">/{item.slug}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleStatus(item)}
                  className="p-2.5 rounded-xl transition-all"
                  style={{ background: 'var(--bg-base)', border: '1px solid var(--border)' }}
                  title={item.is_active ? 'Deaktivovat' : 'Aktivovat'}
                >
                  {item.is_active ? <Eye size={18} className="text-blue-500" /> : <EyeOff size={18} className="text-slate-400" />}
                </button>
                <Link
                  href={`/admin/services/${item.id}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                  style={{ 
                    background: 'var(--bg-base)', 
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)' 
                  }}
                >
                  <Settings2 size={16} />
                  Upravit
                  <ChevronRight size={16} />
                </Link>
                <button
                  onClick={() => setDeleteConfirm(item.id)}
                  className="p-2.5 rounded-xl transition-all hover:bg-red-50"
                  style={{ color: '#ef4444' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm p-6 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200" style={{ background: 'var(--bg-surface)' }}>
            <h3 className="text-xl font-bold mb-2">Smazat službu?</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              Tato akce je nevratná. Smažou se i všechny fotky a recenze k této službě.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border"
                style={{ borderColor: 'var(--border)' }}
              >
                Zrušit
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
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
