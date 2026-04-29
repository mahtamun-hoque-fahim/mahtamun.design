import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-bg">
      <AdminSidebar />
      <div className="flex-1 ml-60 p-8">
        {children}
      </div>
    </div>
  )
}
