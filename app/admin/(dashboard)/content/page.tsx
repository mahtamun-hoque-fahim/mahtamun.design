import { getDb } from '@/lib/db'
import { siteContent } from '@/lib/db/schema'
import ContentEditor from '@/components/admin/ContentEditor'

export const dynamic = 'force-dynamic'

const DEFAULT_CONTENT = [
  { key: 'hero.headline', value: "I Design Brands People Can't Ignore.", type: 'text', label: 'Hero Headline' },
  { key: 'hero.subtext', value: 'Graphic design, brand identity & UI/UX for startups and businesses that want to command attention and convert visitors into customers.', type: 'text', label: 'Hero Subtext' },
  { key: 'about.bio', value: "I'm Mahtamun Hoque Fahim — a graphic designer and UI/UX designer from Bangladesh.", type: 'textarea', label: 'About Bio' },
  { key: 'contact.email', value: 'mahtamunhoquefahim@pm.me', type: 'text', label: 'Contact Email' },
  { key: 'social.github', value: 'https://github.com/mahtamun-hoque-fahim', type: 'text', label: 'GitHub URL' },
  { key: 'social.linkedin', value: 'https://linkedin.com/in/mahtamun-hoque-fahim', type: 'text', label: 'LinkedIn URL' },
]

export default async function AdminContentPage() {
  let existing: any[] = []
  try {
    const db = getDb()
    existing = await db.select().from(siteContent)
  } catch {}

  const merged = DEFAULT_CONTENT.map(d => {
    const found = existing.find(e => e.key === d.key)
    return { ...d, value: found?.value ?? d.value }
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold">Site Content</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--col-text-2)' }}>
          Edit text content across your portfolio without touching code.
        </p>
      </div>
      <ContentEditor fields={merged} />
    </div>
  )
}
