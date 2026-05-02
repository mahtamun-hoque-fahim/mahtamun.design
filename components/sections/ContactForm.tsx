'use client'
import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { BUDGETS, SERVICES } from '@/lib/utils'

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '', email: '', subject: '', message: '', budget: '', service: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '', budget: '', service: '' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-sm p-12 flex flex-col items-center justify-center text-center gap-5 min-h-96"
        style={{ background: 'var(--col-surface)', border: '1px solid var(--col-border)' }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: 'var(--col-accent-dim)' }}
        >
          <CheckCircle size={28} style={{ color: 'var(--col-accent)' }} />
        </div>
        <div>
          <h3 className="font-display text-2xl font-semibold mb-2">Message sent!</h3>
          <p className="text-sm" style={{ color: 'var(--col-text-2)' }}>
            I&apos;ll get back to you within 24 hours.
          </p>
        </div>
        <button onClick={() => setStatus('idle')} className="btn btn-outline text-xs">
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-sm p-8 flex flex-col gap-6"
      style={{ background: 'var(--col-surface)', border: '1px solid var(--col-border)' }}
    >
      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="admin-label" htmlFor="name">Name *</label>
          <input
            id="name"
            className="admin-input"
            placeholder="Your full name"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="admin-label" htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            className="admin-input"
            placeholder="your@email.com"
            value={form.email}
            onChange={e => set('email', e.target.value)}
            required
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="admin-label" htmlFor="service">Service</label>
          <select
            id="service"
            className="admin-input"
            value={form.service}
            onChange={e => set('service', e.target.value)}
          >
            <option value="">Select service…</option>
            {SERVICES.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="admin-label" htmlFor="budget">Budget</label>
          <select
            id="budget"
            className="admin-input"
            value={form.budget}
            onChange={e => set('budget', e.target.value)}
          >
            <option value="">Select budget…</option>
            {BUDGETS.map(b => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Subject */}
      <div>
        <label className="admin-label" htmlFor="subject">Subject</label>
        <input
          id="subject"
          className="admin-input"
          placeholder="Project subject"
          value={form.subject}
          onChange={e => set('subject', e.target.value)}
        />
      </div>

      {/* Message */}
      <div>
        <label className="admin-label" htmlFor="message">Message *</label>
        <textarea
          id="message"
          className="admin-input resize-none"
          rows={5}
          placeholder="Tell me about your project, goals and timeline…"
          value={form.message}
          onChange={e => set('message', e.target.value)}
          required
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm text-red-400">
          <AlertCircle size={14} /> Something went wrong. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn btn-accent self-start"
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            Sending…
          </span>
        ) : (
          <>Send Message <Send size={13} /></>
        )}
      </button>
    </form>
  )
}
