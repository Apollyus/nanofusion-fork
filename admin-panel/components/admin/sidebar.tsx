'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import NextImage from 'next/image'
import {
  LayoutDashboard,
  Image as ImageIcon,
  Wrench,
  HardHat,
  Star,
  Brain,
  Newspaper,
  GalleryHorizontal,
  HelpCircle,
  Calculator,
  MessageSquare,
  ClipboardList,
  Users,
  UserCircle,
  ChevronRight,
  LogOut,
  Menu,
  X,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useState, useEffect } from 'react'

export interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: number
  section?: string
}

const navSections = [
  {
    title: 'Přehled',
    items: [
      {
        label: 'Dashboard',
        href: '/admin',
        icon: <LayoutDashboard size={18} />,
      },
    ],
  },
  {
    title: 'Obsah webu',
    items: [
      {
        label: 'Hero sekce',
        href: '/admin/hero',
        icon: <ImageIcon size={18} />,
      },
      {
        label: 'Naše služby',
        href: '/admin/services',
        icon: <Wrench size={18} />,
      },
      {
        label: 'Realizace',
        href: '/admin/realizations',
        icon: <HardHat size={18} />,
      },
      {
        label: 'Galerie',
        href: '/admin/gallery',
        icon: <GalleryHorizontal size={18} />,
      },
      {
        label: 'Nano-magazín',
        href: '/admin/magazine',
        icon: <Newspaper size={18} />,
      },
      {
        label: 'Časté dotazy',
        href: '/admin/faqs',
        icon: <HelpCircle size={18} />,
      },
      {
        label: 'Jak to funguje',
        href: '/admin/how-it-works',
        icon: <Brain size={18} />,
      },
      {
        label: 'O nás',
        href: '/admin/about-us',
        icon: <Users size={18} />,
      },
      {
        label: 'AI Analýzátor',
        href: '/admin/analyzer',
        icon: <Sparkles size={18} />,
      },
    ],
  },
  {
    title: 'Obchod',
    items: [
      {
        label: 'Poptávky',
        href: '/admin/inquiries',
        icon: <ClipboardList size={18} />,
      },
      {
        label: 'Recenze (Firmy.cz)',
        href: '/admin/reviews',
        icon: <Star size={18} />,
      },
      {
        label: 'Konfigurátor & Ceny',
        href: '/admin/configurator',
        icon: <Calculator size={18} />,
      },
      {
        label: 'Chaty (Nanobot)',
        href: '/admin/chats',
        icon: <MessageSquare size={18} />,
      },
      {
        label: 'Trénink Nanobota',
        href: '/admin/bot-training',
        icon: <Brain size={18} />,
      },
      {
        label: 'AI analyzátor',
        href: '/admin/ai-analyzer',
        icon: <Brain size={18} />,
      },
    ],
  },
  {
    title: 'Systém',
    items: [
      {
        label: 'Správa přístupu',
        href: '/admin/users',
        icon: <Users size={18} />,
      },
      {
        label: 'Můj účet',
        href: '/admin/account',
        icon: <UserCircle size={18} />,
      },
    ],
  },
]

interface SidebarProps {
  pendingReviews?: number
  newAnalyses?: number
  userEmail?: string
  userRole?: string
}

export function Sidebar({ pendingReviews = 0, newAnalyses = 0, userEmail, userRole }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const handleLogout = async () => {
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Odhlášení proběhlo úspěšně')
    router.push('/admin/login')
    router.refresh()
  }

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0f172a] flex items-center justify-between px-4 z-[90] border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white p-1 shadow-sm">
            <NextImage
              src="/logo.png"
              alt="NANOfusion Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-white font-bold text-sm">NANOfusion Admin</span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[95]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full flex flex-col z-[100] transition-transform duration-300 lg:translate-x-0 w-64 bg-[#0f172a]",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          borderRight: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* Logo & Close Button (Mobile) */}
        <div
          className="flex items-center justify-between px-6 py-6"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white p-1 shadow-sm">
              <NextImage
                src="/logo.png"
                alt="NANOfusion Logo"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">NANOfusion</p>
              <p style={{ color: 'rgba(148,163,184,0.5)', fontSize: 10 }}>Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-0">
          {navSections.map((section) => (
            <div key={section.title} className="mb-8">
              <p
                className="px-6 mb-3 font-bold uppercase tracking-[0.1em]"
                style={{ fontSize: 9, color: 'rgba(148,163,184,0.4)' }}
              >
                {section.title}
              </p>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const active = isActive(item.href)
                  const showBadge = 
                    (item.href === '/admin/reviews' && pendingReviews > 0) ||
                    (item.href === '/admin/ai-analyzer' && newAnalyses > 0)
                  const badgeCount = item.href === '/admin/reviews' ? pendingReviews : newAnalyses

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-150 relative',
                          active
                            ? 'text-white'
                            : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
                        )}
                        style={{
                          background: active
                            ? 'rgba(245, 158, 11, 0.1)'
                            : undefined,
                        }}
                      >
                        {active && (
                          <div
                            className="absolute right-0 top-0 bottom-0 w-[3px]"
                            style={{ background: 'var(--brand-primary)' }}
                          />
                        )}
                        <span
                          style={{
                            color: active
                              ? 'var(--brand-primary)'
                              : 'inherit',
                          }}
                          className="flex-shrink-0"
                        >
                          {item.icon}
                        </span>
                        <span className="flex-1 truncate">{item.label}</span>
                        {showBadge && (
                          <span
                            className="rounded-full text-white font-bold px-1.5 py-0.5 min-w-[18px] text-center"
                            style={{ background: 'var(--brand-primary)', fontSize: 9 }}
                          >
                            {badgeCount}
                          </span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* User Section */}
        <div
          className="p-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
              style={{
                width: 32,
                height: 32,
                background: 'rgba(245, 158, 11, 0.15)',
                color: 'var(--brand-primary)',
              }}
            >
              {userEmail?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate leading-none mb-1">
                {userEmail || 'Admin'}
              </p>
              <p style={{ color: 'rgba(148,163,184,0.5)', fontSize: 10 }}>
                {userRole === 'admin' ? 'Administrátor' : 'Editor'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full py-2 text-xs font-medium transition-colors duration-150 text-red-500 hover:text-red-400"
          >
            <LogOut size={14} />
            <span>Odhlásit se</span>
          </button>
        </div>
      </aside>
    </>
  )
}
