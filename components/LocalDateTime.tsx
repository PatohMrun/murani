'use client'
import { useEffect, useState } from 'react'

/**
 * Renders an ISO timestamp as the viewer's LOCAL date + time, truncated to the
 * minute (no seconds), in their locale's own 12/24-hour convention.
 *
 * Server + first client render show a deterministic UTC date-only string so the
 * markup matches during hydration; after mount it upgrades to local date+time.
 */
export default function LocalDateTime({ value }: { value: string }) {
  const [text, setText] = useState(() =>
    new Date(value).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    })
  )

  useEffect(() => {
    setText(
      new Date(value).toLocaleString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    )
  }, [value])

  return (
    <time dateTime={value} suppressHydrationWarning>
      {text}
    </time>
  )
}
