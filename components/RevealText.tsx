'use client'
import { motion } from 'framer-motion'

interface RevealTextProps {
  text: string
  className?: string
  charClassName?: string
  delay?: number
}

const EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1]
const VIEWPORT = { once: true, margin: '0px 0px -120px 0px' }

/**
 * Scroll reveal for headings. Plain text reveals letter-by-letter (each char
 * rises and flips up). Specially-styled text — anything passing charClassName,
 * e.g. a bg-clip-text gradient — reveals as ONE unit so the effect stays
 * continuous across the whole word instead of restarting per character.
 *
 * Animations use only transform + opacity (compositor-friendly); no animated
 * filter/blur, which repaints every frame and janks on mobile.
 */
export default function RevealText({ text, className = '', charClassName = '', delay = 0 }: RevealTextProps) {
  if (charClassName) {
    return (
      <motion.span
        className={`inline-block ${charClassName} ${className}`}
        style={{ transformPerspective: 500 }}
        initial={{ opacity: 0, y: 30, rotateX: -80 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.7, delay, ease: EASE }}
      >
        {text}
      </motion.span>
    )
  }

  return (
    <span className={`inline-block ${className}`} aria-label={text} style={{ perspective: 400 }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ opacity: 0, y: 32, rotateX: -85 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: delay + i * 0.04, ease: EASE }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  )
}

interface FlowTextProps {
  text: string
  className?: string
  delay?: number
}

/**
 * Word-by-word flow for paragraphs: words drift up and fade in sequence.
 * Transform + opacity only — no animated blur.
 */
export function FlowText({ text, className = '', delay = 0 }: FlowTextProps) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          transition={{ duration: 0.5, delay: delay + i * 0.05, ease: 'easeOut' }}
        >
          {word}
          {' '}
        </motion.span>
      ))}
    </span>
  )
}
