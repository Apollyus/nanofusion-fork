'use client'

import { useState } from 'react'
import { uploadCertificateImage, updateCertificatesConfig } from './actions'
import { toast } from 'sonner'
import { Save, Plus, Trash2, Image as ImageIcon, ExternalLink, Award } from 'lucide-react'
import NextImage from 'next/image'

interface Certificate {
  id: string
  title: string
  description: string
  imageUrl: string
}

interface CertificatesClientProps {
  initialCertificates: Certificate[]
}

export function CertificatesClient({ initialCertificates }: CertificatesClientProps) {
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadingId, setUploadingId] = useState<string | null>(null)

  const handleAdd = () => {
    const newCert: Certificate = {
      id: crypto.randomUUID(),
      title: 'Nový certifikát',
      description: 'Popis certifikátu...',
      imageUrl: ''
    }
    setCertificates([newCert, ...certificates])
  }

  const handleRemove = (id: string) => {
    setCertificates(certificates.filter(c => c.id !== id))
  }

  const handleChange = (id: string, field: keyof Certificate, value: string) => {
    setCertificates(certificates.map(c => c.id === id ? { ...c, [field]: value } : c))
  }

  const handleImageUpload = async (id: string, file: File) => {
    setUploadingId(id)
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const url = await uploadCertificateImage(formData)
      handleChange(id, 'imageUrl', url)
      toast.success('Obrázek nahrán')
    } catch (e) {
      toast.error('Chyba při nahrávání')
    } finally {
      setUploadingId(null)
    }
  }

  const handleSaveAll = async () => {
    setIsSaving(true)
    try {
      await updateCertificatesConfig(certificates)
      toast.success('Certifikáty uloženy')
    } catch (e) {
      toast.error('Chyba při ukládání')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Certifikáty a Ocenění</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Spravujte certifikáty, které se zobrazí v karuselu v sekci "O nás".
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-all"
        >
          <Plus size={20} /> Přidat certifikát
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
              onClick={() => handleRemove(cert.id)}
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
                    <span className="text-[10px] mt-2 font-bold uppercase">Žádný obr.</span>
                  </div>
                )}
                
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(cert.id, e.target.files[0])}
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
                    onChange={(e) => handleChange(cert.id, 'title', e.target.value)}
                    className="w-full p-2 rounded-lg border text-sm font-semibold outline-none focus:ring-1 focus:ring-amber-500/30"
                    style={{ background: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block">Popis / Detaily</label>
                  <textarea 
                    value={cert.description}
                    onChange={(e) => handleChange(cert.id, 'description', e.target.value)}
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

      {/* Global Save */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold shadow-2xl hover:bg-black transition-all disabled:opacity-50"
        >
          {isSaving ? 'Ukládám...' : (
            <>
              <Save size={20} /> Uložit všechny certifikáty
            </>
          )}
        </button>
      </div>
    </div>
  )
}
