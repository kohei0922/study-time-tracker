'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'
import { ja } from 'date-fns/locale'
import { cn } from '@/lib/utils'

interface StudyDay {
  date: string
  minutes: number
  sessions: number
}

interface StudyCalendarProps {
  studyDays: StudyDay[]
  onDateClick?: (date: Date) => void
}

export function StudyCalendar({ studyDays, onDateClick }: StudyCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // 学習データをMapに変換
  const studyMap = new Map(
    studyDays.map(day => [day.date, day])
  )

  // 最大学習時間を計算（ヒートマップの色の基準）
  const maxMinutes = Math.max(...studyDays.map(d => d.minutes), 1)

  const getHeatmapColor = (minutes: number) => {
    if (minutes === 0) return 'bg-gray-100'
    const intensity = minutes / maxMinutes
    if (intensity > 0.75) return 'bg-blue-600'
    if (intensity > 0.5) return 'bg-blue-500'
    if (intensity > 0.25) return 'bg-blue-400'
    return 'bg-blue-300'
  }

  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  // 月の最初の日の曜日を取得（日曜日を0として）
  const firstDayOfWeek = monthStart.getDay()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>学習カレンダー</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={previousMonth}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium w-32 text-center">
              {format(currentMonth, 'yyyy年M月', { locale: ja })}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextMonth}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {/* 曜日ヘッダー */}
          {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
            <div
              key={day}
              className={cn(
                'text-center text-xs font-medium p-2',
                index === 0 && 'text-red-600',
                index === 6 && 'text-blue-600'
              )}
            >
              {day}
            </div>
          ))}

          {/* 月初の空白セル */}
          {Array.from({ length: firstDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {/* 日付セル */}
          {days.map((day) => {
            const dateKey = format(day, 'yyyy-MM-dd')
            const studyData = studyMap.get(dateKey)
            const minutes = studyData?.minutes || 0
            const isToday = isSameDay(day, new Date())

            return (
              <div
                key={dateKey}
                onClick={() => onDateClick?.(day)}
                className={cn(
                  'aspect-square p-1 rounded cursor-pointer transition-all hover:ring-2 hover:ring-blue-400',
                  minutes > 0 ? getHeatmapColor(minutes) : 'bg-gray-50',
                  isToday && 'ring-2 ring-blue-600'
                )}
              >
                <div className="h-full flex flex-col items-center justify-center">
                  <div className={cn(
                    'text-xs font-medium',
                    minutes > 0 ? 'text-white' : 'text-gray-900'
                  )}>
                    {format(day, 'd')}
                  </div>
                  {minutes > 0 && (
                    <div className="text-[10px] text-white opacity-90">
                      {Math.floor(minutes / 60) > 0 
                        ? `${Math.floor(minutes / 60)}h`
                        : `${minutes}m`
                      }
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* 凡例 */}
        <div className="mt-6 flex items-center justify-center space-x-4 text-xs">
          <span className="text-gray-600">少ない</span>
          <div className="flex space-x-1">
            <div className="w-4 h-4 bg-gray-100 rounded" />
            <div className="w-4 h-4 bg-blue-300 rounded" />
            <div className="w-4 h-4 bg-blue-400 rounded" />
            <div className="w-4 h-4 bg-blue-500 rounded" />
            <div className="w-4 h-4 bg-blue-600 rounded" />
          </div>
          <span className="text-gray-600">多い</span>
        </div>
      </CardContent>
    </Card>
  )
}