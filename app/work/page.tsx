import type { Metadata } from 'next'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import WorkGrid from '@/components/sections/WorkGrid'
import { getDb } from '@/lib/db'
import { projects } from '@/lib/db/schema'
import { asc } from 'drizzle-orm'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Portfolio of graphic design, UI/UX, branding, and web development projects.',
}

const SAMPLE_PROJECTS = [
  { id: 1, title: 'Nexus Brand Identity', slug: 'nexus-brand-identity', category: 'branding', description: 'Complete brand identity system for a fintech startup.', longDescription: null, coverImage: null, images: null, tags: ['Brand', 'Logo'], client: 'Nexus Financial', year: '2024', featured: true, order: 1, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, title: 'Bloom UI System', slug: 'bloom-ui-system', category: 'ui-ux', description: 'End-to-end UI design system for a health & wellness app.', longDescription: null, coverImage: null, images: null, tags: ['UI/UX'], client: 'Bloom Health', year: '2024', featured: true, order: 2, createdAt: new Date(), updatedAt: new Date() },
  { id: 3, title: 'Forge Wordmark', slug: 'forge-wordmark', category: 'logo', description: 'Minimalist wordmark and icon design for a SaaS tool.', longDescription: null, coverImage: null, images: null, tags: ['Logo'], client: 'Forge Labs', year: '2023', featured: true, order: 3, createdAt: new Date(), updatedAt: new Date() },
  { id: 4, title: 'Pulse Social Kit', slug: 'pulse-social-kit', category: 'social-media', description: 'Branded social media template pack with 40+ designs.', longDescription: null, coverImage: null, images: null, tags: ['Social'], client: 'Pulse Agency', year: '2024', featured: false, order: 4, createdAt: new Date(), updatedAt: new Date() },
  { id: 5, title: 'Craft Print Suite', slug: 'craft-print-suite', category: 'print', description: 'Complete print collateral: business cards, brochures, stationery.', longDescription: null, coverImage: null, images: null, tags: ['Print'], client: 'Craft Co.', year: '2023', featured: false, order: 5, createdAt: new Date(), updatedAt: new Date() },
  { id: 6, title: 'Sentri Web App', slug: 'sentri-web-app', category: 'web', description: 'Zero-knowledge encrypted password manager UI design & dev.', longDescription: null, coverImage: null, images: null, tags: ['Web', 'App'], client: 'Personal', year: '2024', featured: false, order: 6, createdAt: new Date(), updatedAt: new Date() },
]

export default async function WorkPage() {
  let allProjects = []
  try {
    const db = getDb()
    if (db) {
      allProjects = await db.select().from(projects).orderBy(asc(projects.order))
    }
  } catch {}

  const items = allProjects.length > 0 ? allProjects : SAMPLE_PROJECTS

  return (
    <>
      <Navbar />
      <main className="pt-28 px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">Portfolio</span>
            <h1 className="mt-3 font-syne font-bold text-5xl md:text-6xl">
              All <span className="text-gradient">Work</span>
            </h1>
            <p className="mt-4 font-onest text-[#888] max-w-lg">
              A curated collection of projects across branding, UI/UX, logos, social media, print, and web development.
            </p>
          </div>
          <WorkGrid projects={items as any} />
        </div>
      </main>
      <Footer />
    </>
  )
}
