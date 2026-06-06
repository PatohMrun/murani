import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return []
}

export async function generateMetadata(): Promise<Metadata> {
  return {}
}

export default async function BlogPostPage() {
  notFound()

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 font-poppins text-center">
      <h1>Blog Post Not Found</h1>
    </div>
  )
}
