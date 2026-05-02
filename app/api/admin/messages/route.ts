import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { messages } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  try {
    const db = getDb()
    const all = await db.select().from(messages).orderBy(desc(messages.createdAt))
    return NextResponse.json(all)
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
