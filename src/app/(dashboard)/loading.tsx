import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner className="mb-4" />
        <p className="text-gray-600">読み込み中...</p>
      </div>
    </div>
  )
}