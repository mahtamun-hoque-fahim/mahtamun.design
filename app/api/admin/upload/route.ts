import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  // Auth check
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  if (!session?.value) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ error: 'Cloudinary not configured' }, { status: 500 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) || 'mahtamun-design'

    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const timestamp = Math.round(Date.now() / 1000)
    const str = `folder=${folder}&timestamp=${timestamp}${apiSecret}`

    // Sign using crypto
    const encoder = new TextEncoder()
    const data = encoder.encode(str)
    const hashBuffer = await crypto.subtle.digest('SHA-1', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    const uploadData = new FormData()
    uploadData.append('file', file)
    uploadData.append('api_key', apiKey)
    uploadData.append('timestamp', String(timestamp))
    uploadData.append('signature', signature)
    uploadData.append('folder', folder)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: uploadData,
    })

    const result = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: result.error?.message || 'Upload failed' }, { status: 500 })
    }

    return NextResponse.json({ url: result.secure_url, publicId: result.public_id })
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
