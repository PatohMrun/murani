'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

export default function PostActions({ id }: { id: string }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!confirm('Delete this post? This cannot be undone.')) return
    setDeleting(true)
    await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/edit/${id}`}
        className="p-2 rounded-lg text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        title="Edit"
      >
        <FaEdit size={15} />
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="p-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
        title="Delete"
      >
        <FaTrash size={15} />
      </button>
    </div>
  )
}
