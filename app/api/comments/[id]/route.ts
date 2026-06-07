import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

async function isAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_token')?.value === process.env.ADMIN_SECRET
}

// CSRF: admin mutations must come from our own origin via fetch (custom header can't be set by forms/links)
function hasAdminHeader(req: NextRequest) {
  return req.headers.get('x-admin-action') === '1'
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin()) || !hasAdminHeader(req))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const comment = await prisma.comment.update({ where: { id }, data: { approved: true } })
  return NextResponse.json(comment)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin()) || !hasAdminHeader(req))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await prisma.comment.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
