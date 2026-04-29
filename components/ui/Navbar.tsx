'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-bg/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-syne font-bold text-xl tracking-tight">
          <span className="text-white">MAHTAMUN</span>
          <span className="text-accent">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'font-onest text-sm transition-colors hover:text-accent',
                pathname === l.href ? 'text-accent' : 'text-[#999]'
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-accent px-5 py-2 font-onest text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            Hire Me
          </Link>
        </div>

        {/* Mobile */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-[#999] hover:text-white transition-colors">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-xl">
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'py-3 font-onest text-sm border-b border-border/40 transition-colors hover:text-accent',
                  pathname === l.href ? 'text-accent' : 'text-[#999]'
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
