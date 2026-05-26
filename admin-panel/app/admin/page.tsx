import { createAdminClient } from '@/lib/supabase/server'
import {
  ClipboardList,
  Star,
  HardHat,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import Link from 'next/link'

function StatCard({
  label,
  value,
  icon,
  color,
  href,
}: {
  label: string
  value: number | string
  icon: React.ReactNode
  color: string
  href?: string
}) {
  const card = (
    <div
      className="rounded-xl p-5 flex items-center gap-4 transition-all duration-150 group hover:shadow-md cursor-pointer"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div
        className="rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ width: 48, height: 48, background: color + '20' }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <div>
        <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          {value}
        </p>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </p>
      </div>
    </div>
  )

  return href ? (
    <Link href={href} className="block no-underline">
      {card}
    </Link>
  ) : (
    card
  )
}

export default async function AdminDashboard() {
  const supabase = await createAdminClient()

  // Use (supabase as any) or (supabase.from(...) as any) to bypass strict TypeScript checks
  const [
    inquiriesResult,
    newInquiriesResult,
    pendingReviewsResult,
    totalRealizationsResult,
    recentInquiriesResult,
  ] = await Promise.all([
    (supabase.from('inquiries') as any).select('*', { count: 'exact', head: true }),
    (supabase.from('inquiries') as any)
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new'),
    (supabase.from('external_reviews') as any)
      .select('*', { count: 'exact', head: true })
      .eq('approved', false),
    (supabase.from('realizations') as any).select('*', { count: 'exact', head: true }),
    (supabase.from('inquiries') as any)
      .select('id, name, email, service, status, created_at, source')
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  const totalInquiries = inquiriesResult.count ?? 0
  const newInquiries = newInquiriesResult.count ?? 0
  const pendingReviews = pendingReviewsResult.count ?? 0
  const totalRealizations = totalRealizationsResult.count ?? 0
  const openChats = 0 // Placeholder until chats are implemented
  const recentInquiries = recentInquiriesResult.data ?? []

  const statusLabel: Record<string, string> = {
    new: 'Nová',
    in_progress: 'V řešení',
    resolved: 'Vyřešeno',
  }

  const statusColor: Record<string, { bg: string; text: string }> = {
    new: { bg: '#eff6ff', text: '#2563eb' },
    in_progress: { bg: '#fffbeb', text: '#d97706' },
    resolved: { bg: '#f0fdf4', text: '#16a34a' },
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Přehled klíčových metrik NANOfusion
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <StatCard
          label="Celkem poptávek"
          value={totalInquiries ?? 0}
          icon={<ClipboardList size={22} />}
          color="#3b82f6"
          href="/admin/inquiries"
        />
        <StatCard
          label="Nové poptávky"
          value={newInquiries ?? 0}
          icon={<AlertCircle size={22} />}
          color="#f59e0b"
          href="/admin/inquiries"
        />
        <StatCard
          label="Čekající recenze"
          value={pendingReviews ?? 0}
          icon={<Star size={22} />}
          color="#a855f7"
          href="/admin/reviews"
        />
        <StatCard
          label="Realizace"
          value={totalRealizations ?? 0}
          icon={<HardHat size={22} />}
          color="#22c55e"
          href="/admin/realizations"
        />
        <StatCard
          label="Aktivní chaty"
          value={openChats ?? 0}
          icon={<MessageSquare size={22} />}
          color="#06b6d4"
          href="/admin/chats"
        />
      </div>

      {/* Recent Inquiries */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
            Poslední poptávky
          </h2>
          <Link
            href="/admin/inquiries"
            className="text-sm font-medium transition-colors"
            style={{ color: 'var(--brand-primary)' }}
          >
            Zobrazit vše →
          </Link>
        </div>

        {!recentInquiries || recentInquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <ClipboardList size={40} style={{ color: 'var(--text-muted)' }} />
            <p style={{ color: 'var(--text-muted)' }}>Zatím žádné poptávky</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Datum', 'Klient', 'Služba', 'Zdroj', 'Stav'].map((col) => (
                    <th
                      key={col}
                      className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(recentInquiries as any[]).map((inq, i) => {
                  const st = inq.status as string
                  const colors = statusColor[st] || statusColor['new']
                  return (
                    <tr
                      key={inq.id}
                      style={{
                        borderBottom:
                          i < recentInquiries.length - 1
                            ? '1px solid var(--border)'
                            : undefined,
                      }}
                    >
                      <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                        {new Date(inq.created_at).toLocaleDateString('cs-CZ')}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {inq.name || '—'}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {inq.email || ''}
                        </p>
                      </td>
                      <td
                        className="px-6 py-4 text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {inq.service || '—'}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="text-xs font-medium px-2 py-1 rounded-full"
                          style={{ background: '#f1f5f9', color: 'var(--text-secondary)' }}
                        >
                          {inq.source || 'form'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ background: colors.bg, color: colors.text }}
                        >
                          {statusLabel[st] || st}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
        {[
          { label: 'Nová realizace', href: '/admin/realizations', icon: <HardHat size={18} /> },
          { label: 'Přidat FAQ', href: '/admin/faqs', icon: <TrendingUp size={18} /> },
          { label: 'Nový článek', href: '/admin/magazine', icon: <Clock size={18} /> },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-sm transition-all duration-150 hover:border-brand-primary"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
            }}
          >
            <span style={{ color: 'var(--brand-primary)' }}>{action.icon}</span>
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
