import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '統計',
  description: '詳細な学習データ分析',
}

export default function StatsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}