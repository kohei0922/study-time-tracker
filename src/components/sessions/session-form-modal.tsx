'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { X } from 'lucide-react'

const sessionFormSchema = z.object({
  date: z.string().min(1, '日付を選択してください'),
  startTime: z.string().min(1, '開始時刻を入力してください'),
  endTime: z.string().min(1, '終了時刻を入力してください'),
  subjectId: z.string().min(1, '科目を選択してください'),
  notes: z.string().optional(),
}).refine((data) => {
  const start = new Date(`${data.date}T${data.startTime}`)
  const end = new Date(`${data.date}T${data.endTime}`)
  return end > start
}, {
  message: '終了時刻は開始時刻より後にしてください',
  path: ['endTime'],
})

type SessionFormData = z.infer<typeof sessionFormSchema>

interface Subject {
  id: string
  name: string
  color: string
}

interface SessionFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: SessionFormData) => Promise<void>
  subjects: Subject[]
  initialData?: {
    id: string
    started_at: string
    ended_at: string
    subject_id: string | null
    user_subject_id: string | null
    notes: string | null
  }
}

export function SessionFormModal({
  isOpen,
  onClose,
  onSubmit,
  subjects,
  initialData,
}: SessionFormModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SessionFormData>({
    resolver: zodResolver(sessionFormSchema),
  })

  useEffect(() => {
    if (initialData) {
      const startDate = new Date(initialData.started_at)
      const endDate = new Date(initialData.ended_at)
      
      reset({
        date: format(startDate, 'yyyy-MM-dd'),
        startTime: format(startDate, 'HH:mm'),
        endTime: format(endDate, 'HH:mm'),
        subjectId: initialData.subject_id || initialData.user_subject_id || '',
        notes: initialData.notes || '',
      })
    } else {
      reset({
        date: format(new Date(), 'yyyy-MM-dd'),
        startTime: '',
        endTime: '',
        subjectId: '',
        notes: '',
      })
    }
  }, [initialData, reset])

  const handleFormSubmit = async (data: SessionFormData) => {
    setIsLoading(true)
    await onSubmit(data)
    setIsLoading(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {initialData ? '学習記録を編集' : '学習記録を追加'}
          </h2>
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
            <Label htmlFor="date">日付</Label>
            <Input
              id="date"
              type="date"
              {...register('date')}
              disabled={isLoading}
            />
            {errors.date && (
              <p className="text-sm text-red-500">{errors.date.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">開始時刻</Label>
              <Input
                id="startTime"
                type="time"
                {...register('startTime')}
                disabled={isLoading}
              />
              {errors.startTime && (
                <p className="text-sm text-red-500">{errors.startTime.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">終了時刻</Label>
              <Input
                id="endTime"
                type="time"
                {...register('endTime')}
                disabled={isLoading}
              />
              {errors.endTime && (
                <p className="text-sm text-red-500">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subjectId">科目</Label>
            <select
              id="subjectId"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              {...register('subjectId')}
              disabled={isLoading}
            >
              <option value="">選択してください</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
            {errors.subjectId && (
              <p className="text-sm text-red-500">{errors.subjectId.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">メモ（任意）</Label>
            <textarea
              id="notes"
              className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              placeholder="学習内容を記録..."
              {...register('notes')}
              disabled={isLoading}
            />
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
              {isLoading ? (
                <LoadingSpinner className="h-5 w-5" />
              ) : initialData ? (
                '更新する'
              ) : (
                '追加する'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}