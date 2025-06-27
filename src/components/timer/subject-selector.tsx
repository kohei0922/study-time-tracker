'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface Subject {
  id: string
  name: string
  color: string
  is_preset: boolean
}

interface SubjectSelectorProps {
  subjects: Subject[]
  selectedSubjectId: string | null
  onSelect: (subjectId: string) => void
  disabled?: boolean
}

export function SubjectSelector({
  subjects,
  selectedSubjectId,
  onSelect,
  disabled,
}: SubjectSelectorProps) {
  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">科目を選択</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <Card
            key={subject.id}
            className={cn(
              'p-4 cursor-pointer transition-all hover:shadow-md',
              selectedSubjectId === subject.id
                ? 'ring-2 ring-offset-2'
                : 'hover:border-gray-400',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            style={{
              borderColor: selectedSubjectId === subject.id ? subject.color : undefined,
              '--tw-ring-color': subject.color,
            } as React.CSSProperties}
            onClick={() => !disabled && onSelect(subject.id)}
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: subject.color }}
              />
              <span className="font-medium">{subject.name}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}