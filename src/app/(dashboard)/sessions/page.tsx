'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SessionList } from '@/components/sessions/session-list'
import { SessionFormModal } from '@/components/sessions/session-form-modal'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Plus } from 'lucide-react'
import toast from 'react-hot-toast'

interface SessionWithSubject {
  id: string
  started_at: string
  ended_at: string | null
  duration_minutes: number | null
  notes: string | null
  subject_id: string | null
  user_subject_id: string | null
  subject: {
    id: string
    name: string
    color: string
  } | null
  user_subject: {
    id: string
    name: string
    color: string
  } | null
}

interface Subject {
  id: string
  name: string
  color: string
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<SessionWithSubject[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSession, setEditingSession] = useState<SessionWithSubject | null>(null)
  
  const supabase = createClient()

  const fetchData = async () => {
    setIsLoading(true)
    
    try {
      // 現在のユーザーを取得
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        console.log('No user found')
        return
      }

      // まず科目データを取得
      const { data: subjectsData, error: subjectsError } = await supabase
        .from('subjects')
        .select('*')

      if (subjectsError) {
        throw subjectsError
      }

      console.log('Subjects data:', subjectsData)

      // セッションデータを取得（シンプルなクエリ）
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('study_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('started_at', { ascending: false })

      if (sessionsError) {
        throw sessionsError
      }

      console.log('Sessions data:', sessionsData)

      // 手動でデータを結合
      const sessionsWithSubjects = (sessionsData || []).map(session => {
        const subject = subjectsData?.find(s => s.id === session.subject_id) || null
        return {
          ...session,
          subject: subject,
          user_subject: null
        }
      })

      setSessions(sessionsWithSubjects as SessionWithSubject[])
      setSubjects(subjectsData?.filter(s => s.is_preset) || [])
    } catch (error) {
      console.error('Data fetch error:', error)
      toast.error('データの取得に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  // 初回読み込みとリアルタイム更新
  useEffect(() => {
    fetchData()
    
    // リアルタイム更新の設定
    const channel = supabase
      .channel('study_sessions_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'study_sessions',
        },
        () => {
          console.log('Realtime update received')
          fetchData()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const handleAddSession = () => {
    setEditingSession(null)
    setIsModalOpen(true)
  }

  const handleEditSession = (session: SessionWithSubject) => {
    setEditingSession(session)
    setIsModalOpen(true)
  }

  const handleDeleteSession = async (sessionId: string) => {
    try {
      const { error } = await supabase
        .from('study_sessions')
        .delete()
        .eq('id', sessionId)

      if (error) throw error

      toast.success('記録を削除しました')
      await fetchData()
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('削除に失敗しました')
    }
  }

  const handleFormSubmit = async (data: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const startedAt = new Date(`${data.date}T${data.startTime}`)
      const endedAt = new Date(`${data.date}T${data.endTime}`)
      const durationMinutes = Math.ceil((endedAt.getTime() - startedAt.getTime()) / 1000 / 60)

      if (editingSession) {
        // 更新
        const { error } = await supabase
          .from('study_sessions')
          .update({
            started_at: startedAt.toISOString(),
            ended_at: endedAt.toISOString(),
            duration_minutes: durationMinutes,
            subject_id: data.subjectId,
            notes: data.notes || null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingSession.id)

        if (error) throw error
        toast.success('記録を更新しました')
      } else {
        // 新規作成
        const { error } = await supabase
          .from('study_sessions')
          .insert({
            user_id: user.id,
            started_at: startedAt.toISOString(),
            ended_at: endedAt.toISOString(),
            duration_minutes: durationMinutes,
            subject_id: data.subjectId,
            notes: data.notes || null,
          })

        if (error) throw error
        toast.success('記録を追加しました')
      }

      await fetchData()
    } catch (error) {
      console.error('Save error:', error)
      toast.error('保存に失敗しました')
    }
  }

  console.log('Current sessions:', sessions)
  console.log('Current subjects:', subjects)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">学習履歴</h1>
          <Button onClick={handleAddSession}>
            <Plus className="w-4 h-4 mr-2" />
            記録を追加
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>最近の学習記録</CardTitle>
          </CardHeader>
          <CardContent>
            <SessionList
              sessions={sessions}
              onEdit={handleEditSession}
              onDelete={handleDeleteSession}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>

        <SessionFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
          subjects={subjects}
          initialData={editingSession ? {
            id: editingSession.id,
            started_at: editingSession.started_at,
            ended_at: editingSession.ended_at || editingSession.started_at,
            subject_id: editingSession.subject_id,
            user_subject_id: editingSession.user_subject_id,
            notes: editingSession.notes,
          } : undefined}
        />
      </div>
    </div>
  )
}