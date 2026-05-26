'use client'

import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

const routeLabels: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/hero': 'Hero sekce',
  '/admin/services': 'Naše služby',
  '/admin/realizations': 'Realizace',
  '/admin/reviews': 'Recenze (Firmy.cz)',
  '/admin/magazine': 'Nano-magazín',
  '/admin/gallery': 'Galerie',
  '/admin/faqs': 'Časté dotazy',
  '/admin/configurator': 'Konfigurátor & Ceny',
  '/admin/chats': 'Chaty (Nanobot)',
  '/admin/inquiries': 'Poptávky',
  '/admin/users': 'Správa přístupu',
  '/admin/account': 'Můj účet',
}

export function AdminHeader() {
  const pathname = usePathname()

  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: { label: string; href: string }[] = []

  let currentPath = ''
  for (const segment of segments) {
    currentPath += `/${segment}`
    const label = routeLabels[currentPath]
    if (label) {
      breadcrumbs.push({ label, href: currentPath })
    } else {
      // Capitalize fallback
      breadcrumbs.push({
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        href: currentPath,
      })
    }
  }

  const currentPageLabel =
    routeLabels[pathname] ||
    (pathname.split('/').pop() || 'Dashboard')

  return (
    <header
      className="fixed top-0 right-0 flex items-center px-4 md:px-8 bg-white z-40"
      style={{
        left: '0',
        height: '64px',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      <div className="md:ml-[256px] flex items-center justify-between w-full">
        <div className="flex items-center gap-1.5 text-xs md:text-sm overflow-hidden">
          <div className="md:hidden flex items-center gap-2 mr-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center shrink-0">
              <span className="text-white font-black text-[10px]">NF</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Home size={14} className="hidden md:block" style={{ color: 'var(--text-muted)' }} />
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1.5 shrink-0">
                <ChevronRight size={12} style={{ color: 'var(--text-muted)' }} />
                <span
                  style={{
                    color:
                      i === breadcrumbs.length - 1
                        ? 'var(--text-primary)'
                        : 'var(--text-muted)',
                    fontWeight: i === breadcrumbs.length - 1 ? 600 : 400,
                  }}
                >
                  {crumb.label}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
