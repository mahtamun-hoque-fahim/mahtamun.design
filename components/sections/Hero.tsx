'use client'
import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'
import { useEffect, useState } from 'react'

const roles = ['Graphic Designer', 'UI/UX Designer', 'Brand Strategist', 'Visual Storyteller']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setRoleIndex(i => (i + 1) % roles.length)
        setVisible(true)
      }, 400)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center px-6 pt-20 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#00e676 1px, transparent 1px), linear-gradient(90deg, #00e676 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow blob */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl w-full">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs text-accent">Available for work</span>
          </div>

          <h1 className="font-syne font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6">
            Crafting{' '}
            <span className="text-gradient">Identities</span>
            <br />
            That{' '}
            <span
              className={`inline-block transition-all duration-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
              style={{ minWidth: '280px' }}
            >
              {roles[roleIndex]}
            </span>
          </h1>

          <p className="font-onest text-lg text-[#888] max-w-xl leading-relaxed mb-10">
            I design compelling brand identities, digital interfaces, and visual systems
            that connect businesses with their audience. Based in Bangladesh, working globally.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-onest font-medium text-bg transition-all hover:bg-accent/90 hover:gap-3"
            >
              View Work <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-onest text-sm text-[#ccc] transition-all hover:border-accent hover:text-accent"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-12">
          {[
            { num: '50+', label: 'Projects Completed' },
            { num: '30+', label: 'Happy Clients' },
            { num: '4+', label: 'Years Experience' },
            { num: '15+', label: 'Awards & Recognition' },
          ].map(s => (
            <div key={s.label}>
              <div className="font-syne font-bold text-3xl text-accent">{s.num}</div>
              <div className="font-onest text-sm text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
