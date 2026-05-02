import { getDb } from '@/lib/db'
import { projects } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import Link from 'next/link'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import ProjectActions from '@/components/admin/ProjectActions'

export const dynamic = 'force-dynamic'

export default async function AdminProjectsPage() {
  let allProjects: any[] = []
  try {
    const db = getDb()
    allProjects = await db.select().from(projects).orderBy(desc(projects.createdAt))
  } catch {}

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold">Projects</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--col-text-2)' }}>
            {allProjects.length} projects total
          </p>
        </div>
        <Link href="/admin/projects/new" className="btn btn-accent">
          <Plus size={14} /> New Project
        </Link>
      </div>

      {allProjects.length === 0 ? (
        <div
          className="rounded-sm py-20 text-center"
          style={{ border: '1px dashed var(--col-border)' }}
        >
          <p className="font-display italic text-2xl mb-3" style={{ color: 'var(--col-text-3)' }}>
            No projects yet
          </p>
          <Link href="/admin/projects/new" className="btn btn-accent">
            <Plus size={14} /> Add First Project
          </Link>
        </div>
      ) : (
        <div className="rounded-sm overflow-hidden" style={{ border: '1px solid var(--col-border)' }}>
          <table className="w-full text-sm">
            <thead style={{ background: 'var(--col-surface-2)', borderBottom: '1px solid var(--col-border)' }}>
              <tr>
                <th className="text-left px-5 py-3 font-medium text-xs tracking-widest uppercase" style={{ color: 'var(--col-text-3)' }}>Project</th>
                <th className="text-left px-5 py-3 font-medium text-xs tracking-widest uppercase hidden sm:table-cell" style={{ color: 'var(--col-text-3)' }}>Category</th>
                <th className="text-left px-5 py-3 font-medium text-xs tracking-widest uppercase hidden md:table-cell" style={{ color: 'var(--col-text-3)' }}>Client</th>
                <th className="text-left px-5 py-3 font-medium text-xs tracking-widest uppercase" style={{ color: 'var(--col-text-3)' }}>Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody style={{ background: 'var(--col-surface)' }}>
              {allProjects.map((p: any, i: number) => (
                <tr
                  key={p.id}
                  style={{ borderTop: i > 0 ? '1px solid var(--col-border)' : undefined }}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-sm overflow-hidden flex-shrink-0"
                        style={{ background: 'var(--col-surface-2)', border: '1px solid var(--col-border)' }}
                      >
                        {p.coverImage && (
                          <Image src={p.coverImage} alt={p.title} width={40} height={40} className="object-cover w-full h-full" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: 'var(--col-text)' }}>{p.title}</p>
                        <p className="font-mono text-xs" style={{ color: 'var(--col-text-3)' }}>{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden sm:table-cell">
                    <span className="tag">{p.category}</span>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <span style={{ color: 'var(--col-text-2)' }}>{p.client ?? '—'}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`tag ${p.published ? 'tag-accent' : ''}`}>
                      {p.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <ProjectActions id={p.id} slug={p.slug} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
