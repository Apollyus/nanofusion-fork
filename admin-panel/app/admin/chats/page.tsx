import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { MessageSquare, Search } from 'lucide-react'

export default async function ChatsPage() {
  const supabase = await createClient()
  const { data: rawSessions } = await supabase
    .from('chat_sessions')
    .select('*')
    .order('last_activity', { ascending: false })

  const sessions = (rawSessions as any[]) || []
  const openCount = sessions.filter((s) => s.status === 'open').length ?? 0

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Chaty (Nanobot)</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {sessions?.length ?? 0} relací · <span style={{ color: '#2563eb' }}>{openCount} otevřených</span>
          </p>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        {!sessions || sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <MessageSquare size={44} style={{ color: 'var(--text-muted)' }} />
            <p style={{ color: 'var(--text-muted)' }}>Žádné chat relace</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-base)' }}>
                {['Uživatel', 'Začátek', 'Poslední aktivita', 'Zprávy', 'Stav'].map((col) => (
                  <th key={col} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, i) => {
                const msgCount = Array.isArray(session.messages) ? session.messages.length : 0
                return (
                  <tr key={session.id} style={{ borderBottom: i < sessions.length - 1 ? '1px solid var(--border)' : undefined }}>
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {session.user_identifier || 'Anonymní'}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                      {new Date(session.started_at).toLocaleString('cs-CZ')}
                    </td>
                    <td className="px-5 py-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                      {new Date(session.last_activity).toLocaleString('cs-CZ')}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{msgCount}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{
                        background: session.status === 'open' ? '#eff6ff' : '#f1f5f9',
                        color: session.status === 'open' ? '#2563eb' : '#94a3b8',
                      }}>
                        {session.status === 'open' ? 'Otevřený' : 'Uzavřený'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
