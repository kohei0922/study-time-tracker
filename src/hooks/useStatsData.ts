'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { format, startOfWeek, endOfWeek, subWeeks, eachDayOfInterval } from 'date-fns'
import { ja } from 'date-fns/locale'

interface CalendarDay {
  date: string
  minutes: number
  sessions: number
}

interface WeeklyData {
  week: string
  minutes: number
}

interface SubjectRanking {
  rank: number
  subjectName: string
  subjectColor: string
  totalMinutes: number
  percentage: number
}

export function useStatsData() {
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([])
  const [subjectRanking, setSubjectRanking] = useState<SubjectRanking[]>([])
  const [totalHours, setTotalHours] = useState(0)
  const [averageMinutesPerDay, setAverageMinutesPerDay] = useState(0)
  const [mostProductiveDay, setMostProductiveDay] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  
  const supabase = createClient()

  useEffect(() => {
    fetchStatsData()

    // リアルタイム更新
    const channel = supabase
      .channel('stats_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'study_sessions',
        },
        () => {
          fetchStatsData()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchStatsData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // 科目データを取得
      const { data: subjects } = await supabase
        .from('subjects')
        .select('*')

      // すべてのセッションを取得
      const { data: sessions, error } = await supabase
        .from('study_sessions')
        .select('*')
        .eq('user_id', user.id)
        .not('ended_at', 'is', null)
        .order('started_at', { ascending: true })

      if (error) throw error

      // カレンダー用データ（日別）
      const dailyMap = new Map<string, { minutes: number; sessions: number }>()
      const weeklyMap = new Map<string, number>()
      const subjectMap = new Map<string, { name: string; color: string; minutes: number }>()
      let totalMinutes = 0

      sessions?.forEach(session => {
        const date = new Date(session.started_at)
        const dateKey = format(date, 'yyyy-MM-dd')
        const weekKey = format(startOfWeek(date, { weekStartsOn: 1 }), 'yyyy-MM-dd')
        const minutes = session.duration_minutes || 0

        totalMinutes += minutes

        // 日別データ
        const daily = dailyMap.get(dateKey) || { minutes: 0, sessions: 0 }
        daily.minutes += minutes
        daily.sessions += 1
        dailyMap.set(dateKey, daily)

        // 週別データ
        const weekly = weeklyMap.get(weekKey) || 0
        weeklyMap.set(weekKey, weekly + minutes)

        // 科目別データ
        if (session.subject_id) {
          const subject = subjects?.find(s => s.id === session.subject_id)
          if (subject) {
            const current = subjectMap.get(session.subject_id) || {
              name: subject.name,
              color: subject.color,
              minutes: 0
            }
            current.minutes += minutes
            subjectMap.set(session.subject_id, current)
          }
        }
      })

      // カレンダーデータを配列に変換
      const calendarArray: CalendarDay[] = Array.from(dailyMap.entries()).map(([date, data]) => ({
        date,
        minutes: data.minutes,
        sessions: data.sessions
      }))

      // 過去8週間の週別データを作成
      const weeklyArray: WeeklyData[] = []
      for (let i = 7; i >= 0; i--) {
        const weekStart = startOfWeek(subWeeks(new Date(), i), { weekStartsOn: 1 })
        const weekKey = format(weekStart, 'yyyy-MM-dd')
        const minutes = weeklyMap.get(weekKey) || 0
        weeklyArray.push({
          week: format(weekStart, 'M/d', { locale: ja }),
          minutes
        })
      }

      // 科目ランキングを作成
      const subjectArray = Array.from(subjectMap.entries())
        .map(([id, data]) => ({
          subjectName: data.name,
          subjectColor: data.color,
          totalMinutes: data.minutes,
          percentage: totalMinutes > 0 ? Math.round((data.minutes / totalMinutes) * 100) : 0
        }))
        .sort((a, b) => b.totalMinutes - a.totalMinutes)
        .map((item, index) => ({
          ...item,
          rank: index + 1
        }))

      // 統計情報を計算
      const studyDays = dailyMap.size
      const avgMinutes = studyDays > 0 ? Math.round(totalMinutes / studyDays) : 0
      
      // 最も勉強した曜日を計算
      const dayOfWeekMap = new Map<number, number>()
      dailyMap.forEach((data, dateKey) => {
        const dayOfWeek = new Date(dateKey).getDay()
        const current = dayOfWeekMap.get(dayOfWeek) || 0
        dayOfWeekMap.set(dayOfWeek, current + data.minutes)
      })
      
      let maxDayMinutes = 0
      let maxDayOfWeek = 0
      dayOfWeekMap.forEach((minutes, day) => {
        if (minutes > maxDayMinutes) {
          maxDayMinutes = minutes
          maxDayOfWeek = day
        }
      })
      
      const dayNames = ['日', '月', '火', '水', '木', '金', '土']
      const productiveDay = dayNames[maxDayOfWeek] + '曜日'

      setCalendarDays(calendarArray)
      setWeeklyData(weeklyArray)
      setSubjectRanking(subjectArray)
      setTotalHours(Math.round(totalMinutes / 60))
      setAverageMinutesPerDay(avgMinutes)
      setMostProductiveDay(productiveDay)
    } catch (error) {
      console.error('Stats data fetch error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    calendarDays,
    weeklyData,
    subjectRanking,
    totalHours,
    averageMinutesPerDay,
    mostProductiveDay,
    isLoading,
    refetch: fetchStatsData
  }
}