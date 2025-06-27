'use client'

import { useState, useEffect } from 'react'
import { useGoals } from '@/hooks/useGoals'
import { createClient } from '@/lib/supabase/client'
import { GoalCard } from '@/components/goals/goal-card'
import { GoalFormModal } from '@/components/goals/goal-form-modal'
import { AchievementBadge } from '@/components/goals/achievement-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Plus, Trophy, Flame, Star, Zap } from 'lucide-react'

interface Subject {
  id: string
  name: string
  color: string
}

export default function GoalsPage() {
  const { goals, goalProgress, isLoading, createGoal, deleteGoal } = useGoals()
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [achievements, setAchievements] = useState({
    firstGoal: false,
    weekStreak: false,
    perfectDay: false,
    monthlyChampion: false,
  })
  
  const supabase = createClient()

  useEffect(() => {
    fetchSubjects()
    checkAchievements()
  }, [goalProgress])

  const fetchSubjects = async () => {
    const { data } = await supabase
      .from('subjects')
      .select('*')
      .eq('is_preset', true)
      .order('name')
    
    setSubjects(data || [])
  }

  const checkAchievements = () => {
    // 実際のアプリケーションでは、これらの達成状況をデータベースに保存します
    const hasCompletedGoal = goalProgress.some(g => g.isCompleted)
    const hasAllDailyCompleted = goalProgress
      .filter(g => g.type === 'daily')
      .every(g => g.isCompleted)

    setAchievements({
      firstGoal: hasCompletedGoal,
      weekStreak: false, // 実装例: 7日連続で目標達成
      perfectDay: hasAllDailyCompleted && goalProgress.some(g => g.type === 'daily'),
      monthlyChampion: false, // 実装例: 月間目標を3回達成
    })
  }

  const handleDeleteGoal = async (goalId: string) => {
    if (confirm('この目標を削除してもよろしいですか？')) {
      await deleteGoal(goalId)
    }
  }

  const getGoalProgress = (goalId: string) => {
    return goalProgress.find(p => p.goalId === goalId)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  // 目標をタイプ別に分類
  const dailyGoals = goals.filter(g => g.type === 'daily')
  const weeklyGoals = goals.filter(g => g.type === 'weekly')
  const monthlyGoals = goals.filter(g => g.type === 'monthly')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">学習目標</h1>
            <p className="text-gray-600 mt-2">目標を設定して学習のモチベーションを維持しましょう</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            目標を追加
          </Button>
        </div>

        {/* アクティブな目標 */}
        <div className="space-y-6 mb-8">
          {dailyGoals.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">毎日の目標</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dailyGoals.map(goal => {
                  const progress = getGoalProgress(goal.id)
                  if (!progress) return null
                  
                  return (
                    <GoalCard
                      key={goal.id}
                      type={goal.type}
                      targetMinutes={progress.targetMinutes}
                      achievedMinutes={progress.achievedMinutes}
                      percentage={progress.percentage}
                      isCompleted={progress.isCompleted}
                      subjectName={progress.subjectName}
                      subjectColor={progress.subjectColor}
                      onDelete={() => handleDeleteGoal(goal.id)}
                    />
                  )
                })}
              </div>
            </div>
          )}

          {weeklyGoals.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">週間目標</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {weeklyGoals.map(goal => {
                  const progress = getGoalProgress(goal.id)
                  if (!progress) return null
                  
                  return (
                    <GoalCard
                      key={goal.id}
                      type={goal.type}
                      targetMinutes={progress.targetMinutes}
                      achievedMinutes={progress.achievedMinutes}
                      percentage={progress.percentage}
                      isCompleted={progress.isCompleted}
                      subjectName={progress.subjectName}
                      subjectColor={progress.subjectColor}
                      onDelete={() => handleDeleteGoal(goal.id)}
                    />
                  )
                })}
              </div>
            </div>
          )}

          {monthlyGoals.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">月間目標</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {monthlyGoals.map(goal => {
                  const progress = getGoalProgress(goal.id)
                  if (!progress) return null
                  
                  return (
                    <GoalCard
                      key={goal.id}
                      type={goal.type}
                      targetMinutes={progress.targetMinutes}
                      achievedMinutes={progress.achievedMinutes}
                      percentage={progress.percentage}
                      isCompleted={progress.isCompleted}
                      subjectName={progress.subjectName}
                      subjectColor={progress.subjectColor}
                      onDelete={() => handleDeleteGoal(goal.id)}
                    />
                  )
                })}
              </div>
            </div>
          )}

          {goals.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">まだ目標が設定されていません</p>
                <Button onClick={() => setIsModalOpen(true)}>
                  最初の目標を設定する
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 実績バッジ */}
        <Card>
          <CardHeader>
            <CardTitle>実績</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AchievementBadge
                title="初めての目標達成"
                description="最初の目標を達成しました"
                isUnlocked={achievements.firstGoal}
                icon={<Star className="h-8 w-8" />}
              />
              <AchievementBadge
                title="パーフェクトデイ"
                description="1日の全ての目標を達成"
                isUnlocked={achievements.perfectDay}
                icon={<Zap className="h-8 w-8" />}
              />
              <AchievementBadge
                title="週間ストリーク"
                description="7日連続で目標達成"
                isUnlocked={achievements.weekStreak}
                icon={<Flame className="h-8 w-8" />}
              />
              <AchievementBadge
                title="月間チャンピオン"
                description="月間目標を3回達成"
                isUnlocked={achievements.monthlyChampion}
                icon={<Trophy className="h-8 w-8" />}
              />
            </div>
          </CardContent>
        </Card>

        <GoalFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={createGoal}
          subjects={subjects}
        />
      </div>
    </div>
  )
}