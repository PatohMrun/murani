'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaCheck, FaTrash } from 'react-icons/fa6'

export default function CommentActions({ id, approvedOnly }: { id: string; approvedOnly?: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState<'approve' | 'delete' | null>(null)

  async function approve() {
    setLoading('approve')
    await fetch(`/api/comments/${id}`, { method: 'PATCH', headers: { 'x-admin-action': '1' } })
    router.refresh()
    setLoading(null)
  }

  async function remove() {
    if (!confirm('Delete this comment?')) return
    setLoading('delete')
    await fetch(`/api/comments/${id}`, { method: 'DELETE', headers: { 'x-admin-action': '1' } })
    router.refresh()
    setLoading(null)
  }

  return (
    <div className="flex items-center gap-2 shrink-0">
      {!approvedOnly && (
        <button
          onClick={approve}
          disabled={!!loading}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40 rounded-lg transition disabled:opacity-50"
        >
          <FaCheck size={10} />
          {loading === 'approve' ? 'Approving…' : 'Approve'}
        </button>
      )}
      <button
        onClick={remove}
        disabled={!!loading}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition disabled:opacity-50"
      >
        <FaTrash size={10} />
        {loading === 'delete' ? 'Deleting…' : 'Delete'}
      </button>
    </div>
  )
}
