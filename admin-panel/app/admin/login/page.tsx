'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Eye, EyeOff, LogIn, ShieldCheck } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/admin'
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Vyplňte e-mail a heslo')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Nesprávný e-mail nebo heslo')
        } else if (error.message.includes('Email not confirmed')) {
          toast.error('E-mail nebyl potvrzen. Zkontrolujte svou schránku.')
        } else {
          toast.error(`Chyba přihlášení: ${error.message}`)
        }
        return
      }

      if (data.session) {
        toast.success('Přihlášení proběhlo úspěšně')
        router.push(redirectTo)
        router.refresh()
      }
    } catch {
      toast.error('Nastala neočekávaná chyba. Zkuste to znovu.')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordReset = async () => {
    if (!email) {
      toast.error('Zadejte nejprve svůj e-mail')
      return
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/auth/callback?next=/admin/account`,
    })
    if (error) {
      toast.error('Nepodařilo se odeslat reset e-mail')
    } else {
      toast.success('E-mail pro reset hesla byl odeslán')
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute rounded-full blur-3xl opacity-10"
          style={{
            width: 600,
            height: 600,
            background: 'var(--brand-primary)',
            top: '-200px',
            right: '-200px',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-5"
          style={{
            width: 400,
            height: 400,
            background: '#3b82f6',
            bottom: '-100px',
            left: '-100px',
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'var(--bg-surface)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
          }}
        >
          {/* Header */}
          <div
            className="px-8 pt-10 pb-8 text-center"
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            <div
              className="mx-auto mb-5 flex items-center justify-center rounded-2xl"
              style={{
                width: 64,
                height: 64,
                background: 'var(--brand-primary)',
                boxShadow: '0 8px 24px rgba(245, 158, 11, 0.35)',
              }}
            >
              <ShieldCheck size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
              Vstoupit do správy
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Přihlaste se do administrace NANOfusion
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-8 space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoCapitalize="none"
                inputMode="email"
                required
                className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-150 outline-none"
                style={{
                  border: '2px solid var(--border)',
                  background: 'var(--bg-base)',
                  color: 'var(--text-primary)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--brand-primary)'
                  e.target.style.background = 'white'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border)'
                  e.target.style.background = 'var(--bg-base)'
                }}
                placeholder="Váš e-mail"
              />
              <p className="mt-1.5 text-[10px] text-slate-400 font-medium pl-1">
                Použijte svůj administrátorský e-mail.
              </p>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Heslo
                </label>
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  className="text-xs font-semibold transition-colors"
                  style={{ color: 'var(--brand-primary)' }}
                >
                  Zapomenuto?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-150 outline-none pr-12"
                  style={{
                    border: '2px solid var(--border)',
                    background: 'var(--bg-base)',
                    color: 'var(--text-primary)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--brand-primary)'
                    e.target.style.background = 'white'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border)'
                    e.target.style.background = 'var(--bg-base)'
                  }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded"
              />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Zapamatovat si mě (30 dní)
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: loading ? '#d97706' : 'var(--brand-primary)',
                color: 'white',
                boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)',
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.background = 'var(--brand-primary-dark)'
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.background = 'var(--brand-primary)'
              }}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Přihlašování...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Vstoupit do administrace
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div
            className="px-8 pb-8 text-center"
          >
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              © 2025 NANOfusion International s.r.o.
              <br />
              Pouze pro oprávněné zaměstnance
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
        Načítání...
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
