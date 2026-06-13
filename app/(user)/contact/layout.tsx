import type { Metadata } from 'next'

const title = 'Contact'
const description =
  'Get in touch with Patrick Murani for software development, design, photography, or collaboration. Based in Nairobi, working worldwide.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | Patrick Murani`,
    description,
    type: 'website',
    url: 'https://murani.signiqe.com/contact',
    siteName: 'Patrick Murani Portfolio',
    images: [{ url: '/Murani.jpg', width: 1200, height: 630, alt: 'Contact Patrick Murani' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | Patrick Murani`,
    description,
    images: ['/Murani.jpg'],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
