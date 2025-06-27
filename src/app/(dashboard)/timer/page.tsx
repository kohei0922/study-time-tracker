'use client'

import { useState, useEffect } from 'react'
import { useTimer } from '@/hooks/useTimer'
import { useStudySession } from '@/hooks/useStudySession'
import { TimerDisplay } from '@/components/timer/timer-display'
import { SubjectSelector } from '@/components/timer/subject-selector'
import { SessionNotes } from '@/components/timer/session-notes'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import toast from 'react-hot-toast'

interface Subject {
  id: string
  name: string
  color: string
  is_preset: boolean
}

export default function TimerPage() {
  const timer = useTimer()
  const session = useStudySession()
  
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null)
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null)
  const [notes, setNotes] = useState('')
  const [isInitializing, setIsInitializing] = useState(true)

  // 科目データを取得
  useEffect(() => {
    const loadSubjects = async () => {
      const fetchedSubjects = await session.fetchSubjects()
      setSubjects(fetchedSubjects)
      setIsInitializing(false)
    }
    loadSubjects()
  }, [])

  // キーボードショートカット（スペースキーで開始/停止）
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault()
        if (timer.isRunning) {
          timer.pause()
        } else if (selectedSubjectId) {
          handleStart()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [timer.isRunning, selectedSubjectId])

  const handleStart = async () => {
    if (!selectedSubjectId) {
      toast.error('科目を選択してください')
      return
    }

    const startTime = new Date()
    setSessionStartTime(startTime)

    // セッションを作成
    const newSession = await session.createSession({
      subjectId: selectedSubjectId,
      startedAt: startTime,
    })

    if (newSession) {
      timer.start()
    }
  }

  const handlePause = () => {
    timer.pause()
  }

  const handleStop = async () => {
    if (!session.currentSessionId || !sessionStartTime) {
      toast.error('セッション情報が見つかりません')
      return
    }

    const endTime = new Date()
    const durationMinutes = Math.ceil(timer.seconds / 60)

    // セッションを更新
    const success = await session.updateSession({
      sessionId: session.currentSessionId,
      endedAt: endTime,
      durationMinutes,
      notes: notes.trim(),
    })

    if (success) {
      // リセット
      timer.reset()
      setSessionStartTime(null)
      setNotes('')
      setSelectedSubjectId(null)
    }
  }

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">勉強タイマー</h1>

        {/* タイマー表示 */}
        <Card className="mb-8">
          <CardContent className="py-12">
            <TimerDisplay
              time={timer.getFormattedTime()}
              isRunning={timer.isRunning}
              onStart={handleStart}
              onPause={handlePause}
              onStop={handleStop}
              disabled={session.isLoading}
            />
          </CardContent>
        </Card>

        {/* 科目選択 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>学習設定</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <SubjectSelector
              subjects={subjects}
              selectedSubjectId={selectedSubjectId}
              onSelect={setSelectedSubjectId}
              disabled={timer.isRunning || session.isLoading}
            />
            
            {timer.isRunning && (
              <SessionNotes
                value={notes}
                onChange={setNotes}
                disabled={session.isLoading}
              />
            )}
          </CardContent>
        </Card>

        {/* 使い方のヒント */}
        <div className="text-center text-sm text-gray-600">
          <p>💡 ヒント: スペースキーでタイマーを開始/一時停止できます</p>
        </div>
      </div>
    </div>
  )
}