import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { projects } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

interface Props { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Props) {
  const { id } = await params
  try {
    const db = getDb()
    const [p] = await db.select().from(projects).where(eq(projects.id, Number(id))).limit(1)
    if (!p) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(p)
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: Props) {
  const { id } = await params
  try {
    const body = await req.json()
    const db = getDb()
    const [updated] = await db
      .update(projects)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(projects.id, Number(id)))
      .returning()
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: Props) {
  const { id } = await params
  try {
    const db = getDb()
    await db.delete(projects).where(eq(projects.id, Number(id)))
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
