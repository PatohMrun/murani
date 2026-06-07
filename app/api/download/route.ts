import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function isSafeUrl(raw: string): boolean {
  // Local APK files from /public/apks/ — same origin, no redirect possible
  if (raw.startsWith('/apks/') && !raw.includes('..') && !raw.includes('//')) return true

  // External URLs: must be https and from an explicit allowlist
  try {
    const url = new URL(raw)
    if (url.protocol !== 'https:') return false
    const allowed = (process.env.ALLOWED_DOWNLOAD_HOSTS ?? '')
      .split(',').map(h => h.trim().toLowerCase()).filter(Boolean)
    return allowed.length > 0 && allowed.some(h => url.hostname === h || url.hostname.endsWith('.' + h))
  } catch {
    return false
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const appId = searchParams.get('appId')
  const version = searchParams.get('version')
  const fileUrl = searchParams.get('fileUrl')

  if (!appId || !version || !fileUrl) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  if (!isSafeUrl(fileUrl)) {
    return NextResponse.json({ error: 'Invalid download URL' }, { status: 400 })
  }

  try {
    await prisma.apkStat.upsert({
      where: { appId_version: { appId, version } },
      update: { downloads: { increment: 1 } },
      create: { appId, version, downloads: 1 },
    })
  } catch (error) {
    console.error('Failed to log download:', error)
  }

  const destination = fileUrl.startsWith('/')
    ? new URL(fileUrl, request.nextUrl.origin)
    : new URL(fileUrl)

  return NextResponse.redirect(destination)
}
