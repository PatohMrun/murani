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
  coverImage: string | null
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

const placeholderGradients = [
  'from-blue-500/20 to-purple-500/20 dark:from-blue-900/40 dark:to-purple-900/40',
  'from-purple-500/20 to-pink-500/20 dark:from-purple-900/40 dark:to-pink-900/40',
  'from-cyan-500/20 to-blue-500/20 dark:from-cyan-900/40 dark:to-blue-900/40',
  'from-orange-500/20 to-red-500/20 dark:from-orange-900/40 dark:to-red-900/40',
  'from-green-500/20 to-teal-500/20 dark:from-green-900/40 dark:to-teal-900/40',
]

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
          <div className="relative flex-1 min-w-0">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
              <button className={pillClass(!activeTag)} onClick={() => selectTag(null)}>All</button>
              {visibleTags.map(tag => (
                <button key={tag} className={pillClass(activeTag === tag)} onClick={() => selectTag(tag)}>
                  {tag}
                </button>
              ))}
            </div>
            {hasHidden && (
              <div className="absolute right-0 top-0 bottom-0 w-10 bg-linear-to-l from-gray-50 dark:from-black to-transparent pointer-events-none" />
            )}
          </div>

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
                <FaChevronDown size={10} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
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
        <motion.div
          key={activeTag ?? 'all'}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {filtered.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-2 text-center text-gray-400 dark:text-gray-600 py-16"
            >
              No posts match this filter.
            </motion.p>
          ) : (
            filtered.map((post, i) => {
              const gradient = placeholderGradients[i % placeholderGradients.length]
              return (
                <motion.div key={post.id} custom={i} variants={card}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col h-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-blue-200 dark:hover:border-gray-700 hover:shadow-lg dark:hover:shadow-black/20 hover:-translate-y-1 active:scale-[0.99] transition-all duration-300"
                  >
                    {/* Image / placeholder */}
                    <div className="relative h-48 overflow-hidden shrink-0">
                      {post.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                          <span className="text-7xl font-bold font-oswald text-gray-300/60 dark:text-white/10 select-none">
                            {post.title[0]?.toUpperCase()}
                          </span>
                        </div>
                      )}

                      {/* Tags overlaid on image */}
                      {post.tags.length > 0 && (
                        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 2).map(tag => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="px-2.5 py-0.5 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5">
                      <h2 className="font-bold font-oswald text-lg sm:text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <span className="text-xs text-gray-400 dark:text-gray-600">
                          {new Date(post.createdAt).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric',
                          })}
                        </span>
                        <span className="text-blue-400 text-sm opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
