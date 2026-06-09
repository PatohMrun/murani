import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashIp, getIp } from '@/lib/hash-ip'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // Prefix with 'share:' to namespace share tokens from like tokens in the same table
  const shareHash = `share:${hashIp(getIp(req))}`

  // Check if this IP already incremented shares for this post
  const existing = await prisma.postLike.findUnique({
    where: { postId_ipHash: { postId: id, ipHash: shareHash } },
  })
  if (existing) {
    const post = await prisma.post.findUnique({ where: { id }, select: { shares: true } })
    return NextResponse.json({ shares: post?.shares ?? 0 })
  }

  // Record the share token and increment atomically
  try {
    const [, post] = await prisma.$transaction([
      prisma.postLike.create({ data: { postId: id, ipHash: shareHash } }),
      prisma.post.update({
        where: { id },
        data: { shares: { increment: 1 } },
        select: { shares: true },
      }),
    ])
    return NextResponse.json({ shares: post.shares })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
