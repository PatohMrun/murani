import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

function isAdmin() {
  const cookieStore = cookies()
  return cookieStore.get('admin_token')?.value === process.env.ADMIN_SECRET
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({ where: { id: params.id } })
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { title, slug, excerpt, content, tags, status } = await req.json()
  const post = await prisma.post.update({
    where: { id: params.id },
    data: { title, slug, excerpt, content, tags, status },
  })
  revalidatePath('/blog')
  revalidatePath(`/blog/${post.slug}`)
  return NextResponse.json(post)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const post = await prisma.post.findUnique({ where: { id: params.id } })
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.post.delete({ where: { id: params.id } })
  revalidatePath('/blog')
  revalidatePath(`/blog/${post.slug}`)
  return NextResponse.json({ ok: true })
}
