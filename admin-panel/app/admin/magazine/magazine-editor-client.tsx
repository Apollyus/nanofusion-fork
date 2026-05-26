'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Save, 
  Globe, 
  Eye, 
  Trash2, 
  Image as ImageIcon,
  Type,
  Loader2
} from 'lucide-react'
import { Tables } from '@/lib/database.types'
import { saveArticle, deleteArticle } from './actions'
import { TiptapEditor } from '@/components/admin/editor'
import { createClient } from '@/lib/supabase/client'
import { uploadFile } from '@/lib/storage'
import { useRef } from 'react'

type Article = Tables<'articles'>

interface Props {
  article: Article | null
}

export function MagazineEditorClient({ article: initialArticle }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()
  const [article, setArticle] = useState<Partial<Article>>(
    initialArticle || {
      title: '',
      slug: '',
      content: '',
      hero_image_url: '',
      is_published: false,
    }
  )

  const handleSave = async () => {
    if (!article.title || !article.slug) {
      toast.error('Zadejte název a slug článku')
      return
    }
    setLoading(true)
    try {
      await saveArticle(initialArticle?.id || null, article)
      toast.success(initialArticle ? 'Článek uložen' : 'Článek vytvořen')
      if (!initialArticle) {
        router.push('/admin/magazine')
      }
    } catch (err: any) {
      toast.error('Chyba: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!initialArticle) return
    if (!window.confirm('Opravdu chcete smazat tento článek?')) return

    setLoading(true)
    try {
      await deleteArticle(initialArticle.id)
      toast.success('Článek smazán')
      router.push('/admin/magazine')
    } catch (err: any) {
      toast.error('Chyba: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const url = await uploadFile(supabase, file, 'articles', article.slug || 'temp')
      setArticle({ ...article, hero_image_url: url })
      toast.success('Obrázek nahrán')
    } catch (err: any) {
      toast.error('Chyba nahrávání: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const onTitleChange = (val: string) => {
    const slug = generateSlug(val)
    setArticle({ ...article, title: val, slug })
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between sticky top-0 z-10 py-4" style={{ background: 'var(--bg-base)' }}>
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/magazine" 
            className="p-2 rounded-xl border hover:bg-slate-50 transition-colors"
            style={{ borderColor: 'var(--border)' }}
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {initialArticle ? 'Editace článku' : 'Nový článek'}
            </h1>
            <p className="text-sm opacity-60">
              {article.title || 'Rozepsaný článek'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {initialArticle && (
            <button
              onClick={handleDelete}
              className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
              title="Smazat článek"
            >
              <Trash2 size={20} />
            </button>
          )}
          <button
            onClick={() => setArticle({ ...article, is_published: !article.is_published })}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
              article.is_published ? 'border-green-200 text-green-600 bg-green-50' : 'text-slate-500'
            }`}
          >
            {article.is_published ? <Globe size={16} /> : <Eye size={16} />}
            {article.is_published ? 'Publikováno' : 'Jen koncept'}
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg shadow-amber-500/20 disabled:opacity-50"
            style={{ background: 'var(--brand-primary)' }}
          >
            <Save size={18} />
            {loading ? 'Ukládám...' : 'Uložit článek'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          <div className="p-8 rounded-3xl space-y-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <div className="space-y-4">
              <input
                type="text"
                value={article.title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="Název článku..."
                className="w-full text-4xl font-black outline-none bg-transparent placeholder:opacity-20"
                style={{ color: 'var(--text-primary)' }}
              />
              <div className="flex items-center gap-2 font-mono text-xs opacity-50">
                <span>URL Slug:</span>
                <input
                  type="text"
                  value={article.slug}
                  onChange={(e) => setArticle({ ...article, slug: e.target.value })}
                  className="bg-slate-100 px-2 py-0.5 rounded outline-none w-full"
                />
              </div>
            </div>

            <TiptapEditor 
              content={article.content || ''} 
              onChange={(html) => setArticle({ ...article, content: html })} 
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-3xl space-y-6 sticky top-24" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <h3 className="font-bold flex items-center gap-2">
              <ImageIcon size={18} />
              Náhledový obrázek
            </h3>
            
            <div className="space-y-4">
              <div 
                className="aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer"
                style={{ borderColor: 'var(--border)', background: 'var(--bg-base)' }}
              >
                {article.hero_image_url ? (
                  <img src={article.hero_image_url} className="w-full h-full object-cover" />
                ) : (
                  <>
                    {uploading ? <Loader2 className="animate-spin opacity-20" size={32} /> : <ImageIcon size={32} className="opacity-20 mb-2" />}
                    <span className="text-xs opacity-40">{uploading ? 'Nahrávám...' : 'Nahrát z počítače'}</span>
                  </>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                   <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      fileInputRef.current?.click()
                    }}
                    className="bg-white px-4 py-2 rounded-lg text-xs font-bold shadow-xl hover:bg-slate-50"
                   >
                    Nahrát z PC
                   </button>
                   <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      const url = prompt('Nebo vložte URL:')
                      if(url) setArticle({...article, hero_image_url: url})
                    }}
                    className="text-white text-[10px] font-bold underline opacity-80"
                   >
                    Zadat URL
                   </button>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept="image/*" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Přímý odkaz na obrázek</label>
                <input
                  type="text"
                  value={article.hero_image_url || ''}
                  onChange={(e) => setArticle({ ...article, hero_image_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border text-xs outline-none"
                  style={{ background: 'var(--bg-base)', borderColor: 'var(--border)' }}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
               <h3 className="font-bold flex items-center gap-2 mb-4">
                <Type size={18} />
                Publikační info
              </h3>
              <div className="space-y-3">
                 <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Vytvořeno:</span>
                    <span className="font-semibold">{article.created_at ? new Date(article.created_at).toLocaleDateString('cs-CZ') : 'Dnes'}</span>
                 </div>
                 <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Poslední úprava:</span>
                    <span className="font-semibold">Nyní</span>
                 </div>
                 <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Stav:</span>
                    <span className={`font-black ${article.is_published ? 'text-green-500' : 'text-amber-500'}`}>
                      {article.is_published ? 'PUBLIKOVÁNO' : 'KONCEPT'}
                    </span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
