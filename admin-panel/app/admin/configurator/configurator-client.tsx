'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import {
  Save,
  MessageSquare,
  Calculator,
  ClipboardList,
  ChevronDown,
  X,
} from 'lucide-react'
import { Tables } from '@/lib/database.types'
import { savePrices } from './actions'

type Price = Tables<'configurator_prices'>
type ChatSession = Tables<'chat_sessions'>
type Inquiry = Tables<'inquiries'>

type Tab = 'prices' | 'chats' | 'inquiries'

const TAB_ITEMS = [
  { id: 'prices' as Tab, label: 'Ceny', icon: <Calculator size={16} /> },
  { id: 'chats' as Tab, label: 'Chaty (Nanobot)', icon: <MessageSquare size={16} /> },
  { id: 'inquiries' as Tab, label: 'Poptávky z kalkulačky', icon: <ClipboardList size={16} /> },
]

const STATUS_LABELS: Record<string, string> = {
  new: 'Nová',
  in_progress: 'V řešení',
  resolved: 'Vyřešeno',
}

interface ConfiguratorClientProps {
  initialPrices: Price[]
  initialChatSessions: ChatSession[]
  initialInquiries: Inquiry[]
}

export function ConfiguratorClient({
  initialPrices,
  initialChatSessions,
  initialInquiries,
}: ConfiguratorClientProps) {
  const [tab, setTab] = useState<Tab>('prices')
  const [prices, setPrices] = useState<Price[]>(initialPrices)
  const [dirtyPrices, setDirtyPrices] = useState<Set<string>>(new Set())
  const [saving, setSaving] = useState(false)
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null)

  const handlePriceChange = (id: string, value: string) => {
    const num = parseFloat(value)
    if (isNaN(num) && value !== '') return
    setPrices((prev) =>
      prev.map((p) => (p.id === id ? { ...p, price: isNaN(num) ? null : num } : p))
    )
    setDirtyPrices((prev) => new Set(prev).add(id))
  }

  const handleSaveAll = async () => {
    const toSave = prices
      .filter((p) => dirtyPrices.has(p.id))
      .map((p) => ({ id: p.id, price: p.price ?? 0 }))

    if (toSave.length === 0) {
      toast.info('Žádné změny k uložení')
      return
    }

    setSaving(true)
    try {
      await savePrices(toSave)
      setDirtyPrices(new Set())
      toast.success(`${toSave.length} cen uloženo`)
    } catch {
      toast.error('Nepodařilo se uložit ceny')
    } finally {
      setSaving(false)
    }
  }

  const getChatLastMessage = (session: ChatSession): string => {
    const messages = Array.isArray(session.messages) ? session.messages : []
    const last = messages[messages.length - 1] as { role?: string; content?: string } | undefined
    return last?.content?.slice(0, 80) || 'Žádné zprávy'
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Konfigurátor & Kalkulačka
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Správa cen, chatů a poptávek z kalkulačky
          </p>
        </div>
        {tab === 'prices' && dirtyPrices.size > 0 && (
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white disabled:opacity-60 transition-all duration-150"
            style={{ background: 'var(--brand-primary)', boxShadow: '0 4px 12px rgba(245,158,11,0.35)' }}
          >
            <Save size={16} />
            {saving ? 'Ukládám...' : `Uložit ceník (${dirtyPrices.size})`}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 p-1 rounded-xl w-fit"
        style={{ background: 'var(--bg-surface-2)' }}
      >
        {TAB_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150"
            style={{
              background: tab === item.id ? 'var(--bg-surface)' : 'transparent',
              color: tab === item.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: tab === item.id ? 'var(--shadow-sm)' : undefined,
            }}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      {/* ==================== PRICES TAB ==================== */}
      {tab === 'prices' && (
        <div className="space-y-4">
          <div
            className="rounded-xl p-4"
            style={{ background: '#fffbeb', border: '1px solid #fde68a' }}
          >
            <p className="text-sm" style={{ color: '#92400e' }}>
              💡 Změna těchto hodnot ovlivní výpočty Nanobota a konfigurátoru na webu.
            </p>
          </div>
          <div
            className="rounded-xl overflow-hidden"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--bg-base)', borderBottom: '1px solid var(--border)' }}>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    Položka
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)', width: 200 }}>
                    Základ (Kč/m²)
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)', width: 120 }}>
                    Jednotka
                  </th>
                </tr>
              </thead>
              <tbody>
                {prices.map((price, i) => (
                  <tr
                    key={price.id}
                    style={{
                      borderBottom: i < prices.length - 1 ? '1px solid var(--border)' : undefined,
                      background: dirtyPrices.has(price.id) ? '#fffbeb' : undefined,
                    }}
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                        {price.label || price.item_key}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {price.item_key}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        <input
                          type="number"
                          value={price.price ?? ''}
                          onChange={(e) => handlePriceChange(price.id, e.target.value)}
                          className="text-right px-3 py-2 rounded-lg text-sm font-semibold outline-none w-28"
                          style={{
                            border: dirtyPrices.has(price.id)
                              ? '2px solid var(--brand-primary)'
                              : '1px solid var(--border)',
                            color: '#ef4444',
                            fontWeight: 700,
                            background: 'white',
                          }}
                          min={0}
                          step={1}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm" style={{ color: 'var(--text-muted)' }}>
                      {price.unit || 'Kč/m²'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Floating save button */}
          {dirtyPrices.size > 0 && (
            <div className="flex justify-end">
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {dirtyPrices.size} položek upraveno — nezapomeňte uložit
              </p>
            </div>
          )}
        </div>
      )}

      {/* ==================== CHATS TAB ==================== */}
      {tab === 'chats' && (
        <div className="space-y-3">
          {initialChatSessions.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20 rounded-xl gap-3"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            >
              <MessageSquare size={44} style={{ color: 'var(--text-muted)' }} />
              <p style={{ color: 'var(--text-muted)' }}>Žádné chat relace</p>
            </div>
          ) : (
            initialChatSessions.map((session) => (
              <div
                key={session.id}
                className="rounded-xl p-5 cursor-pointer transition-all duration-150 flex items-start gap-4"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
                onClick={() => setSelectedChat(session)}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--brand-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div
                  className="rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ width: 40, height: 40, background: session.status === 'open' ? '#eff6ff' : '#f1f5f9' }}
                >
                  <MessageSquare size={18} style={{ color: session.status === 'open' ? '#2563eb' : '#94a3b8' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                      {session.user_identifier || 'Anonymní uživatel'}
                    </p>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: session.status === 'open' ? '#eff6ff' : '#f1f5f9',
                        color: session.status === 'open' ? '#2563eb' : '#94a3b8',
                      }}
                    >
                      {session.status === 'open' ? 'Otevřený' : 'Uzavřený'}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-muted)' }}>
                    {getChatLastMessage(session)}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    {new Date(session.last_activity).toLocaleString('cs-CZ')} ·{' '}
                    {Array.isArray(session.messages) ? session.messages.length : 0} zpráv
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ==================== INQUIRIES TAB ==================== */}
      {tab === 'inquiries' && (
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          {initialInquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <ClipboardList size={44} style={{ color: 'var(--text-muted)' }} />
              <p style={{ color: 'var(--text-muted)' }}>Žádné poptávky z kalkulačky</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-base)' }}>
                  {['Datum', 'Klient', 'Služba', 'Stav'].map((col) => (
                    <th key={col} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {initialInquiries.map((inq, i) => (
                  <tr
                    key={inq.id}
                    style={{ borderBottom: i < initialInquiries.length - 1 ? '1px solid var(--border)' : undefined }}
                  >
                    <td className="px-5 py-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                      {new Date(inq.created_at).toLocaleDateString('cs-CZ')}
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{inq.name || '—'}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{inq.email || inq.phone || ''}</p>
                    </td>
                    <td className="px-5 py-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{inq.service || '—'}</td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: '#eff6ff', color: '#2563eb' }}>
                        {STATUS_LABELS[inq.status] || inq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Chat Detail Modal */}
      {selectedChat && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        >
          <div
            className="w-full max-w-2xl rounded-2xl overflow-hidden animate-fade-in"
            style={{
              background: 'var(--bg-surface)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <div>
                <h2 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                  Chat: {selectedChat.user_identifier || 'Anonymní'}
                </h2>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {new Date(selectedChat.started_at).toLocaleString('cs-CZ')}
                </p>
              </div>
              <button onClick={() => setSelectedChat(null)} className="p-2 rounded-lg" style={{ color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {Array.isArray(selectedChat.messages) && selectedChat.messages.length > 0 ? (
                (selectedChat.messages as { role: string; content: string }[]).map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className="max-w-xs px-4 py-2.5 rounded-2xl text-sm"
                      style={{
                        background: msg.role === 'user' ? 'var(--brand-primary)' : 'var(--bg-surface-2)',
                        color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center" style={{ color: 'var(--text-muted)' }}>Žádné zprávy</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
