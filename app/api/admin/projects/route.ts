import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { projects } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { slugify } from '@/lib/utils'

function isAuthenticated() {
  const token = cookies().get('admin-token')?.value
  return !!token
}

export async function GET() {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = getDb()
  if (!db) return NextResponse.json({ error: 'DB unavailable' }, { status: 503 })

  const all = await db.select().from(projects).orderBy(projects.order)
  return NextResponse.json(all)
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = getDb()
  if (!db) return NextResponse.json({ error: 'DB unavailable' }, { status: 503 })

  const body = await req.json()
  const slug = body.slug || slugify(body.title)

  const [created] = await db.insert(projects).values({ ...body, slug }).returning()
  return NextResponse.json(created)
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = getDb()
  if (!db) return NextResponse.json({ error: 'DB unavailable' }, { status: 503 })

  const body = await req.json()
  const { id, ...data } = body

  const [updated] = await db.update(projects).set({ ...data, updatedAt: new Date() }).where(eq(projects.id, id)).returning()
  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = getDb()
  if (!db) return NextResponse.json({ error: 'DB unavailable' }, { status: 503 })

  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get('id'))

  await db.delete(projects).where(eq(projects.id, id))
  return NextResponse.json({ ok: true })
}
