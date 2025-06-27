import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Studyminus - ミニマルな学習時間管理アプリ',
    template: '%s | Studyminus',
  },
  description: 'ミニマルで洗練された学習時間管理アプリ。高校生・大学受験生のための科目別学習記録とグラフ可視化。シンプルなデザインで効率的な学習をサポート。',
  keywords: ['学習管理', '勉強時間', 'タイマー', '受験勉強', '学習記録', 'ミニマル', 'シンプル'],
  authors: [{ name: 'Studyminus Team' }],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://studyminus.vercel.app',
    siteName: 'Studyminus',
    title: 'Studyminus - ミニマルな学習時間管理アプリ',
    description: 'シンプルで美しいデザインの学習時間管理アプリ。科目別記録と目標達成をサポート。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Studyminus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studyminus',
    description: 'ミニマルな学習時間管理アプリ',
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
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a1a',
              color: '#ffffff',
              border: '1px solid #2d2d2d',
            },
            success: {
              style: {
                background: '#0070f3',
                color: '#ffffff',
              },
            },
            error: {
              style: {
                background: '#EF4444',
                color: '#ffffff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
