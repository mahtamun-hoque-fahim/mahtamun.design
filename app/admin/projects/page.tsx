'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Star, X, Save, Upload } from 'lucide-react'
import type { Project } from '@/lib/db/schema'
import { CATEGORIES } from '@/lib/utils'

const EMPTY: Partial<Project> = {
  title: '', slug: '', category: 'branding', description: '', longDescription: '',
  coverImage: '', client: '', year: '', featured: false, order: 0,
}

export default function AdminProjectsPage() {
  const [items, setItems] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [form, setForm] = useState<Partial<Project>>(EMPTY)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/projects')
    const data = await res.json()
    setItems(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openAdd = () => { setForm(EMPTY); setModal('add') }
  const openEdit = (p: Project) => { setForm(p); setModal('edit') }

  const handleSave = async () => {
    setSaving(true)
    const method = modal === 'add' ? 'POST' : 'PUT'
    await fetch('/api/admin/projects', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    setModal(null)
    load()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this project?')) return
    await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' })
    load()
  }

  const toggleFeatured = async (p: Project) => {
    await fetch('/api/admin/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...p, featured: !p.featured }),
    })
    load()
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-syne font-bold text-2xl">Projects</h1>
          <p className="font-onest text-sm text-muted mt-1">{items.length} projects total</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 font-onest text-sm font-medium text-bg hover:bg-accent/90 transition-all"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-surface overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {['Title', 'Category', 'Client', 'Year', 'Featured', 'Actions'].map(h => (
                <th key={h} className="text-left px-5 py-3.5 font-mono text-xs text-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr><td colSpan={6} className="px-5 py-8 text-center font-onest text-sm text-muted">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-8 text-center font-onest text-sm text-muted">No projects yet. Add your first one.</td></tr>
            ) : (
              items.map(p => (
                <tr key={p.id} className="hover:bg-surface-2 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-onest text-sm font-medium">{p.title}</div>
                    <div className="font-mono text-xs text-muted">{p.slug}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="rounded-full bg-accent/10 text-accent px-2.5 py-0.5 font-mono text-xs">{p.category}</span>
                  </td>
                  <td className="px-5 py-3.5 font-onest text-sm text-muted">{p.client ?? '—'}</td>
                  <td className="px-5 py-3.5 font-mono text-xs text-muted">{p.year ?? '—'}</td>
                  <td className="px-5 py-3.5">
                    <button onClick={() => toggleFeatured(p)}>
                      <Star size={16} className={p.featured ? 'text-accent fill-accent' : 'text-muted'} />
                    </button>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-muted hover:text-white hover:bg-surface-2 transition-all">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg text-muted hover:text-red-400 hover:bg-red-400/10 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 backdrop-blur-sm px-4">
          <div className="w-full max-w-2xl rounded-2xl border border-border bg-surface p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-syne font-bold text-xl">{modal === 'add' ? 'Add Project' : 'Edit Project'}</h2>
              <button onClick={() => setModal(null)} className="text-muted hover:text-white"><X size={20} /></button>
            </div>

            <div className="space-y-4">
              {/* Title & Slug */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs text-muted mb-1.5 block">Title *</label>
                  <input
                    className="w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 font-onest text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none"
                    value={form.title ?? ''}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="Project title"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-muted mb-1.5 block">Slug</label>
                  <input
                    className="w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 font-onest text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none"
                    value={form.slug ?? ''}
                    onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                    placeholder="auto-generated"
                  />
                </div>
              </div>

              {/* Category & Client & Year */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="font-mono text-xs text-muted mb-1.5 block">Category</label>
                  <select
                    className="w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 font-onest text-sm text-white focus:border-accent focus:outline-none"
                    value={form.category ?? 'branding'}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-mono text-xs text-muted mb-1.5 block">Client</label>
                  <input
                    className="w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 font-onest text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none"
                    value={form.client ?? ''}
                    onChange={e => setForm(f => ({ ...f, client: e.target.value }))}
                    placeholder="Client name"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-muted mb-1.5 block">Year</label>
                  <input
                    className="w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 font-onest text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none"
                    value={form.year ?? ''}
                    onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                    placeholder="2024"
                  />
                </div>
              </div>

              {/* Cover Image URL */}
              <div>
                <label className="font-mono text-xs text-muted mb-1.5 block">Cover Image URL</label>
                <input
                  className="w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 font-onest text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none"
                  value={form.coverImage ?? ''}
                  onChange={e => setForm(f => ({ ...f, coverImage: e.target.value }))}
                  placeholder="https://res.cloudinary.com/..."
                />
              </div>

              {/* Description */}
              <div>
                <label className="font-mono text-xs text-muted mb-1.5 block">Short Description *</label>
                <textarea
                  rows={2}
                  className="w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 font-onest text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none resize-none"
                  value={form.description ?? ''}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="One-line description for portfolio grid..."
                />
              </div>

              {/* Long Description */}
              <div>
                <label className="font-mono text-xs text-muted mb-1.5 block">Long Description (Case Study)</label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 font-onest text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none resize-none"
                  value={form.longDescription ?? ''}
                  onChange={e => setForm(f => ({ ...f, longDescription: e.target.value }))}
                  placeholder="Full case study description..."
                />
              </div>

              {/* Tags */}
              <div>
                <label className="font-mono text-xs text-muted mb-1.5 block">Tags (comma-separated)</label>
                <input
                  className="w-full rounded-xl border border-border bg-surface-2 px-3 py-2.5 font-onest text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none"
                  value={form.tags?.join(', ') ?? ''}
                  onChange={e => setForm(f => ({ ...f, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))}
                  placeholder="Brand, Logo, Fintech"
                />
              </div>

              {/* Featured & Order */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured ?? false}
                    onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                    className="accent-[#00e676] h-4 w-4"
                  />
                  <span className="font-onest text-sm">Featured on homepage</span>
                </label>
                <div className="flex items-center gap-2">
                  <label className="font-mono text-xs text-muted">Order:</label>
                  <input
                    type="number"
                    className="w-16 rounded-xl border border-border bg-surface-2 px-3 py-1.5 font-mono text-sm text-white focus:border-accent focus:outline-none"
                    value={form.order ?? 0}
                    onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setModal(null)} className="rounded-xl border border-border px-5 py-2.5 font-onest text-sm hover:border-accent hover:text-accent transition-all">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 font-onest text-sm font-medium text-bg hover:bg-accent/90 disabled:opacity-60 transition-all"
              >
                <Save size={15} /> {saving ? 'Saving...' : 'Save Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
