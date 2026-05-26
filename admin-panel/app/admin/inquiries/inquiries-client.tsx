'use client'

import { useState, useMemo } from 'react'
import { toast } from 'sonner'
import {
  Search,
  Download,
  Filter,
  ClipboardList,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  Phone,
  Mail,
  MessageSquare,
  Trash2,
  AlertTriangle,
} from 'lucide-react'
import { Tables } from '@/lib/database.types'
import {
  updateInquiryStatus,
  updateInquiryNotes,
  deleteInquiry,
} from './actions'

type Inquiry = Tables<'inquiries'>

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

interface InquiriesClientProps {
  initialInquiries: Inquiry[]
}

export function InquiriesClient({ initialInquiries }: InquiriesClientProps) {
  const [inquiries] = useState<Inquiry[]>(initialInquiries)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [notes, setNotes] = useState('')
  const [savingNotes, setSavingNotes] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const filtered = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchSearch =
        !search ||
        [inq.name, inq.email, inq.phone, inq.service, inq.message]
          .filter(Boolean)
          .some((field) =>
            field!.toLowerCase().includes(search.toLowerCase())
          )
      const matchStatus =
        statusFilter === 'all' || inq.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [inquiries, search, statusFilter])

  const handleExportCSV = () => {
    const headers = ['Datum', 'Jméno', 'E-mail', 'Telefon', 'Služba', 'Stav', 'Zdroj', 'Zpráva']
    const rows = filtered.map((inq) => [
      new Date(inq.created_at).toLocaleDateString('cs-CZ'),
      inq.name || '',
      inq.email || '',
      inq.phone || '',
      inq.service || '',
      STATUS_LABELS[inq.status] || inq.status,
      inq.source || '',
      (inq.message || '').replace(/[\n\r,]/g, ' '),
    ])

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n')

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `poptavky-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('CSV exportováno')
  }

  const handleOpenInquiry = (inq: Inquiry) => {
    setSelectedInquiry(inq)
    setNotes(inq.notes || '')
  }

  const handleStatusChange = async (id: string, status: string) => {
    setUpdatingStatus(true)
    try {
      await updateInquiryStatus(id, status)
      toast.success('Stav poptávky byl aktualizován')
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: status as Inquiry['status'] })
      }
    } catch (err) {
      toast.error('Nepodařilo se aktualizovat stav')
    } finally {
      setUpdatingStatus(false)
    }
  }

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return
    setSavingNotes(true)
    try {
      await updateInquiryNotes(selectedInquiry.id, notes)
      toast.success('Poznámky byly uloženy')
    } catch {
      toast.error('Nepodařilo se uložit poznámky')
    } finally {
      setSavingNotes(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeleting(true)
    try {
      await deleteInquiry(id)
      toast.success('Poptávka byla smazána')
      setDeleteConfirm(null)
      if (selectedInquiry?.id === id) setSelectedInquiry(null)
    } catch {
      toast.error('Nepodařilo se smazat poptávku')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Správa poptávek
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {inquiries.length} poptávek celkem
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150"
          style={{
            border: '1px solid var(--border)',
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--brand-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          <Download size={16} />
          Exportovat CSV
        </button>
      </div>

      {/* Filters */}
      <div
        className="rounded-xl p-4 flex flex-wrap gap-3"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        {/* Search */}
        <div className="flex-1 relative min-w-[200px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            placeholder="Hledat podle jména, e-mailu, služby..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          {['all', 'new', 'in_progress', 'resolved'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
              style={{
                background:
                  statusFilter === status
                    ? 'var(--brand-primary)'
                    : 'var(--bg-surface-2)',
                color: statusFilter === status ? 'white' : 'var(--text-secondary)',
                border: '1px solid transparent',
              }}
            >
              {status === 'all'
                ? 'Vše'
                : STATUS_LABELS[status]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: filtered.length > 0 ? '1px solid var(--border)' : 'none' }}
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 bg-white rounded-xl border border-dashed">
            <ClipboardList size={44} style={{ color: 'var(--text-muted)' }} />
            <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>
              Žádné poptávky nenalezeny
            </p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-sm"
                style={{ color: 'var(--brand-primary)' }}
              >
                Vymazat hledání
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto bg-white">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-base)' }}>
                  {['Datum', 'Klient', 'Služba', 'Plocha', 'Zdroj', 'Stav', 'Akce'].map((col) => (
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
                {filtered.map((inq, i) => {
                  const st = inq.status as string
                  const colors = STATUS_COLORS[st] || STATUS_COLORS['new']
                  return (
                    <tr
                      key={inq.id}
                      className="transition-colors duration-100"
                      style={{
                        borderBottom:
                          i < filtered.length - 1
                            ? '1px solid var(--border)'
                            : undefined,
                        cursor: 'pointer',
                      }}
                      onClick={() => handleOpenInquiry(inq)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--bg-base)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = ''
                      }}
                    >
                      <td className="px-5 py-4">
                        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          {new Date(inq.created_at).toLocaleDateString('cs-CZ')}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {inq.name || '—'}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {inq.email || inq.phone || ''}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {inq.service || '—'}
                      </td>
                      <td className="px-5 py-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {inq.message?.match(/Plocha:\s*(\d+)/)?.[1] || '—'} m²
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-medium px-2 py-1 rounded-md bg-slate-100 text-slate-600">
                           {inq.source === 'kalkulacka' ? 'Kalkulačka' : 
                            inq.source === 'chat' ? 'Nanobot' : 
                            inq.source || 'Web'}
                        </span>
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
                        <div
                          className="flex gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => handleOpenInquiry(inq)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                            style={{
                              background: 'var(--brand-primary)',
                              color: 'white',
                            }}
                          >
                            Detail
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(inq.id)}
                            className="p-1.5 rounded-lg transition-all duration-150"
                            style={{ color: '#ef4444' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#fef2f2'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = ''
                            }}
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

          {/* Mobile Card View */}
          <div className="md:hidden flex flex-col gap-3">
            {filtered.map((inq) => {
              const st = inq.status as string
              const colors = STATUS_COLORS[st] || STATUS_COLORS['new']
              return (
                <div 
                  key={inq.id}
                  onClick={() => handleOpenInquiry(inq)}
                  className="p-4 rounded-xl space-y-3 bg-white shadow-sm border border-slate-100"
                  style={{ borderLeft: `4px solid ${colors.text}` }}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      {new Date(inq.created_at).toLocaleDateString('cs-CZ')}
                    </span>
                    <span
                      className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider"
                      style={{ background: colors.bg, color: colors.text }}
                    >
                      {STATUS_LABELS[st] || st}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{inq.name || 'Bez jména'}</h3>
                    <p className="text-xs text-slate-500">{inq.service || 'Obecná poptávka'}</p>
                  </div>
                  <div className="pt-2 flex justify-between items-center border-t border-slate-50">
                    <div className="flex gap-2">
                       {inq.phone && <Phone size={14} className="text-slate-400" />}
                       {inq.email && <Mail size={14} className="text-slate-400" />}
                    </div>
                    <ChevronRight size={16} className="text-slate-300" />
                  </div>
                </div>
              )
            })}
          </div>
          </>
        )}
      </div>

      {/* Detail Modal */}
      {selectedInquiry && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSelectedInquiry(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl overflow-hidden animate-fade-in"
            style={{
              background: 'var(--bg-surface)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="flex items-start justify-between px-6 py-5"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <div>
                <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {selectedInquiry.name || 'Poptávka'}
                </h2>
                <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {new Date(selectedInquiry.created_at).toLocaleString('cs-CZ')} • {selectedInquiry.source || 'form'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Status Selector */}
                <div className="relative">
                  <select
                    value={selectedInquiry.status || 'new'}
                    onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                    disabled={updatingStatus}
                    className="pl-3 pr-8 py-2 rounded-lg text-sm font-semibold appearance-none cursor-pointer outline-none"
                    style={{
                      border: '1px solid var(--border)',
                      background: 'var(--bg-base)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <option value="new">Nová</option>
                    <option value="in_progress">V řešení</option>
                    <option value="resolved">Vyřešeno</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: 'var(--text-muted)' }}
                  />
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '')}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Contact Info */}
              <div
                className="rounded-xl p-4 grid grid-cols-2 gap-4"
                style={{ background: 'var(--bg-base)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-2">
                  <Mail size={16} style={{ color: 'var(--text-muted)' }} />
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>E-mail</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {selectedInquiry.email || '—'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} style={{ color: 'var(--text-muted)' }} />
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Telefon</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {selectedInquiry.phone || '—'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Filter size={16} style={{ color: 'var(--text-muted)' }} />
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Služba</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {selectedInquiry.service || '—'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ClipboardList size={16} style={{ color: 'var(--text-muted)' }} />
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Zdroj</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {selectedInquiry.source || 'form'}
                    </p>
                  </div>
                </div>
                {selectedInquiry.address && (
                  <div className="col-span-2 flex items-start gap-2 pt-2 border-t mt-1">
                    <Home size={16} style={{ color: 'var(--text-muted)' }} className="mt-1" />
                    <div>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Adresa a doprava</p>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {selectedInquiry.address}
                      </p>
                      <div className="flex gap-3 mt-1">
                         <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                           {selectedInquiry.distance_km || 0} km
                         </span>
                         <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                           cca {selectedInquiry.travel_cost_czk || 0} Kč
                         </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Message */}
              {selectedInquiry.message && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                    Zpráva
                  </p>
                  <div
                    className="rounded-xl p-4 text-sm leading-relaxed"
                    style={{
                      background: 'var(--bg-base)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {selectedInquiry.message}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                  Interní poznámky
                </p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Přidejte interní poznámku k poptávce..."
                  rows={4}
                  className="w-full rounded-xl p-4 text-sm outline-none resize-none"
                  style={{
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    background: 'var(--bg-base)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--brand-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleSaveNotes}
                    disabled={savingNotes}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 disabled:opacity-60"
                    style={{ background: 'var(--brand-primary)', color: 'white' }}
                  >
                    {savingNotes ? 'Ukládám...' : 'Uložit poznámky'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-6 animate-fade-in"
            style={{
              background: 'var(--bg-surface)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="rounded-full flex items-center justify-center"
                style={{ width: 44, height: 44, background: '#fef2f2' }}
              >
                <AlertTriangle size={22} style={{ color: '#ef4444' }} />
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                  Smazat poptávku?
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Tato akce je nevratná
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              >
                Zrušit
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
                style={{ background: '#ef4444' }}
              >
                {deleting ? 'Mažu...' : 'Smazat'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
