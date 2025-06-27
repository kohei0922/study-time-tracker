'use client'

import { useDashboardData } from '@/hooks/useDashboardData'
import { useAIAnalysis } from '@/hooks/useAIAnalysis'
import { formatMinutesToHours } from '@/lib/utils/format'
import { StatsCard } from '@/components/dashboard/stats-card'
import { SubjectChart } from '@/components/dashboard/subject-chart'
import { DailyChart } from '@/components/dashboard/daily-chart'
import { AIAnalysisDisplay } from '@/components/ai/ai-analysis-display'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Clock, Calendar, BookOpen, TrendingUp, Target, Award } from 'lucide-react'

export default function DashboardPage() {
  const { stats, subjectStats, dailyStats, isLoading } = useDashboardData()
  const { isAnalyzing, analysisResult, analyzeStudyData } = useAIAnalysis()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ダッシュボード</h1>
          <p className="text-gray-600 mt-2">学習の進捗を確認しましょう</p>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="今日の学習時間"
            value={formatMinutesToHours(stats.todayMinutes)}
            subtitle={`${stats.todaySessions}セッション`}
            icon={Clock}
            iconColor="text-blue-600"
          />
          <StatsCard
            title="今週の学習時間"
            value={formatMinutesToHours(stats.weekMinutes)}
            icon={Calendar}
            iconColor="text-green-600"
          />
          <StatsCard
            title="今月の学習時間"
            value={formatMinutesToHours(stats.monthMinutes)}
            icon={BookOpen}
            iconColor="text-purple-600"
          />
          <StatsCard
            title="連続学習日数"
            value={`${stats.streak}日`}
            subtitle="素晴らしい！"
            icon={Award}
            iconColor="text-orange-600"
          />
        </div>

        {/* グラフ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SubjectChart data={subjectStats} />
          <DailyChart data={dailyStats} />
        </div>

        {/* AI分析セクション */}
        <div className="mb-8">
          <AIAnalysisDisplay 
            result={analysisResult}
            isAnalyzing={isAnalyzing}
            onAnalyze={analyzeStudyData}
          />
        </div>

        {/* 総学習時間 */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">総学習時間</h2>
              <p className="text-4xl font-bold">
                {formatMinutesToHours(stats.totalMinutes)}
              </p>
            </div>
            <TrendingUp className="h-16 w-16 opacity-20" />
          </div>
        </div>

        {/* モチベーションメッセージ */}
        {stats.streak > 0 && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              🎉 {stats.streak}日連続で学習を続けています！この調子で頑張りましょう！
            </p>
          </div>
        )}
      </div>
    </div>
  )
}