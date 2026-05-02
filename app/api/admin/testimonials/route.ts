import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { testimonials } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  try {
    const db = getDb()
    const all = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt))
    return NextResponse.json(all)
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, role, company, content, rating, published } = body
    if (!name?.trim() || !content?.trim()) {
      return NextResponse.json({ error: 'Name and content required' }, { status: 400 })
    }
    const db = getDb()
    const [created] = await db
      .insert(testimonials)
      .values({ name, role, company, content, rating: rating ?? 5, published: published ?? true })
      .returning()
    return NextResponse.json(created, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
