export default function AdminLoading() {
  return (
    <div className="animate-pulse">
      {/* Header row */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="h-7 w-16 rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-12 rounded bg-gray-100 dark:bg-gray-800" />
        </div>
        <div className="h-10 w-28 rounded-xl bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Table skeleton */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="flex gap-6 px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="h-3 w-10 rounded bg-gray-100 dark:bg-gray-800" />
          <div className="h-3 w-8 rounded bg-gray-100 dark:bg-gray-800 hidden md:block" />
          <div className="h-3 w-10 rounded bg-gray-100 dark:bg-gray-800 hidden sm:block" />
        </div>

        {/* Rows */}
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex items-center gap-6 px-6 py-4 border-b border-gray-50 dark:border-gray-800 last:border-0">
            <div className="flex-1 space-y-1.5">
              <div className="h-4 w-3/4 rounded bg-gray-100 dark:bg-gray-800" />
              <div className="h-3 w-1/3 rounded bg-gray-50 dark:bg-gray-800/60" />
            </div>
            <div className="flex gap-1 hidden md:flex">
              <div className="h-5 w-14 rounded-md bg-gray-100 dark:bg-gray-800" />
              <div className="h-5 w-10 rounded-md bg-gray-100 dark:bg-gray-800" />
            </div>
            <div className="h-5 w-16 rounded-full bg-gray-100 dark:bg-gray-800 hidden sm:block" />
            <div className="h-4 w-20 rounded bg-gray-100 dark:bg-gray-800 hidden lg:block" />
            <div className="h-8 w-16 rounded-lg bg-gray-100 dark:bg-gray-800 ml-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}
