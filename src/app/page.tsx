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
    <div className="min-h-screen bg-black">
      {/* ヘッダー */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-lg shadow-lg border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src="/studyminus.png" 
              alt="Studyminus" 
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-2xl font-bold text-white">Studyminus</h1>
          </div>
          <div className="space-x-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">ログイン</Button>
            </Link>
            <Link href="/signup">
              <Button variant="playstation" size="sm">新規登録</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="mb-8">
              <img 
                src="/studyminus.png" 
                alt="Studyminus" 
                className="w-24 h-24 mx-auto mb-6 object-contain"
              />
            </div>
            <h2 className="text-5xl sm:text-7xl font-bold text-white mb-6 leading-tight">
              学習を
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">進化</span>
              させよう
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              PlayStation風のクールなデザインで、学習時間管理を革新。
              <br />高校生・大学受験生のための次世代学習プラットフォーム。
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/signup">
                <Button variant="playstation" size="xl" className="w-full sm:w-auto animate-pulse-glow">
                  今すぐプレイ
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
      <section id="features" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              なぜStudyminusを選ぶのか
            </h3>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              PlayStation風の洗練されたデザインと強力な機能で、学習体験を革新
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="text-center group hover:scale-105 transition-all duration-300 border-blue-500/20 hover:border-blue-500/40">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:from-blue-600/30 group-hover:to-blue-800/30 transition-colors border border-blue-500/30">
                      <Icon className="h-8 w-8 text-blue-400" />
                    </div>
                    <h4 className="text-lg font-bold mb-3 text-white">{feature.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
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
      <section className="py-24 bg-gradient-to-r from-blue-900 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h3 className="text-4xl font-bold mb-6">
            ゲームを始める準備はできましたか？
          </h3>
          <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
            Studyminusで学習を次のレベルへ。
            <br />すべての機能を無料でアンロック。
          </p>
          <Link href="/signup">
            <Button variant="playstation" size="xl" className="animate-pulse-glow shadow-2xl">
              今すぐプレイを始める
            </Button>
          </Link>
        </div>
      </section>

      {/* ベネフィット */}
      <section className="py-12 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <Icon className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">{benefit.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Studyminus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
