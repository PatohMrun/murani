'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * Framer-motion smooth scrolling: native scroll drives a spring, and the page
 * content is a fixed container translated by the smoothed value. The spacer
 * div keeps the document height (and the native scrollbar) intact.
 *
 * Disabled on touch devices (native momentum is better there) and for
 * prefers-reduced-motion users — both get plain native scrolling.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [pageHeight, setPageHeight] = useState(0)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    setEnabled(!reduced && !coarse)
  }, [])

  useEffect(() => {
    if (!enabled || !contentRef.current) return
    const el = contentRef.current
    const observer = new ResizeObserver(() => setPageHeight(el.offsetHeight))
    observer.observe(el)
    return () => observer.disconnect()
  }, [enabled])

  const { scrollY } = useScroll()
  const smooth = useSpring(scrollY, { stiffness: 140, damping: 24, mass: 0.5 })
  const y = useTransform(smooth, (v) => -v)

  if (!enabled) return <>{children}</>

  return (
    <>
      <motion.div ref={contentRef} style={{ y }} className="fixed top-0 left-0 w-full will-change-transform">
        {children}
      </motion.div>
      <div style={{ height: pageHeight }} aria-hidden />
    </>
  )
}
