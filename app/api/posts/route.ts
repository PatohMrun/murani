import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

function isAdmin() {
  const cookieStore = cookies()
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
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { title, slug, excerpt, content, tags, status } = await req.json()
  const post = await prisma.post.create({
    data: { title, slug, excerpt, content, tags, status },
  })
  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  return NextResponse.json(post)
}
