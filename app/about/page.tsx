import type { Metadata } from 'next'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import Link from 'next/link'
import { ArrowRight, Award, Briefcase, GraduationCap } from 'lucide-react'
import CTA from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'About',
  description: 'Mahtamun Hoque Fahim — Graphic Designer, UI/UX Designer & Full-Stack Developer from Bangladesh.',
}

const skills = [
  { group: 'Design Tools', items: ['Figma', 'Adobe Illustrator', 'Photoshop', 'InDesign', 'After Effects'] },
  { group: 'Development', items: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'PostgreSQL'] },
  { group: 'Specialties', items: ['Brand Identity', 'UI/UX', 'Logo Design', 'Design Systems', 'Typography'] },
]

const timeline = [
  { year: '2024', title: 'Independent Designer & Developer', org: 'MAHTAMUN Studio', icon: Briefcase },
  { year: '2023', title: 'UI/UX Designer', org: 'Freelance', icon: Award },
  { year: '2022', title: 'Graphic Design', org: 'Started Design Journey', icon: GraduationCap },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 px-6 pb-0">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="font-mono text-xs text-accent uppercase tracking-widest">About</span>
              <h1 className="mt-3 font-syne font-bold text-5xl md:text-6xl leading-tight">
                Designer who<br />
                <span className="text-gradient">codes.</span>
              </h1>
            </div>
            <div>
              <p className="font-onest text-[#888] leading-relaxed mb-6">
                Hi, I&apos;m Mahtamun Hoque Fahim — a graphic designer, UI/UX designer, and full-stack
                developer based in Chittagong, Bangladesh. I operate independently under the MAHTAMUN brand.
              </p>
              <p className="font-onest text-[#888] leading-relaxed mb-6">
                I bridge the gap between visual design and engineering — creating brands that look stunning
                and products that work flawlessly. From a wordmark to a full SaaS platform, I handle both sides.
              </p>
              <p className="font-onest text-[#888] leading-relaxed">
                My work is rooted in precision, restraint, and a deep respect for craft. I believe good design
                is invisible — it simply works.
              </p>
              <div className="mt-10 flex gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-onest font-medium text-bg transition-all hover:bg-accent/90"
                >
                  Work with Me <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-24 border-t border-border pt-16">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">Toolkit</span>
            <h2 className="mt-3 font-syne font-bold text-3xl mb-10">Skills & Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skills.map(s => (
                <div key={s.group} className="rounded-2xl border border-border bg-surface p-6">
                  <h3 className="font-syne font-semibold mb-4 text-sm text-accent">{s.group}</h3>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map(item => (
                      <span key={item} className="rounded-full border border-border px-3 py-1 font-mono text-xs text-[#ccc]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-24 border-t border-border pt-16">
            <span className="font-mono text-xs text-accent uppercase tracking-widest">Journey</span>
            <h2 className="mt-3 font-syne font-bold text-3xl mb-10">Experience</h2>
            <div className="space-y-6">
              {timeline.map((t, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-accent">
                    <t.icon size={18} />
                  </div>
                  <div className="flex-1 border-b border-border pb-6">
                    <div className="font-mono text-xs text-muted mb-1">{t.year}</div>
                    <div className="font-syne font-semibold">{t.title}</div>
                    <div className="font-onest text-sm text-accent/70">{t.org}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <CTA />
      </main>
      <Footer />
    </>
  )
}
