import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '目標',
  description: '学習目標の設定と管理',
}

export default function GoalsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}