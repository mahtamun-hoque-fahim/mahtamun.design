import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { messages } from '@/lib/db/schema'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message, budget, service } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Save to DB
    const db = getDb()
    await db.insert(messages).values({ name, email, subject, message, budget, service })

    // Send email notification
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'MAHTAMUN Portfolio <noreply@mahtamun.design>',
        to: process.env.CONTACT_EMAIL ?? 'mahtamunhoquefahim@pm.me',
        subject: `New inquiry: ${subject || `from ${name}`}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:auto;background:#0e0e0e;color:#f0ede4;padding:32px;border-radius:4px">
            <h2 style="color:#C8FF00;font-size:22px;margin-bottom:24px">New Contact Form Submission</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#9b9b9b;width:120px">Name</td><td style="padding:8px 0">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#9b9b9b">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#C8FF00">${email}</a></td></tr>
              ${service ? `<tr><td style="padding:8px 0;color:#9b9b9b">Service</td><td style="padding:8px 0">${service}</td></tr>` : ''}
              ${budget ? `<tr><td style="padding:8px 0;color:#9b9b9b">Budget</td><td style="padding:8px 0">${budget}</td></tr>` : ''}
              ${subject ? `<tr><td style="padding:8px 0;color:#9b9b9b">Subject</td><td style="padding:8px 0">${subject}</td></tr>` : ''}
            </table>
            <div style="margin-top:24px;padding:16px;background:#161616;border-radius:4px;border-left:2px solid #C8FF00">
              <p style="margin:0;line-height:1.7">${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
