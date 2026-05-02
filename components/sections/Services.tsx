import { Layers, Monitor, Share2, Printer } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    n: '01',
    icon: Layers,
    title: 'Brand Identity',
    desc: 'Complete visual identity systems that communicate who you are and why you matter. Logo, colour palette, typography, and brand guidelines built to last.',
    deliverables: ['Logo design', 'Brand guidelines', 'Colour system', 'Typography', 'Business collateral'],
  },
  {
    n: '02',
    icon: Monitor,
    title: 'UI/UX Design',
    desc: 'Interfaces that are beautiful and effortless. From wireframes to polished high-fidelity designs your developers can build from.',
    deliverables: ['Web design', 'App design', 'Design system', 'Prototyping', 'User flows'],
  },
  {
    n: '03',
    icon: Share2,
    title: 'Social Media',
    desc: 'Scroll-stopping content designs for every platform. Consistent, on-brand visuals that build recognition and engagement.',
    deliverables: ['Post templates', 'Story templates', 'Reel thumbnails', 'Profile setup', 'Ad creatives'],
  },
  {
    n: '04',
    icon: Printer,
    title: 'Print Design',
    desc: 'Print-ready designs that make a lasting impression in the physical world. Every detail crafted for production.',
    deliverables: ['Business cards', 'Brochures', 'Flyers', 'Banners', 'Packaging'],
  },
]

export default function Services() {
  return (
    <section className="py-28">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="section-label mb-4">Services</p>
            <h2
              className="font-display font-semibold"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              What I Do
            </h2>
          </div>
          <Link href="/contact" className="btn btn-outline self-start sm:self-auto">
            Get a Quote
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'var(--col-border)' }}>
          {services.map(s => {
            const Icon = s.icon
            return (
              <div
                key={s.n}
                className="group p-8 flex flex-col gap-5 transition-colors duration-300"
                style={{ background: 'var(--col-bg)' }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLDivElement).style.background = 'var(--col-surface)'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLDivElement).style.background = 'var(--col-bg)'
                }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center"
                    style={{ background: 'var(--col-accent-dim)', border: '1px solid rgba(200,255,0,0.15)' }}
                  >
                    <Icon size={18} style={{ color: 'var(--col-accent)' }} />
                  </div>
                  <span
                    className="font-mono text-xs"
                    style={{ color: 'var(--col-text-3)' }}
                  >
                    {s.n}
                  </span>
                </div>

                <div>
                  <h3
                    className="font-display text-2xl font-semibold mb-3"
                    style={{ color: 'var(--col-text)' }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--col-text-2)' }}>
                    {s.desc}
                  </p>
                </div>

                <ul className="flex flex-wrap gap-2 mt-auto">
                  {s.deliverables.map(d => (
                    <li key={d} className="tag">{d}</li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
