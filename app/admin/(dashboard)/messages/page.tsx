import { getDb } from '@/lib/db'
import { messages } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import { formatRelativeDate } from '@/lib/utils'
import MessageActions from '@/components/admin/MessageActions'

export const dynamic = 'force-dynamic'

export default async function AdminMessagesPage() {
  let allMessages: any[] = []
  try {
    const db = getDb()
    allMessages = await db.select().from(messages).orderBy(desc(messages.createdAt))
  } catch {}

  const unread = allMessages.filter(m => !m.read).length

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold">Messages</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--col-text-2)' }}>
          {allMessages.length} total · {unread} unread
        </p>
      </div>

      {allMessages.length === 0 ? (
        <div className="rounded-sm py-20 text-center" style={{ border: '1px dashed var(--col-border)' }}>
          <p className="font-display italic text-2xl" style={{ color: 'var(--col-text-3)' }}>No messages yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {allMessages.map(m => (
            <div
              key={m.id}
              className="rounded-sm p-5 flex flex-col gap-3"
              style={{
                background: m.read ? 'var(--col-surface)' : 'var(--col-surface-2)',
                border: m.read ? '1px solid var(--col-border)' : '1px solid rgba(200,255,0,0.2)',
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-display font-semibold text-sm flex-shrink-0"
                    style={{ background: 'var(--col-accent)', color: 'var(--col-accent-fg)' }}
                  >
                    {m.name[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium" style={{ color: 'var(--col-text)' }}>{m.name}</p>
                      {!m.read && (
                        <span className="tag tag-accent">New</span>
                      )}
                    </div>
                    <a href={`mailto:${m.email}`} className="font-mono text-xs" style={{ color: 'var(--col-accent)' }}>
                      {m.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <p className="font-mono text-xs" style={{ color: 'var(--col-text-3)' }}>
                    {formatRelativeDate(m.createdAt)}
                  </p>
                  <MessageActions id={m.id} read={m.read} />
                </div>
              </div>

              {(m.service || m.budget) && (
                <div className="flex gap-2">
                  {m.service && <span className="tag">{m.service}</span>}
                  {m.budget && <span className="tag">{m.budget}</span>}
                </div>
              )}

              {m.subject && (
                <p className="text-sm font-medium" style={{ color: 'var(--col-text)' }}>{m.subject}</p>
              )}

              <p className="text-sm leading-relaxed" style={{ color: 'var(--col-text-2)' }}>
                {m.message}
              </p>

              <div className="flex gap-3 pt-1">
                <a
                  href={`mailto:${m.email}?subject=Re: ${m.subject || 'Your inquiry'}`}
                  className="btn btn-accent text-xs"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
