import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashIp, getIp } from '@/lib/hash-ip'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ipHash = hashIp(getIp(req))

  const [post, existing] = await Promise.all([
    prisma.post.findUnique({ where: { id }, select: { likes: true } }),
    prisma.postLike.findUnique({ where: { postId_ipHash: { postId: id, ipHash } } }),
  ])

  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ liked: !!existing, likes: post.likes })
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ipHash = hashIp(getIp(req))

  const [post, existing] = await Promise.all([
    prisma.post.findUnique({ where: { id }, select: { likes: true } }),
    prisma.postLike.findUnique({ where: { postId_ipHash: { postId: id, ipHash } } }),
  ])

  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if (existing) {
    const [, updated] = await prisma.$transaction([
      prisma.postLike.delete({ where: { id: existing.id } }),
      prisma.post.update({
        where: { id },
        data: { likes: { decrement: 1 } },
        select: { likes: true },
      }),
    ])
    return NextResponse.json({ liked: false, likes: Math.max(0, updated.likes) })
  } else {
    const [, updated] = await prisma.$transaction([
      prisma.postLike.create({ data: { postId: id, ipHash } }),
      prisma.post.update({
        where: { id },
        data: { likes: { increment: 1 } },
        select: { likes: true },
      }),
    ])
    return NextResponse.json({ liked: true, likes: updated.likes })
  }
}
