'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import LogoutButton from './LogoutButton'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { MdMenuOpen, MdClose } from 'react-icons/md'

const navLinks = [
  { label: 'Posts', href: '/admin' },
  { label: '+ New Post', href: '/admin/new' },
  { label: 'Comments', href: '/admin/comments' },
]

export default function AdminNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/admin" className="font-bold text-xl font-oswald text-gray-900 dark:text-white shrink-0">
          Admin <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Studio</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 flex-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/blog"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            View Blog <FaArrowUpRightFromSquare size={11} />
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LogoutButton />
          </div>
          <button
            onClick={() => setOpen(o => !o)}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {open ? <MdClose size={24} /> : <MdMenuOpen size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden mt-3 border-t border-gray-100 dark:border-gray-800 pt-3 flex flex-col gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/blog"
            target="_blank"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            View Blog <FaArrowUpRightFromSquare size={11} />
          </Link>
          <div className="pt-1 border-t border-gray-100 dark:border-gray-800 mt-1">
            <LogoutButton />
          </div>
        </div>
      )}
    </header>
  )
}
