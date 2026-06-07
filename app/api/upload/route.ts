import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const BUCKET = 'blog-images'
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

async function isAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_token')?.value === process.env.ADMIN_SECRET
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  if (!ALLOWED_TYPES.includes(file.type))
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
  if (file.size > MAX_SIZE)
    return NextResponse.json({ error: 'File too large (max 5 MB)' }, { status: 400 })

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const bytes = await file.arrayBuffer()
  const supabaseUrl = process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  const res = await fetch(`${supabaseUrl}/storage/v1/object/${BUCKET}/${filename}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': file.type,
      'x-upsert': 'false',
    },
    body: bytes,
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Supabase upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }

  const publicUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${filename}`
  return NextResponse.json({ url: publicUrl })
}
