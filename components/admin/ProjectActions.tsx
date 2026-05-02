'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2, ExternalLink } from 'lucide-react'
import { useState } from 'react'

export default function ProjectActions({ id, slug }: { id: number; slug: string }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Delete this project? This cannot be undone.')) return
    setDeleting(true)
    await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
    router.refresh()
    setDeleting(false)
  }

  return (
    <div className="flex items-center gap-1">
      <a
        href={`/work/${slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 rounded transition-colors"
        style={{ color: 'var(--col-text-3)' }}
        title="View"
      >
        <ExternalLink size={13} />
      </a>
      <Link
        href={`/admin/projects/${id}`}
        className="p-1.5 rounded transition-colors"
        style={{ color: 'var(--col-text-3)' }}
        title="Edit"
      >
        <Pencil size={13} />
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="p-1.5 rounded transition-colors"
        style={{ color: deleting ? 'var(--col-text-3)' : '#f87171' }}
        title="Delete"
      >
        <Trash2 size={13} />
      </button>
    </div>
  )
}
