'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import toast from 'react-hot-toast'

const profileSchema = z.object({
  username: z.string().min(1, 'ユーザー名を入力してください'),
  fullName: z.string().min(1, '氏名を入力してください'),
  grade: z.string().optional(),
  targetSchool: z.string().optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface ProfileFormProps {
  initialData?: Partial<ProfileFormData>
  userId: string
}

export function ProfileForm({ initialData, userId }: ProfileFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          username: data.username,
          full_name: data.fullName,
          grade: data.grade || null,
          target_school: data.targetSchool || null,
          updated_at: new Date().toISOString(),
        })

      if (error) {
        toast.error('プロフィールの保存に失敗しました')
        console.error(error)
        return
      }

      toast.success('プロフィールを保存しました')
      router.push('/dashboard')
    } catch (error) {
      toast.error('エラーが発生しました')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>プロフィール設定</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">ユーザー名 *</Label>
              <Input
                id="username"
                type="text"
                placeholder="taro_yamada"
                {...register('username')}
                disabled={isLoading}
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">氏名 *</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="山田太郎"
                {...register('fullName')}
                disabled={isLoading}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="grade">学年</Label>
              <Input
                id="grade"
                type="text"
                placeholder="高校3年生"
                {...register('grade')}
                disabled={isLoading}
              />
              {errors.grade && (
                <p className="text-sm text-red-500">{errors.grade.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetSchool">志望校</Label>
              <Input
                id="targetSchool"
                type="text"
                placeholder="○○大学"
                {...register('targetSchool')}
                disabled={isLoading}
              />
              {errors.targetSchool && (
                <p className="text-sm text-red-500">{errors.targetSchool.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
              className="flex-1"
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? (
                <LoadingSpinner className="h-5 w-5" />
              ) : (
                '保存'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}