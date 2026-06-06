import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on software engineering, design, and building digital products.',
}

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, slug: true, excerpt: true, tags: true, createdAt: true },
  })

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 font-poppins">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h2 className="text-xs font-bold text-blue-500 tracking-widest uppercase mb-2">Writing</h2>
          <h1 className="text-4xl lg:text-6xl font-bold font-oswald text-gray-900 dark:text-white">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Blog</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">
            Thoughts on software engineering, design, and building digital products.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No posts yet — check back soon.</p>
        ) : (
          <div className="space-y-6">
            {posts.map(post => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block group bg-white/80 dark:bg-gray-800/50 backdrop-blur-md border border-gray-100 dark:border-gray-700 rounded-2xl p-6 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-bold font-oswald text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
                  {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
