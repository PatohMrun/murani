'use client'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  glare?: boolean
}

/**
 * GPU-composited 3D tilt card: rotates in perspective toward the cursor with
 * a light glare that tracks the pointer. Pure transform/opacity, so it stays
 * on the compositor thread.
 */
export default function TiltCard({ children, className = '', maxTilt = 9, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const go = useMotionValue(0)

  const srx = useSpring(rx, { stiffness: 220, damping: 22 })
  const sry = useSpring(ry, { stiffness: 220, damping: 22 })
  const sgo = useSpring(go, { stiffness: 200, damping: 30 })

  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.16), transparent 65%)`

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    ry.set((px - 0.5) * 2 * maxTilt)
    rx.set(-(py - 0.5) * 2 * maxTilt)
    gx.set(px * 100)
    gy.set(py * 100)
    go.set(1)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
    go.set(0)
  }

  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        className="relative h-full w-full"
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            style={{ background: glareBg, opacity: sgo }}
            className="absolute inset-0 rounded-[inherit] pointer-events-none z-20"
          />
        )}
      </motion.div>
    </div>
  )
}
