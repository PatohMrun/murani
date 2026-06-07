'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa6'

const MAX_VISIBLE = 5

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
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const allTags = Array.from(new Set(posts.flatMap(p => p.tags))).sort()
  const visibleTags = allTags.slice(0, MAX_VISIBLE)
  const hiddenTags = allTags.slice(MAX_VISIBLE)
  const hasHidden = hiddenTags.length > 0
  const activeIsHidden = activeTag !== null && hiddenTags.includes(activeTag)

  const filtered = activeTag ? posts.filter(p => p.tags.includes(activeTag)) : posts

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selectTag = (tag: string | null) => {
    setActiveTag(prev => (prev === tag ? null : tag))
    setDropdownOpen(false)
  }

  const pillClass = (active: boolean) =>
    `shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
      active
        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`

  return (
    <div>
      {allTags.length > 0 && (
        <div className="flex items-center gap-2 mb-10">
          {/* Scrollable pill strip */}
          <div className="relative flex-1 min-w-0">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
              <button className={pillClass(!activeTag)} onClick={() => selectTag(null)}>
                All
              </button>
              {visibleTags.map(tag => (
                <button key={tag} className={pillClass(activeTag === tag)} onClick={() => selectTag(tag)}>
                  {tag}
                </button>
              ))}
            </div>
            {/* Right fade hint */}
            {hasHidden && (
              <div className="absolute right-0 top-0 bottom-0 w-10 bg-linear-to-l from-gray-50 dark:from-black to-transparent pointer-events-none" />
            )}
          </div>

          {/* More dropdown */}
          {hasHidden && (
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(o => !o)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeIsHidden || dropdownOpen
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                More
                <FaChevronDown
                  size={10}
                  className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-lg shadow-black/5 dark:shadow-black/40 p-1.5 min-w-[140px] z-20"
                  >
                    {hiddenTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => selectTag(tag)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTag === tag
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div key={activeTag ?? 'all'} initial="hidden" animate="visible" className="space-y-4">
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
                  className="flex items-start gap-5 group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 sm:p-6 hover:border-blue-200 dark:hover:border-gray-700 hover:shadow-md dark:hover:shadow-none hover:-translate-y-0.5 transition-all duration-300"
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
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
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
