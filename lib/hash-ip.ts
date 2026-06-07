import { createHmac } from 'crypto'

export function hashIp(ip: string): string {
  return createHmac('sha256', process.env.HMAC_SECRET ?? 'dev-salt')
    .update(ip)
    .digest('hex')
}

export function getIp(req: Request): string {
  return (
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    '127.0.0.1'
  )
}
