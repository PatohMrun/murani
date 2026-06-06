import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PostForm from '@/components/admin/PostForm'

export const metadata = { title: 'Edit Post | Admin Studio' }

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold font-oswald text-gray-900 dark:text-white mb-8">Edit Post</h1>
      <PostForm
        initialData={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? '',
          content: post.content,
          tags: post.tags,
          status: post.status as 'draft' | 'published',
        }}
      />
    </div>
  )
}
