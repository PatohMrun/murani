import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { FaArrowLeft } from 'react-icons/fa6'
import ReadingProgressBar from '@/components/ReadingProgressBar'
import ShareButton from '@/components/ShareButton'

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
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await prisma.post.findUnique({ where: { slug, status: 'published' } })
  if (!post) notFound()

  const readingTime = getReadingTime(post.content)

  return (
    <>
      <ReadingProgressBar />

      <div className="min-h-screen pt-24 pb-16 px-4 font-poppins relative overflow-x-hidden">
        {/* Background blurs */}
        <div className="absolute -top-32 -right-20 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 -left-20 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors mb-10 group"
          >
            <FaArrowLeft size={11} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Blog
          </Link>

          {/* Tags */}
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

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-oswald text-gray-900 dark:text-white mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400 dark:text-gray-500 mb-10 pb-10 border-b border-gray-100 dark:border-gray-800">
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

          {/* Content */}
          <div
            className="prose prose-gray dark:prose-invert max-w-none
              prose-headings:font-oswald
              prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline
              prose-code:text-blue-500 prose-code:bg-blue-50 dark:prose-code:bg-blue-900/20 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-gray-950 dark:prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
              prose-img:rounded-xl prose-img:shadow-lg
              prose-blockquote:border-blue-500 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer */}
          <div className="mt-16 pt-10 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors group"
            >
              <FaArrowLeft size={11} className="group-hover:-translate-x-0.5 transition-transform" />
              All posts
            </Link>
            <ShareButton />
          </div>
        </div>
      </div>
    </>
  )
}
