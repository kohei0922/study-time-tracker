import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Study Time Tracker - 効率的な学習時間管理アプリ',
    template: '%s | Study Time Tracker',
  },
  description: '高校生・大学受験生のための学習時間管理アプリ。科目別の学習時間を記録し、グラフで可視化。目標設定機能で効率的な学習をサポート。',
  keywords: ['学習管理', '勉強時間', 'タイマー', '受験勉強', '学習記録'],
  authors: [{ name: 'Study Time Tracker Team' }],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://study-time-tracker.vercel.app',
    siteName: 'Study Time Tracker',
    title: 'Study Time Tracker - 効率的な学習時間管理アプリ',
    description: '科目別の学習時間を記録し、目標達成をサポートする無料の学習管理アプリ',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Study Time Tracker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study Time Tracker',
    description: '効率的な学習時間管理アプリ',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10B981',
              },
            },
            error: {
              style: {
                background: '#EF4444',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
