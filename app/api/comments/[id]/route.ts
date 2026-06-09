import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdmin } from '@/lib/auth'

// CSRF: admin mutations must originate from our own domain via fetch
function isTrustedRequest(req: NextRequest) {
  if (req.headers.get('x-admin-action') !== '1') return false
  const origin = req.headers.get('origin')
  if (!origin) return false
  const host = req.headers.get('host') ?? ''
  try {
    const { hostname } = new URL(origin)
    const expectedHost = host.split(':')[0] // strip port if present
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1'
    const isVercelPreview = hostname.endsWith('.vercel.app')
    return isLocalhost || isVercelPreview || hostname === expectedHost
  } catch {
    return false
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin()) || !isTrustedRequest(req))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const comment = await prisma.comment.update({ where: { id }, data: { approved: true } })
  return NextResponse.json(comment)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin()) || !isTrustedRequest(req))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await prisma.comment.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
