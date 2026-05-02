import { getDb } from '@/lib/db'
import { projects, testimonials } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import Hero from '@/components/sections/Hero'
import MarqueeTicker from '@/components/sections/MarqueeTicker'
import WorkGrid from '@/components/sections/WorkGrid'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import TestimonialsSection from '@/components/sections/Testimonials'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const revalidate = 60

async function getData() {
  try {
    const db = getDb()
    const [feat, testi] = await Promise.all([
      db.select().from(projects).where(and(eq(projects.featured, true), eq(projects.published, true))).orderBy(desc(projects.createdAt)).limit(6),
      db.select().from(testimonials).where(eq(testimonials.published, true)).orderBy(desc(testimonials.createdAt)).limit(3),
    ])
    return { featuredProjects: feat, testimonials: testi }
  } catch {
    return { featuredProjects: [], testimonials: [] }
  }
}

export default async function HomePage() {
  const { featuredProjects, testimonials: testi } = await getData()

  return (
    <>
      <Hero featuredProjects={featuredProjects} />
      <MarqueeTicker />

      {/* Selected work preview */}
      {featuredProjects.length > 0 && (
        <section className="py-28">
          <div className="container">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="section-label mb-4">Portfolio</p>
                <h2 className="font-display font-semibold" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)' }}>
                  Selected Work
                </h2>
              </div>
              <Link href="/work" className="btn btn-ghost gap-2">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <WorkGrid projects={featuredProjects} showFilter={false} limit={6} />
          </div>
        </section>
      )}

      <Services />
      <Process />
      <TestimonialsSection testimonials={testi} />
    </>
  )
}
