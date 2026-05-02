import { notFound } from 'next/navigation'
import { getDb } from '@/lib/db'
import { projects } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import ProjectForm from '@/components/admin/ProjectForm'

interface Props { params: Promise<{ id: string }> }

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params
  let project = null
  try {
    const db = getDb()
    const [p] = await db.select().from(projects).where(eq(projects.id, Number(id))).limit(1)
    project = p ?? null
  } catch {}

  if (!project) notFound()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold">Edit Project</h1>
        <p className="text-sm mt-1 font-mono" style={{ color: 'var(--col-text-3)' }}>
          {project.slug}
        </p>
      </div>
      <ProjectForm initial={project} id={project.id} />
    </div>
  )
}
