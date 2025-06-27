import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Timer, BarChart3, Target, Trophy, Clock, CheckCircle } from 'lucide-react'

export default function LandingPage() {
  const features = [
    {
      icon: Timer,
      title: 'シンプルなタイマー',
      description: '直感的な操作で学習時間を記録。科目別に時間を管理できます。',
    },
    {
      icon: BarChart3,
      title: '詳細な統計分析',
      description: 'グラフやカレンダーで学習の進捗を可視化。モチベーション維持に最適。',
    },
    {
      icon: Target,
      title: '柔軟な目標設定',
      description: '日別・週別・月別の目標を設定。達成状況をリアルタイムで確認。',
    },
    {
      icon: Trophy,
      title: '実績バッジ',
      description: '学習の成果を実績として記録。達成感を味わいながら継続。',
    },
  ]

  const benefits = [
    { icon: Clock, text: '学習時間の見える化' },
    { icon: CheckCircle, text: '科目別の時間管理' },
    { icon: Trophy, text: 'モチベーション向上' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Study Time Tracker</h1>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="outline">ログイン</Button>
            </Link>
            <Link href="/signup">
              <Button>新規登録</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          効率的な学習時間管理を
          <span className="text-blue-600">始めよう</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Study Time Trackerは、高校生・大学受験生のための学習時間管理アプリです。
          科目別の学習時間を記録し、目標達成をサポートします。
        </p>
        <div className="space-x-4">
          <Link href="/signup">
            <Button size="lg" className="px-8">
              無料で始める
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="px-8">
              機能を見る
            </Button>
          </Link>
        </div>
      </section>

      {/* 特徴セクション */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            主な機能
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* 使い方セクション */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            使い方は簡単
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h4 className="font-semibold mb-2">アカウント作成</h4>
              <p className="text-gray-600 text-sm">
                メールアドレスで簡単に登録できます
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h4 className="font-semibold mb-2">学習を記録</h4>
              <p className="text-gray-600 text-sm">
                タイマーで簡単に学習時間を記録
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h4 className="font-semibold mb-2">進捗を確認</h4>
              <p className="text-gray-600 text-sm">
                グラフで学習の成果を可視化
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            今すぐ学習管理を始めましょう
          </h3>
          <p className="text-xl mb-8 opacity-90">
            無料で全ての機能をご利用いただけます
          </p>
          <Link href="/signup">
            <Button size="lg" variant="outline" className="px-12 bg-white text-blue-600 hover:bg-gray-100">
              無料で始める
            </Button>
          </Link>
        </div>
      </section>

      {/* ベネフィット */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">{benefit.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Study Time Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
