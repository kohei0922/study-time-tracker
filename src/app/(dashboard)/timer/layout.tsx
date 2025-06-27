import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'タイマー',
  description: '学習時間を記録',
}

export default function TimerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}