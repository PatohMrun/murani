'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Renders children into document.body. Keeps position:fixed elements anchored
 * to the viewport even if an ancestor ever establishes a transform/filter
 * containing block (which would otherwise re-anchor `fixed` to that ancestor).
 */
export default function BodyPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return createPortal(children, document.body)
}
