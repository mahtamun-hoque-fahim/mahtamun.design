'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/db/schema'
import { CATEGORIES } from '@/lib/utils'

interface WorkGridProps {
  projects: Project[]
  showFilter?: boolean
  limit?: number
}

const ALL = [{ value: 'all', label: 'All' }, ...CATEGORIES]

export default function WorkGrid({ projects, showFilter = true, limit }: WorkGridProps) {
  const [active, setActive] = useState('all')

  const filtered = projects.filter(p => active === 'all' || p.category === active)
  const display = limit ? filtered.slice(0, limit) : filtered

  if (projects.length === 0) {
    return (
      <div
        className="rounded-sm py-24 text-center"
        style={{ border: '1px dashed var(--col-border)' }}
      >
        <p className="font-display italic text-2xl mb-3" style={{ color: 'var(--col-text-3)' }}>
          No projects yet
        </p>
        <p className="text-sm" style={{ color: 'var(--col-text-3)' }}>
          Add your first project from the{' '}
          <Link href="/admin" style={{ color: 'var(--col-accent)' }}>
            admin dashboard
          </Link>
          .
        </p>
      </div>
    )
  }

  return (
    <div>
      {showFilter && (
        <div className="flex flex-wrap gap-2 mb-10">
          {ALL.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              className="btn text-xs"
              style={{
                background: active === cat.value ? 'var(--col-accent)' : 'var(--col-surface)',
                color: active === cat.value ? 'var(--col-accent-fg)' : 'var(--col-text-2)',
                border: `1px solid ${active === cat.value ? 'transparent' : 'var(--col-border)'}`,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {display.map((p, i) => (
          <Link
            key={p.id}
            href={`/work/${p.slug}`}
            className="group relative overflow-hidden rounded-sm block"
            style={{
              background: 'var(--col-surface)',
              border: '1px solid var(--col-border)',
              aspectRatio: i % 5 === 0 ? '16/10' : '4/3',
            }}
          >
            {p.coverImage ? (
              <Image
                src={p.coverImage}
                alt={p.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, var(--col-surface-2), var(--col-border))' }}
              />
            )}

            {/* Overlay */}
            <div
              className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{ background: 'linear-gradient(to top, rgba(7,7,7,0.95) 0%, transparent 60%)' }}
            >
              <span className="tag tag-accent mb-2">{p.category}</span>
              <h3 className="font-display text-xl font-semibold text-white">{p.title}</h3>
              {p.client && (
                <p className="font-mono text-xs mt-1" style={{ color: 'var(--col-text-2)' }}>
                  {p.client} · {p.year}
                </p>
              )}
            </div>

            {/* Arrow icon */}
            <div
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0"
              style={{ background: 'var(--col-accent)' }}
            >
              <ArrowUpRight size={14} color="var(--col-accent-fg)" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
