'use server'

import { createAdminClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Eye, EyeOff } from 'lucide-react'

export default async function MagazinePage() {
  const supabase = await createAdminClient()
  const { data: articles } = await (supabase.from('articles') as any)
    .select('id, title, slug, is_published, published_at, created_at')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Nano-magazín</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {(articles as any[])?.length ?? 0} článků · {(articles as any[])?.filter((a) => a.is_published).length ?? 0} publikováno
          </p>
        </div>
        <Link
          href="/admin/magazine/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'var(--brand-primary)' }}
        >
          <Plus size={16} />
          Nový článek
        </Link>
      </div>

      <div className="rounded-xl" style={{ border: articles && (articles as any[]).length > 0 ? '1px solid var(--border)' : 'none', overflow: 'hidden' }}>
        {!articles || (articles as any[]).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 bg-white rounded-xl">
            <p style={{ color: 'var(--text-muted)' }}>Žádné články zatím</p>
            <Link href="/admin/magazine/new" className="text-sm font-semibold" style={{ color: 'var(--brand-primary)' }}>
              Napsat první článek →
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-white overflow-hidden">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-base)' }}>
                    {['Název', 'Stav', 'Datum', 'Akce'].map((col) => (
                      <th key={col} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(articles as any[]).map((article, i) => (
                    <tr key={article.id} style={{ borderBottom: i < (articles as any[]).length - 1 ? '1px solid var(--border)' : undefined }}>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{article.title}</p>
                        <p className="text-[10px] opacity-50 font-mono">/{article.slug}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{
                          background: article.is_published ? '#f0fdf4' : '#f1f5f9',
                          color: article.is_published ? '#16a34a' : '#94a3b8',
                        }}>
                          {article.is_published ? 'Publikováno' : 'Koncept'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                        {new Date(article.created_at).toLocaleDateString('cs-CZ')}
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/magazine/${article.id}`}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                          style={{ background: 'var(--bg-surface-2)', color: 'var(--text-primary)' }}
                        >
                          Upravit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col gap-3">
              {(articles as any[]).map((article) => (
                <Link 
                  key={article.id} 
                  href={`/admin/magazine/${article.id}`}
                  className="p-4 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {new Date(article.created_at).toLocaleDateString('cs-CZ')}
                    </span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase" style={{
                      background: article.is_published ? '#f0fdf4' : '#16a34a',
                      color: article.is_published ? '#16a34a' : 'white',
                    }}>
                      {article.is_published ? 'Publikováno' : 'Koncept'}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 leading-tight">{article.title}</h3>
                  <div className="flex items-center justify-between mt-1 pt-2 border-t border-slate-50">
                    <span className="text-[10px] font-mono text-slate-400">/{article.slug}</span>
                    <span className="text-xs font-bold text-amber-600">Upravit →</span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
