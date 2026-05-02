'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, FileImage, MessageSquare, Star, FileText,
  ExternalLink, LogOut,
} from 'lucide-react'

const nav = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/projects', icon: FileImage, label: 'Projects' },
  { href: '/admin/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/admin/testimonials', icon: Star, label: 'Testimonials' },
  { href: '/admin/content', icon: FileText, label: 'Content' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 flex flex-col"
      style={{
        width: 240,
        background: 'var(--col-surface)',
        borderRight: '1px solid var(--col-border)',
        zIndex: 40,
      }}
    >
      {/* Logo */}
      <div className="px-6 py-6" style={{ borderBottom: '1px solid var(--col-border)' }}>
        <p className="font-display text-lg font-semibold">
          MAHTAMUN<span style={{ color: 'var(--col-accent)' }}>.design</span>
        </p>
        <p className="font-mono text-xs mt-0.5" style={{ color: 'var(--col-text-3)' }}>
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {nav.map(({ href, icon: Icon, label }) => {
          const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors duration-150"
              style={{
                background: active ? 'var(--col-surface-2)' : 'transparent',
                color: active ? 'var(--col-text)' : 'var(--col-text-2)',
                borderLeft: active ? '2px solid var(--col-accent)' : '2px solid transparent',
              }}
            >
              <Icon size={15} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 flex flex-col gap-0.5" style={{ borderTop: '1px solid var(--col-border)' }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors duration-150"
          style={{ color: 'var(--col-text-2)' }}
        >
          <ExternalLink size={15} /> View Site
        </a>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors duration-150 w-full"
          style={{ color: 'var(--col-text-2)' }}
        >
          <LogOut size={15} /> Logout
        </button>
      </div>
    </aside>
  )
}
