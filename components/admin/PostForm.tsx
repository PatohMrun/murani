'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { FaImage, FaXmark } from 'react-icons/fa6'
import { compressImage } from '@/lib/compressImage'

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

interface Post {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  tags: string[]
  coverImage: string
  status: 'draft' | 'published'
}

interface PostFormProps {
  initialData?: Post
  existingTags?: string[]
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export default function PostForm({ initialData, existingTags = [] }: PostFormProps) {
  const router = useRouter()
  const isEditing = !!initialData?.id
  const coverInputRef = useRef<HTMLInputElement>(null)
  const tagInputRef = useRef<HTMLInputElement>(null)
  const tagContainerRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState<Post>({
    title: initialData?.title ?? '',
    slug: initialData?.slug ?? '',
    excerpt: initialData?.excerpt ?? '',
    content: initialData?.content ?? '',
    tags: initialData?.tags ?? [],
    coverImage: initialData?.coverImage ?? '',
    status: (initialData?.status as 'draft' | 'published') ?? 'draft',
  })
  const [tagInput, setTagInput] = useState('')
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [coverUploading, setCoverUploading] = useState(false)
  const [error, setError] = useState('')

  const suggestions = existingTags
    .filter(t => t.toLowerCase().includes(tagInput.toLowerCase()) && !form.tags.includes(t))
    .slice(0, 8)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (tagContainerRef.current && !tagContainerRef.current.contains(e.target as Node)) {
        setTagDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function addTag(tag: string) {
    const cleaned = tag.trim().toLowerCase().replace(/,/g, '')
    if (cleaned && !form.tags.includes(cleaned)) {
      setForm(f => ({ ...f, tags: [...f.tags, cleaned] }))
    }
    setTagInput('')
    setTagDropdownOpen(false)
    tagInputRef.current?.focus()
  }

  function removeTag(tag: string) {
    setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }))
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault()
      if (tagInput.trim()) addTag(tagInput)
      else if (e.key === 'Enter') return
    } else if (e.key === 'Backspace' && !tagInput && form.tags.length > 0) {
      removeTag(form.tags[form.tags.length - 1])
    }
  }

  function handleTitleChange(title: string) {
    setForm(f => ({
      ...f,
      title,
      slug: isEditing ? f.slug : slugify(title),
    }))
  }

  async function handleCoverUpload(file: File) {
    setCoverUploading(true)
    try {
      const compressed = await compressImage(file)
      const fd = new FormData()
      fd.append('file', compressed)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok) setForm(f => ({ ...f, coverImage: data.url }))
      else setError(data.error ?? 'Cover upload failed')
    } finally {
      setCoverUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const pendingTag = tagInput.trim().toLowerCase().replace(/,/g, '')
    const finalTags = pendingTag && !form.tags.includes(pendingTag)
      ? [...form.tags, pendingTag]
      : form.tags

    const payload = { ...form, tags: finalTags }

    const url = isEditing ? `/api/posts/${initialData!.id}` : '/api/posts'
    const method = isEditing ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to save')
      router.push('/admin')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Cover Image */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Cover Image</label>
        <input
          ref={coverInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) handleCoverUpload(file)
            e.target.value = ''
          }}
        />
        {form.coverImage ? (
          <div className="relative w-full aspect-[3/1] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={form.coverImage} alt="Cover" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, coverImage: '' }))}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <FaXmark size={14} />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            disabled={coverUploading}
            className="w-full h-36 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-blue-400 hover:text-blue-400 transition-colors disabled:opacity-50"
          >
            <FaImage size={22} />
            <span className="text-sm">{coverUploading ? 'Uploading…' : 'Upload cover image'}</span>
            <span className="text-xs">JPEG, PNG, WebP, GIF · max 5 MB</span>
          </button>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={e => handleTitleChange(e.target.value)}
          required
          placeholder="Post title"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-hidden transition-all"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Slug</label>
        <input
          type="text"
          value={form.slug}
          onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
          required
          placeholder="post-url-slug"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-hidden transition-all font-mono text-sm"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Excerpt</label>
        <textarea
          value={form.excerpt}
          onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
          rows={2}
          placeholder="Short description shown in the post list"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-hidden transition-all resize-none"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Content</label>
        <Editor content={form.content} onChange={content => setForm(f => ({ ...f, content }))} />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Tags <span className="font-normal text-gray-400">(type and press comma or Enter)</span>
        </label>
        <div className="relative" ref={tagContainerRef}>
          <div
            onClick={() => tagInputRef.current?.focus()}
            className="min-h-[48px] w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all flex flex-wrap gap-2 items-center cursor-text"
          >
            {form.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-lg font-medium"
              >
                {tag}
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); removeTag(tag) }}
                  className="text-blue-400 hover:text-blue-700 dark:hover:text-blue-100 transition-colors"
                >
                  <FaXmark size={10} />
                </button>
              </span>
            ))}
            <input
              ref={tagInputRef}
              type="text"
              value={tagInput}
              onChange={e => {
                setTagInput(e.target.value)
                setTagDropdownOpen(true)
              }}
              onKeyDown={handleTagKeyDown}
              onFocus={() => setTagDropdownOpen(true)}
              placeholder={form.tags.length === 0 ? 'nextjs, react, web…' : ''}
              className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder:text-gray-400"
            />
          </div>

          {/* Autocomplete dropdown */}
          {tagDropdownOpen && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg shadow-black/5 dark:shadow-black/30 z-20 overflow-hidden">
              <p className="px-3 pt-2 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Existing tags</p>
              {suggestions.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onMouseDown={e => { e.preventDefault(); addTag(tag) }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Status + Submit */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Status:</span>
          <button
            type="button"
            onClick={() => setForm(f => ({ ...f, status: f.status === 'draft' ? 'published' : 'draft' }))}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              form.status === 'published'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800'
            }`}
          >
            {form.status === 'published' ? 'Published' : 'Draft'}
          </button>
        </div>

        <div className="flex items-center gap-3">
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 text-sm"
          >
            {saving ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </div>
    </form>
  )
}
