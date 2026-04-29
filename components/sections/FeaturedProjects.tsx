import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/db/schema'

const PLACEHOLDER_PROJECTS: Project[] = [
  {
    id: 1, title: 'Nexus Brand Identity', slug: 'nexus-brand-identity',
    category: 'branding', description: 'Complete brand identity system for a fintech startup including logo, color palette, and brand guidelines.',
    longDescription: null, coverImage: null, images: null, tags: ['Brand Identity', 'Logo', 'Fintech'],
    client: 'Nexus Financial', year: '2024', featured: true, order: 1,
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 2, title: 'Bloom UI System', slug: 'bloom-ui-system',
    category: 'ui-ux', description: 'End-to-end UI design system for a health & wellness app. 80+ components, dark/light modes.',
    longDescription: null, coverImage: null, images: null, tags: ['UI/UX', 'Design System', 'Mobile'],
    client: 'Bloom Health', year: '2024', featured: true, order: 2,
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 3, title: 'Forge Wordmark', slug: 'forge-wordmark',
    category: 'logo', description: 'Minimalist wordmark and icon design for a SaaS productivity tool, built to scale across digital and print.',
    longDescription: null, coverImage: null, images: null, tags: ['Logo', 'Wordmark', 'SaaS'],
    client: 'Forge Labs', year: '2023', featured: true, order: 3,
    createdAt: new Date(), updatedAt: new Date(),
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  branding: 'bg-purple-500/10 text-purple-400',
  'ui-ux': 'bg-blue-500/10 text-blue-400',
  logo: 'bg-accent/10 text-accent',
  'social-media': 'bg-pink-500/10 text-pink-400',
  print: 'bg-orange-500/10 text-orange-400',
  web: 'bg-cyan-500/10 text-cyan-400',
}

function ProjectCard({ project }: { project: Project }) {
  const catColor = CATEGORY_COLORS[project.category] ?? 'bg-accent/10 text-accent'
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="overflow-hidden rounded-2xl border border-border bg-surface transition-all group-hover:border-accent/30">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-surface-2 overflow-hidden">
          {project.coverImage ? (
            <Image src={project.coverImage} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="font-syne font-bold text-6xl text-[#1a1a1a]">
                {project.title.charAt(0)}
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-bg opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
            <ArrowUpRight size={16} />
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-syne font-semibold text-lg leading-tight">{project.title}</h3>
            <span className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono text-xs ${catColor}`}>
              {project.category}
            </span>
          </div>
          <p className="font-onest text-sm text-muted line-clamp-2">{project.description}</p>
          {project.tags && project.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map(tag => (
                <span key={tag} className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default function FeaturedProjects({ projects }: { projects?: Project[] }) {
  const items = projects && projects.length > 0 ? projects : PLACEHOLDER_PROJECTS
  return (
    <section className="px-6 py-24 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <span className="font-mono text-xs text-accent uppercase tracking-widest">Portfolio</span>
            <h2 className="mt-3 font-syne font-bold text-4xl md:text-5xl">
              Selected <span className="text-gradient">Work</span>
            </h2>
          </div>
          <Link href="/work" className="hidden md:inline-flex items-center gap-2 font-onest text-sm text-muted border border-border rounded-full px-5 py-2.5 hover:border-accent hover:text-accent transition-all">
            All Projects <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.slice(0, 3).map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link href="/work" className="inline-flex items-center gap-2 font-onest text-sm text-muted border border-border rounded-full px-5 py-2.5 hover:border-accent hover:text-accent transition-all">
            View All Work <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
