'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { format, subDays, startOfDay } from 'date-fns'
import { ja } from 'date-fns/locale'

interface StudyPattern {
  averageStudyTime: number
  mostProductiveTime: string
  strongSubjects: string[]
  weakSubjects: string[]
  studyFrequency: number
  recentTrend: 'improving' | 'stable' | 'declining'
}

interface AIAnalysisResult {
  todaysPlan: {
    subject: string
    duration: number
    reason: string
  }[]
  weeklyGoalProgress: {
    onTrack: boolean
    message: string
    adjustmentNeeded: number
  }
  efficiencyTips: string[]
  motivationalMessage: string
  longTermPrediction: {
    goalAchievable: boolean
    estimatedDate: string | null
    recommendedPace: number
  }
}

export function useAIAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null)
  const supabase = createClient()

  const analyzeStudyData = async () => {
    setIsAnalyzing(true)
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // 過去30日間のデータを取得
      const thirtyDaysAgo = subDays(new Date(), 30)
      
      // セッションデータ
      const { data: sessions } = await supabase
        .from('study_sessions')
        .select(`
          *,
          subjects(name, color)
        `)
        .eq('user_id', user.id)
        .gte('started_at', thirtyDaysAgo.toISOString())
        .order('started_at', { ascending: false })

      // 目標データ
      const { data: goals } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)

      // プロフィールデータ
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      // 学習パターンを分析
      const pattern = analyzePattern(sessions || [])
      
      // AIに送るデータを準備
      const analysisData = {
        profile: {
          grade: profile?.grade,
          targetSchool: profile?.target_school,
        },
        studyPattern: pattern,
        goals: goals?.map(g => ({
          type: g.type,
          targetMinutes: g.target_minutes,
          subjectId: g.subject_id
        })),
        recentSessions: sessions?.slice(0, 14).map(s => ({
          date: format(new Date(s.started_at), 'yyyy-MM-dd'),
          subject: s.subjects?.name || '不明',
          duration: s.duration_minutes,
          dayOfWeek: format(new Date(s.started_at), 'EEEE', { locale: ja })
        }))
      }

      // OpenAI APIを呼び出し
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analysisData),
      })

      if (!response.ok) throw new Error('AI分析に失敗しました')

      const result = await response.json()
      setAnalysisResult(result)
      
    } catch (error) {
      console.error('AI analysis error:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const analyzePattern = (sessions: any[]): StudyPattern => {
    if (sessions.length === 0) {
      return {
        averageStudyTime: 0,
        mostProductiveTime: '不明',
        strongSubjects: [],
        weakSubjects: [],
        studyFrequency: 0,
        recentTrend: 'stable'
      }
    }

    // 平均学習時間
    const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration_minutes || 0), 0)
    const averageStudyTime = Math.round(totalMinutes / sessions.length)

    // 最も生産的な時間帯
    const hourCounts: Record<number, number> = {}
    sessions.forEach(s => {
      const hour = new Date(s.started_at).getHours()
      hourCounts[hour] = (hourCounts[hour] || 0) + 1
    })
    const mostProductiveHour = Object.entries(hourCounts)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || '不明'

    // 科目別の分析
    const subjectMinutes: Record<string, number> = {}
    sessions.forEach(s => {
      if (s.subjects?.name) {
        subjectMinutes[s.subjects.name] = (subjectMinutes[s.subjects.name] || 0) + (s.duration_minutes || 0)
      }
    })
    
    const sortedSubjects = Object.entries(subjectMinutes)
      .sort(([, a], [, b]) => b - a)
    
    const strongSubjects = sortedSubjects.slice(0, 2).map(([name]) => name)
    const weakSubjects = sortedSubjects.slice(-2).map(([name]) => name)

    // 学習頻度（週何日）
    const uniqueDays = new Set(sessions.map(s => 
      format(new Date(s.started_at), 'yyyy-MM-dd')
    )).size
    const studyFrequency = Math.round((uniqueDays / 30) * 7)

    // 最近のトレンド
    const recentWeek = sessions.filter(s => 
      new Date(s.started_at) >= subDays(new Date(), 7)
    )
    const previousWeek = sessions.filter(s => {
      const date = new Date(s.started_at)
      return date >= subDays(new Date(), 14) && date < subDays(new Date(), 7)
    })
    
    const recentTotal = recentWeek.reduce((sum, s) => sum + (s.duration_minutes || 0), 0)
    const previousTotal = previousWeek.reduce((sum, s) => sum + (s.duration_minutes || 0), 0)
    
    let recentTrend: 'improving' | 'stable' | 'declining' = 'stable'
    if (recentTotal > previousTotal * 1.2) recentTrend = 'improving'
    else if (recentTotal < previousTotal * 0.8) recentTrend = 'declining'

    return {
      averageStudyTime,
      mostProductiveTime: `${mostProductiveHour}時頃`,
      strongSubjects,
      weakSubjects,
      studyFrequency,
      recentTrend
    }
  }

  return {
    isAnalyzing,
    analysisResult,
    analyzeStudyData
  }
}