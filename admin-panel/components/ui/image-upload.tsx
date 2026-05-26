'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

type StorageBucket = 'heroes' | 'services' | 'gallery' | 'realizations' | 'articles'

interface ImageUploadProps {
  bucket: StorageBucket
  onUpload: (url: string) => void
  currentUrl?: string | null
  label?: string
  className?: string
}

export function ImageUpload({
  bucket,
  onUpload,
  currentUrl,
  label = 'Vybrat obrázek',
  className = '',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null)
  const inputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Vyberte prosím obrázek (JPG, PNG, WebP, atd.)')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('Obrázek je příliš velký (max 10 MB)')
      return
    }

    setUploading(true)
    setProgress(10)

    // Local preview immediately
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    try {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      setProgress(30)

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, { upsert: true, cacheControl: '3600' })

      if (uploadError) throw uploadError

      setProgress(80)

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(fileName)

      setProgress(100)
      setPreview(publicUrl)
      onUpload(publicUrl)
    } catch (err: any) {
      console.error('Upload failed:', err)
      alert(`Nahrávání selhalo: ${err?.message || 'Neznámá chyba'}`)
      setPreview(currentUrl ?? null)
    } finally {
      setUploading(false)
      setTimeout(() => setProgress(0), 500)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) uploadFile(file)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPreview(null)
    onUpload('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className={`image-upload-root ${className}`}>
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragOver ? 'var(--brand-primary)' : 'var(--border)'}`,
          borderRadius: '12px',
          padding: preview ? '8px' : '24px',
          cursor: uploading ? 'wait' : 'pointer',
          background: dragOver ? 'rgba(245,158,11,0.05)' : 'var(--bg-surface)',
          transition: 'all 0.2s ease',
          position: 'relative',
          overflow: 'hidden',
          minHeight: preview ? 'auto' : '120px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        {/* Progress bar */}
        {uploading && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '3px',
            width: `${progress}%`,
            background: 'var(--brand-primary)',
            transition: 'width 0.3s ease',
            borderRadius: '0 2px 0 0',
          }} />
        )}

        {preview ? (
          // Preview mode
          <div style={{ position: 'relative', width: '100%' }}>
            <img
              src={preview}
              alt="Náhled"
              style={{
                width: '100%',
                maxHeight: '180px',
                objectFit: 'cover',
                borderRadius: '8px',
                display: 'block',
                opacity: uploading ? 0.6 : 1,
              }}
            />
            {!uploading && (
              <button
                onClick={handleClear}
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(15,23,42,0.7)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
                title="Odebrat obrázek"
              >
                <X size={14} />
              </button>
            )}
            {uploading && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.5)',
                borderRadius: '8px',
              }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-primary)' }}>
                  Nahrávám {progress}%
                </span>
              </div>
            )}
          </div>
        ) : (
          // Empty state
          <>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '10px',
              background: 'rgba(245,158,11,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {uploading ? (
                <Upload size={20} style={{ color: 'var(--brand-primary)', animation: 'pulse 1s infinite' }} />
              ) : (
                <ImageIcon size={20} style={{ color: 'var(--brand-primary)' }} />
              )}
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500, textAlign: 'center' }}>
              {uploading ? `Nahrávám... ${progress}%` : label}
            </p>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Přetáhněte sem nebo klikněte · max 10 MB
            </p>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={uploading}
        style={{ display: 'none' }}
      />
    </div>
  )
}
