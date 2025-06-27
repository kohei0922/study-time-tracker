'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, Clock, Calendar, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SessionWithSubject } from '@/types/session'

interface SessionListProps {
  sessions: SessionWithSubject[]
  onEdit: (session: SessionWithSubject) => void
  onDelete: (sessionId: string) => void
  isLoading?: boolean
}

export function SessionList({ sessions, onEdit, onDelete, isLoading }: SessionListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (sessionId: string) => {
    if (confirm('この記録を削除してもよろしいですか？')) {
      setDeletingId(sessionId)
      await onDelete(sessionId)
      setDeletingId(null)
    }
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}時間${mins}分` : `${mins}分`
  }

  if (sessions.length === 0) {
    return (
      <Card className="p-8 text-center text-gray-500">
        <p>まだ学習記録がありません</p>
        <p className="text-sm mt-2">タイマーを使って勉強を始めましょう！</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => {
        const subject = session.subject || session.user_subject
        const isDeleting = deletingId === session.id

        return (
          <Card
            key={session.id}
            className={cn(
              'p-4 transition-all',
              isDeleting && 'opacity-50'
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-4">
                  {subject && (
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: subject.color }}
                      />
                      <span className="font-medium">{subject.name}</span>
                    </div>
                  )}
                  {session.duration_minutes && (
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatDuration(session.duration_minutes)}
                    </div>
                  )}
                </div>

                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {format(new Date(session.started_at), 'M月d日(E) HH:mm', { locale: ja })}
                  {session.ended_at && (
                    <>
                      {' 〜 '}
                      {format(new Date(session.ended_at), 'HH:mm')}
                    </>
                  )}
                </div>

                {session.notes && (
                  <div className="flex items-start text-gray-600 text-sm">
                    <BookOpen className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                    <p className="line-clamp-2">{session.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onEdit(session)}
                  disabled={isDeleting || isLoading}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(session.id)}
                  disabled={isDeleting || isLoading}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}