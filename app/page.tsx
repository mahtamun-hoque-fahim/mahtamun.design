import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import CTA from '@/components/sections/CTA'
import { getDb } from '@/lib/db'
import { projects } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export default async function HomePage() {
  let featuredProjects = []
  try {
    const db = getDb()
    if (db) {
      featuredProjects = await db.select().from(projects).where(eq(projects.featured, true))
    }
  } catch {}

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <FeaturedProjects projects={featuredProjects} />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
