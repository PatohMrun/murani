import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { FaPenNib } from 'react-icons/fa6'
import BlogPostsList from '@/components/BlogPostsList'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on software engineering, design, and building digital products.',
}

export default async function BlogPage() {
  let posts: { id: string; title: string; slug: string; excerpt: string | null; tags: string[]; createdAt: Date }[] = []
  try {
    posts = await prisma.post.findMany({
      where: { status: 'published' },
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, slug: true, excerpt: true, tags: true, createdAt: true },
    })
  } catch {
    // DB unreachable at build time — page will be populated at runtime
  }

  const serialized = posts.map(p => ({ ...p, createdAt: p.createdAt.toISOString() }))

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 font-poppins relative overflow-x-hidden">
      {/* Background blurs */}
      <div className="absolute -top-32 -right-20 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="mb-12">
          <p className="text-xs font-bold text-blue-500 tracking-widest uppercase mb-2">Writing</p>
          <h1 className="text-4xl lg:text-6xl font-bold font-oswald text-gray-900 dark:text-white leading-tight">
            The{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500">
              Blog
            </span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg max-w-xl">
            Thoughts on software engineering, design, and building digital products.
          </p>
          {posts.length > 0 && (
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
            </p>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-32 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-400">
              <FaPenNib size={24} />
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">No posts yet</p>
              <p className="text-gray-400 dark:text-gray-600 text-sm mt-1">
                Something is brewing — check back soon.
              </p>
            </div>
          </div>
        ) : (
          <BlogPostsList posts={serialized} />
        )}
      </div>
    </div>
  )
}
