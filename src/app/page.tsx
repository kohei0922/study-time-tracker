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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50">
      {/* ヘッダー */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Studyminus</h1>
          </div>
          <div className="space-x-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">ログイン</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="animate-pulse-glow">新規登録</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-6xl sm:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              ミニマルな
              <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">学習管理</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Studyminusは、シンプルで美しいデザインの学習時間管理アプリ。
              <br />高校生・大学受験生のための最適化されたツール。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup">
                <Button size="xl" className="w-full sm:w-auto animate-pulse-glow">
                  無料で始める
                </Button>
              </Link>
              <Link href="#features">
                <Button size="xl" variant="outline" className="w-full sm:w-auto">
                  機能を見る
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              なぜStudyminusなのか
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ミニマルなデザインと強力な機能で、学習効率を最大化します
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="text-center group hover:scale-105 transition-all duration-300">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-sm flex items-center justify-center mx-auto mb-6 group-hover:from-red-200 group-hover:to-red-300 transition-colors">
                      <Icon className="h-8 w-8 text-red-600" />
                    </div>
                    <h4 className="text-lg font-bold mb-3 text-gray-900">{feature.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
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
      <section className="py-24 bg-gradient-to-r from-red-600 to-red-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h3 className="text-4xl font-bold mb-6">
            学習の質を変える時間です
          </h3>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            今すぐStudyminusで効率的な学習管理を始めましょう。
            <br />すべての機能を無料でお試しいただけます。
          </p>
          <Link href="/signup">
            <Button size="xl" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100 animate-pulse-glow">
              今すぐ無料で始める
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
            <p>&copy; 2024 Studyminus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
