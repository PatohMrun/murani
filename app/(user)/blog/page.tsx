import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { FaPenNib, FaCircleExclamation } from 'react-icons/fa6'
import BlogPostsList from '@/components/BlogPostsList'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on software engineering, design, and building digital products.',
}

function PostsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex gap-2 mb-10">
        {[56, 44, 68, 52, 60, 48].map((w, i) => (
          <div key={i} className="h-8 rounded-full bg-gray-100 dark:bg-gray-800" style={{ width: w }} />
        ))}
      </div>
      {[1, 2, 3].map(i => (
        <div key={i} className="flex items-start gap-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 sm:p-6">
          <div className="hidden sm:flex flex-col items-center shrink-0 w-11 gap-1.5">
            <div className="h-7 w-8 rounded bg-gray-100 dark:bg-gray-800" />
            <div className="h-3 w-7 rounded bg-gray-100 dark:bg-gray-800" />
            <div className="h-3 w-6 rounded bg-gray-100 dark:bg-gray-800" />
          </div>
          <div className="flex-1 space-y-2.5">
            <div className="flex gap-2">
              <div className="h-5 w-16 rounded-full bg-gray-100 dark:bg-gray-800" />
              <div className="h-5 w-20 rounded-full bg-gray-100 dark:bg-gray-800" />
            </div>
            <div className="h-6 w-3/4 rounded bg-gray-100 dark:bg-gray-800" />
            <div className="h-4 w-full rounded bg-gray-100 dark:bg-gray-800" />
            <div className="h-4 w-2/3 rounded bg-gray-100 dark:bg-gray-800" />
          </div>
        </div>
      ))}
    </div>
  )
}

function PostsError() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 gap-4">
      <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-400">
        <FaCircleExclamation size={22} />
      </div>
      <div>
        <p className="text-gray-700 dark:text-gray-300 font-semibold">Couldn&apos;t load posts</p>
        <p className="text-gray-400 dark:text-gray-600 text-sm mt-1">The database may be temporarily unavailable — try refreshing.</p>
      </div>
    </div>
  )
}

async function PostsFeed() {
  let posts: { id: string; title: string; slug: string; excerpt: string | null; tags: string[]; coverImage: string | null; createdAt: Date }[] = []

  try {
    posts = await prisma.post.findMany({
      where: { status: 'published' },
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, slug: true, excerpt: true, tags: true, coverImage: true, createdAt: true },
    })
  } catch {
    return <PostsError />
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-32 gap-4">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-400">
          <FaPenNib size={22} />
        </div>
        <div>
          <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">No posts yet</p>
          <p className="text-gray-400 dark:text-gray-600 text-sm mt-1">Something is brewing — check back soon.</p>
        </div>
      </div>
    )
  }

  const serialized = posts.map(p => ({ ...p, createdAt: p.createdAt.toISOString() }))
  return <BlogPostsList posts={serialized} />
}

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 font-inter relative overflow-x-hidden">
      <div className="absolute -top-32 -right-20 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header renders instantly */}
        <div className="mb-12">
          <p className="text-xs font-bold text-blue-500 tracking-widest uppercase mb-2">Writing</p>
          <h1 className="text-4xl lg:text-6xl font-bold font-oswald text-gray-900 dark:text-white leading-tight">
            Latest{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500">
              Thoughts
            </span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg max-w-xl">
            Code, cameras, and whatever catches my attention.
          </p>
        </div>

        {/* Posts stream in when DB responds */}
        <Suspense fallback={<PostsSkeleton />}>
          <PostsFeed />
        </Suspense>
      </div>
    </div>
  )
}
