'use client'

import { Label } from '@/components/ui/label'

interface SessionNotesProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function SessionNotes({ value, onChange, disabled }: SessionNotesProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="notes">学習内容メモ（任意）</Label>
      <textarea
        id="notes"
        className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="今日学習した内容を記録..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  )
}