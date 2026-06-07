import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

const BASE = 'https://murani.signiqe.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const static_pages: MetadataRoute.Sitemap = [
    { url: BASE,                   priority: 1.0, changeFrequency: 'monthly' },
    { url: `${BASE}/blog`,         priority: 0.9, changeFrequency: 'weekly'  },
    { url: `${BASE}/skills`,       priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/creations`,    priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/contact`,      priority: 0.6, changeFrequency: 'yearly'  },
    { url: `${BASE}/apks`,         priority: 0.5, changeFrequency: 'monthly' },
  ]

  const posts = await prisma.post.findMany({
    where: { status: 'published' },
    select: { slug: true, updatedAt: true },
    orderBy: { updatedAt: 'desc' },
  }).catch(() => [])

  const post_pages: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    priority: 0.8,
    changeFrequency: 'monthly',
  }))

  return [...static_pages, ...post_pages]
}
