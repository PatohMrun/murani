import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

async function isAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_token')?.value === process.env.ADMIN_SECRET
}

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, slug: true, excerpt: true, tags: true, createdAt: true },
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

  const post = await prisma.post.create({
    data: { title, slug, excerpt, content, tags, status, coverImage: coverImage || null },
  })
  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  return NextResponse.json(post)
}
