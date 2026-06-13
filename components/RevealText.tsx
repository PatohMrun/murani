'use client'
import { motion } from 'framer-motion'

interface RevealTextProps {
  text: string
  className?: string
  charClassName?: string
  delay?: number
}

/**
 * Letter-by-letter scroll reveal: each character rises, unblurs, and flips up
 * from below as the heading enters the viewport.
 */
export default function RevealText({ text, className = '', charClassName = '', delay = 0 }: RevealTextProps) {
  return (
    <span className={`inline-block ${className}`} aria-label={text} style={{ perspective: 400 }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={`inline-block ${charClassName}`}
          initial={{ opacity: 0, y: 32, rotateX: -85, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
          // fire only once the heading sits ~120px inside the viewport so the
          // reveal plays where it can actually be watched, not at the edge
          viewport={{ once: true, margin: '0px 0px -120px 0px' }}
          transition={{ duration: 0.65, delay: delay + i * 0.042, ease: [0.215, 0.61, 0.355, 1] }}
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
 * Word-by-word flow for paragraphs: words drift up and unblur in sequence.
 */
export function FlowText({ text, className = '', delay = 0 }: FlowTextProps) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          transition={{ duration: 0.52, delay: delay + i * 0.05, ease: 'easeOut' }}
        >
          {word}
          {' '}
        </motion.span>
      ))}
    </span>
  )
}
