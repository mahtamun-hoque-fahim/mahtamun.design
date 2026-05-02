import type { Metadata } from 'next'
import { getDb } from '@/lib/db'
import { projects } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import WorkGrid from '@/components/sections/WorkGrid'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Graphic design, brand identity and UI/UX projects by Mahtamun Hoque Fahim.',
}

export const revalidate = 60

async function getProjects() {
  try {
    const db = getDb()
    return db.select().from(projects).where(eq(projects.published, true)).orderBy(desc(projects.createdAt))
  } catch {
    return []
  }
}

export default async function WorkPage() {
  const allProjects = await getProjects()

  return (
    <div className="pt-32 pb-28">
      <div className="container">
        <div className="mb-14">
          <p className="section-label mb-4">Portfolio</p>
          <h1
            className="font-display font-semibold mb-5"
            style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
          >
            All Work
          </h1>
          <p className="text-base max-w-xl" style={{ color: 'var(--col-text-2)' }}>
            A collection of brand identities, UI/UX projects and visual design work crafted for
            clients across the globe.
          </p>
        </div>

        <WorkGrid projects={allProjects} showFilter={true} />
      </div>
    </div>
  )
}
