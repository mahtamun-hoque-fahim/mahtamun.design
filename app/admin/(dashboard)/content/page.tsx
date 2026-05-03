import { getDb } from '@/lib/db'
import { siteContent } from '@/lib/db/schema'
import ContentEditor from '@/components/admin/ContentEditor'
import HeroTilesEditor from '@/components/admin/HeroTilesEditor'

export const dynamic = 'force-dynamic'

const DEFAULT_CONTENT = [
  { key: 'hero.headline', value: "I Design Brands People Can't Ignore.", type: 'text', label: 'Hero Headline' },
  { key: 'hero.subtext', value: 'Graphic design, brand identity & UI/UX for startups and businesses that want to command attention and convert visitors into customers.', type: 'text', label: 'Hero Subtext' },
  { key: 'about.bio', value: "I'm Mahtamun Hoque Fahim — a graphic designer and UI/UX designer from Bangladesh.", type: 'textarea', label: 'About Bio' },
  { key: 'contact.email', value: 'mahtamunhoquefahim@pm.me', type: 'text', label: 'Contact Email' },
  { key: 'social.github', value: 'https://github.com/mahtamun-hoque-fahim', type: 'text', label: 'GitHub URL' },
  { key: 'social.linkedin', value: 'https://linkedin.com/in/mahtamun-hoque-fahim', type: 'text', label: 'LinkedIn URL' },
]

const HERO_TILE_KEYS = ['hero.tile.0', 'hero.tile.1', 'hero.tile.2', 'hero.tile.3']

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

  const tileImages = Object.fromEntries(
    HERO_TILE_KEYS.map(key => [
      key,
      existing.find(e => e.key === key)?.value ?? '',
    ])
  )

  return (
    <div className="p-8 flex flex-col gap-12">
      <div>
        <h1 className="font-display text-3xl font-semibold">Site Content</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--col-text-2)' }}>
          Manage text content and images across your portfolio.
        </p>
      </div>

      <div
        className="rounded-sm p-6"
        style={{ background: 'var(--col-surface)', border: '1px solid var(--col-border)' }}
      >
        <HeroTilesEditor initial={tileImages} />
      </div>

      <div>
        <h2 className="font-display text-xl font-semibold mb-5">Text Content</h2>
        <ContentEditor fields={merged} />
      </div>
    </div>
  )
}
