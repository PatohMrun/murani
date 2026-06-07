'use client'
import { useState, useEffect } from 'react'
import { FaHeart } from 'react-icons/fa6'

export default function LikeButton({ postId, initialLikes }: { postId: string; initialLikes: number }) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(initialLikes)
  const [pending, setPending] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setLiked(localStorage.getItem(`liked_${postId}`) === '1')
    setReady(true)
  }, [postId])

  async function toggle() {
    if (pending || !ready) return

    const wasLiked = liked
    const wasCount = likes

    // Optimistic update — instant feedback
    setLiked(!wasLiked)
    setLikes(l => wasLiked ? l - 1 : l + 1)
    setPending(true)

    try {
      const res = await fetch(`/api/posts/${postId}/like`, { method: 'POST' })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setLiked(data.liked)
      setLikes(data.likes)
      if (data.liked) {
        localStorage.setItem(`liked_${postId}`, '1')
      } else {
        localStorage.removeItem(`liked_${postId}`)
      }
    } catch {
      // Rollback
      setLiked(wasLiked)
      setLikes(wasCount)
    } finally {
      setPending(false)
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={!ready}
      aria-label={liked ? 'Unlike this post' : 'Like this post'}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 disabled:opacity-40 ${
        liked
          ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-500 dark:text-red-400'
          : 'bg-gray-100 dark:bg-gray-800 border-transparent text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 hover:text-red-500 dark:hover:text-red-400'
      }`}
    >
      <FaHeart
        size={13}
        className={`transition-transform duration-150 ${liked ? 'scale-110' : ''}`}
      />
      <span>{likes}</span>
    </button>
  )
}
