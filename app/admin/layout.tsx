import AdminNav from '@/components/admin/AdminNav'

export const metadata = { title: 'Admin Studio | Patrick Murani' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-inter">
      <AdminNav />
      <main className="max-w-6xl mx-auto p-6">{children}</main>
    </div>
  )
}
