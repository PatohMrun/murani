import type { Metadata } from 'next'

const title = 'Skills'
const description =
  'Technical skills across full-stack development, design, and creative media — TypeScript, React, Next.js, Flutter, Node.js, Figma, the Adobe suite, and more.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | Patrick Murani`,
    description,
    type: 'website',
    url: 'https://murani.signiqe.com/skills',
    siteName: 'Patrick Murani Portfolio',
    images: [{ url: '/Murani.jpg', width: 1200, height: 630, alt: 'Patrick Murani — Skills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | Patrick Murani`,
    description,
    images: ['/Murani.jpg'],
  },
}

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
