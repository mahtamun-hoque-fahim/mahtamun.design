'use client'
import { useState, useRef } from 'react'
import { Upload, Check, Loader2, ImageIcon } from 'lucide-react'

const TILES = [
  { key: 'hero.tile.0', label: 'Brand Identity', index: 0 },
  { key: 'hero.tile.1', label: 'UI/UX Design',   index: 1 },
  { key: 'hero.tile.2', label: 'Logo Design',     index: 2 },
  { key: 'hero.tile.3', label: 'Social Media',    index: 3 },
]

interface Props {
  initial: Record<string, string>
}

export default function HeroTilesEditor({ initial }: Props) {
  const [images, setImages] = useState<Record<string, string>>(initial)
  const [uploading, setUploading] = useState<Record<string, boolean>>({})
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const upload = async (key: string, file: File) => {
    setUploading(u => ({ ...u, [key]: true }))
    setErrors(e => ({ ...e, [key]: '' }))

    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'mahtamun-design/hero-tiles')

      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Upload failed')

      // Save URL to siteContent
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value: data.url, type: 'image' }),
      })

      setImages(i => ({ ...i, [key]: data.url }))
      setSaved(s => ({ ...s, [key]: true }))
      setTimeout(() => setSaved(s => ({ ...s, [key]: false })), 2500)
    } catch (err: any) {
      setErrors(e => ({ ...e, [key]: err.message }))
    } finally {
      setUploading(u => ({ ...u, [key]: false }))
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-xl font-semibold">Hero Tiles</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--col-text-2)' }}>
          Upload images for the 4 category tiles shown on the homepage hero.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4" style={{ maxWidth: 640 }}>
        {TILES.map(tile => {
          const img = images[tile.key]
          const isUploading = uploading[tile.key]
          const isSaved = saved[tile.key]
          const error = errors[tile.key]

          return (
            <div
              key={tile.key}
              className="rounded-sm overflow-hidden"
              style={{ border: '1px solid var(--col-border)', background: 'var(--col-surface)' }}
            >
              {/* Image Preview */}
              <div
                className="relative w-full cursor-pointer group"
                style={{ aspectRatio: '1 / 1' }}
                onClick={() => inputRefs.current[tile.key]?.click()}
              >
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={img}
                    alt={tile.label}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center gap-2"
                    style={{ background: 'var(--col-surface-2)' }}
                  >
                    <ImageIcon size={28} style={{ color: 'var(--col-text-3)' }} />
                    <span className="font-mono text-xs" style={{ color: 'var(--col-text-3)' }}>
                      No image
                    </span>
                  </div>
                )}

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'rgba(7,7,7,0.7)' }}
                >
                  {isUploading ? (
                    <Loader2 size={24} className="animate-spin" style={{ color: 'var(--col-accent)' }} />
                  ) : isSaved ? (
                    <Check size={24} style={{ color: 'var(--col-accent)' }} />
                  ) : (
                    <Upload size={24} style={{ color: 'var(--col-accent)' }} />
                  )}
                </div>
              </div>

              {/* Label + button */}
              <div className="p-3 flex items-center justify-between gap-2">
                <div>
                  <p className="font-mono text-xs font-medium" style={{ color: 'var(--col-text)' }}>
                    {tile.label}
                  </p>
                  {error && (
                    <p className="font-mono text-xs mt-0.5" style={{ color: '#ff4444' }}>{error}</p>
                  )}
                </div>
                <button
                  onClick={() => inputRefs.current[tile.key]?.click()}
                  disabled={isUploading}
                  className="btn text-xs flex-shrink-0 flex items-center gap-1.5"
                  style={{
                    background: isSaved ? 'var(--col-accent-dim)' : 'var(--col-surface-2)',
                    color: isSaved ? 'var(--col-accent)' : 'var(--col-text-2)',
                    border: `1px solid ${isSaved ? 'var(--col-accent)' : 'var(--col-border)'}`,
                  }}
                >
                  {isUploading ? (
                    <><Loader2 size={11} className="animate-spin" /> Uploading</>
                  ) : isSaved ? (
                    <><Check size={11} /> Saved</>
                  ) : (
                    <><Upload size={11} /> {img ? 'Replace' : 'Upload'}</>
                  )}
                </button>
              </div>

              <input
                ref={el => { inputRefs.current[tile.key] = el }}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0]
                  if (file) upload(tile.key, file)
                  e.target.value = ''
                }}
              />
            </div>
          )
        })}
      </div>

      <p className="font-mono text-xs mt-4" style={{ color: 'var(--col-text-3)' }}>
        Click a tile or the Upload button to select an image. Changes go live immediately.
      </p>
    </div>
  )
}
