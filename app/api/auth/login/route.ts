import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashIp, getIp } from '@/lib/hash-ip'

export async function POST(req: NextRequest) {
  const ipHash = hashIp(getIp(req))
  const window = new Date(Date.now() - 15 * 60 * 1000)

  // Brute-force: max 5 failed attempts per IP per 15 minutes
  const attempts = await prisma.loginAttempt.count({
    where: { ipHash, createdAt: { gte: window } },
  })
  if (attempts >= 5) {
    return NextResponse.json(
      { error: 'Too many failed attempts. Try again in 15 minutes.' },
      { status: 429 }
    )
  }

  const { password } = await req.json()

  if (password !== process.env.ADMIN_PASSWORD) {
    await prisma.loginAttempt.create({ data: { ipHash } })
    // Clean up old attempts to keep the table small
    await prisma.loginAttempt.deleteMany({ where: { createdAt: { lt: window } } })
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  // Success — clear any previous attempts for this IP
  await prisma.loginAttempt.deleteMany({ where: { ipHash } })

  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_token', process.env.ADMIN_SECRET!, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours (was 7 days)
    path: '/',
  })
  return res
}
