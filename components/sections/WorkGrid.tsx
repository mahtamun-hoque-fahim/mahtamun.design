'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Project } from '@/lib/db/schema'

const FILTERS = ['all', 'branding', 'logo', 'ui-ux', 'social-media', 'print', 'web']

const CATEGORY_COLORS: Record<string, string> = {
  branding: 'bg-purple-500/10 text-purple-400',
  'ui-ux': 'bg-blue-500/10 text-blue-400',
  logo: 'bg-accent/10 text-accent',
  'social-media': 'bg-pink-500/10 text-pink-400',
  print: 'bg-orange-500/10 text-orange-400',
  web: 'bg-cyan-500/10 text-cyan-400',
}

export default function WorkGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState('all')

  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active)

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={cn(
              'rounded-full px-4 py-1.5 font-mono text-xs transition-all',
              active === f
                ? 'bg-accent text-bg'
                : 'border border-border text-muted hover:border-accent/40 hover:text-accent'
            )}
          >
            {f === 'all' ? 'All' : f.replace('-', ' ')}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-32 text-muted font-onest">
          No projects in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(project => {
            const catColor = CATEGORY_COLORS[project.category] ?? 'bg-accent/10 text-accent'
            return (
              <Link key={project.id} href={`/work/${project.slug}`} className="group block">
                <div className="overflow-hidden rounded-2xl border border-border bg-surface transition-all group-hover:border-accent/30">
                  <div className="relative aspect-[4/3] bg-surface-2 overflow-hidden">
                    {project.coverImage ? (
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-syne font-bold text-6xl text-[#1a1a1a]">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-bg opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-syne font-semibold text-lg leading-tight">{project.title}</h3>
                      <span className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono text-xs ${catColor}`}>
                        {project.category}
                      </span>
                    </div>
                    <p className="font-onest text-sm text-muted line-clamp-2">{project.description}</p>
                    {project.client && (
                      <p className="mt-2 font-mono text-xs text-muted">
                        Client: <span className="text-accent/70">{project.client}</span>
                        {project.year && <span className="ml-3">{project.year}</span>}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
