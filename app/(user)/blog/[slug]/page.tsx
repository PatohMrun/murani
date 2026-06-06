import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { FaArrowLeft } from 'react-icons/fa6'

export const revalidate = 3600

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { status: 'published' },
    select: { slug: true },
  })
  return posts.map((p: { slug: string }) => ({ slug: p.slug }))
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

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 font-poppins">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors mb-8"
        >
          <FaArrowLeft size={12} /> Back to Blog
        </Link>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-oswald text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{post.excerpt}</p>
        )}

        <p className="text-sm text-gray-400 dark:text-gray-500 mb-10 pb-10 border-b border-gray-100 dark:border-gray-800">
          {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          {post.updatedAt > post.createdAt && (
            <span className="ml-3">
              · Updated {new Date(post.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          )}
        </p>

        <div
          className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-oswald prose-a:text-blue-500 prose-code:text-blue-500 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  )
}
