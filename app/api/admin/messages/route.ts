import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { messages } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'

function isAuthenticated() {
  const token = cookies().get('admin-token')?.value
  return !!token
}

export async function GET() {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = getDb()
  if (!db) return NextResponse.json({ error: 'DB unavailable' }, { status: 503 })

  const all = await db.select().from(messages).orderBy(messages.createdAt)
  return NextResponse.json(all)
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = getDb()
  if (!db) return NextResponse.json({ error: 'DB unavailable' }, { status: 503 })

  const { id, read } = await req.json()
  const [updated] = await db.update(messages).set({ read }).where(eq(messages.id, id)).returning()
  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = getDb()
  if (!db) return NextResponse.json({ error: 'DB unavailable' }, { status: 503 })

  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get('id'))

  await db.delete(messages).where(eq(messages.id, id))
  return NextResponse.json({ ok: true })
}
