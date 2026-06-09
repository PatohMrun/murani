import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import PostActions from '@/components/admin/PostActions'

export const revalidate = 0

const PAGE_SIZE = 50

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: pageParam } = await searchParams
  const page = Math.max(0, parseInt(pageParam ?? '0', 10) || 0)

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, slug: true, status: true, tags: true, createdAt: true, likes: true, shares: true },
      take: PAGE_SIZE,
      skip: page * PAGE_SIZE,
    }),
    prisma.post.count(),
  ])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-oswald text-gray-900 dark:text-white">Posts</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{total} total</p>
        </div>
        <Link
          href="/admin/new"
          className="px-5 py-2.5 bg-linear-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-24 text-gray-400 dark:text-gray-600">
          <p className="text-lg font-medium">No posts yet</p>
          <p className="text-sm mt-1">Create your first post to get started</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <th className="text-left px-6 py-4">Title</th>
                <th className="text-left px-6 py-4 hidden md:table-cell">Tags</th>
                <th className="text-left px-6 py-4 hidden sm:table-cell">Status</th>
                <th className="text-left px-6 py-4 hidden lg:table-cell">Date</th>
                <th className="text-left px-6 py-4 hidden xl:table-cell">Stats</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {posts.map(post => (
                <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{post.title}</p>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">/blog/{post.slug}</p>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      post.status === 'published'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 hidden xl:table-cell">
                    <span className="text-xs text-gray-400 dark:text-gray-600">{post.likes} likes · {post.shares} shares</span>
                  </td>
                  <td className="px-6 py-4">
                    <PostActions id={post.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Page {page + 1} of {totalPages}
          </span>
          <div className="flex gap-2">
            {page > 0 && (
              <Link
                href={`/admin?page=${page - 1}`}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Previous
              </Link>
            )}
            {page + 1 < totalPages && (
              <Link
                href={`/admin?page=${page + 1}`}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
