'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface UseTimerReturn {
  seconds: number
  isRunning: boolean
  start: () => void
  pause: () => void
  reset: () => void
  getFormattedTime: () => string
}

export function useTimer(initialSeconds: number = 0): UseTimerReturn {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const accumulatedTimeRef = useRef<number>(initialSeconds * 1000)

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - accumulatedTimeRef.current
      
      intervalRef.current = setInterval(() => {
        const elapsedTime = Date.now() - startTimeRef.current!
        setSeconds(Math.floor(elapsedTime / 1000))
      }, 100) // 100msごとに更新（より正確）
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (startTimeRef.current) {
        accumulatedTimeRef.current = Date.now() - startTimeRef.current
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const start = useCallback(() => {
    setIsRunning(true)
  }, [])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setSeconds(0)
    startTimeRef.current = null
    accumulatedTimeRef.current = 0
  }, [])

  const getFormattedTime = useCallback(() => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    const pad = (num: number) => num.toString().padStart(2, '0')
    
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`
  }, [seconds])

  return {
    seconds,
    isRunning,
    start,
    pause,
    reset,
    getFormattedTime,
  }
}