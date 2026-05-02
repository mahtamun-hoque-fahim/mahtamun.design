import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/lib/db/schema'

interface HeroProps {
  featuredProjects: Project[]
}

const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, #C8FF00 0%, #00e676 100%)',
  'linear-gradient(135deg, #7B2FBE 0%, #3FA4F4 100%)',
  'linear-gradient(135deg, #FF4136 0%, #FF85A1 100%)',
  'linear-gradient(135deg, #FF8C00 0%, #FFEF00 100%)',
]

export default function Hero({ featuredProjects }: HeroProps) {
  const items = featuredProjects.slice(0, 4)

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16">
      <div className="container flex flex-col lg:flex-row items-center gap-16 py-20 lg:py-0 lg:min-h-screen">

        {/* Left — Text */}
        <div className="flex-1 flex flex-col gap-8" style={{ maxWidth: 560 }}>

          {/* Availability badge */}
          <div className="flex items-center gap-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: 'var(--col-accent)', animation: 'pulseDot 2s ease-in-out infinite' }}
            />
            <span
              className="font-mono text-xs tracking-[0.18em] uppercase"
              style={{ color: 'var(--col-accent)' }}
            >
              Available for projects — {new Date().getFullYear()}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-semibold"
            style={{ fontSize: 'clamp(3.2rem, 7vw, 6.5rem)', lineHeight: 1.02 }}
          >
            I Design Brands{' '}
            <em
              className="italic"
              style={{ color: 'var(--col-accent)' }}
            >
              People
            </em>
            <br />
            Can&apos;t Ignore.
          </h1>

          {/* Sub */}
          <p
            className="font-sans text-base leading-relaxed"
            style={{ color: 'var(--col-text-2)', maxWidth: 420 }}
          >
            Graphic design, brand identity & UI/UX for startups and businesses that want to
            command attention and convert visitors into customers.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/work" className="btn btn-accent">
              View My Work <ArrowRight size={14} />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Book a Call
            </Link>
          </div>

          {/* Stats */}
          <div
            className="flex gap-8 pt-6"
            style={{ borderTop: '1px solid var(--col-border)' }}
          >
            {[
              { n: '50+', label: 'Projects' },
              { n: '30+', label: 'Clients' },
              { n: '5yr', label: 'Experience' },
            ].map(s => (
              <div key={s.label}>
                <p
                  className="font-display font-semibold text-2xl"
                  style={{ color: 'var(--col-text)' }}
                >
                  {s.n}
                </p>
                <p className="font-mono text-xs tracking-wider mt-0.5" style={{ color: 'var(--col-text-3)' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Image collage */}
        <div className="flex-1 w-full hidden lg:grid grid-cols-2 gap-3" style={{ maxWidth: 520, height: 560 }}>
          {[0, 1, 2, 3].map(i => {
            const project = items[i]
            return (
              <div
                key={i}
                className="relative overflow-hidden rounded-sm group"
                style={{
                  gridRow: i === 0 ? 'span 1' : undefined,
                  background: project?.coverImage ? undefined : PLACEHOLDER_GRADIENTS[i],
                }}
              >
                {project?.coverImage ? (
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-end p-4">
                    <span
                      className="font-display italic text-sm opacity-60"
                      style={{ color: '#070707' }}
                    >
                      {['Brand Identity', 'UI/UX Design', 'Logo Design', 'Social Media'][i]}
                    </span>
                  </div>
                )}
                {project && (
                  <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(7,7,7,0.9) 0%, transparent 60%)' }}>
                    <p className="font-sans text-xs text-white">{project.title}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--col-text-3)' }}>
          scroll
        </span>
        <div
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, var(--col-text-3), transparent)' }}
        />
      </div>
    </section>
  )
}
