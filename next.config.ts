import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Next.js requires unsafe-inline and unsafe-eval for its runtime chunks
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Tailwind inline styles + Google Fonts CSS
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Google Fonts binary files
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self + Supabase storage + inline data URIs + blob (canvas preview)
      "img-src 'self' data: blob: https://*.supabase.co",
      // Fetch/XHR: self + Supabase auth & storage + EmailJS API
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.emailjs.com",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
