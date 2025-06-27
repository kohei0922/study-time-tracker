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
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import toast from 'react-hot-toast'
import Link from 'next/link'

const authSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(6, 'パスワードは6文字以上で入力してください'),
  fullName: z.string().min(1, '名前を入力してください').optional(),
})

type AuthFormData = z.infer<typeof authSchema>

interface AuthFormProps {
  mode: 'login' | 'signup'
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  })

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true)

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        })

        if (error) {
          toast.error(error.message)
          return
        }

        toast.success('ログインしました')
        router.push('/dashboard')
      } else {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              full_name: data.fullName,
            },
            emailRedirectTo: `${window.location.origin}/api/auth/callback`,
          },
        })

        if (error) {
          toast.error(error.message)
          return
        }

        toast.success('確認メールを送信しました。メールをご確認ください。')
      }
    } catch (error) {
      toast.error('エラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <div className="space-y-1 pb-6">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          {mode === 'login' ? 'ログイン' : '新規登録'}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {mode === 'signup' && (
          <div className="space-y-2">
            <Label htmlFor="fullName">名前</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="山田太郎"
              {...register('fullName')}
              disabled={isLoading}
            />
            {errors.fullName && (
              <p className="text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register('email')}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">パスワード</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full h-11"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingSpinner className="h-5 w-5" />
          ) : mode === 'login' ? (
            'ログイン'
          ) : (
            '登録する'
          )}
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        {mode === 'login' ? (
          <p className="text-gray-600">
            アカウントをお持ちでない方は{' '}
            <Link href="/signup" className="text-red-600 hover:text-red-700 font-medium">
              新規登録
            </Link>
          </p>
        ) : (
          <p className="text-gray-600">
            すでにアカウントをお持ちの方は{' '}
            <Link href="/login" className="text-red-600 hover:text-red-700 font-medium">
              ログイン
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}