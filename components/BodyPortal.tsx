'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Renders children into document.body. Needed for position:fixed elements
 * that live inside the SmoothScroll transform container — a transformed
 * ancestor turns `fixed` into `absolute`, so they must escape it.
 */
export default function BodyPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return createPortal(children, document.body)
}
