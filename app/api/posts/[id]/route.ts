import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { isAdmin } from '@/lib/auth'

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

  const post = await prisma.post.update({
    where: { id },
    data: { title, slug, excerpt, content, tags, status, coverImage: coverImage || null },
  })
  revalidatePath('/blog')
  revalidatePath(`/blog/${post.slug}`)
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
