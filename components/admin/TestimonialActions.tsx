'use client'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Trash2 } from 'lucide-react'

export default function TestimonialActions({ id, published }: { id: number; published: boolean }) {
  const router = useRouter()

  const toggle = async () => {
    await fetch(`/api/admin/testimonials/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !published }),
    })
    router.refresh()
  }

  const del = async () => {
    if (!confirm('Delete this testimonial?')) return
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <div className="flex gap-1">
      <button onClick={toggle} className="p-1.5" style={{ color: 'var(--col-text-3)' }} title={published ? 'Hide' : 'Publish'}>
        {published ? <EyeOff size={13} /> : <Eye size={13} />}
      </button>
      <button onClick={del} className="p-1.5" style={{ color: '#f87171' }} title="Delete">
        <Trash2 size={13} />
      </button>
    </div>
  )
}
