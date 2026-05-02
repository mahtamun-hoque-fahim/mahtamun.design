'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X, AlertCircle } from 'lucide-react'
import { CATEGORIES } from '@/lib/utils'
import type { Project } from '@/lib/db/schema'

interface ProjectFormProps {
  initial?: Partial<Project>
  id?: number
}

export default function ProjectForm({ initial, id }: ProjectFormProps) {
  const router = useRouter()
  const [form, setForm] = useState({
    title: initial?.title ?? '',
    category: initial?.category ?? 'branding',
    description: initial?.description ?? '',
    content: initial?.content ?? '',
    coverImage: initial?.coverImage ?? '',
    client: initial?.client ?? '',
    year: initial?.year?.toString() ?? new Date().getFullYear().toString(),
    featured: initial?.featured ?? false,
    published: initial?.published ?? true,
    tagInput: '',
    tags: (initial?.tags as string[]) ?? [],
    imageInput: '',
    images: (initial?.images as string[]) ?? [],
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  const addTag = () => {
    const t = form.tagInput.trim()
    if (t && !form.tags.includes(t)) set('tags', [...form.tags, t])
    set('tagInput', '')
  }

  const addImage = () => {
    const url = form.imageInput.trim()
    if (url && !form.images.includes(url)) set('images', [...form.images, url])
    set('imageInput', '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) { setError('Title is required'); return }
    setStatus('loading'); setError('')

    const payload = {
      title: form.title,
      category: form.category,
      description: form.description || null,
      content: form.content || null,
      coverImage: form.coverImage || null,
      client: form.client || null,
      year: form.year ? Number(form.year) : null,
      tags: form.tags,
      images: form.images,
      featured: form.featured,
      published: form.published,
    }

    const url = id ? `/api/admin/projects/${id}` : '/api/admin/projects'
    const method = id ? 'PATCH' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push('/admin/projects')
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error ?? 'Something went wrong')
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-3xl">
      {/* Title + Category */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label className="admin-label">Title *</label>
          <input className="admin-input" placeholder="Project title" value={form.title} onChange={e => set('title', e.target.value)} required />
        </div>
        <div>
          <label className="admin-label">Category</label>
          <select className="admin-input" value={form.category} onChange={e => set('category', e.target.value)}>
            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
      </div>

      {/* Client + Year */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Client</label>
          <input className="admin-input" placeholder="Client name" value={form.client} onChange={e => set('client', e.target.value)} />
        </div>
        <div>
          <label className="admin-label">Year</label>
          <input className="admin-input" type="number" placeholder="2024" value={form.year} onChange={e => set('year', e.target.value)} />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="admin-label">Short Description</label>
        <textarea className="admin-input resize-none" rows={2} placeholder="Brief project overview…" value={form.description} onChange={e => set('description', e.target.value)} />
      </div>

      {/* Cover image */}
      <div>
        <label className="admin-label">Cover Image URL</label>
        <input className="admin-input" placeholder="https://res.cloudinary.com/…" value={form.coverImage} onChange={e => set('coverImage', e.target.value)} />
        {form.coverImage && (
          <div className="mt-2 relative w-32 h-20 rounded-sm overflow-hidden" style={{ border: '1px solid var(--col-border)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={form.coverImage} alt="Cover preview" className="object-cover w-full h-full" />
          </div>
        )}
      </div>

      {/* Gallery images */}
      <div>
        <label className="admin-label">Gallery Images</label>
        <div className="flex gap-2 mb-2">
          <input
            className="admin-input"
            placeholder="Image URL"
            value={form.imageInput}
            onChange={e => set('imageInput', e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addImage() } }}
          />
          <button type="button" onClick={addImage} className="btn btn-outline px-3 flex-shrink-0">
            <Plus size={14} />
          </button>
        </div>
        {form.images.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {form.images.map((url, i) => (
              <div key={i} className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-16 h-12 object-cover rounded-sm" style={{ border: '1px solid var(--col-border)' }} />
                <button
                  type="button"
                  onClick={() => set('images', form.images.filter((_, j) => j !== i))}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: '#ef4444' }}
                >
                  <X size={9} color="white" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tags */}
      <div>
        <label className="admin-label">Tags</label>
        <div className="flex gap-2 mb-2">
          <input
            className="admin-input"
            placeholder="Add tag…"
            value={form.tagInput}
            onChange={e => set('tagInput', e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
          />
          <button type="button" onClick={addTag} className="btn btn-outline px-3 flex-shrink-0">
            <Plus size={14} />
          </button>
        </div>
        {form.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {form.tags.map(t => (
              <span key={t} className="tag flex items-center gap-1.5">
                {t}
                <button type="button" onClick={() => set('tags', form.tags.filter(x => x !== t))}>
                  <X size={9} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Long-form content */}
      <div>
        <label className="admin-label">Project Story / Case Study</label>
        <textarea
          className="admin-input resize-y"
          rows={6}
          placeholder="Describe the project in detail — goals, process, outcome…"
          value={form.content}
          onChange={e => set('content', e.target.value)}
        />
      </div>

      {/* Toggles */}
      <div className="flex gap-6">
        {[
          { key: 'published', label: 'Published (visible to public)' },
          { key: 'featured', label: 'Featured on homepage' },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2.5 cursor-pointer select-none">
            <div
              className="w-9 h-5 rounded-full relative transition-colors duration-200"
              style={{ background: form[key as keyof typeof form] ? 'var(--col-accent)' : 'var(--col-border-2)' }}
              onClick={() => set(key, !form[key as keyof typeof form])}
            >
              <div
                className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                style={{ transform: form[key as keyof typeof form] ? 'translateX(18px)' : 'translateX(2px)' }}
              />
            </div>
            <span className="text-sm" style={{ color: 'var(--col-text-2)' }}>{label}</span>
          </label>
        ))}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-400">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={status === 'loading'} className="btn btn-accent">
          {status === 'loading' ? (
            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : id ? 'Save Changes' : 'Create Project'}
        </button>
        <button type="button" onClick={() => router.back()} className="btn btn-outline">
          Cancel
        </button>
      </div>
    </form>
  )
}
