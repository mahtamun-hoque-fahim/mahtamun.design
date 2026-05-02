'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TestimonialForm() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', role: '', company: '', content: '', rating: '5' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/admin/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, rating: Number(form.rating) }),
    })
    if (res.ok) {
      setStatus('success')
      setForm({ name: '', role: '', company: '', content: '', rating: '5' })
      router.refresh()
      setTimeout(() => setStatus('idle'), 2000)
    } else {
      setStatus('idle')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-sm p-6 flex flex-col gap-4"
      style={{ background: 'var(--col-surface)', border: '1px solid var(--col-border)' }}
    >
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="admin-label">Name *</label>
          <input className="admin-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Client name" required />
        </div>
        <div>
          <label className="admin-label">Rating</label>
          <select className="admin-input" value={form.rating} onChange={e => set('rating', e.target.value)}>
            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} stars</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="admin-label">Role</label>
          <input className="admin-input" value={form.role} onChange={e => set('role', e.target.value)} placeholder="CEO" />
        </div>
        <div>
          <label className="admin-label">Company</label>
          <input className="admin-input" value={form.company} onChange={e => set('company', e.target.value)} placeholder="Acme Inc." />
        </div>
      </div>
      <div>
        <label className="admin-label">Testimonial *</label>
        <textarea className="admin-input resize-none" rows={4} value={form.content} onChange={e => set('content', e.target.value)} placeholder="What the client said…" required />
      </div>
      <button type="submit" disabled={status === 'loading'} className="btn btn-accent self-start">
        {status === 'loading' ? (
          <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
        ) : status === 'success' ? '✓ Added!' : 'Add Testimonial'}
      </button>
    </form>
  )
}
