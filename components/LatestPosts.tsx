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
  coverImage: string | null
  createdAt: string
}

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="h-44 bg-gray-100 dark:bg-gray-800" />
      <div className="px-5 py-4 space-y-3">
        <div className="h-5 w-3/4 rounded bg-gray-100 dark:bg-gray-800" />
        <div className="space-y-1.5">
          <div className="h-3.5 w-full rounded bg-gray-50 dark:bg-gray-800/60" />
          <div className="h-3.5 w-5/6 rounded bg-gray-50 dark:bg-gray-800/60" />
        </div>
        <div className="h-3 w-20 rounded bg-gray-100 dark:bg-gray-800" />
      </div>
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
                    className="group flex flex-col h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                  >
                    {/* Cover image / placeholder */}
                    <div className="relative h-44 shrink-0 overflow-hidden">
                      {post.coverImage ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover scale-[1.03] blur-[2px] group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Overlay to calm busy images */}
                          <div className="absolute inset-0 bg-white/40 dark:bg-black/50" />
                        </>
                      ) : (
                        /* Branded gradient placeholder */
                        <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 via-purple-500/10 to-transparent dark:from-blue-900/40 dark:via-purple-900/20" />
                      )}
                      {/* Bottom fade into card background */}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />

                      {/* Tags overlaid on image */}
                      {post.tags.length > 0 && (
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 2).map(tag => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-black/20 dark:bg-white/10 text-gray-900 dark:text-white backdrop-blur-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card body */}
                    <div className="flex flex-col flex-1 px-5 pb-5 -mt-2">
                      {/* Title */}
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-2 flex-1">
                        {post.title}
                      </h4>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50 dark:border-gray-800">
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="text-xs font-semibold text-blue-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read <FaArrowRight size={10} />
                        </span>
                      </div>
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
