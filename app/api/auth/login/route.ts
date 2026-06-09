import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { hashIp, getIp } from '@/lib/hash-ip'

const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes

export async function POST(req: Request) {
  const ipHash = hashIp(getIp(req))
  const since = new Date(Date.now() - WINDOW_MS)

  // Prune expired attempts for this IP to keep the table lean
  prisma.loginAttempt.deleteMany({ where: { ipHash, createdAt: { lt: since } } }).catch(() => {})

  const recentAttempts = await prisma.loginAttempt.count({
    where: { ipHash, createdAt: { gte: since } },
  })

  if (recentAttempts >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { error: 'Too many login attempts. Try again in 15 minutes.' },
      { status: 429 }
    )
  }

  const { email, password } = await req.json()
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    await prisma.loginAttempt.create({ data: { ipHash } })
    return NextResponse.json({ error: 'Incorrect email or password' }, { status: 401 })
  }

  // Clear attempts on successful login
  await prisma.loginAttempt.deleteMany({ where: { ipHash } })
  return NextResponse.json({ ok: true })
}
