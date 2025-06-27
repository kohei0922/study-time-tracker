import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ダッシュボード',
  description: '学習の進捗と統計を確認',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}