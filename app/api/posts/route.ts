import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { isAdmin } from '@/lib/auth'
import { sanitizeContent } from '@/lib/sanitize'

const RESERVED_SLUGS = new Set([
  'admin', 'api', 'blog', 'apks', 'contact', 'about', 'login', 'logout',
  'upload', 'download', 'stats', 'new', 'edit', 'delete', 'dashboard',
])

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, slug: true, excerpt: true, tags: true, coverImage: true, createdAt: true },
  })
  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { title, slug, excerpt, content, tags, status, coverImage } = await req.json()

  if (!title?.trim() || !slug?.trim() || !content?.trim())
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  if (title.length > 200) return NextResponse.json({ error: 'Title too long' }, { status: 400 })
  if (slug.length > 200) return NextResponse.json({ error: 'Slug too long' }, { status: 400 })
  if (content.length > 500_000) return NextResponse.json({ error: 'Content too long' }, { status: 400 })
  if (RESERVED_SLUGS.has(slug.toLowerCase()))
    return NextResponse.json({ error: 'Slug is a reserved path' }, { status: 400 })

  const slugConflict = await prisma.post.findFirst({ where: { slug } })
  if (slugConflict) return NextResponse.json({ error: 'Slug already in use' }, { status: 409 })

  if (coverImage) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (supabaseUrl) {
      try {
        const { hostname } = new URL(coverImage)
        const allowedHost = new URL(supabaseUrl).hostname
        if (hostname !== allowedHost) {
          return NextResponse.json({ error: 'Invalid cover image URL' }, { status: 400 })
        }
      } catch {
        return NextResponse.json({ error: 'Invalid cover image URL' }, { status: 400 })
      }
    }
  }

  const post = await prisma.post.create({
    data: { title, slug, excerpt, content: sanitizeContent(content), tags, status, coverImage: coverImage || null },
  })
  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  return NextResponse.json(post)
}
