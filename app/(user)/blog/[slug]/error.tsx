'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { FaArrowLeft, FaCircleExclamation } from 'react-icons/fa6'

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 font-inter flex flex-col items-center justify-center text-center">
      <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-400 mb-4">
        <FaCircleExclamation size={22} />
      </div>
      <p className="text-gray-700 dark:text-gray-300 font-semibold text-base sm:text-lg">Couldn&apos;t load this post</p>
      <p className="text-gray-400 dark:text-gray-600 text-sm mt-1 mb-6">
        The database may be temporarily unavailable.
      </p>
      <div className="flex items-center gap-3">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors group"
        >
          <FaArrowLeft size={11} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Blog
        </Link>
        <button
          onClick={reset}
          className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
