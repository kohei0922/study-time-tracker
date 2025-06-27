'use client'

import { Button } from '@/components/ui/button'
import { Play, Pause, Square } from 'lucide-react'

interface TimerDisplayProps {
  time: string
  isRunning: boolean
  onStart: () => void
  onPause: () => void
  onStop: () => void
  disabled?: boolean
}

export function TimerDisplay({
  time,
  isRunning,
  onStart,
  onPause,
  onStop,
  disabled,
}: TimerDisplayProps) {
  return (
    <div className="text-center">
      <div className="text-7xl font-mono font-bold text-gray-900 mb-8">
        {time}
      </div>
      <div className="flex justify-center space-x-4">
        {!isRunning ? (
          <Button
            size="lg"
            onClick={onStart}
            disabled={disabled}
            className="w-32"
          >
            <Play className="w-5 h-5 mr-2" />
            開始
          </Button>
        ) : (
          <Button
            size="lg"
            variant="outline"
            onClick={onPause}
            disabled={disabled}
            className="w-32"
          >
            <Pause className="w-5 h-5 mr-2" />
            一時停止
          </Button>
        )}
        <Button
          size="lg"
          variant="destructive"
          onClick={onStop}
          disabled={disabled || (!isRunning && time === '00:00:00')}
          className="w-32"
        >
          <Square className="w-5 h-5 mr-2" />
          終了
        </Button>
      </div>
    </div>
  )
}