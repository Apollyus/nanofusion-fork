'use client'

import { useState } from 'react'
import { updateAboutConfig } from './actions'
import { uploadCertificateImage } from '../certificates/actions'
import { toast } from 'sonner'
import { 
  Save, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Award, 
  Star, 
  AlignLeft, 
  Layout, 
  CheckSquare, 
  FileText 
} from 'lucide-react'
import NextImage from 'next/image'
import { TiptapEditor } from '@/components/admin/editor'

interface Certificate {
  id: string
  title: string
  description: string
  imageUrl: string
}

interface AboutClientProps {
  initialTitle: string
  initialSubtitle: string
  initialDescription: string
  initialStats: string
  initialCertificates: string
  initialWhyTitle: string
  initialWhyPoints: string
  initialCertsTitle: string
  initialCertsSubtitle: string
}

export function AboutClient({ 
  initialTitle, 
  initialSubtitle,
  initialDescription,
  initialStats,
  initialCertificates,
  initialWhyTitle,
  initialWhyPoints,
  initialCertsTitle,
  initialCertsSubtitle
}: AboutClientProps) {
  const [activeTab, setActiveTab] = useState<'texty' | 'stats' | 'certs'>('texty')
  
  // States for Tab 1: Texts
  const [title, setTitle] = useState(initialTitle)
  const [subtitle, setSubtitle] = useState(initialSubtitle)
  const [description, setDescription] = useState(initialDescription)

  // States for Tab 2: Stats & Why Us
  const [stats, setStats] = useState<any[]>(JSON.parse(initialStats))
  const [whyTitle, setWhyTitle] = useState(initialWhyTitle)
  const [whyPoints, setWhyPoints] = useState<string[]>(JSON.parse(initialWhyPoints))

  // States for Tab 3: Certificates headings & list
  const [certsTitle, setCertsTitle] = useState(initialCertsTitle)
  const [certsSubtitle, setCertsSubtitle] = useState(initialCertsSubtitle)
  const [certificates, setCertificates] = useState<Certificate[]>(JSON.parse(initialCertificates))
  
  const [isSaving, setIsSaving] = useState(false)
  const [uploadingId, setUploadingId] = useState<string | null>(null)

  const handleSave = async (key: string, value: string) => {
    setIsSaving(true)
    try {
      await updateAboutConfig(key, value)
      toast.success('Změny byly úspěšně uloženy')
    } catch (e) {
      toast.error('Chyba při ukládání')
    } finally {
      setIsSaving(false)
    }
  }

  // Cert CRUD Handlers
  const handleAddCert = () => {
    const newCert: Certificate = {
      id: crypto.randomUUID(),
      title: 'Nový certifikát',
      description: 'Popis certifikátu...',
      imageUrl: ''
    }
    setCertificates([newCert, ...certificates])
  }

  const handleRemoveCert = (id: string) => {
    setCertificates(certificates.filter(c => c.id !== id))
  }

  const handleCertChange = (id: string, field: keyof Certificate, value: string) => {
    setCertificates(certificates.map(c => c.id === id ? { ...c, [field]: value } : c))
  }

  const handleCertImageUpload = async (id: string, file: File) => {
    setUploadingId(id)
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const url = await uploadCertificateImage(formData)
      handleCertChange(id, 'imageUrl', url)
      toast.success('Obrázek nahrán')
    } catch (e) {
      toast.error('Chyba při nahrávání')
    } finally {
      setUploadingId(null)
    }
  }

  const handleSaveCertificates = async () => {
    setIsSaving(true)
    try {
      // Nejprve uložíme záhlaví certifikací
      await updateAboutConfig('about_certs_title', certsTitle)
      await updateAboutConfig('about_certs_subtitle', certsSubtitle)
      // Poté samotný seznam certifikátů
      await updateAboutConfig('about_certificates', JSON.stringify(certificates))
      toast.success('Certifikace a všechny certifikáty byly uloženy')
    } catch (e) {
      toast.error('Chyba při ukládání certifikátů')
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveWhyUs = async () => {
    setIsSaving(true)
    try {
      await updateAboutConfig('about_why_title', whyTitle)
      await updateAboutConfig('about_why_points', JSON.stringify(whyPoints))
      toast.success('Sekce Proč NANOfusion byla úspěšně uložena')
    } catch (e) {
      toast.error('Chyba při ukládání')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Správa sekce O nás</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Upravte kompletní obsah, který se zobrazí v modálním okně po kliknutí na "O nás" (texty, výhody, statistiky a certifikace).
        </p>
      </div>

      {/* STRV-grade Tabs Control */}
      <div className="flex border-b border-slate-200" style={{ borderColor: 'var(--border)' }}>
        <button
          onClick={() => setActiveTab('texty')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all outline-none ${
            activeTab === 'texty'
              ? 'border-amber-500 text-amber-500'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <FileText size={16} /> Základní texty & Příběh
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all outline-none ${
            activeTab === 'stats'
              ? 'border-amber-500 text-amber-500'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Star size={16} /> Statistiky & Výhody (Proč my?)
        </button>
        <button
          onClick={() => setActiveTab('certs')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all outline-none ${
            activeTab === 'certs'
              ? 'border-amber-500 text-amber-500'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Award size={16} /> Certifikace & Certifikáty
        </button>
      </div>

      {/* Tab 1: Texts & Story */}
      {activeTab === 'texty' && (
        <div className="grid grid-cols-1 gap-8">
          {/* Title & Subtitle */}
          <div className="rounded-2xl p-6 shadow-sm border space-y-6" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <Layout size={20} />
              </div>
              <h2 className="text-lg font-bold">Základní nápisy</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-400 mb-1.5 block">Hlavní titulek</label>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                  style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
                <button
                  onClick={() => handleSave('about_title', title)}
                  disabled={isSaving}
                  className="mt-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-black transition-all disabled:opacity-50"
                >
                  <Save size={14} /> Uložit titulek
                </button>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-400 mb-1.5 block">Podnadpis (Slogan)</label>
                <input 
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                  style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
                <button
                  onClick={() => handleSave('about_subtitle', subtitle)}
                  disabled={isSaving}
                  className="mt-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-black transition-all disabled:opacity-50"
                >
                  <Save size={14} /> Uložit podnadpis
                </button>
              </div>
            </div>
          </div>

          {/* Description Editor */}
          <div className="rounded-2xl p-6 shadow-sm border space-y-6" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <AlignLeft size={20} />
              </div>
              <h2 className="text-lg font-bold">Hlavní příběh (Text)</h2>
            </div>
            
            <div className="space-y-4">
              <TiptapEditor 
                content={description}
                onChange={setDescription}
              />
              
              <div className="flex justify-end">
                <button
                  onClick={() => handleSave('about_description', description)}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-all disabled:opacity-50"
                >
                  <Save size={18} />
                  {isSaving ? 'Ukládám...' : 'Uložit hlavní text'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Stats & Why Us Benefits */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 gap-8">
          {/* Stats Section */}
          <div className="rounded-2xl p-6 shadow-sm border space-y-6" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <Star size={20} />
              </div>
              <h2 className="text-lg font-bold">Statistiky (Číselné údaje)</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-3 p-4 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block">Popisek</label>
                    <input 
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...stats]
                        newStats[idx].label = e.target.value
                        setStats(newStats)
                      }}
                      className="w-full p-2 rounded-lg border text-sm"
                      style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block">Hodnota</label>
                    <input 
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const newStats = [...stats]
                        newStats[idx].value = e.target.value
                        setStats(newStats)
                      }}
                      className="w-full p-2 rounded-lg border text-sm font-bold"
                      style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => handleSave('about_stats', JSON.stringify(stats))}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-black transition-all disabled:opacity-50"
              >
                <Save size={18} /> Uložit statistiky
              </button>
            </div>
          </div>

          {/* Benefits ("Proč NANOfusion?") Section */}
          <div className="rounded-2xl p-6 shadow-sm border space-y-6" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <CheckSquare size={20} />
              </div>
              <h2 className="text-lg font-bold">Důvody "Proč my?" (Pravý panel)</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-400 mb-1.5 block">Nadpis boxu</label>
                <input 
                  type="text"
                  value={whyTitle}
                  onChange={(e) => setWhyTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                  style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold uppercase text-slate-400 mb-1.5 block">3 klíčové výhody (s ikonou ✓)</label>
                {whyPoints.map((point, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <span className="font-bold text-amber-500">✓</span>
                    <input 
                      type="text"
                      value={point}
                      onChange={(e) => {
                        const newPoints = [...whyPoints]
                        newPoints[idx] = e.target.value
                        setWhyPoints(newPoints)
                      }}
                      className="flex-1 p-3 rounded-xl border outline-none"
                      style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveWhyUs}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-black transition-all disabled:opacity-50"
                >
                  <Save size={18} /> Uložit sekci Proč my?
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Certificates headings & Full CRUD */}
      {activeTab === 'certs' && (
        <div className="grid grid-cols-1 gap-8">
          {/* Certificate headers */}
          <div className="rounded-2xl p-6 shadow-sm border space-y-6" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <Award size={20} />
              </div>
              <h2 className="text-lg font-bold">Nadpisy sekce Certifikací</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-400 mb-1.5 block">Hlavní nadpis certifikací</label>
                <input 
                  type="text"
                  value={certsTitle}
                  onChange={(e) => setCertsTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                  style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-400 mb-1.5 block">Průvodní text (Popisek)</label>
                <textarea 
                  value={certsSubtitle}
                  onChange={(e) => setCertsSubtitle(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                  style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                />
              </div>
            </div>
          </div>

          {/* Certificate cards CRUD list */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">Jednotlivé certifikáty</h2>
                <p className="text-xs text-slate-400">Přidávejte a spravujte certifikáty, které se na veřejné stránce zobrazí v mřížce.</p>
              </div>
              <button
                onClick={handleAddCert}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-all text-sm"
              >
                <Plus size={18} /> Přidat certifikát
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <div 
                  key={cert.id} 
                  className="rounded-2xl border p-6 space-y-4 relative group transition-all hover:shadow-md"
                  style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
                >
                  <button 
                    onClick={() => handleRemoveCert(cert.id)}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="flex gap-6">
                    {/* Image Preview / Upload */}
                    <div className="w-32 h-40 flex-shrink-0 relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      {cert.imageUrl ? (
                        <NextImage 
                          src={cert.imageUrl} 
                          alt={cert.title} 
                          fill 
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                          <Award size={32} />
                          <span className="text-[10px] mt-2 font-bold uppercase text-center px-2">Bez obrázku</span>
                        </div>
                      )}
                      
                      <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={(e) => e.target.files?.[0] && handleCertImageUpload(cert.id, e.target.files[0])}
                          accept="image/*"
                        />
                        <div className="text-white text-xs font-bold flex flex-col items-center">
                          {uploadingId === cert.id ? 'Nahrávám...' : (
                            <>
                              <ImageIcon size={20} className="mb-1" />
                              Změnit
                            </>
                          )}
                        </div>
                      </label>
                    </div>

                    {/* Form Fields */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block">Název certifikátu</label>
                        <input 
                          type="text"
                          value={cert.title}
                          onChange={(e) => handleCertChange(cert.id, 'title', e.target.value)}
                          className="w-full p-2 rounded-lg border text-sm font-semibold outline-none focus:ring-1 focus:ring-amber-500/30"
                          style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block">Popis / Detaily</label>
                        <textarea 
                          value={cert.description}
                          onChange={(e) => handleCertChange(cert.id, 'description', e.target.value)}
                          rows={4}
                          className="w-full p-2 rounded-lg border text-xs outline-none focus:ring-1 focus:ring-amber-500/30"
                          style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {certificates.length === 0 && (
              <div className="py-20 text-center border-2 border-dashed rounded-3xl" style={{ borderColor: 'var(--border)' }}>
                <Award size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500 font-medium">Zatím nebyly přidány žádné certifikáty.</p>
              </div>
            )}
          </div>

          {/* Global Save for Tab 3 */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <button
              onClick={handleSaveCertificates}
              disabled={isSaving}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold shadow-2xl hover:bg-black transition-all disabled:opacity-50"
            >
              {isSaving ? 'Ukládám...' : (
                <>
                  <Save size={20} /> Uložit všechny certifikáty & nadpisy
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
