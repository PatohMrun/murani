'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  tags: string[]
  createdAt: string
}

const card = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.07, ease: 'easeOut' },
  }),
}

export default function BlogPostsList({ posts }: { posts: Post[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = Array.from(new Set(posts.flatMap(p => p.tags))).sort()
  const filtered = activeTag ? posts.filter(p => p.tags.includes(activeTag)) : posts

  return (
    <div>
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              !activeTag
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTag === tag
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTag ?? 'all'}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filtered.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-400 dark:text-gray-600 py-16"
            >
              No posts match this filter.
            </motion.p>
          ) : (
            filtered.map((post, i) => (
              <motion.div key={post.id} custom={i} variants={card}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-start gap-5 group bg-white/80 dark:bg-gray-800/50 backdrop-blur-md border border-gray-100 dark:border-gray-700 rounded-2xl p-5 sm:p-6 hover:border-blue-300/60 dark:hover:border-blue-700/60 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-300"
                >
                  {/* Date stamp */}
                  <div className="hidden sm:flex flex-col items-center shrink-0 w-11 pt-0.5 text-center">
                    <span className="text-2xl font-bold font-oswald leading-none text-blue-400/50 dark:text-blue-500/30">
                      {new Date(post.createdAt).getDate().toString().padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600 mt-1">
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="text-[10px] text-gray-300 dark:text-gray-700">
                      {new Date(post.createdAt).getFullYear()}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold font-oswald text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 dark:text-gray-600 mt-3 sm:hidden">
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>

                  <span className="text-blue-400 text-lg mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                    →
                  </span>
                </Link>
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
