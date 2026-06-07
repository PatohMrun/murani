import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashIp, getIp } from '@/lib/hash-ip'

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get('postId')
  if (!postId) return NextResponse.json({ error: 'Missing postId' }, { status: 400 })

  const comments = await prisma.comment.findMany({
    where: { postId, approved: true, parentId: null },
    orderBy: { createdAt: 'asc' },
    take: 200,
    select: {
      id: true, name: true, content: true, createdAt: true,
      replies: {
        where: { approved: true },
        orderBy: { createdAt: 'asc' },
        take: 50,
        select: { id: true, name: true, content: true, createdAt: true },
      },
    },
  })

  return NextResponse.json(comments)
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid body' }, { status: 400 }) }

  const { postId, parentId, name, content, hp, hp2 } = body as Record<string, string>

  // Honeypots — two fields with bot-enticing names
  if (hp || hp2) return NextResponse.json({ error: 'Rejected' }, { status: 400 })

  // Basic validation
  if (!postId || !name?.trim() || !content?.trim())
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  if (name.trim().length > 60)
    return NextResponse.json({ error: 'Name too long' }, { status: 400 })
  if (content.trim().length > 2000)
    return NextResponse.json({ error: 'Comment too long (max 2000 chars)' }, { status: 400 })

  const ipHash = hashIp(getIp(req))
  const since = new Date(Date.now() - 60 * 60 * 1000)

  // Rate limit: 5 comments per hashed IP per hour
  const recentCount = await prisma.comment.count({ where: { ip: ipHash, createdAt: { gte: since } } })
  if (recentCount >= 5)
    return NextResponse.json({ error: 'Too many comments. Please wait a while.' }, { status: 429 })

  // Duplicate content: same body from same IP in last 10 minutes
  const duplicate = await prisma.comment.findFirst({
    where: { ip: ipHash, content: content.trim(), createdAt: { gte: new Date(Date.now() - 10 * 60 * 1000) } },
  })
  if (duplicate)
    return NextResponse.json({ error: 'Duplicate comment detected.' }, { status: 429 })

  // Verify post is published
  const post = await prisma.post.findUnique({ where: { id: postId, status: 'published' }, select: { id: true } })
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

  // Enforce max 1 level of nesting (reply to a reply is not allowed)
  if (parentId) {
    const parent = await prisma.comment.findUnique({ where: { id: parentId, postId }, select: { parentId: true } })
    if (!parent) return NextResponse.json({ error: 'Parent comment not found' }, { status: 404 })
    if (parent.parentId) return NextResponse.json({ error: 'Cannot reply to a reply' }, { status: 400 })
  }

  await prisma.comment.create({
    data: {
      postId,
      parentId: parentId || null,
      name: name.trim(),
      content: content.trim(),
      ip: ipHash,
      approved: false,
    },
  })

  return NextResponse.json({ ok: true }, { status: 201 })
}
