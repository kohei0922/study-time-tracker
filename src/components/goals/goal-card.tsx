'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatMinutesToHours } from '@/lib/utils/format'
import { Target, Clock, Trash2, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GoalCardProps {
  type: 'daily' | 'weekly' | 'monthly'
  targetMinutes: number
  achievedMinutes: number
  percentage: number
  isCompleted: boolean
  subjectName?: string
  subjectColor?: string
  onDelete: () => void
}

export function GoalCard({
  type,
  targetMinutes,
  achievedMinutes,
  percentage,
  isCompleted,
  subjectName,
  subjectColor,
  onDelete,
}: GoalCardProps) {
  const getTypeLabel = () => {
    switch (type) {
      case 'daily':
        return '今日の目標'
      case 'weekly':
        return '今週の目標'
      case 'monthly':
        return '今月の目標'
    }
  }

  const getTypeIcon = () => {
    switch (type) {
      case 'daily':
        return Clock
      case 'weekly':
        return Target
      case 'monthly':
        return Target
    }
  }

  const Icon = getTypeIcon()

  return (
    <Card className={cn(
      'relative overflow-hidden transition-all',
      isCompleted && 'ring-2 ring-green-500'
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Icon className="h-5 w-5 text-gray-600" />
            <div>
              <h3 className="font-medium">{getTypeLabel()}</h3>
              {subjectName && (
                <div className="flex items-center mt-1">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: subjectColor }}
                  />
                  <span className="text-sm text-gray-600">{subjectName}</span>
                </div>
              )}
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={onDelete}
            className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-2xl font-bold">
                {formatMinutesToHours(achievedMinutes)}
              </p>
              <p className="text-sm text-gray-500">
                / {formatMinutesToHours(targetMinutes)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{percentage}%</p>
              {isCompleted && (
                <p className="text-sm text-green-600 flex items-center justify-end mt-1">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  達成！
                </p>
              )}
            </div>
          </div>
          
          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={cn(
                'absolute left-0 top-0 h-full rounded-full transition-all',
                isCompleted ? 'bg-green-500' : 'bg-blue-500'
              )}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}