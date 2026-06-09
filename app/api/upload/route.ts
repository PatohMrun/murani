import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { isAdmin } from '@/lib/auth'

const BUCKET = 'blog-images'
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE = 10 * 1024 * 1024 // 10 MB

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  if (!ALLOWED_TYPES.includes(file.type))
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
  if (file.size > MAX_SIZE)
    return NextResponse.json({ error: 'File too large (max 10 MB)' }, { status: 400 })

  const input = Buffer.from(await file.arrayBuffer())
  const isGif = file.type === 'image/gif'

  let body: Uint8Array
  let contentType: string
  let ext: string

  try {
    if (isGif) {
      body = new Uint8Array(input)
      contentType = 'image/gif'
      ext = 'gif'
    } else {
      body = new Uint8Array(
        await sharp(input).webp({ quality: 85 }).toBuffer()
      )
      contentType = 'image/webp'
      ext = 'webp'
    }
  } catch (err) {
    // sharp failed (corrupt file or native binary issue) — fall back to original
    console.error('Image processing failed, uploading original:', err)
    body = new Uint8Array(input)
    contentType = file.type
    ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  }

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const supabaseUrl = process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  const res = await fetch(`${supabaseUrl}/storage/v1/object/${BUCKET}/${filename}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': contentType,
      'x-upsert': 'false',
    },
    body: body as BodyInit,
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Supabase upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }

  const publicUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${filename}`
  return NextResponse.json({ url: publicUrl })
}
