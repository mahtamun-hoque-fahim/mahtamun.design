'use client'
import { useState } from 'react'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import { Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const info = [
    { icon: Mail, label: 'Email', value: 'mahtamunhoquefahim@pm.me' },
    { icon: MapPin, label: 'Location', value: 'Chittagong, Bangladesh' },
    { icon: Clock, label: 'Response Time', value: 'Within 24 hours' },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-28 px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">Get in Touch</span>
            <h1 className="mt-3 font-syne font-bold text-5xl md:text-6xl">
              Let&apos;s Build<br />
              <span className="text-gradient">Something Great</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info */}
            <div>
              <p className="font-onest text-[#888] leading-relaxed max-w-md mb-12">
                Have a project in mind, a question, or just want to say hi?
                Fill out the form and I&apos;ll get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                {info.map(item => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-accent">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <div className="font-mono text-xs text-muted">{item.label}</div>
                      <div className="font-onest text-sm text-white">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 rounded-2xl border border-accent/20 bg-accent/5 p-6">
                <p className="font-syne font-semibold text-sm mb-2">Available for Freelance</p>
                <p className="font-onest text-sm text-muted">
                  Open to brand identity, UI/UX, and web development projects.
                  Long-term partnerships welcome.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-2xl border border-border bg-surface p-8">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center gap-4">
                  <CheckCircle size={48} className="text-accent" />
                  <h3 className="font-syne font-bold text-xl">Message Sent!</h3>
                  <p className="font-onest text-sm text-muted">I&apos;ll get back to you within 24 hours.</p>
                  <button onClick={() => setStatus('idle')} className="mt-4 rounded-full border border-border px-6 py-2 font-onest text-sm hover:border-accent hover:text-accent transition-all">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { key: 'name', label: 'Name', type: 'text', placeholder: 'John Doe' },
                      { key: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block font-mono text-xs text-muted mb-2">{f.label} *</label>
                        <input
                          type={f.type}
                          required
                          placeholder={f.placeholder}
                          value={form[f.key as keyof typeof form]}
                          onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                          className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 font-onest text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none transition-colors"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-muted mb-2">Subject</label>
                    <input
                      type="text"
                      placeholder="Project inquiry"
                      value={form.subject}
                      onChange={e => setForm(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 font-onest text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-muted mb-2">Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 font-onest text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 font-onest text-sm">
                      <AlertCircle size={16} /> Failed to send. Please try again.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-onest font-medium text-bg transition-all hover:bg-accent/90 disabled:opacity-60"
                  >
                    {status === 'loading' ? 'Sending...' : <><Send size={16} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
