'use client'

import { useStatsData } from '@/hooks/useStatsData'
import { StudyCalendar } from '@/components/calendar/study-calendar'
import { WeeklyTrend } from '@/components/stats/weekly-trend'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { formatMinutesToHours } from '@/lib/utils/format'
import { Trophy, Clock, Calendar, TrendingUp } from 'lucide-react'

export default function StatsPage() {
  const {
    calendarDays,
    weeklyData,
    subjectRanking,
    totalHours,
    averageMinutesPerDay,
    mostProductiveDay,
    isLoading
  } = useStatsData()

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
          <h1 className="text-3xl font-bold text-gray-900">学習統計</h1>
          <p className="text-gray-600 mt-2">詳細な学習データを確認できます</p>
        </div>

        {/* 統計サマリー */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">総学習時間</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHours}時間</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">1日平均</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatMinutesToHours(averageMinutesPerDay)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">最も勉強する曜日</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mostProductiveDay}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">学習日数</CardTitle>
              <Trophy className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calendarDays.length}日</div>
            </CardContent>
          </Card>
        </div>

        {/* カレンダーとトレンド */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <StudyCalendar 
            studyDays={calendarDays}
            onDateClick={(date) => {
              console.log('Clicked date:', date)
            }}
          />
          <WeeklyTrend data={weeklyData} />
        </div>

        {/* 科目ランキング */}
        <Card>
          <CardHeader>
            <CardTitle>科目別学習時間ランキング</CardTitle>
          </CardHeader>
          <CardContent>
            {subjectRanking.length === 0 ? (
              <p className="text-gray-500 text-center py-8">まだデータがありません</p>
            ) : (
              <div className="space-y-4">
                {subjectRanking.map((subject) => (
                  <div key={subject.rank} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                      {subject.rank === 1 && (
                        <Trophy className="h-6 w-6 text-yellow-500" />
                      )}
                      {subject.rank === 2 && (
                        <Trophy className="h-5 w-5 text-gray-400" />
                      )}
                      {subject.rank === 3 && (
                        <Trophy className="h-5 w-5 text-orange-600" />
                      )}
                      {subject.rank > 3 && (
                        <span className="text-gray-600 font-medium">{subject.rank}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: subject.subjectColor }}
                          />
                          <span className="font-medium">{subject.subjectName}</span>
                        </div>
                        <span className="text-gray-600">
                          {formatMinutesToHours(subject.totalMinutes)}
                        </span>
                      </div>
                      <div className="mt-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${subject.percentage}%`,
                            backgroundColor: subject.subjectColor,
                          }}
                        />
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {subject.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}