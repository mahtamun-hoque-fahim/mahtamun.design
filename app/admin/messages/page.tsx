'use client'
import { useState, useEffect } from 'react'
import { Trash2, MailOpen, Mail, X } from 'lucide-react'
import type { Message } from '@/lib/db/schema'

export default function AdminMessagesPage() {
  const [items, setItems] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Message | null>(null)

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/messages')
    const data = await res.json()
    setItems(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const markRead = async (m: Message) => {
    await fetch('/api/admin/messages', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: m.id, read: !m.read }),
    })
    load()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this message?')) return
    await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' })
    if (selected?.id === id) setSelected(null)
    load()
  }

  const openMessage = async (m: Message) => {
    setSelected(m)
    if (!m.read) await markRead(m)
  }

  const unread = items.filter(m => !m.read).length

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-syne font-bold text-2xl">Messages</h1>
        <p className="font-onest text-sm text-muted mt-1">
          {items.length} total · <span className="text-accent">{unread} unread</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
          {loading ? (
            <div className="py-12 text-center font-onest text-sm text-muted">Loading...</div>
          ) : items.length === 0 ? (
            <div className="py-12 text-center font-onest text-sm text-muted">No messages yet.</div>
          ) : (
            <div className="divide-y divide-border">
              {items.map(m => (
                <div
                  key={m.id}
                  onClick={() => openMessage(m)}
                  className={`flex items-start gap-3 px-5 py-4 cursor-pointer transition-all hover:bg-surface-2 ${selected?.id === m.id ? 'bg-surface-2 border-l-2 border-accent' : ''}`}
                >
                  <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${m.read ? 'bg-muted' : 'bg-accent animate-pulse'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-onest text-sm ${m.read ? 'text-muted' : 'text-white font-medium'}`}>{m.name}</span>
                      <span className="font-mono text-xs text-muted shrink-0">
                        {new Date(m.createdAt!).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="font-mono text-xs text-muted truncate">{m.email}</div>
                    <div className="font-onest text-xs text-muted truncate mt-1">{m.message}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="rounded-2xl border border-border bg-surface">
          {!selected ? (
            <div className="flex flex-col items-center justify-center h-64 gap-3 text-muted">
              <Mail size={32} className="opacity-30" />
              <span className="font-onest text-sm">Select a message to read</span>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-syne font-bold text-lg">{selected.name}</h2>
                  <a href={`mailto:${selected.email}`} className="font-mono text-xs text-accent hover:opacity-70">{selected.email}</a>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => markRead(selected)}
                    className="p-2 rounded-lg text-muted hover:text-accent hover:bg-accent/10 transition-all"
                    title={selected.read ? 'Mark unread' : 'Mark read'}
                  >
                    {selected.read ? <Mail size={16} /> : <MailOpen size={16} />}
                  </button>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="p-2 rounded-lg text-muted hover:text-red-400 hover:bg-red-400/10 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {selected.subject && (
                <div className="mb-4">
                  <span className="font-mono text-xs text-muted">Subject: </span>
                  <span className="font-onest text-sm">{selected.subject}</span>
                </div>
              )}

              <div className="rounded-xl border border-border bg-surface-2 p-4">
                <p className="font-onest text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>

              <div className="mt-4 font-mono text-xs text-muted">
                Received: {new Date(selected.createdAt!).toLocaleString()}
              </div>

              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Your message'}`}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 font-onest text-sm font-medium text-bg hover:bg-accent/90 transition-all"
              >
                Reply via Email
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
