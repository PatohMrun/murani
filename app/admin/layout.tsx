import Link from 'next/link'
import LogoutButton from '@/components/admin/LogoutButton'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'

export const metadata = { title: 'Admin Studio | Patrick Murani' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-inter">
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="font-bold text-xl font-oswald text-gray-900 dark:text-white">
                Admin <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Studio</span>
              </Link>
              <nav className="flex gap-6">
                <Link href="/admin" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  Posts
                </Link>
                <Link href="/admin/new" className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 transition-colors">
                  + New Post
                </Link>
                <Link href="/admin/comments" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  Comments
                </Link>
                <Link href="/blog" target="_blank" className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  View Blog <FaArrowUpRightFromSquare size={11} />
                </Link>
              </nav>
            </div>
            <LogoutButton />
          </div>
        </header>
        <main className="max-w-6xl mx-auto p-6">{children}</main>
      </div>
  )
}
