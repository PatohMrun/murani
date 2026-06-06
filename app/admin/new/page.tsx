import PostForm from '@/components/admin/PostForm'

export const metadata = { title: 'New Post | Admin Studio' }

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold font-oswald text-gray-900 dark:text-white mb-8">New Post</h1>
      <PostForm />
    </div>
  )
}
