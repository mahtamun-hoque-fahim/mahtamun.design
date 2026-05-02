import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Calendar, User } from 'lucide-react'
import { getDb } from '@/lib/db'
import { projects } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

async function getProject(slug: string) {
  try {
    const db = getDb()
    const [p] = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1)
    return p ?? null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = await getProject(slug)
  if (!p) return { title: 'Project Not Found' }
  return {
    title: p.title,
    description: p.description ?? `${p.title} — a design project by Mahtamun.`,
    openGraph: { images: p.coverImage ? [p.coverImage] : [] },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const p = await getProject(slug)
  if (!p || !p.published) notFound()

  const images = (p.images as string[]) ?? []
  const tags = (p.tags as string[]) ?? []

  return (
    <div className="pt-32 pb-28">
      <div className="container">
        {/* Back link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm mb-12 transition-colors"
          style={{ color: 'var(--col-text-2)' }}
        >
          <ArrowLeft size={14} /> Back to Work
        </Link>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-14">
          <div className="lg:col-span-2">
            <span className="tag tag-accent mb-4">{p.category}</span>
            <h1
              className="font-display font-semibold mb-5"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              {p.title}
            </h1>
            {p.description && (
              <p className="text-base leading-relaxed" style={{ color: 'var(--col-text-2)', maxWidth: 560 }}>
                {p.description}
              </p>
            )}
          </div>

          {/* Meta */}
          <div
            className="rounded-sm p-6 flex flex-col gap-4 self-start"
            style={{ background: 'var(--col-surface)', border: '1px solid var(--col-border)' }}
          >
            {p.client && (
              <div>
                <p className="admin-label flex items-center gap-1.5"><User size={11} />Client</p>
                <p className="text-sm" style={{ color: 'var(--col-text)' }}>{p.client}</p>
              </div>
            )}
            {p.year && (
              <div>
                <p className="admin-label flex items-center gap-1.5"><Calendar size={11} />Year</p>
                <p className="text-sm" style={{ color: 'var(--col-text)' }}>{p.year}</p>
              </div>
            )}
            {tags.length > 0 && (
              <div>
                <p className="admin-label mb-2">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            )}
            {p.createdAt && (
              <p className="font-mono text-xs pt-3" style={{ color: 'var(--col-text-3)', borderTop: '1px solid var(--col-border)' }}>
                Published {formatDate(p.createdAt)}
              </p>
            )}
          </div>
        </div>

        {/* Cover image */}
        {p.coverImage && (
          <div
            className="relative w-full mb-10 rounded-sm overflow-hidden"
            style={{ aspectRatio: '16/9' }}
          >
            <Image src={p.coverImage} alt={p.title} fill className="object-cover" priority />
          </div>
        )}

        {/* Body content */}
        {p.content && (
          <div
            className="prose max-w-3xl mb-14 text-base leading-relaxed"
            style={{ color: 'var(--col-text-2)' }}
          >
            {p.content!.split('\n').map((para: string, i: number) =>
              para.trim() ? (
                <p key={i} className="mb-4">
                  {para}
                </p>
              ) : null,
            )}
          </div>
        )}

        {/* Image gallery */}
        {images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
            {images.map((src, i) => (
              <div
                key={i}
                className="relative rounded-sm overflow-hidden"
                style={{ aspectRatio: '4/3' }}
              >
                <Image src={src} alt={`${p.title} — ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div
          className="rounded-sm p-10 text-center"
          style={{ background: 'var(--col-surface)', border: '1px solid var(--col-border)' }}
        >
          <h3 className="font-display text-3xl font-semibold mb-3">
            Like what you see?
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--col-text-2)' }}>
            Let&apos;s build something extraordinary together.
          </p>
          <Link href="/contact" className="btn btn-accent">
            Start a Project <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
