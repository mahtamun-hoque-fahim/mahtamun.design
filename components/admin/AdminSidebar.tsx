'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Image, MessageSquare, FileText, LogOut, Settings, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/admin/projects', label: 'Projects', icon: Image },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/content', label: 'Content', icon: FileText },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-border bg-surface">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
          <span className="font-syne font-bold text-accent text-sm">M</span>
        </div>
        <div>
          <div className="font-syne font-bold text-sm">MAHTAMUN</div>
          <div className="font-mono text-xs text-muted">Admin Panel</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {links.map(l => {
          const active = l.exact ? pathname === l.href : pathname.startsWith(l.href) && l.href !== '/admin'
          const isAdminRoot = l.exact && pathname === '/admin'
          const isActive = l.exact ? isAdminRoot : pathname.startsWith(l.href)
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 font-onest text-sm transition-all',
                isActive
                  ? 'bg-accent/10 text-accent border border-accent/20'
                  : 'text-muted hover:bg-surface-2 hover:text-white border border-transparent'
              )}
            >
              <l.icon size={17} />
              {l.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border space-y-0.5">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-onest text-sm text-muted hover:bg-surface-2 hover:text-white transition-all border border-transparent"
        >
          <ExternalLink size={17} /> View Site
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 font-onest text-sm text-muted hover:bg-red-500/10 hover:text-red-400 transition-all border border-transparent"
        >
          <LogOut size={17} /> Logout
        </button>
      </div>
    </aside>
  )
}
