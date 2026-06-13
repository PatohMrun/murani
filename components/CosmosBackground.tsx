'use client'
import { useEffect, useRef, useState, type CSSProperties } from 'react'

interface Star {
  top: string
  left: string
  size: number
  delay: number
  duration: number
  twinkle: boolean
}

// Comet "lanes" — a mix of down-left and down-right directions at varying
// steepness. rotation is pre-matched to each travel vector so the head leads.
const COMET_LANES = [
  { top: [6, 16], left: [76, 95], dx: -95, dy: 55, rot: 160 }, // down-left, shallow
  { top: [4, 14], left: [5, 22], dx: 92, dy: 58, rot: 22 }, //  down-right, shallow
  { top: [2, 10], left: [50, 68], dx: -60, dy: 80, rot: 138 }, // down-left, steep
  { top: [2, 10], left: [32, 50], dx: 60, dy: 80, rot: 42 }, //  down-right, steep
]

/**
 * Lightweight cosmos backdrop. Deliberately cheap so it never costs frames:
 * - color "nebula" glows are static radial-gradient backgrounds (no filter
 *   blur, no mix-blend, no animation — those were the mobile jank source)
 * - stars are painted once; only a small subset gets a compositor-only CSS
 *   opacity twinkle (off the main thread, auto-disabled for reduced motion)
 */
export default function CosmosBackground() {
  const [stars, setStars] = useState<Star[]>([])
  const cometRefs = useRef<HTMLSpanElement[]>([])

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

  // Fire a comet at random intervals, each time picking a random element, lane
  // (direction), start point, rotation jitter and duration — so when one shows,
  // which one, and where it flies are all unpredictable. Event-driven (one
  // setTimeout in flight), so no per-frame cost.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rand = (a: number, b: number) => a + Math.random() * (b - a)
    let timer: ReturnType<typeof setTimeout>
    let alive = true

    const fire = () => {
      if (!alive) return
      const els = cometRefs.current.filter(Boolean)
      if (els.length) {
        const el = els[Math.floor(Math.random() * els.length)]
        const lane = COMET_LANES[Math.floor(Math.random() * COMET_LANES.length)]
        el.style.top = `${rand(lane.top[0], lane.top[1]).toFixed(1)}%`
        el.style.left = `${rand(lane.left[0], lane.left[1]).toFixed(1)}%`
        el.style.setProperty('--comet-dx', `${lane.dx}vw`)
        el.style.setProperty('--comet-dy', `${lane.dy}vh`)
        el.style.setProperty('--comet-rot', `${(lane.rot + rand(-6, 6)).toFixed(1)}deg`)
        // restart the one-shot animation
        el.style.animation = 'none'
        void el.offsetWidth
        el.style.animation = `comet-fly ${rand(1.0, 1.8).toFixed(2)}s linear`
      }
      timer = setTimeout(fire, rand(4500, 13000))
    }

    timer = setTimeout(fire, rand(2500, 6000)) // first appearance
    return () => {
      alive = false
      clearTimeout(timer)
    }
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

      {/* comets — fired imperatively by the scheduler above (random timing,
          direction, position). Idle = invisible (opacity 0 via .comet). */}
      <span ref={(el) => { if (el) cometRefs.current[0] = el }} className="comet" />
      <span ref={(el) => { if (el) cometRefs.current[1] = el }} className="comet" />
    </div>
  )
}
