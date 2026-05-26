'use client'

import { useState, useRef } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'
import {
  ArrowLeft,
  Save,
  Layout,
  Camera,
  MessageSquareQuote,
  Plus,
  Trash2,
  Upload,
  Loader2,
  X
} from 'lucide-react'
import { Tables } from '@/lib/database.types'
import { compressImage } from '@/lib/utils'
import {
  updateService,
  addServiceFaq,
  updateServiceFaq,
  deleteServiceFaq,
  uploadServiceHeroImage,
  uploadBeforeAfterPhoto,
  deleteBeforeAfter
} from '../actions'
import { TiptapEditor } from '@/components/admin/editor'

type Service = Tables<'services'>
type BeforeAfter = Tables<'service_before_after'>
type ServiceFAQ = Tables<'service_faqs'>

interface Props {
  service: Service
  beforeAfterItems: BeforeAfter[]
  serviceFaqs: ServiceFAQ[]
}

export function ServiceDetailClient({ service: initialService, beforeAfterItems: initialBeforeAfter, serviceFaqs: initialFaqs }: Props) {
  const [activeTab, setActiveTab] = useState<'general' | 'photos' | 'faqs'>('general')
  const [faqs, setFaqs] = useState<ServiceFAQ[]>(initialFaqs)
  const [beforeAfterItems, setBeforeAfterItems] = useState<BeforeAfter[]>(initialBeforeAfter)
  const [service, setService] = useState(initialService)
  const [saving, setSaving] = useState(false)
  const [uploadingHero, setUploadingHero] = useState(false)
  const [showAddBeforeAfter, setShowAddBeforeAfter] = useState(false)
  const [addingBeforeAfter, setAddingBeforeAfter] = useState(false)
  const heroFileRef = useRef<HTMLInputElement>(null)
  const beforeFileRef = useRef<HTMLInputElement>(null)
  const afterFileRef = useRef<HTMLInputElement>(null)
  const [baCaption, setBaCaption] = useState('')

  // --- General save ---
  const handleSaveGeneral = async () => {
    setSaving(true)
    try {
      const { id, ...data } = service
      await updateService(id, data)
      toast.success('Změny uloženy')
    } catch (err: any) {
      toast.error('Chyba: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  // --- Hero image upload ---
  const handleHeroUpload = async (file: File) => {
    setUploadingHero(true)
    try {
      const compressedFile = await compressImage(file)
      const fd = new FormData()
      fd.append('file', compressedFile)
      const url = await uploadServiceHeroImage(service.id, fd)
      setService({ ...service, hero_image_url: url })
      toast.success('Hero obrázek nahrán')
    } catch (err: any) {
      toast.error('Chyba uploadu: ' + err.message)
    } finally {
      setUploadingHero(false)
    }
  }

  // --- Before/After upload ---
  const handleAddBeforeAfter = async () => {
    const beforeFile = beforeFileRef.current?.files?.[0]
    const afterFile = afterFileRef.current?.files?.[0]
    if (!beforeFile || !afterFile) {
      toast.error('Vyberte obě fotky (před a po)')
      return
    }
    setAddingBeforeAfter(true)
    try {
      // Nahráváme fotky postupně a s kompresí kvůli Vercel limitu na velikost payloadu (4.5MB)
      toast.info('Komprimuji a nahrávám fotku PŘED...')
      const compressedBefore = await compressImage(beforeFile)
      const fdBefore = new FormData()
      fdBefore.append('file', compressedBefore)
      const beforeUrl = await import('../actions').then(m => m.uploadServiceFile(service.id, fdBefore))

      toast.info('Komprimuji a nahrávám fotku PO...')
      const compressedAfter = await compressImage(afterFile)
      const fdAfter = new FormData()
      fdAfter.append('file', compressedAfter)
      const afterUrl = await import('../actions').then(m => m.uploadServiceFile(service.id, fdAfter))

      toast.info('Ukládám záznam...')
      const newItem = await import('../actions').then(m => m.addBeforeAfter(service.id, beforeUrl, afterUrl, baCaption))

      setBeforeAfterItems(prev => [...prev, newItem])
      setShowAddBeforeAfter(false)
      setBaCaption('')
      if (beforeFileRef.current) beforeFileRef.current.value = ''
      if (afterFileRef.current) afterFileRef.current.value = ''
      toast.success('Srovnání přidáno')
    } catch (err: any) {
      toast.error('Chyba: ' + err.message)
    } finally {
      setAddingBeforeAfter(false)
    }
  }

  const handleDeleteBeforeAfter = async (id: string) => {
    if (!confirm('Smazat toto srovnání?')) return
    try {
      await deleteBeforeAfter(id, service.id)
      setBeforeAfterItems(prev => prev.filter(i => i.id !== id))
      toast.success('Srovnání smazáno')
    } catch (err: any) {
      toast.error('Chyba: ' + err.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/services"
            className="p-2 rounded-xl border hover:bg-slate-50 transition-colors"
            style={{ borderColor: 'var(--border)' }}
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{service.name}</h1>
            <p className="text-sm opacity-60">Úprava služby a jejího obsahu</p>
          </div>
        </div>
        <button
          onClick={handleSaveGeneral}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg shadow-amber-500/20"
          style={{ background: 'var(--brand-primary)' }}
        >
          <Save size={18} />
          {saving ? 'Ukládám...' : 'Uložit vše'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 rounded-2xl w-fit" style={{ background: 'var(--bg-surface-2)' }}>
        {[
          { id: 'general', label: 'Základní info', icon: <Layout size={16} /> },
          { id: 'photos', label: `Před & Po fotky (${beforeAfterItems.length})`, icon: <Camera size={16} /> },
          { id: 'faqs', label: `Q&A (${faqs.length})`, icon: <MessageSquareQuote size={16} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
            style={{
              background: activeTab === tab.id ? 'var(--bg-surface)' : 'transparent',
              color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: activeTab === tab.id ? 'var(--shadow-sm)' : 'none'
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-8 rounded-3xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        {/* --- GENERAL TAB --- */}
        {activeTab === 'general' && (
          <div className="max-w-3xl space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Název služby</label>
                <input
                  type="text"
                  value={service.name}
                  onChange={(e) => setService({ ...service, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-amber-500/20"
                  style={{ background: 'var(--bg-base)', borderColor: 'var(--border)' }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">URL Slug</label>
                <input
                  type="text"
                  value={service.slug}
                  onChange={(e) => setService({ ...service, slug: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border outline-none font-mono text-sm"
                  style={{ background: 'var(--bg-base)', borderColor: 'var(--border)' }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Hlavní popis (Web)</label>
              <TiptapEditor 
                content={service.description || ''} 
                onChange={(html) => setService({ ...service, description: html })} 
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Co to obnáší (Proces)</label>
              <TiptapEditor 
                content={service.process_description || ''} 
                onChange={(html) => setService({ ...service, process_description: html })} 
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Vlastnosti / Fajfky</label>
              <div className="space-y-2">
                {(service.features || []).map((feature, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...(service.features || [])]
                        newFeatures[idx] = e.target.value
                        setService({ ...service, features: newFeatures })
                      }}
                      className="flex-1 px-4 py-2 rounded-lg border text-sm outline-none"
                      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
                    />
                    <button
                      onClick={() => {
                        const newFeatures = (service.features || []).filter((_, i) => i !== idx)
                        setService({ ...service, features: newFeatures })
                      }}
                      className="p-2 text-red-400 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setService({ ...service, features: [...(service.features || []), ''] })}
                  className="flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 mt-2"
                >
                  <Plus size={16} /> Přidat vlastnost
                </button>
              </div>
            </div>

            {/* Hero image upload */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Hero Obrázek</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={service.hero_image_url || ''}
                  onChange={(e) => setService({ ...service, hero_image_url: e.target.value })}
                  className="flex-1 px-4 py-3 rounded-xl border outline-none"
                  style={{ background: 'var(--bg-base)', borderColor: 'var(--border)' }}
                  placeholder="https://... nebo nahrajte soubor →"
                />
                <input
                  ref={heroFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleHeroUpload(f) }}
                />
                <button
                  onClick={() => heroFileRef.current?.click()}
                  disabled={uploadingHero}
                  className="px-4 py-3 rounded-xl border flex items-center gap-2 text-sm font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  {uploadingHero ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                  {uploadingHero ? 'Nahrávám...' : 'Nahrát'}
                </button>
              </div>
              {service.hero_image_url && (
                <div className="mt-3 rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                  <img src={service.hero_image_url} alt="Hero preview" className="w-full h-40 object-cover" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- PHOTOS TAB --- */}
        {activeTab === 'photos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Před & Po srovnání</h3>
              <button
                onClick={() => setShowAddBeforeAfter(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
                style={{ background: 'var(--brand-primary)' }}
              >
                <Plus size={16} /> Přidat srovnání
              </button>
            </div>

            {/* Add Before/After form */}
            {showAddBeforeAfter && (
              <div className="p-6 rounded-2xl border-2 space-y-4" style={{ borderColor: 'var(--brand-primary)', background: 'var(--bg-base)' }}>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold">Nahrát nové srovnání</h4>
                  <button onClick={() => setShowAddBeforeAfter(false)} className="p-1 rounded-lg hover:bg-slate-100">
                    <X size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Fotka PŘED</label>
                    <input ref={beforeFileRef} type="file" accept="image/*" className="w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-bold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">Fotka PO</label>
                    <input ref={afterFileRef} type="file" accept="image/*" className="w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-bold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400">Popisek (volitelný)</label>
                  <input
                    type="text"
                    value={baCaption}
                    onChange={(e) => setBaCaption(e.target.value)}
                    placeholder="např. Fasáda před a po nano-ochraně"
                    className="w-full px-4 py-2 rounded-xl border outline-none text-sm"
                    style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
                  />
                </div>
                <button
                  onClick={handleAddBeforeAfter}
                  disabled={addingBeforeAfter}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white disabled:opacity-50"
                  style={{ background: 'var(--brand-primary)' }}
                >
                  {addingBeforeAfter ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                  {addingBeforeAfter ? 'Nahrávám...' : 'Nahrát a přidat'}
                </button>
              </div>
            )}

            <div className="grid gap-6">
              {beforeAfterItems.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl border flex gap-6" style={{ background: 'var(--bg-base)', borderColor: 'var(--border)' }}>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="space-y-2 text-center">
                      <span className="text-[10px] uppercase font-black text-red-400">Před</span>
                      <div className="aspect-video rounded-xl overflow-hidden bg-slate-100 border-2 border-red-100">
                        <img src={item.before_url || ''} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="space-y-2 text-center">
                      <span className="text-[10px] uppercase font-black text-green-500">Po</span>
                      <div className="aspect-video rounded-xl overflow-hidden bg-slate-100 border-2 border-green-100">
                        <img src={item.after_url || ''} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                  <div className="w-48 space-y-3 flex flex-col justify-between">
                    <p className="text-sm text-slate-500 italic">{item.caption || 'Bez popisku'}</p>
                    <button
                      onClick={() => handleDeleteBeforeAfter(item.id)}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold text-red-500 hover:bg-red-50 transition-colors border border-red-100"
                    >
                      <Trash2 size={14} /> Smazat
                    </button>
                  </div>
                </div>
              ))}
              {beforeAfterItems.length === 0 && !showAddBeforeAfter && (
                <div className="text-center py-12 opacity-40 text-sm border-2 border-dashed rounded-2xl">
                  Zatím žádné srovnání. Klikněte na "Přidat srovnání".
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- FAQ TAB --- */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Q&A / Časté dotazy k této službě</h3>
              <button
                onClick={async () => {
                  const newFaq = await addServiceFaq(service.id, 'Nová otázka', 'Odpověď...')
                  setFaqs([...faqs, newFaq])
                  toast.success('Dotaz přidán')
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
                style={{ background: 'var(--brand-primary)' }}
              >
                <Plus size={16} /> Přidat dotaz
              </button>
            </div>

            <div className="grid gap-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="p-6 rounded-2xl border space-y-4" style={{ background: 'var(--bg-base)', borderColor: 'var(--border)' }}>
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400 flex items-center justify-between">
                          <span>Otázka</span>
                          {(faq as any).is_global && (
                            <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-[9px] font-black tracking-tighter">GLOBÁLNÍ</span>
                          )}
                        </label>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => {
                            const val = e.target.value
                            setFaqs(prev => prev.map(f => f.id === faq.id ? { ...f, question: val } : f))
                          }}
                          onBlur={async (e) => {
                            if ((faq as any).is_global) {
                              await import('../../faqs/actions').then(m => m.updateFaq(faq.id, { question: e.target.value }))
                            } else {
                              await updateServiceFaq(faq.id, { question: e.target.value })
                            }
                          }}
                          className="w-full px-4 py-2 rounded-lg border font-bold text-sm outline-none focus:border-amber-500"
                          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase text-slate-400">Pořadí</label>
                          <input
                            type="number"
                            value={faq.order_index || 0}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 0
                              setFaqs(prev => prev.map(f => f.id === faq.id ? { ...f, order_index: val } : f))
                            }}
                            onBlur={async (e) => {
                              const val = parseInt(e.target.value) || 0
                              await updateServiceFaq(faq.id, { order_index: val })
                              // Seřadíme lokálně po změně
                              setFaqs(prev => [...prev].sort((a, b) => (a.order_index || 0) - (b.order_index || 0)))
                            }}
                            className="w-full px-4 py-2 rounded-lg border text-sm outline-none focus:border-amber-500"
                            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase text-slate-400">Odpověď</label>
                          <textarea
                            value={faq.answer}
                            onChange={(e) => {
                              const val = e.target.value
                              setFaqs(prev => prev.map(f => f.id === faq.id ? { ...f, answer: val } : f))
                            }}
                            onBlur={async (e) => {
                              if ((faq as any).is_global) {
                                await import('../../faqs/actions').then(m => m.updateFaq(faq.id, { answer: e.target.value }))
                              } else {
                                await updateServiceFaq(faq.id, { answer: e.target.value })
                              }
                            }}
                            className="w-full px-4 py-2 rounded-lg border text-sm outline-none focus:border-amber-500 resize-none"
                            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 pt-6">
                      <button
                        onClick={async () => {
                          if (confirm('Smazat tento dotaz?')) {
                            if ((faq as any).is_global) {
                              await import('../../faqs/actions').then(m => m.deleteFaq(faq.id))
                            } else {
                              await deleteServiceFaq(faq.id)
                            }
                            setFaqs(faqs.filter(f => f.id !== faq.id))
                            toast.success('Dotaz smazán')
                          }
                        }}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        onClick={async () => {
                          const newStatus = !faq.is_active
                          if ((faq as any).is_global) {
                            await import('../../faqs/actions').then(m => m.updateFaq(faq.id, { is_active: newStatus }))
                          } else {
                            await updateServiceFaq(faq.id, { is_active: newStatus })
                          }
                          setFaqs(prev => prev.map(f => f.id === faq.id ? { ...f, is_active: newStatus } : f))
                          toast.success(newStatus ? 'Aktivováno' : 'Deaktivováno')
                        }}
                        title={faq.is_active ? 'Skrýt z webu' : 'Zobrazit na webu'}
                        className={`p-2 rounded-lg transition-colors text-xs font-bold ${faq.is_active ? 'text-green-600 bg-green-50' : 'text-slate-400 bg-slate-100'}`}
                      >
                        {faq.is_active ? '✓' : '○'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {faqs.length === 0 && (
                <div className="text-center py-12 opacity-40 text-sm border-2 border-dashed rounded-2xl">
                  Zatím žádné dotazy. Klikněte na "Přidat dotaz".
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
