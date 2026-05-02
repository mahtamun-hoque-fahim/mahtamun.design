import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: 'var(--col-bg)' }}>
      <AdminSidebar />
      <main className="flex-1 min-w-0 overflow-auto" style={{ marginLeft: 240 }}>
        {children}
      </main>
    </div>
  )
}
