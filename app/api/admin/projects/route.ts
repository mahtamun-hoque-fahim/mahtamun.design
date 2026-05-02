import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { projects } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import { slugify } from '@/lib/utils'

export async function GET() {
  try {
    const db = getDb()
    const all = await db.select().from(projects).orderBy(desc(projects.createdAt))
    return NextResponse.json(all)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, category, description, content, coverImage, images, client, year, tags, featured, published } = body

    if (!title?.trim()) return NextResponse.json({ error: 'Title required' }, { status: 400 })

    const db = getDb()
    const slug = slugify(title) + '-' + Date.now().toString(36)

    const [created] = await db
      .insert(projects)
      .values({
        title: title.trim(),
        slug,
        category: category ?? 'branding',
        description: description ?? null,
        content: content ?? null,
        coverImage: coverImage ?? null,
        images: images ?? [],
        client: client ?? null,
        year: year ? Number(year) : null,
        tags: tags ?? [],
        featured: featured ?? false,
        published: published ?? true,
      })
      .returning()

    return NextResponse.json(created, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 })
  }
}
