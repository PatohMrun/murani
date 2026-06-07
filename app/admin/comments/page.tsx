import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import CommentActions from '@/components/admin/CommentActions'

export const revalidate = 0
export const metadata: Metadata = { title: 'Comments' }

export default async function AdminCommentsPage() {
  const pending = await prisma.comment.findMany({
    where: { approved: false },
    orderBy: { createdAt: 'desc' },
    include: { post: { select: { title: true, slug: true } } },
  })

  const approved = await prisma.comment.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
    take: 30,
    include: { post: { select: { title: true, slug: true } } },
  })

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold font-oswald text-gray-900 dark:text-white">Comments</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          {pending.length} pending · {approved.length} approved
        </p>
      </div>

      {pending.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider mb-4">
            Pending Review ({pending.length})
          </h2>
          <div className="space-y-3">
            {pending.map(c => (
              <div key={c.id} className="bg-white dark:bg-gray-900 border border-yellow-200 dark:border-yellow-900/40 rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-sm text-gray-900 dark:text-white">{c.name}</span>
                      {c.parentId && (
                        <span className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full">reply</span>
                      )}
                      <span className="text-xs text-gray-400">
                        on <a href={`/blog/${c.post.slug}`} target="_blank" className="hover:text-blue-500 underline underline-offset-2">{c.post.title}</a>
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{c.content}</p>
                  </div>
                  <CommentActions id={c.id} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {pending.length === 0 && (
        <div className="text-center py-12 text-gray-400 dark:text-gray-600">
          <p className="font-medium">No pending comments</p>
          <p className="text-sm mt-1">You&apos;re all caught up.</p>
        </div>
      )}

      {approved.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider mb-4">
            Approved (last 30)
          </h2>
          <div className="space-y-3">
            {approved.map(c => (
              <div key={c.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-sm text-gray-900 dark:text-white">{c.name}</span>
                      {c.parentId && (
                        <span className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full">reply</span>
                      )}
                      <span className="text-xs text-gray-400">
                        on <a href={`/blog/${c.post.slug}`} target="_blank" className="hover:text-blue-500 underline underline-offset-2">{c.post.title}</a>
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{c.content}</p>
                  </div>
                  <CommentActions id={c.id} approvedOnly />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
