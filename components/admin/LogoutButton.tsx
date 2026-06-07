'use client'

export default function LogoutButton() {
  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
    >
      Logout
    </button>
  )
}
