'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { FaReply, FaRegComment } from 'react-icons/fa6'

type CommentData = {
  id: string
  name: string
  content: string
  createdAt: string
  replies?: CommentData[]
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 30) return `${d}d ago`
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function Avatar({ name }: { name: string }) {
  const initials = name.trim().split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500', 'bg-teal-500']
  const color = colors[name.charCodeAt(0) % colors.length]
  return (
    <div className={`${color} w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}>
      {initials || '?'}
    </div>
  )
}

function CommentForm({
  postId,
  parentId,
  onSuccess,
  autoFocus,
}: {
  postId: string
  parentId?: string
  onSuccess: () => void
  autoFocus?: boolean
}) {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [hp, setHp] = useState('')   // honeypot 1: "website"
  const [hp2, setHp2] = useState('') // honeypot 2: "url" — bots love URL fields
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const mountedAt = useRef(Date.now())

  useEffect(() => {
    mountedAt.current = Date.now()
    if (autoFocus) textareaRef.current?.focus()
  }, [autoFocus])

  async function submit(e: React.FormEvent) {
    e.preventDefault()

    // Client-side timing guard: real users take more than 1.5s to fill a form
    if (Date.now() - mountedAt.current < 1500) {
      setError('Submission too fast. Please try again.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, parentId, name, content, hp, hp2 }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong'); setStatus('error'); return }
      setStatus('done')
      setName('')
      setContent('')
      onSuccess()
    } catch {
      setError('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="text-sm text-green-600 dark:text-green-400 py-3 px-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
        Your comment is pending review. It will appear once approved.
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      {/* Honeypot fields — invisible to real users, bots fill them */}
      <input type="text" name="website" value={hp} onChange={e => setHp(e.target.value)}
        tabIndex={-1} aria-hidden autoComplete="off"
        className="absolute opacity-0 pointer-events-none h-0 w-0" />
      <input type="url" name="url" value={hp2} onChange={e => setHp2(e.target.value)}
        tabIndex={-1} aria-hidden autoComplete="off"
        className="absolute opacity-0 pointer-events-none h-0 w-0" />

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        maxLength={60}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition"
      />
      <textarea
        ref={textareaRef}
        placeholder={parentId ? 'Write a reply…' : 'Share your thoughts…'}
        value={content}
        onChange={e => setContent(e.target.value)}
        required
        maxLength={2000}
        rows={3}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition resize-none"
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">{content.length}/2000</p>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-xl transition"
        >
          {status === 'loading' ? 'Posting…' : parentId ? 'Reply' : 'Post comment'}
        </button>
      </div>
    </form>
  )
}

function CommentNode({ comment, postId, depth = 0 }: { comment: CommentData; postId: string; depth?: number }) {
  const [replying, setReplying] = useState(false)

  return (
    <div className={depth > 0 ? 'ml-8 mt-3 border-l-2 border-gray-100 dark:border-gray-800 pl-4' : ''}>
      <div className="flex gap-3">
        <Avatar name={comment.name} />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{comment.name}</span>
            <span className="text-xs text-gray-400">{timeAgo(comment.createdAt)}</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 leading-relaxed whitespace-pre-wrap break-words">
            {comment.content}
          </p>
          {depth === 0 && (
            <button
              onClick={() => setReplying(r => !r)}
              className="mt-2 flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-500 transition-colors"
            >
              <FaReply size={10} />
              Reply
            </button>
          )}
        </div>
      </div>

      {replying && (
        <div className="mt-3 ml-11">
          <CommentForm
            postId={postId}
            parentId={comment.id}
            autoFocus
            onSuccess={() => setReplying(false)}
          />
        </div>
      )}

      {comment.replies?.map(reply => (
        <CommentNode key={reply.id} comment={reply} postId={postId} depth={depth + 1} />
      ))}
    </div>
  )
}

export default function CommentsSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<CommentData[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?postId=${postId}`)
      if (res.ok) setComments(await res.json())
    } finally {
      setLoading(false)
    }
  }, [postId])

  useEffect(() => { load() }, [load])

  const total = comments.reduce((acc, c) => acc + 1 + (c.replies?.length ?? 0), 0)

  return (
    <section className="mt-16 pt-10 border-t border-gray-100 dark:border-gray-800">
      <h2 className="flex items-center gap-2 text-xl font-bold font-oswald text-gray-900 dark:text-white mb-8">
        <FaRegComment size={18} className="text-blue-400" />
        {total > 0 ? `${total} Comment${total !== 1 ? 's' : ''}` : 'Comments'}
      </h2>

      <div className="mb-10">
        <CommentForm postId={postId} onSuccess={load} />
      </div>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2].map(i => (
            <div key={i} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 rounded bg-gray-100 dark:bg-gray-800" />
                <div className="h-3 w-full rounded bg-gray-100 dark:bg-gray-800" />
                <div className="h-3 w-2/3 rounded bg-gray-100 dark:bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-600 text-center py-8">
          No comments yet. Be the first to share your thoughts.
        </p>
      ) : (
        <div className="space-y-6">
          {comments.map(c => (
            <CommentNode key={c.id} comment={c} postId={postId} />
          ))}
        </div>
      )}
    </section>
  )
}
