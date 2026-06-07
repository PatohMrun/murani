import PostForm from '@/components/admin/PostForm'
import { prisma } from '@/lib/prisma'

export const metadata = { title: 'New Post | Admin Studio' }

export default async function NewPostPage() {
  const existingTags = await prisma.post.findMany({ select: { tags: true } })
    .then(posts => Array.from(new Set(posts.flatMap(p => p.tags))).sort())
    .catch(() => [] as string[])

  return (
    <div>
      <h1 className="text-2xl font-bold font-oswald text-gray-900 dark:text-white mb-8">New Post</h1>
      <PostForm existingTags={existingTags} />
    </div>
  )
}
