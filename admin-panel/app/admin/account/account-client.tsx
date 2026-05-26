'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { 
  User, 
  Mail, 
  Lock, 
  Fingerprint, 
  Save, 
  Camera,
  ShieldCheck,
  Smartphone,
  Check
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function AccountClient({ user, profile: initialProfile }: { user: any, profile: any }) {
  const [profile, setProfile] = useState(initialProfile)
  const [loading, setLoading] = useState(false)
  const [passkeys, setPasskeys] = useState<any[]>([]) // Mock for now
  const supabase = createClient()

  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from('profiles')
        // @ts-ignore
        .update({ 
          full_name: profile.full_name,
          updated_at: new Date().toISOString() 
        })
        .eq('id', user.id)
      
      if (error) throw error
      toast.success('Profil uložen')
    } catch (err: any) {
      toast.error('Chyba: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddPasskey = () => {
    toast.info('Biometrické ověření (WebAuthn) je ve vývoji. Vyžaduje bezpečnou doménu.')
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>Můj účet</h1>
        <p className="text-slate-500">Nastavení vašeho administrátorského přístupu</p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          {/* Profile Card */}
          <div className="p-8 rounded-3xl space-y-8" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div 
                  className="w-24 h-24 rounded-3xl flex items-center justify-center font-black text-3xl shadow-xl border-4 border-white"
                  style={{ background: 'var(--brand-primary)', color: 'white' }}
                >
                  {profile.full_name?.charAt(0) || user.email?.charAt(0)}
                </div>
                <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border hover:scale-110 transition-transform">
                  <Camera size={16} />
                </button>
              </div>
              <div>
                <h3 className="font-bold text-xl">{profile.full_name || 'Uživatel'}</h3>
                <p className="text-slate-500 text-sm flex items-center gap-1.5">
                  <Mail size={14} /> {user.email}
                </p>
                <span 
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest"
                  style={{ background: 'var(--brand-primary-light)', color: 'var(--brand-primary)' }}
                >
                  <ShieldCheck size={12} /> {profile.role}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Celé jméno</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={profile.full_name || ''}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border outline-none bg-slate-50 focus:bg-white transition-all"
                    style={{ borderColor: 'var(--border)' }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Přihlašovací E-mail</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    type="text"
                    value={user.email}
                    disabled
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border bg-slate-100 text-slate-400 cursor-not-allowed"
                    style={{ borderColor: 'var(--border)' }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 rounded-2xl text-sm font-bold text-white shadow-xl shadow-amber-500/20 disabled:opacity-50"
                style={{ background: 'var(--brand-primary)' }}
              >
                <Save size={18} />
                Uložit změny
              </button>
                     </div>
        </div>

        <div className="space-y-6">
           {/* Security Box */}
           <div className="p-6 rounded-3xl border shadow-inner" style={{ background: 'linear-gradient(135deg, #fff 0%, #fffbeb 100%)', borderColor: '#fde68a' }}>
              <Lock size={32} className="text-amber-500 mb-4" />
              <h4 className="font-bold text-lg mb-2">Zabezpečení heslem</h4>
              <p className="text-xs text-amber-700 leading-relaxed mb-6">
                Heslo by mělo obsahovat minimálně 8 znaků, velká písmena a číslice.
              </p>
              <button 
                onClick={async () => {
                  const newPassword = prompt('Zadejte nové heslo:');
                  if (newPassword && newPassword.length >= 8) {
                    setLoading(true);
                    const { error } = await supabase.auth.updateUser({ password: newPassword });
                    if (error) toast.error(error.message);
                    else toast.success('Heslo bylo úspěšně změněno');
                    setLoading(false);
                  } else if (newPassword) {
                    toast.error('Heslo musí mít alespoň 8 znaků');
                  }
                }}
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-white border border-amber-200 shadow-sm text-sm font-bold text-amber-700 hover:bg-amber-50 transition-colors disabled:opacity-50"
              >
                {loading ? 'Zpracovávám...' : 'Změnit heslo'}
              </button>
           </div>
        </div>
      </div>
    </div>
    </div>
  )
}
