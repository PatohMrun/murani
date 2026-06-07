import { ImageResponse } from 'next/og'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await prisma.post.findUnique({
    where: { slug, status: 'published' },
    select: { title: true, excerpt: true, coverImage: true, tags: true },
  }).catch(() => null)

  const title = post?.title ?? 'Patrick Murani'
  const excerpt = post?.excerpt ?? 'Software Engineer & Creative'
  const tags = post?.tags?.slice(0, 3) ?? []

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
          background: '#0a1014',
        }}
      >
        {/* Cover image as background if available */}
        {post?.coverImage && (
          <img
            src={post.coverImage}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.25,
            }}
          />
        )}

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(168,85,247,0.1) 100%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 72px',
            width: '100%',
          }}
        >
          {/* Top: site name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#3b82f6',
              }}
            />
            <span style={{ color: '#94a3b8', fontSize: '18px', letterSpacing: '0.1em' }}>
              PATRICK MURANI
            </span>
          </div>

          {/* Middle: title + excerpt */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px' }}>
            {tags.length > 0 && (
              <div style={{ display: 'flex', gap: '10px' }}>
                {tags.map(tag => (
                  <div
                    key={tag}
                    style={{
                      padding: '4px 14px',
                      borderRadius: '999px',
                      background: 'rgba(59,130,246,0.2)',
                      color: '#60a5fa',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
            <div
              style={{
                fontSize: title.length > 60 ? '44px' : '56px',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </div>
            {excerpt && (
              <div
                style={{
                  fontSize: '22px',
                  color: '#94a3b8',
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {excerpt}
              </div>
            )}
          </div>

          {/* Bottom: domain */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#475569', fontSize: '16px' }}>murani.signiqe.com/blog</span>
            <div
              style={{
                padding: '10px 24px',
                borderRadius: '999px',
                background: 'linear-gradient(90deg, #3b82f6, #a855f7)',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Read Post →
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
