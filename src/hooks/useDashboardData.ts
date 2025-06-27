'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { startOfDay, startOfWeek, startOfMonth, endOfDay, subDays, format } from 'date-fns'
import { ja } from 'date-fns/locale'

interface DashboardStats {
  todayMinutes: number
  weekMinutes: number
  monthMinutes: number
  totalMinutes: number
  todaySessions: number
  streak: number
}

interface SubjectStats {
  subjectId: string
  subjectName: string
  subjectColor: string
  totalMinutes: number
  percentage: number
}

interface DailyStats {
  date: string
  minutes: number
  sessions: number
}

export function useDashboardData() {
  const [stats, setStats] = useState<DashboardStats>({
    todayMinutes: 0,
    weekMinutes: 0,
    monthMinutes: 0,
    totalMinutes: 0,
    todaySessions: 0,
    streak: 0,
  })
  const [subjectStats, setSubjectStats] = useState<SubjectStats[]>([])
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const supabase = createClient()

  useEffect(() => {
    fetchDashboardData()

    // リアルタイム更新
    const channel = supabase
      .channel('dashboard_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'study_sessions',
        },
        () => {
          fetchDashboardData()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const now = new Date()
      const todayStart = startOfDay(now)
      const weekStart = startOfWeek(now, { weekStartsOn: 1 })
      const monthStart = startOfMonth(now)

      // まず科目データを取得
      const { data: subjects, error: subjectsError } = await supabase
        .from('subjects')
        .select('*')

      if (subjectsError) {
        console.error('Subjects fetch error:', subjectsError)
        throw subjectsError
      }

      // セッションデータを取得（シンプルなクエリ）
      const { data: sessions, error: sessionsError } = await supabase
        .from('study_sessions')
        .select('*')
        .eq('user_id', user.id)
        .not('ended_at', 'is', null)
        .order('started_at', { ascending: false })

      if (sessionsError) {
        console.error('Sessions fetch error:', sessionsError)
        throw sessionsError
      }

      console.log('Fetched sessions:', sessions?.length || 0)
      console.log('Fetched subjects:', subjects?.length || 0)

      // 統計を計算
      let todayMinutes = 0
      let weekMinutes = 0
      let monthMinutes = 0
      let totalMinutes = 0
      let todaySessions = 0
      const subjectMap = new Map<string, { name: string; color: string; minutes: number }>()
      const dailyMap = new Map<string, { minutes: number; sessions: number }>()

      sessions?.forEach(session => {
        const sessionDate = new Date(session.started_at)
        const minutes = session.duration_minutes || 0
        
        totalMinutes += minutes

        if (sessionDate >= todayStart) {
          todayMinutes += minutes
          todaySessions++
        }
        
        if (sessionDate >= weekStart) {
          weekMinutes += minutes
        }
        
        if (sessionDate >= monthStart) {
          monthMinutes += minutes
        }

        // 科目別統計（手動で結合）
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

        // 日別統計（過去7日間）
        const dateKey = format(sessionDate, 'yyyy-MM-dd')
        const dailyData = dailyMap.get(dateKey) || { minutes: 0, sessions: 0 }
        dailyData.minutes += minutes
        dailyData.sessions += 1
        dailyMap.set(dateKey, dailyData)
      })

      // 科目別統計を配列に変換
      const subjectStatsArray: SubjectStats[] = Array.from(subjectMap.entries()).map(([id, data]) => ({
        subjectId: id,
        subjectName: data.name,
        subjectColor: data.color,
        totalMinutes: data.minutes,
        percentage: totalMinutes > 0 ? Math.round((data.minutes / totalMinutes) * 100) : 0
      })).sort((a, b) => b.totalMinutes - a.totalMinutes)

      // 過去7日間の日別統計を作成
      const dailyStatsArray: DailyStats[] = []
      for (let i = 6; i >= 0; i--) {
        const date = subDays(now, i)
        const dateKey = format(date, 'yyyy-MM-dd')
        const data = dailyMap.get(dateKey) || { minutes: 0, sessions: 0 }
        dailyStatsArray.push({
          date: format(date, 'M/d(E)', { locale: ja }),
          minutes: data.minutes,
          sessions: data.sessions
        })
      }

      // ストリーク計算（連続学習日数）
      let streak = 0
      let checkDate = new Date()
      
      // 今日の学習があるかチェック
      const todayKey = format(checkDate, 'yyyy-MM-dd')
      if (dailyMap.has(todayKey)) {
        streak = 1
        checkDate = subDays(checkDate, 1)
        
        // 過去の連続日数をカウント
        while (true) {
          const dateKey = format(checkDate, 'yyyy-MM-dd')
          if (dailyMap.has(dateKey)) {
            streak++
            checkDate = subDays(checkDate, 1)
          } else {
            break
          }
        }
      }

      console.log('Calculated stats:', {
        todayMinutes,
        weekMinutes,
        monthMinutes,
        totalMinutes,
        todaySessions,
        streak
      })

      setStats({
        todayMinutes,
        weekMinutes,
        monthMinutes,
        totalMinutes,
        todaySessions,
        streak
      })
      setSubjectStats(subjectStatsArray)
      setDailyStats(dailyStatsArray)
    } catch (error) {
      console.error('Dashboard data fetch error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    stats,
    subjectStats,
    dailyStats,
    isLoading,
    refetch: fetchDashboardData
  }
}