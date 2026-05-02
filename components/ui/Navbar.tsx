'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(7,7,7,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--col-border)' : '1px solid transparent',
        }}
      >
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1 group">
            <span
              className="font-display text-xl font-semibold tracking-tight"
              style={{ color: 'var(--col-text)' }}
            >
              MAHTAMUN
            </span>
            <span
              className="font-mono text-xs"
              style={{ color: 'var(--col-accent)' }}
            >
              .design
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="font-sans text-sm tracking-wide transition-colors duration-200"
                style={{
                  color: pathname === l.href ? 'var(--col-text)' : 'var(--col-text-2)',
                }}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-accent text-xs">
              Hire Me
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden p-2"
            style={{ color: 'var(--col-text-2)' }}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-300"
        style={{
          background: 'var(--col-bg)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transform: open ? 'translateY(0)' : 'translateY(-8px)',
        }}
      >
        <div className="container pt-24 flex flex-col gap-6">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="font-display text-4xl italic font-light border-b pb-4"
              style={{ borderColor: 'var(--col-border)', color: 'var(--col-text)' }}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-accent mt-4 self-start">
            Hire Me
          </Link>
        </div>
      </div>
    </>
  )
}
