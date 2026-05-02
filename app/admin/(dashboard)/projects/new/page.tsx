import ProjectForm from '@/components/admin/ProjectForm'

export default function NewProjectPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold">New Project</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--col-text-2)' }}>
          Add a new project to your portfolio.
        </p>
      </div>
      <ProjectForm />
    </div>
  )
}
