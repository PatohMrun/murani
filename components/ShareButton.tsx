'use client'
import { useState } from 'react'
import { FaLink, FaCheck } from 'react-icons/fa6'

export default function ShareButton({ postId, initialShares }: { postId: string; initialShares: number }) {
  const [copied, setCopied] = useState(false)
  const [shares, setShares] = useState(initialShares)

  const copy = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    // Client-side throttle: only count one share per post per hour
    const key = `shared_${postId}`
    const last = localStorage.getItem(key)
    if (last && Date.now() - Number(last) < 3_600_000) return

    localStorage.setItem(key, String(Date.now()))

    // Fire and forget — optimistic
    setShares(s => s + 1)
    fetch(`/api/posts/${postId}/share`, { method: 'POST' }).catch(() => {
      setShares(s => s - 1)
    })
  }

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
    >
      {copied
        ? <FaCheck size={11} className="text-green-500" />
        : <FaLink size={11} />
      }
      {copied ? 'Copied!' : `Share${shares > 0 ? ` · ${shares}` : ''}`}
    </button>
  )
}
