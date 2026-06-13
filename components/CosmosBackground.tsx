'use client'
import { useEffect, useState, type CSSProperties } from 'react'

interface Star {
  top: string
  left: string
  size: number
  delay: number
  duration: number
  twinkle: boolean
}

/**
 * Lightweight cosmos backdrop. Deliberately cheap so it never costs frames:
 * - color "nebula" glows are static radial-gradient backgrounds (no filter
 *   blur, no mix-blend, no animation — those were the mobile jank source)
 * - stars are painted once; only a small subset gets a compositor-only CSS
 *   opacity twinkle (off the main thread, auto-disabled for reduced motion)
 */
export default function CosmosBackground() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const count = 40
    setStars(
      Array.from({ length: count }).map((_, i) => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 3,
        twinkle: i % 3 === 0, // ~13 twinkle, rest static
      }))
    )
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-gray-50 dark:bg-black transition-colors duration-500">
      {/* deep-space base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-gray-200/40 via-transparent to-transparent dark:from-zinc-900/80 dark:via-black dark:to-black" />

      {/* static color glows — radial-gradient paint, no blur filter / blend mode */}
      <div
        className="absolute -top-1/4 -left-[15%] w-[60vw] h-[60vw] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.10), transparent 70%)' }}
      />
      <div
        className="absolute top-1/3 -right-[15%] w-[55vw] h-[55vw] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.09), transparent 70%)' }}
      />
      <div
        className="absolute -bottom-1/4 left-1/4 w-[55vw] h-[55vw] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.08), transparent 70%)' }}
      />

      {/* stars */}
      {stars.map((s, i) => (
        <span
          key={i}
          className={`absolute rounded-full bg-gray-900/30 dark:bg-white ${s.twinkle ? 'star-twinkle' : 'opacity-60'}`}
          style={
            {
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              '--twinkle-dur': `${s.duration}s`,
              '--twinkle-delay': `${s.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
