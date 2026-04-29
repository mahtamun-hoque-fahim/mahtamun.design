import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { messages } from '@/lib/db/schema'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const db = getDb()
    if (db) {
      await db.insert(messages).values({ name, email, subject, message })
    }

    // Optionally send email via Resend
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'Contact <noreply@mahtamun.design>',
        to: 'mahtamunhoquefahim@pm.me',
        subject: `New message: ${subject || 'No subject'} — ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
