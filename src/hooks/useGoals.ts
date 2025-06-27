'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { startOfDay, startOfWeek, startOfMonth } from 'date-fns'
import toast from 'react-hot-toast'

interface Goal {
  id: string
  type: 'daily' | 'weekly' | 'monthly'
  target_minutes: number
  subject_id: string | null
  user_subject_id: string | null
  is_active: boolean
  created_at: string
  updated_at: string
  subject?: {
    id: string
    name: string
    color: string
  }
}

interface GoalProgress {
  goalId: string
  type: 'daily' | 'weekly' | 'monthly'
  targetMinutes: number
  achievedMinutes: number
  percentage: number
  isCompleted: boolean
  subjectName?: string
  subjectColor?: string
}

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [goalProgress, setGoalProgress] = useState<GoalProgress[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const supabase = createClient()

  useEffect(() => {
    fetchGoals()

    // リアルタイム更新
    const goalsChannel = supabase
      .channel('goals_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'goals',
        },
        () => {
          fetchGoals()
        }
      )
      .subscribe()

    const sessionsChannel = supabase
      .channel('sessions_for_goals')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'study_sessions',
        },
        () => {
          fetchGoals()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(goalsChannel)
      supabase.removeChannel(sessionsChannel)
    }
  }, [])

  const fetchGoals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // 目標データを取得
      const { data: goalsData, error: goalsError } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (goalsError) throw goalsError

      // 科目データを取得
      const { data: subjects } = await supabase
        .from('subjects')
        .select('*')

      // 期間に応じたセッションデータを取得
      const now = new Date()
      const todayStart = startOfDay(now)
      const weekStart = startOfWeek(now, { weekStartsOn: 1 })
      const monthStart = startOfMonth(now)

      const { data: sessions } = await supabase
        .from('study_sessions')
        .select('*')
        .eq('user_id', user.id)
        .gte('started_at', monthStart.toISOString())
        .not('ended_at', 'is', null)

      // 目標に科目情報を結合
      const goalsWithSubjects = goalsData?.map(goal => {
        const subject = subjects?.find(s => s.id === goal.subject_id)
        return {
          ...goal,
          subject
        }
      }) || []

      // 進捗を計算
      const progressData: GoalProgress[] = goalsWithSubjects.map(goal => {
        let achievedMinutes = 0
        let startDate: Date

        switch (goal.type) {
          case 'daily':
            startDate = todayStart
            break
          case 'weekly':
            startDate = weekStart
            break
          case 'monthly':
            startDate = monthStart
            break
        }

        // 該当期間のセッションを集計
        sessions?.forEach(session => {
          const sessionDate = new Date(session.started_at)
          if (sessionDate >= startDate) {
            // 科目指定がある場合はその科目のみ、ない場合は全科目
            if (!goal.subject_id || session.subject_id === goal.subject_id) {
              achievedMinutes += session.duration_minutes || 0
            }
          }
        })

        const percentage = Math.min(
          Math.round((achievedMinutes / goal.target_minutes) * 100),
          100
        )

        return {
          goalId: goal.id,
          type: goal.type,
          targetMinutes: goal.target_minutes,
          achievedMinutes,
          percentage,
          isCompleted: achievedMinutes >= goal.target_minutes,
          subjectName: goal.subject?.name,
          subjectColor: goal.subject?.color
        }
      })

      setGoals(goalsWithSubjects)
      setGoalProgress(progressData)

      // 目標達成時の通知
      progressData.forEach(progress => {
        if (progress.isCompleted && progress.percentage === 100) {
          const existingNotification = localStorage.getItem(`goal_completed_${progress.goalId}_${new Date().toDateString()}`)
          if (!existingNotification) {
            toast.success(`🎉 ${getGoalTypeLabel(progress.type)}の目標を達成しました！`)
            localStorage.setItem(`goal_completed_${progress.goalId}_${new Date().toDateString()}`, 'true')
          }
        }
      })
    } catch (error) {
      console.error('Goals fetch error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const createGoal = async (goalData: {
    type: 'daily' | 'weekly' | 'monthly'
    targetMinutes: number
    subjectId?: string | null
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('ユーザーが見つかりません')

      const { error } = await supabase
        .from('goals')
        .insert({
          user_id: user.id,
          type: goalData.type,
          target_minutes: goalData.targetMinutes,
          subject_id: goalData.subjectId || null,
          is_active: true
        })

      if (error) throw error

      toast.success('目標を設定しました')
      await fetchGoals()
      return true
    } catch (error) {
      console.error('Goal creation error:', error)
      toast.error('目標の設定に失敗しました')
      return false
    }
  }

  const updateGoal = async (goalId: string, updates: {
    targetMinutes?: number
    isActive?: boolean
  }) => {
    try {
      const { error } = await supabase
        .from('goals')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', goalId)

      if (error) throw error

      toast.success('目標を更新しました')
      await fetchGoals()
      return true
    } catch (error) {
      console.error('Goal update error:', error)
      toast.error('目標の更新に失敗しました')
      return false
    }
  }

  const deleteGoal = async (goalId: string) => {
    try {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', goalId)

      if (error) throw error

      toast.success('目標を削除しました')
      await fetchGoals()
      return true
    } catch (error) {
      console.error('Goal deletion error:', error)
      toast.error('目標の削除に失敗しました')
      return false
    }
  }

  return {
    goals,
    goalProgress,
    isLoading,
    createGoal,
    updateGoal,
    deleteGoal,
    refetch: fetchGoals
  }
}

// ヘルパー関数
function getGoalTypeLabel(type: 'daily' | 'weekly' | 'monthly'): string {
  switch (type) {
    case 'daily':
      return '今日'
    case 'weekly':
      return '今週'
    case 'monthly':
      return '今月'
  }
}