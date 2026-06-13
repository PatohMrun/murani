import type { Metadata } from 'next'

const title = 'Creations'
const description =
  'A portfolio of work by Patrick Murani — software projects spanning web and mobile, alongside graphic design and visual identity work.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | Patrick Murani`,
    description,
    type: 'website',
    url: 'https://murani.signiqe.com/creations',
    siteName: 'Patrick Murani Portfolio',
    images: [{ url: '/Murani.jpg', width: 1200, height: 630, alt: 'Patrick Murani — Creations' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | Patrick Murani`,
    description,
    images: ['/Murani.jpg'],
  },
}

export default function CreationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
