'use client'

import { useState, useRef } from 'react'
import { toast } from 'sonner'
import {
  Trash2, Eye, EyeOff, Image as ImageIcon, AlertTriangle, Link, X, Upload, ChevronUp, ChevronDown, Save, FolderPlus, FolderOpen
} from 'lucide-react'
import { Tables } from '@/lib/database.types'
import {
  addYoutubeItem, deleteGalleryItem, toggleGalleryItemActive, uploadGalleryImage, updateGalleryOrder, updateGalleryCaption,
  createGalleryAlbum, uploadAlbumPhoto, deleteGalleryAlbum, toggleAlbumActive, deleteAlbumPhoto, updateAlbumOrder
} from './actions'

type GalleryItem = Tables<'gallery_items'>
type GalleryAlbum = Tables<'gallery_albums'> & { gallery_items?: GalleryItem[] }

interface GalleryClientProps {
  initialItems: GalleryItem[]
  initialAlbums: GalleryAlbum[]
}

type AddMode = 'image' | 'youtube' | 'album' | null

export function GalleryClient({ initialItems, initialAlbums }: GalleryClientProps) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems || [])
  const [albums, setAlbums] = useState<GalleryAlbum[]>(initialAlbums || [])
  const [addMode, setAddMode] = useState<AddMode>(null)

  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [albumTitle, setAlbumTitle] = useState('')

  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'item' | 'album' | 'album_photo', id: string, parentId?: string } | null>(null)
  const [uploading, setUploading] = useState<{ id: string | null, progress: string } | null>(null)
  const [adding, setAdding] = useState(false)
  const [orderDirty, setOrderDirty] = useState(false)
  const [savingOrder, setSavingOrder] = useState(false)

  const [expandedAlbumId, setExpandedAlbumId] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const albumFileRef = useRef<HTMLInputElement>(null)
  const newAlbumFileRef = useRef<HTMLInputElement>(null)
  const [selectedNewFiles, setSelectedNewFiles] = useState<number>(0)

  const MAX_ITEMS = 8

  // === HANDLERS ===

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetAlbumId: string | null = null) => {
    const files = Array.from(e.target.files ?? [])
    if (files.length === 0) return

    const currentCount = targetAlbumId
      ? (albums.find(a => a.id === targetAlbumId)?.gallery_items?.length || 0)
      : items.length

    const slots = MAX_ITEMS - currentCount
    const toUpload = files.slice(0, slots)

    if (files.length > slots) {
      toast.error(`Místo jen pro ${slots} dalších položek (max ${MAX_ITEMS})`)
    }

    if (toUpload.some(f => !f.type.startsWith('image/'))) return toast.error('Povolené formáty: JPG, PNG, WEBP, GIF')
    if (toUpload.some(f => f.size > 10 * 1024 * 1024)) return toast.error('Soubor je příliš velký (max 10MB)')

    setUploading({ id: targetAlbumId, progress: `0 / ${toUpload.length}` })
    const uploaded: GalleryItem[] = []

    for (let i = 0; i < toUpload.length; i++) {
      try {
        const fd = new FormData()
        fd.append('file', toUpload[i])

        const newItem = targetAlbumId
          ? await uploadAlbumPhoto(targetAlbumId, fd)
          : await uploadGalleryImage(fd)

        uploaded.push(newItem as GalleryItem)
        setUploading({ id: targetAlbumId, progress: `${i + 1} / ${toUpload.length}` })
      } catch {
        toast.error(`Chyba u souboru: ${toUpload[i].name}`)
      }
    }

    if (uploaded.length > 0) {
      if (targetAlbumId) {
        setAlbums(prev => prev.map(a => a.id === targetAlbumId ? { ...a, gallery_items: [...(a.gallery_items || []), ...uploaded] } : a))
      } else {
        setItems(prev => [...prev, ...uploaded])
      }
      toast.success(`Nahráno ${uploaded.length} fotek`)
    }

    setUploading(null)
    setAddMode(null)
    if (fileRef.current) fileRef.current.value = ''
    if (albumFileRef.current) albumFileRef.current.value = ''
  }

  const handleAddYoutube = async () => {
    if (!youtubeUrl) return toast.error('Zadejte URL')
    setAdding(true)
    try {
      const newItem = await addYoutubeItem(youtubeUrl, caption)
      setItems(prev => [...prev, newItem as GalleryItem])
      toast.success('Video přidáno')
      setAddMode(null); setYoutubeUrl(''); setCaption('')
    } catch (err: any) {
      toast.error(err.message || 'Chyba')
    } finally { setAdding(false) }
  }

  const handleCreateAlbum = async () => {
    if (!albumTitle) return toast.error('Zadejte název')
    setAdding(true)
    try {
      const newAlbum = await createGalleryAlbum(albumTitle, caption)
      let uploaded: GalleryItem[] = []

      const files = Array.from(newAlbumFileRef.current?.files ?? [])
      if (files.length > 0) {
        const toUpload = files.slice(0, MAX_ITEMS)
        setUploading({ id: newAlbum.id, progress: `0 / ${toUpload.length}` })

        for (let i = 0; i < toUpload.length; i++) {
          const fd = new FormData()
          fd.append('file', toUpload[i])
          try {
            const newItem = await uploadAlbumPhoto(newAlbum.id, fd)
            uploaded.push(newItem as GalleryItem)
            setUploading({ id: newAlbum.id, progress: `${i + 1} / ${toUpload.length}` })
          } catch {
            toast.error(`Chyba u souboru: ${toUpload[i].name}`)
          }
        }
      }

      setAlbums(prev => [...prev, { ...newAlbum, gallery_items: uploaded } as GalleryAlbum])
      toast.success(uploaded.length > 0 ? `Album vytvořeno a nahráno ${uploaded.length} fotek` : 'Album vytvořeno')
      setAddMode(null); setAlbumTitle(''); setCaption(''); setSelectedNewFiles(0); setUploading(null)
      if (newAlbumFileRef.current) newAlbumFileRef.current.value = ''
    } catch (err: any) {
      toast.error(err.message || 'Chyba')
      setUploading(null)
    } finally { setAdding(false) }
  }

  const handleDelete = async () => {
    if (!deleteConfirm) return
    const { type, id, parentId } = deleteConfirm
    try {
      if (type === 'item') {
        await deleteGalleryItem(id)
        setItems(prev => prev.filter(i => i.id !== id))
      } else if (type === 'album') {
        await deleteGalleryAlbum(id)
        setAlbums(prev => prev.filter(a => a.id !== id))
      } else if (type === 'album_photo' && parentId) {
        await deleteAlbumPhoto(id)
        setAlbums(prev => prev.map(a => a.id === parentId ? { ...a, gallery_items: a.gallery_items?.filter(i => i.id !== id) } : a))
      }
      toast.success('Smazáno')
    } catch {
      toast.error('Chyba při mazání')
    } finally {
      setDeleteConfirm(null)
    }
  }

  const handleToggleVisibility = async (type: 'item' | 'album', id: string, current: boolean) => {
    try {
      if (type === 'item') {
        await toggleGalleryItemActive(id, !current)
        setItems(prev => prev.map(i => i.id === id ? { ...i, is_active: !current } : i))
      } else {
        await toggleAlbumActive(id, !current)
        setAlbums(prev => prev.map(a => a.id === id ? { ...a, is_active: !current } : a))
      }
      toast.success(!current ? 'Zobrazeno' : 'Skryto')
    } catch {
      toast.error('Chyba')
    }
  }

  const unifiedList = [
    ...albums.map(a => ({ ...a, _type: 'album' as const })),
    ...items.map(i => ({ ...i, _type: 'item' as const }))
  ].sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))

  const moveOrder = (type: 'unified'|'photo', idx: number, dir: 'up'|'down', parentId?: string) => {
    if (type === 'photo' && parentId) {
      const list = [...(albums.find(a => a.id === parentId)?.gallery_items || [])]
      const next = dir === 'up' ? idx - 1 : idx + 1
      if (next < 0 || next >= list.length) return
      ;[list[idx], list[next]] = [list[next], list[idx]]
      setAlbums(prev => prev.map(a => a.id === parentId ? { ...a, gallery_items: list as GalleryItem[] } : a))
      updateGalleryOrder(list.map((i, iIdx) => ({ id: i.id, order_index: iIdx }))).catch(() => toast.error('Chyba řazení'))
      return
    }

    if (type === 'unified') {
      const list = [...unifiedList]
      const next = dir === 'up' ? idx - 1 : idx + 1
      if (next < 0 || next >= list.length) return
      
      ;[list[idx], list[next]] = [list[next], list[idx]]
      list.forEach((item, i) => { item.order_index = i })
      
      const newAlbums = list.filter(x => x._type === 'album') as GalleryAlbum[]
      const newItems = list.filter(x => x._type === 'item') as GalleryItem[]
      
      setAlbums(newAlbums)
      setItems(newItems)
      setOrderDirty(true)
    }
  }

  const handleSaveOrder = async () => {
    setSavingOrder(true)
    try {
      await updateGalleryOrder(items.map((i, idx) => ({ id: i.id, order_index: idx })))
      await updateAlbumOrder(albums.map((a, idx) => ({ id: a.id, order_index: idx })))
      setOrderDirty(false)
      toast.success('Pořadí uloženo')
    } catch {
      toast.error('Chyba')
    } finally {
      setSavingOrder(false)
    }
  }

  const getYoutubeThumb = (id: string) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`

  return (
    <div className="space-y-6 pb-20">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Galerie a Alba</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Spravujte samostatné položky nebo fotogalerie projektů
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {orderDirty && (
            <button onClick={handleSaveOrder} disabled={savingOrder} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 transition-colors">
              <Save size={16} /> {savingOrder ? 'Ukládám...' : 'Uložit pořadí'}
            </button>
          )}
          <button onClick={() => setAddMode('album')} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors">
            <FolderPlus size={16} /> Nové album
          </button>
          <button onClick={() => setAddMode('image')} disabled={items.length >= MAX_ITEMS} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border disabled:opacity-50" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
            <Upload size={16} /> Samostatné foto
          </button>
          <button onClick={() => setAddMode('youtube')} disabled={items.length >= MAX_ITEMS} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50">
            <Link size={16} /> YouTube Video
          </button>
        </div>
      </div>

      {/* FORMS */}
      {addMode && (
        <div className="rounded-xl p-5 border-2 animate-fade-in" style={{ background: 'var(--bg-surface)', borderColor: addMode === 'album' ? '#10b981' : addMode === 'youtube' ? '#ef4444' : 'var(--brand-primary)' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
              {addMode === 'album' ? 'Vytvořit nové album' : addMode === 'youtube' ? 'Přidat YouTube Video' : 'Nahrát samostatné foto'}
            </h2>
            <button onClick={() => setAddMode(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
          </div>

          {addMode === 'youtube' && (
            <div className="space-y-3">
              <input type="url" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} placeholder="YouTube URL..." className="w-full px-4 py-2 rounded-lg border bg-transparent" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
              <input type="text" value={caption} onChange={e => setCaption(e.target.value)} placeholder="Popisek..." className="w-full px-4 py-2 rounded-lg border bg-transparent" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
              <button onClick={handleAddYoutube} disabled={adding} className="w-full py-2 rounded-lg bg-red-500 text-white font-semibold">{adding ? 'Přidávám...' : 'Uložit video'}</button>
            </div>
          )}

          {addMode === 'album' && (
            <div className="space-y-3">
              <input type="text" value={albumTitle} onChange={e => setAlbumTitle(e.target.value)} placeholder="Název alba (např. Realizace Praha)..." className="w-full px-4 py-2 rounded-lg border bg-transparent" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
              <input type="text" value={caption} onChange={e => setCaption(e.target.value)} placeholder="Krátký popis..." className="w-full px-4 py-2 rounded-lg border bg-transparent" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }} />

              <div className="border-2 border-dashed p-4 rounded-xl text-center cursor-pointer hover:bg-gray-50/5" style={{ borderColor: 'var(--border)' }} onClick={() => !adding && newAlbumFileRef.current?.click()}>
                <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                {adding && uploading ? (
                  <p className="text-sm font-semibold text-emerald-500">Nahrávám {uploading.progress}...</p>
                ) : (
                  <p className="text-sm text-gray-400">Připojit fotky rovnou do alba (max {MAX_ITEMS})<br />
                    {selectedNewFiles > 0 && <span className="text-emerald-500 font-semibold">{selectedNewFiles} souborů vybráno</span>}
                  </p>
                )}
                <input ref={newAlbumFileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => {
                  setSelectedNewFiles(e.target.files?.length || 0)
                }} />
              </div>

              <button onClick={handleCreateAlbum} disabled={adding} className="w-full py-2 rounded-lg bg-emerald-500 text-white font-semibold">{adding ? 'Vytvářím a nahrávám...' : 'Vytvořit album'}</button>
            </div>
          )}

          {addMode === 'image' && (
            <div className="border-2 border-dashed p-8 rounded-xl text-center cursor-pointer hover:bg-gray-50/5" style={{ borderColor: 'var(--border)' }} onClick={() => !uploading && fileRef.current?.click()}>
              <Upload size={32} className="mx-auto mb-2 text-gray-400" />
              {uploading && uploading.id === null ? (
                <p className="text-sm font-semibold" style={{ color: 'var(--brand-primary)' }}>Nahrávám {uploading.progress}...</p>
              ) : <p className="text-sm text-gray-400">Klikněte pro výběr obrázků (max {MAX_ITEMS - items.length})</p>}
              <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => handleImageUpload(e, null)} />
            </div>
          )}
        </div>
      )}

      {/* UNIFIED GALLERY LIST */}
      {unifiedList.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold border-b pb-2" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>Položky a Alba</h2>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {unifiedList.map((uniItem, idx) => {
              if (uniItem._type === 'album') {
                const album = uniItem as GalleryAlbum;
                return (
                  <div key={`album-${album.id}`} className="rounded-xl border overflow-hidden" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', opacity: album.is_active ? 1 : 0.6 }}>
                    <div className="p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg line-clamp-1" style={{ color: 'var(--text-primary)' }}>{album.title}</h3>
                          <p className="text-sm text-gray-400">{album.gallery_items?.length || 0} fotografií</p>
                        </div>
                        <div className="flex gap-1">
                          <button onClick={() => moveOrder('unified', idx, 'up')} disabled={idx === 0} className="p-1 hover:bg-white/10 rounded disabled:opacity-0"><ChevronUp size={16} /></button>
                          <button onClick={() => moveOrder('unified', idx, 'down')} disabled={idx === unifiedList.length - 1} className="p-1 hover:bg-white/10 rounded disabled:opacity-0"><ChevronDown size={16} /></button>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-2">
                        <button onClick={() => setExpandedAlbumId(expandedAlbumId === album.id ? null : album.id)} className="flex-1 py-1.5 rounded-lg text-sm font-semibold bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors flex items-center justify-center gap-2">
                          <FolderOpen size={16} /> {expandedAlbumId === album.id ? 'Zavřít' : 'Spravovat'}
                        </button>
                        <button onClick={() => handleToggleVisibility('album', album.id, album.is_active)} className="px-3 py-1.5 rounded-lg border hover:bg-white/5" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                          {album.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <button onClick={() => setDeleteConfirm({ type: 'album', id: album.id })} className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {expandedAlbumId === album.id && (
                      <div className="p-4 border-t bg-black/20" style={{ borderColor: 'var(--border)' }}>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Fotografie alba</span>
                          <button
                            onClick={() => albumFileRef.current?.click()}
                            disabled={(album.gallery_items?.length || 0) >= MAX_ITEMS}
                            className="text-xs font-semibold px-2 py-1 rounded bg-amber-500 text-white disabled:opacity-50"
                          >
                            + Přidat (max {MAX_ITEMS})
                          </button>
                          <input ref={albumFileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => handleImageUpload(e, album.id)} />
                        </div>

                        {uploading && uploading.id === album.id && (
                          <div className="text-xs text-amber-500 mb-2 font-semibold">Nahrávám {uploading.progress}...</div>
                        )}

                        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin">
                          {(!album.gallery_items || album.gallery_items.length === 0) && (
                            <div className="text-sm text-gray-500 py-4 italic">Zatím žádné fotografie</div>
                          )}
                          {album.gallery_items?.map((photo, pIdx) => (
                            <div key={photo.id} className="relative group shrink-0" style={{ width: 100, height: 100 }}>
                              <img src={photo.url} alt="" className="w-full h-full object-cover rounded-lg border" style={{ borderColor: 'var(--border)' }} />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col justify-between p-1">
                                <div className="flex justify-between">
                                  <button onClick={() => moveOrder('photo', pIdx, 'up', album.id)} disabled={pIdx === 0} className="text-white hover:text-amber-400 disabled:opacity-0"><ChevronUp size={16} /></button>
                                  <button onClick={() => setDeleteConfirm({ type: 'album_photo', id: photo.id, parentId: album.id })} className="text-red-400 hover:text-red-500"><X size={16} /></button>
                                </div>
                                <div className="flex justify-center">
                                  <button onClick={() => moveOrder('photo', pIdx, 'down', album.id)} disabled={pIdx === (album.gallery_items?.length || 0) - 1} className="text-white hover:text-amber-400 disabled:opacity-0"><ChevronDown size={16} /></button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              } else {
                const item = uniItem as GalleryItem;
                return (
                  <div key={`item-${item.id}`} className="rounded-xl border overflow-hidden flex flex-col" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', opacity: item.is_active ? 1 : 0.5 }}>
                    <div className="relative h-[250px] bg-gray-900 shrink-0" style={{ backgroundImage: `url(${item.type === 'youtube' && item.youtube_id ? getYoutubeThumb(item.youtube_id) : item.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      {item.type === 'youtube' && <div className="absolute inset-0 flex items-center justify-center bg-black/30"><div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white">▶</div></div>}
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button onClick={() => handleToggleVisibility('item', item.id, item.is_active)} className="p-1.5 rounded-lg bg-white/90 text-gray-700 hover:bg-white">{item.is_active ? <Eye size={14} /> : <EyeOff size={14} />}</button>
                        <button onClick={() => setDeleteConfirm({ type: 'item', id: item.id })} className="p-1.5 rounded-lg bg-white/90 text-red-500 hover:bg-white"><Trash2 size={14} /></button>
                      </div>
                      <div className="absolute bottom-2 left-2 flex gap-1">
                        <button onClick={() => moveOrder('unified', idx, 'up')} disabled={idx === 0} className="p-1 bg-white/80 rounded hover:bg-white disabled:opacity-0"><ChevronUp size={14} /></button>
                        <button onClick={() => moveOrder('unified', idx, 'down')} disabled={idx === unifiedList.length - 1} className="p-1 bg-white/80 rounded hover:bg-white disabled:opacity-0"><ChevronDown size={14} /></button>
                      </div>
                    </div>
                    <div className="p-4 flex-1">
                      <input type="text" defaultValue={item.caption ?? ''} placeholder="Popisek fotky / videa..."
                        onBlur={async e => {
                          const val = e.target.value.trim()
                          if (val !== (item.caption ?? '')) {
                            updateGalleryCaption(item.id, val).catch(() => toast.error('Chyba uložení'))
                            setItems(prev => prev.map(i => i.id === item.id ? { ...i, caption: val || null } : i))
                          }
                        }}
                        className="w-full font-bold outline-none bg-transparent" style={{ color: 'var(--text-primary)' }}
                      />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl p-6" style={{ background: 'var(--bg-surface)' }}>
            <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Opravdu smazat?</h3>
            <p className="text-sm text-gray-400 mb-6">Tato akce je nevratná.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold border" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>Zrušit</button>
              <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600">Smazat</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
