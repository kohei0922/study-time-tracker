'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { X } from 'lucide-react'

const goalFormSchema = z.object({
  type: z.enum(['daily', 'weekly', 'monthly']),
  hours: z.number().min(0).max(24),
  minutes: z.number().min(0).max(59),
  subjectId: z.string().optional(),
})

type GoalFormData = z.infer<typeof goalFormSchema>

interface Subject {
  id: string
  name: string
  color: string
}

interface GoalFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: {
    type: 'daily' | 'weekly' | 'monthly'
    targetMinutes: number
    subjectId?: string | null
  }) => Promise<boolean>
  subjects: Subject[]
}

export function GoalFormModal({
  isOpen,
  onClose,
  onSubmit,
  subjects,
}: GoalFormModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<GoalFormData>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      type: 'daily',
      hours: 0,
      minutes: 30,
      subjectId: '',
    },
  })

  const goalType = watch('type')

  const handleFormSubmit = async (data: GoalFormData) => {
    setIsLoading(true)
    const targetMinutes = data.hours * 60 + data.minutes
    
    const success = await onSubmit({
      type: data.type,
      targetMinutes,
      subjectId: data.subjectId || null,
    })

    setIsLoading(false)
    if (success) {
      reset()
      onClose()
    }
  }

  const getRecommendedTime = () => {
    switch (goalType) {
      case 'daily':
        return '推奨: 1〜3時間'
      case 'weekly':
        return '推奨: 10〜20時間'
      case 'monthly':
        return '推奨: 40〜80時間'
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">新しい目標を設定</h2>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">目標期間</Label>
            <select
              id="type"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              {...register('type')}
              disabled={isLoading}
            >
              <option value="daily">毎日</option>
              <option value="weekly">毎週</option>
              <option value="monthly">毎月</option>
            </select>
            {errors.type && (
              <p className="text-sm text-red-500">{errors.type.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>目標時間</Label>
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="0"
                  {...register('hours', { valueAsNumber: true })}
                  disabled={isLoading}
                />
              </div>
              <span className="text-sm text-gray-600">時間</span>
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="0"
                  {...register('minutes', { valueAsNumber: true })}
                  disabled={isLoading}
                />
              </div>
              <span className="text-sm text-gray-600">分</span>
            </div>
            <p className="text-xs text-gray-500">{getRecommendedTime()}</p>
            {(errors.hours || errors.minutes) && (
              <p className="text-sm text-red-500">有効な時間を入力してください</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subjectId">科目（任意）</Label>
            <select
              id="subjectId"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              {...register('subjectId')}
              disabled={isLoading}
            >
              <option value="">全科目</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500">
              特定の科目のみの目標を設定できます
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <LoadingSpinner className="h-5 w-5" /> : '設定する'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}