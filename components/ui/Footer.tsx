import Link from 'next/link'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

const socials = [
  { href: 'https://github.com/mahtamun-hoque-fahim', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/mahtamun-hoque-fahim', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:mahtamunhoquefahim@pm.me', icon: Mail, label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <Link href="/" className="font-syne font-bold text-lg tracking-tight">
              MAHTAMUN<span className="text-accent">.</span>
            </Link>
            <p className="mt-1 font-onest text-sm text-muted">
              Graphic Designer & UI/UX — Bangladesh
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-accent hover:text-accent"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border pt-8">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} Mahtamun Hoque Fahim. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Work', 'About', 'Contact'].map(l => (
              <Link
                key={l}
                href={`/${l.toLowerCase()}`}
                className="font-onest text-xs text-muted transition-colors hover:text-accent"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
