import { getDb } from '@/lib/db'
import { projects, messages, testimonials } from '@/lib/db/schema'
import { eq, count, desc } from 'drizzle-orm'
import { FileImage, MessageSquare, Star, Eye } from 'lucide-react'
import { formatRelativeDate } from '@/lib/utils'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getStats() {
  try {
    const db = getDb()
    const [
      [{ total: totalProjects }],
      [{ total: publishedProjects }],
      [{ total: unreadMessages }],
      [{ total: totalTestimonials }],
      recentMessages,
    ] = await Promise.all([
      db.select({ total: count() }).from(projects),
      db.select({ total: count() }).from(projects).where(eq(projects.published, true)),
      db.select({ total: count() }).from(messages).where(eq(messages.read, false)),
      db.select({ total: count() }).from(testimonials),
      db.select().from(messages).orderBy(desc(messages.createdAt)).limit(5),
    ])
    return { totalProjects, publishedProjects, unreadMessages, totalTestimonials, recentMessages }
  } catch {
    return { totalProjects: 0, publishedProjects: 0, unreadMessages: 0, totalTestimonials: 0, recentMessages: [] }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    { label: 'Total Projects', value: stats.totalProjects, sub: `${stats.publishedProjects} published`, icon: FileImage, href: '/admin/projects' },
    { label: 'Unread Messages', value: stats.unreadMessages, sub: 'New inquiries', icon: MessageSquare, href: '/admin/messages', highlight: stats.unreadMessages > 0 },
    { label: 'Testimonials', value: stats.totalTestimonials, sub: 'Client reviews', icon: Star, href: '/admin/testimonials' },
    { label: 'Published Work', value: stats.publishedProjects, sub: 'Visible to clients', icon: Eye, href: '/admin/projects' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--col-text-2)' }}>
          Welcome back. Here&apos;s what&apos;s happening.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map(c => {
          const Icon = c.icon
          return (
            <Link
              key={c.label}
              href={c.href}
              className="rounded-sm p-5 flex flex-col gap-4 transition-colors duration-150"
              style={{
                background: 'var(--col-surface)',
                border: c.highlight ? '1px solid rgba(200,255,0,0.4)' : '1px solid var(--col-border)',
              }}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium tracking-wide uppercase" style={{ color: 'var(--col-text-2)' }}>
                  {c.label}
                </p>
                <Icon size={15} style={{ color: c.highlight ? 'var(--col-accent)' : 'var(--col-text-3)' }} />
              </div>
              <div>
                <p
                  className="font-display text-4xl font-semibold"
                  style={{ color: c.highlight ? 'var(--col-accent)' : 'var(--col-text)' }}
                >
                  {c.value}
                </p>
                <p className="font-mono text-xs mt-1" style={{ color: 'var(--col-text-3)' }}>{c.sub}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Recent messages */}
      <div className="rounded-sm" style={{ background: 'var(--col-surface)', border: '1px solid var(--col-border)' }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--col-border)' }}>
          <h2 className="font-display text-lg font-semibold">Recent Messages</h2>
          <Link href="/admin/messages" className="text-xs" style={{ color: 'var(--col-accent)' }}>
            View all
          </Link>
        </div>

        {stats.recentMessages.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-sm" style={{ color: 'var(--col-text-3)' }}>No messages yet.</p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: 'var(--col-border)' }}>
            {stats.recentMessages.map((m: any) => (
              <div key={m.id} className="px-6 py-4 flex items-start gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-display text-sm font-semibold flex-shrink-0"
                  style={{ background: 'var(--col-accent)', color: 'var(--col-accent-fg)' }}
                >
                  {m.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium" style={{ color: 'var(--col-text)' }}>{m.name}</p>
                    {!m.read && (
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--col-accent)' }} />
                    )}
                  </div>
                  <p className="text-xs truncate" style={{ color: 'var(--col-text-2)' }}>{m.message}</p>
                </div>
                <p className="font-mono text-xs flex-shrink-0" style={{ color: 'var(--col-text-3)' }}>
                  {formatRelativeDate(m.createdAt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
