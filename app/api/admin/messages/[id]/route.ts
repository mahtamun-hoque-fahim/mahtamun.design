import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { messages } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

interface Props { params: Promise<{ id: string }> }

export async function PATCH(req: NextRequest, { params }: Props) {
  const { id } = await params
  try {
    const body = await req.json()
    const db = getDb()
    const [updated] = await db
      .update(messages)
      .set(body)
      .where(eq(messages.id, Number(id)))
      .returning()
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: Props) {
  const { id } = await params
  try {
    const db = getDb()
    await db.delete(messages).where(eq(messages.id, Number(id)))
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
