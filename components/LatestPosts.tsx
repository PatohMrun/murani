'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa6'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  tags: string[]
  createdAt: string
}

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
      <div className="flex gap-2 mb-4">
        <div className="h-5 w-16 rounded-full bg-gray-100 dark:bg-gray-800" />
        <div className="h-5 w-12 rounded-full bg-gray-100 dark:bg-gray-800" />
      </div>
      <div className="h-6 w-3/4 rounded bg-gray-100 dark:bg-gray-800 mb-3" />
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full rounded bg-gray-50 dark:bg-gray-800/60" />
        <div className="h-4 w-5/6 rounded bg-gray-50 dark:bg-gray-800/60" />
      </div>
      <div className="h-4 w-20 rounded bg-gray-100 dark:bg-gray-800" />
    </div>
  )
}

export default function LatestPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then((data: Post[]) => setPosts(data.slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (!loading && posts.length === 0) return null

  return (
    <section className="py-20 relative" id="writing">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-xs sm:text-sm font-bold text-blue-500 tracking-widest uppercase mb-2">Writing</h2>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-oswald">
            Latest <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Thoughts</span>
          </h3>
          <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Code, cameras, and whatever catches my attention.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? [1, 2, 3].map(i => <SkeletonCard key={i} />)
            : posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                  >
                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.slice(0, 2).map(tag => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-3 flex-1">
                      {post.title}
                    </h4>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 dark:border-gray-800">
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="text-xs font-semibold text-blue-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <FaArrowRight size={10} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))
          }
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <Link
            href="/blog"
            className="group px-8 py-3 rounded-full border border-blue-500/30 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex items-center gap-2"
          >
            View all posts
            <FaArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
