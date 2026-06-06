'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

interface Post {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  tags: string[]
  status: 'draft' | 'published'
}

interface PostFormProps {
  initialData?: Post
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export default function PostForm({ initialData }: PostFormProps) {
  const router = useRouter()
  const isEditing = !!initialData?.id

  const [form, setForm] = useState<Post>({
    title: initialData?.title ?? '',
    slug: initialData?.slug ?? '',
    excerpt: initialData?.excerpt ?? '',
    content: initialData?.content ?? '',
    tags: initialData?.tags ?? [],
    status: (initialData?.status as 'draft' | 'published') ?? 'draft',
  })
  const [tagInput, setTagInput] = useState(initialData?.tags.join(', ') ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleTitleChange(title: string) {
    setForm(f => ({
      ...f,
      title,
      slug: isEditing ? f.slug : slugify(title),
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      ...form,
      tags: tagInput.split(',').map(t => t.trim()).filter(Boolean),
    }

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
      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={e => handleTitleChange(e.target.value)}
          required
          placeholder="Post title"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
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
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-mono text-sm"
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
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Content</label>
        <Editor content={form.content} onChange={content => setForm(f => ({ ...f, content }))} />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Tags <span className="font-normal text-gray-400">(comma-separated)</span></label>
        <input
          type="text"
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          placeholder="nextjs, react, web"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
        />
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
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 text-sm"
          >
            {saving ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </div>
    </form>
  )
}
