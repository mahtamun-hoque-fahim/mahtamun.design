'use client'
import { CheckCircle, Info } from 'lucide-react'

export default function AdminContentPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-syne font-bold text-2xl">Content</h1>
        <p className="font-onest text-sm text-muted mt-1">Manage static site content</p>
      </div>

      <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6 mb-8 flex items-start gap-4">
        <Info size={20} className="text-accent shrink-0 mt-0.5" />
        <div>
          <p className="font-onest text-sm text-white font-medium">Content is code-managed</p>
          <p className="font-onest text-sm text-muted mt-1">
            Site content (hero text, about section, services) is currently managed via code.
            A database-driven CMS for these sections will be added in the next phase.
            Use the <strong className="text-white">Projects</strong> section to manage your portfolio items.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'Hero Section', items: ['Tagline', 'Description', 'CTA buttons'], status: 'code' },
          { title: 'About Section', items: ['Bio text', 'Skills list', 'Timeline'], status: 'code' },
          { title: 'Services Section', items: ['Service cards', 'Descriptions'], status: 'code' },
          { title: 'Portfolio Grid', items: ['Projects', 'Categories', 'Featured'], status: 'db' },
        ].map(s => (
          <div key={s.title} className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-syne font-semibold">{s.title}</h3>
              <span className={`font-mono text-xs rounded-full px-2.5 py-0.5 ${s.status === 'db' ? 'bg-accent/10 text-accent' : 'bg-muted/10 text-muted'}`}>
                {s.status === 'db' ? 'DB-managed' : 'Code-managed'}
              </span>
            </div>
            <ul className="space-y-1.5">
              {s.items.map(item => (
                <li key={item} className="flex items-center gap-2 font-onest text-sm text-muted">
                  <CheckCircle size={13} className={s.status === 'db' ? 'text-accent' : 'text-muted'} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
