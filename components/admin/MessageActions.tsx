'use client'
import { useRouter } from 'next/navigation'
import { MailOpen, Mail, Trash2 } from 'lucide-react'

export default function MessageActions({ id, read }: { id: number; read: boolean }) {
  const router = useRouter()

  const toggle = async () => {
    await fetch(`/api/admin/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: !read }),
    })
    router.refresh()
  }

  const del = async () => {
    if (!confirm('Delete this message?')) return
    await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <div className="flex items-center gap-1">
      <button onClick={toggle} className="p-1.5 rounded" style={{ color: 'var(--col-text-3)' }} title={read ? 'Mark unread' : 'Mark read'}>
        {read ? <Mail size={13} /> : <MailOpen size={13} />}
      </button>
      <button onClick={del} className="p-1.5 rounded" style={{ color: '#f87171' }} title="Delete">
        <Trash2 size={13} />
      </button>
    </div>
  )
}
