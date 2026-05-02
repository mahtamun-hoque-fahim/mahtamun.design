import { getDb } from '@/lib/db'
import { testimonials } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import { Star } from 'lucide-react'
import TestimonialActions from '@/components/admin/TestimonialActions'
import TestimonialForm from '@/components/admin/TestimonialForm'

export const dynamic = 'force-dynamic'

export default async function AdminTestimonialsPage() {
  let all: any[] = []
  try {
    const db = getDb()
    all = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt))
  } catch {}

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold">Testimonials</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--col-text-2)' }}>
          Manage client reviews shown on your site.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <h2 className="font-display text-xl font-semibold mb-5">Add Testimonial</h2>
          <TestimonialForm />
        </div>

        {/* List */}
        <div>
          <h2 className="font-display text-xl font-semibold mb-5">All Testimonials</h2>
          {all.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--col-text-3)' }}>No testimonials yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {all.map(t => (
                <div
                  key={t.id}
                  className="rounded-sm p-5 flex flex-col gap-3"
                  style={{ background: 'var(--col-surface)', border: '1px solid var(--col-border)' }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--col-text)' }}>{t.name}</p>
                      <p className="font-mono text-xs" style={{ color: 'var(--col-text-3)' }}>
                        {t.role}{t.company ? ` · ${t.company}` : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`tag ${t.published ? 'tag-accent' : ''}`}>
                        {t.published ? 'Live' : 'Hidden'}
                      </span>
                      <TestimonialActions id={t.id} published={t.published} />
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                      <Star key={i} size={11} fill="var(--col-accent)" style={{ color: 'var(--col-accent)' }} />
                    ))}
                  </div>
                  <p className="text-sm" style={{ color: 'var(--col-text-2)' }}>
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
