import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { siteContent } from '@/lib/db/schema'

export async function GET() {
  try {
    const db = getDb()
    const all = await db.select().from(siteContent)
    return NextResponse.json(all)
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const db = getDb()
    const [upserted] = await db
      .insert(siteContent)
      .values({ key: body.key, value: body.value, type: body.type ?? 'text' })
      .onConflictDoUpdate({
        target: siteContent.key,
        set: { value: body.value, updatedAt: new Date() },
      })
      .returning()
    return NextResponse.json(upserted)
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
