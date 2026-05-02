import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'Mahtamun Hoque Fahim — graphic designer, brand identity specialist and UI/UX designer from Bangladesh.',
}

const skills = [
  { cat: 'Design Tools', items: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'Adobe InDesign', 'After Effects'] },
  { cat: 'Specialties', items: ['Brand Identity', 'Logo Design', 'UI/UX', 'Typography', 'Motion Graphics'] },
  { cat: 'Tech', items: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer', 'React'] },
]

const experience = [
  { year: '2024–Now', role: 'Independent Creative Director', company: 'MAHTAMUN', desc: 'Running a one-person design studio serving clients globally.' },
  { year: '2022–2024', role: 'Senior Graphic Designer', company: 'Freelance', desc: 'Brand identity and digital design for 30+ startups and SMEs.' },
  { year: '2020–2022', role: 'Junior Designer', company: 'Studio XYZ', desc: 'UI/UX and print design for local and regional clients.' },
]

export default function AboutPage() {
  return (
    <div className="pt-32 pb-28">
      <div className="container">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <p className="section-label mb-6">About Me</p>
            <h1
              className="font-display font-semibold mb-6"
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
            >
              Designer &amp; Creative with an obsession for detail.
            </h1>
          </div>
          <div className="flex flex-col justify-end gap-5">
            <p className="text-base leading-relaxed" style={{ color: 'var(--col-text-2)' }}>
              I&apos;m <strong style={{ color: 'var(--col-text)' }}>Mahtamun Hoque Fahim</strong> — a
              graphic designer, brand identity specialist and UI/UX designer based in Bangladesh.
              I work under the <strong style={{ color: 'var(--col-accent)' }}>MAHTAMUN</strong> brand,
              helping startups and businesses build visual identities that command attention and convert.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--col-text-2)' }}>
              With 5+ years of experience, I&apos;ve worked with clients across Bangladesh, the Middle
              East and Europe — from early-stage startups to established companies. I believe great
              design isn&apos;t decoration; it&apos;s strategy made visible.
            </p>
            <div className="flex gap-4 mt-2">
              <Link href="/contact" className="btn btn-accent">
                Work With Me <ArrowRight size={14} />
              </Link>
              <a
                href="https://github.com/mahtamun-hoque-fahim"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                GitHub <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-24">
          <p className="section-label mb-10">Skills &amp; Tools</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: 'var(--col-border)' }}>
            {skills.map(s => (
              <div key={s.cat} className="p-8" style={{ background: 'var(--col-surface)' }}>
                <p className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: 'var(--col-accent)' }}>
                  {s.cat}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {s.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--col-text-2)' }}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--col-accent)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <p className="section-label mb-10">Experience</p>
          <div className="flex flex-col gap-0" style={{ borderLeft: '1px solid var(--col-border)' }}>
            {experience.map((e, i) => (
              <div key={i} className="pl-8 pb-10 relative">
                <span
                  className="absolute left-0 top-1 w-2 h-2 rounded-full -translate-x-1/2"
                  style={{ background: i === 0 ? 'var(--col-accent)' : 'var(--col-border-2)' }}
                />
                <p className="font-mono text-xs mb-2" style={{ color: 'var(--col-text-3)' }}>{e.year}</p>
                <h3 className="font-display text-xl font-semibold mb-1" style={{ color: 'var(--col-text)' }}>
                  {e.role}
                </h3>
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--col-accent)' }}>{e.company}</p>
                <p className="text-sm" style={{ color: 'var(--col-text-2)' }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
