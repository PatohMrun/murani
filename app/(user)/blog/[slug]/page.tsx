import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { FaArrowLeft } from 'react-icons/fa6'
import ReadingProgressBar from '@/components/ReadingProgressBar'
import ShareButton from '@/components/ShareButton'
import LikeButton from '@/components/LikeButton'
import CommentsSection from '@/components/CommentsSection'
import sanitizeHtml from 'sanitize-html'

export const revalidate = 3600

function getReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const words = text.split(' ').filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.post.findMany({
      where: { status: 'published' },
      select: { slug: true },
    })
    return posts.map((p: { slug: string }) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.post.findUnique({ where: { slug } })
  if (!post) return {}

  const url = `https://murani.signiqe.com/blog/${slug}`
  const images = post.coverImage
    ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
    : [{ url: '/Murani.jpg', width: 1200, height: 630, alt: post.title }]

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.excerpt ?? undefined,
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: ['Patrick Murani'],
      tags: post.tags,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt ?? undefined,
      images: images.map(i => i.url),
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await prisma.post.findUnique({
    where: { slug, status: 'published' },
    select: {
      id: true, title: true, slug: true, excerpt: true, content: true,
      tags: true, coverImage: true, createdAt: true, updatedAt: true,
      likes: true, shares: true,
    },
  })
  if (!post) notFound()

  const readingTime = getReadingTime(post.content)
  const safeContent = sanitizeHtml(post.content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'figure', 'figcaption', 'mark', 'u', 's']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['class'],
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height', 'loading'],
    },
    allowedSchemes: ['https', 'http', 'mailto'],
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.coverImage ?? 'https://murani.signiqe.com/Murani.jpg',
    author: {
      '@type': 'Person',
      name: 'Patrick Murani',
      url: 'https://murani.signiqe.com',
    },
    publisher: {
      '@type': 'Person',
      name: 'Patrick Murani',
      url: 'https://murani.signiqe.com',
    },
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    url: `https://murani.signiqe.com/blog/${post.slug}`,
    keywords: post.tags.join(', '),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://murani.signiqe.com/blog/${post.slug}` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgressBar />

      <div className="min-h-screen font-inter relative overflow-x-hidden">
        {/* Background blurs */}
        <div className="absolute -top-32 -right-20 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 -left-20 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Hero — cosmic shows through */}
        <div className="pt-24 px-4 pb-10 relative z-10">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors mb-10 group"
            >
              <FaArrowLeft size={11} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to Blog
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold font-oswald text-gray-900 dark:text-white mb-4 leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400 dark:text-gray-500">
              <span>
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
              <span>{readingTime} min read</span>
              {post.updatedAt > post.createdAt && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                  <span>
                    Updated{' '}
                    {new Date(post.updatedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content card — solid background, blocks cosmos */}
        <div className="relative z-10 bg-white dark:bg-gray-950 rounded-t-3xl shadow-[0_-8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_-8px_32px_rgba(0,0,0,0.4)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-10 pb-20">
            <div
              className="prose prose-sm sm:prose-base prose-gray dark:prose-invert max-w-none font-inter
                prose-headings:font-oswald prose-headings:font-bold
                prose-p:leading-relaxed
                prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline
                prose-code:text-blue-500 prose-code:bg-blue-50 dark:prose-code:bg-blue-900/20 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-gray-950 dark:prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 prose-pre:overflow-x-auto
                prose-img:rounded-xl prose-img:shadow-lg
                prose-blockquote:border-blue-500 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
                prose-li:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: safeContent }}
            />

            <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors group"
                >
                  <FaArrowLeft size={11} className="group-hover:-translate-x-0.5 transition-transform" />
                  All posts
                </Link>
                <div className="flex items-center gap-2">
                  <LikeButton postId={post.id} initialLikes={post.likes} />
                  <ShareButton postId={post.id} initialShares={post.shares} />
                </div>
              </div>
            </div>

            <CommentsSection postId={post.id} />
          </div>
        </div>
      </div>
    </>
  )
}
