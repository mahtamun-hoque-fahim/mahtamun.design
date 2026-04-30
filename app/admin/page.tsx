import { getDb } from '@/lib/db'
import { projects, messages, reviews } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { Image, MessageSquare, Star, TrendingUp } from 'lucide-react'

async function getStats() {
  try {
    const db = getDb()
    if (!db) return { projects: 0, messages: 0, unread: 0, reviews: 0 }

    const [pCount] = await db.select({ count: projects.id }).from(projects)
    const [mCount] = await db.select({ count: messages.id }).from(messages)
    const [uCount] = await db.select({ count: messages.id }).from(messages).where(eq(messages.read, false))
    const [rCount] = await db.select({ count: reviews.id }).from(reviews)

    return {
      projects: pCount?.count ?? 0,
      messages: mCount?.count ?? 0,
      unread: uCount?.count ?? 0,
      reviews: rCount?.count ?? 0,
    }
  } catch {
    return { projects: 0, messages: 0, unread: 0, reviews: 0 }
  }
}

async function getRecentMessages() {
  try {
    const db = getDb()
    if (!db) return []
    return await db.select().from(messages).orderBy(messages.createdAt).limit(5)
  } catch { return [] }
}

export default async function AdminDashboard() {
  const stats = await getStats()
  const recentMessages = await getRecentMessages()

  const cards = [
    { label: 'Total Projects', value: stats.projects, icon: Image, color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
    { label: 'Total Messages', value: stats.messages, icon: MessageSquare, color: 'text-accent bg-accent/10 border-accent/20' },
    { label: 'Unread Messages', value: stats.unread, icon: TrendingUp, color: 'text-orange-400 bg-orange-400/10 border-orange-400/20' },
    { label: 'Reviews', value: stats.reviews, icon: Star, color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-syne font-bold text-2xl">Dashboard</h1>
        <p className="font-onest text-sm text-muted mt-1">Welcome back, Fahim.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map(c => (
          <div key={c.label} className="rounded-2xl border border-border bg-surface p-5">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${c.color} mb-4`}>
              <c.icon size={18} />
            </div>
            <div className="font-syne font-bold text-3xl">{c.value}</div>
            <div className="font-onest text-xs text-muted mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Messages */}
      <div className="rounded-2xl border border-border bg-surface">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-syne font-semibold text-sm">Recent Messages</h2>
          <a href="/admin/messages" className="font-mono text-xs text-accent hover:opacity-70 transition-opacity">View All →</a>
        </div>
        <div className="divide-y divide-border">
          {recentMessages.length === 0 ? (
            <div className="px-6 py-8 text-center font-onest text-sm text-muted">No messages yet.</div>
          ) : (
            recentMessages.map((m: typeof recentMessages[0]) => (
              <div key={m.id} className="flex items-start gap-4 px-6 py-4">
                <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${m.read ? 'bg-muted' : 'bg-accent'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-onest text-sm font-medium">{m.name}</span>
                    <span className="font-mono text-xs text-muted">{m.email}</span>
                  </div>
                  <p className="font-onest text-xs text-muted truncate mt-0.5">{m.message}</p>
                </div>
                <span className="font-mono text-xs text-muted shrink-0">
                  {new Date(m.createdAt!).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
