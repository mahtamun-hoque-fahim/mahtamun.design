import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'

export default function CTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/5 to-transparent p-12 md:p-16">
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
          <div className="relative max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5">
              <Zap size={12} className="text-accent" />
              <span className="font-mono text-xs text-accent">Open to Opportunities</span>
            </div>
            <h2 className="font-syne font-bold text-4xl md:text-5xl leading-tight mb-6">
              Have a project in mind?<br />
              <span className="text-gradient">Let&apos;s make it real.</span>
            </h2>
            <p className="font-onest text-[#888] leading-relaxed mb-10">
              Whether it&apos;s a brand launch, a design system, or a complete digital product —
              I bring clarity, craft, and creative energy to every project.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-onest font-medium text-bg transition-all hover:bg-accent/90 hover:gap-3"
              >
                Start a Project <ArrowRight size={16} />
              </Link>
              <a
                href="mailto:mahtamunhoquefahim@pm.me"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-onest text-sm text-[#ccc] transition-all hover:border-accent hover:text-accent"
              >
                Send an Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
