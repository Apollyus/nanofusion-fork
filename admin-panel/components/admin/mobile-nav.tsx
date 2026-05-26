'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  ClipboardList, 
  Wrench, 
  HardHat, 
  Users 
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const pathname = usePathname()
  
  const items = [
    { label: 'Domů', href: '/admin', icon: <LayoutDashboard size={20} /> },
    { label: 'Poptávky', href: '/admin/inquiries', icon: <ClipboardList size={20} /> },
    { label: 'Služby', href: '/admin/services', icon: <Wrench size={20} /> },
    { label: 'Realizace', href: '/admin/realizations', icon: <HardHat size={20} /> },
    { label: 'Přístup', href: '/admin/users', icon: <Users size={20} /> },
  ]

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-3 border-t bg-white/80 backdrop-blur-lg pb-[env(safe-area-inset-bottom)]"
      style={{ borderTopColor: 'var(--border)' }}
    >
      {items.map((item) => {
        const active = isActive(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-200 py-1 flex-1",
              active ? "text-amber-500 scale-110" : "text-slate-400"
            )}
            id={`mobile-nav-${item.label.toLowerCase()}`}
          >
            {item.icon}
            <span className={cn(
              "text-[9px] font-bold uppercase tracking-tighter",
              active ? "opacity-100" : "opacity-70"
            )}>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
