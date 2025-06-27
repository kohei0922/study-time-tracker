'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

interface Subject {
  id: string
  name: string
  color: string
  is_preset: boolean
}

interface CreateSessionParams {
  subjectId?: string
  userSubjectId?: string
  startedAt: Date
}

interface UpdateSessionParams {
  sessionId: string
  endedAt: Date
  durationMinutes: number
  notes?: string
}

export function useStudySession() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const supabase = createClient()

  const createSession = async (params: CreateSessionParams) => {
    setIsLoading(true)
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('ユーザーが見つかりません')

      const { data, error } = await supabase
        .from('study_sessions')
        .insert({
          user_id: user.id,
          subject_id: params.subjectId,
          user_subject_id: params.userSubjectId,
          started_at: params.startedAt.toISOString(),
        })
        .select()
        .single()

      if (error) throw error

      setCurrentSessionId(data.id)
      return data
    } catch (error) {
      console.error('セッション作成エラー:', error)
      toast.error('セッションの開始に失敗しました')
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const updateSession = async (params: UpdateSessionParams) => {
    setIsLoading(true)
    
    try {
      const { error } = await supabase
        .from('study_sessions')
        .update({
          ended_at: params.endedAt.toISOString(),
          duration_minutes: params.durationMinutes,
          notes: params.notes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', params.sessionId)

      if (error) throw error

      toast.success('勉強時間を記録しました！')
      setCurrentSessionId(null)
      return true
    } catch (error) {
      console.error('セッション更新エラー:', error)
      toast.error('記録の保存に失敗しました')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSubjects = async (): Promise<Subject[]> => {
    try {
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .eq('is_preset', true)
        .order('name')

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('科目取得エラー:', error)
      return []
    }
  }

  return {
    isLoading,
    currentSessionId,
    createSession,
    updateSession,
    fetchSubjects,
  }
}