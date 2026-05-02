import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ borderTop: '1px solid var(--col-border)', background: 'var(--col-bg)' }}>
      {/* CTA band */}
      <div className="container py-24 text-center">
        <p className="section-label justify-center mb-6">Let&apos;s Collaborate</p>
        <h2
          className="font-display italic mb-8"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05 }}
        >
          Ready to make something
          <br />
          <span style={{ color: 'var(--col-accent)' }}>unforgettable?</span>
        </h2>
        <Link href="/contact" className="btn btn-accent text-sm">
          Start a Project <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="divider" />

      {/* Bottom row */}
      <div className="container py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="font-display text-sm font-semibold tracking-widest">
          MAHTAMUN<span style={{ color: 'var(--col-accent)' }}>.design</span>
        </Link>

        <nav className="flex items-center gap-6">
          {[['/', 'Home'], ['/work', 'Work'], ['/about', 'About'], ['/contact', 'Contact']].map(
            ([href, label]) => (
              <Link
                key={href}
                href={href}
                className="text-xs tracking-wide transition-colors"
                style={{ color: 'var(--col-text-3)' }}
              >
                {label}
              </Link>
            ),
          )}
        </nav>

        <p className="text-xs" style={{ color: 'var(--col-text-3)' }}>
          © {year} Mahtamun Hoque Fahim
        </p>
      </div>
    </footer>
  )
}
