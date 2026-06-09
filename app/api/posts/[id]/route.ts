import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { isAdmin } from '@/lib/auth'
import { sanitizeContent } from '@/lib/sanitize'

const RESERVED_SLUGS = new Set([
  'admin', 'api', 'blog', 'apks', 'contact', 'about', 'login', 'logout',
  'upload', 'download', 'stats', 'new', 'edit', 'delete', 'dashboard',
])

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const admin = await isAdmin()

  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Non-admin users can only read published posts
  if (!admin && post.status !== 'published') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(post)
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { title, slug, excerpt, content, tags, status, coverImage } = await req.json()

  if (!title?.trim() || !slug?.trim() || !content?.trim())
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  if (title.length > 200) return NextResponse.json({ error: 'Title too long' }, { status: 400 })
  if (slug.length > 200) return NextResponse.json({ error: 'Slug too long' }, { status: 400 })
  if (content.length > 500_000) return NextResponse.json({ error: 'Content too long' }, { status: 400 })
  if (RESERVED_SLUGS.has(slug.toLowerCase()))
    return NextResponse.json({ error: 'Slug is a reserved path' }, { status: 400 })

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

  // Fetch existing post so we can revalidate the old slug if it changes
  const existing = await prisma.post.findUnique({ where: { id }, select: { slug: true } })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Check slug uniqueness against other posts
  if (slug !== existing.slug) {
    const conflict = await prisma.post.findFirst({ where: { slug, id: { not: id } } })
    if (conflict) return NextResponse.json({ error: 'Slug already in use' }, { status: 409 })
  }

  const post = await prisma.post.update({
    where: { id },
    data: { title, slug, excerpt, content: sanitizeContent(content), tags, status, coverImage: coverImage || null },
  })

  revalidatePath('/blog')
  revalidatePath(`/blog/${existing.slug}`) // revalidate old slug in case it changed
  if (slug !== existing.slug) revalidatePath(`/blog/${slug}`)
  return NextResponse.json(post)
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.post.delete({ where: { id } })
  revalidatePath('/blog')
  revalidatePath(`/blog/${post.slug}`)
  return NextResponse.json({ ok: true })
}
