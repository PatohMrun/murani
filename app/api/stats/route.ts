import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Download counts are public — shown on the APK page for all visitors
export async function GET() {
  try {
    const stats = await prisma.apkStat.findMany()
    return NextResponse.json(stats)
  } catch {
    return NextResponse.json([], { status: 500 })
  }
}
