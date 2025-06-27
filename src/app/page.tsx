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
    <div 
      className="min-h-screen bg-gray-50 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/smbackground.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* ヘッダー */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-lg shadow-sm border-b border-blue-200/30 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src="/studyminus.png" 
              alt="Studyminus" 
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-2xl font-bold text-cyan-800">Studyminus</h1>
          </div>
          <div className="space-x-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">ログイン</Button>
            </Link>
            <Link href="/signup">
              <Button variant="default" size="sm">新規登録</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <div className="flex items-center justify-center mb-8">
              <img 
                src="/studyminus.png" 
                alt="Studyminus" 
                className="w-16 h-16 mr-4 object-contain"
              />
              <h1 className="text-6xl sm:text-7xl font-bold text-cyan-900">
                Study<span className="text-cyan-600">minus</span>
              </h1>
            </div>
            <p className="text-2xl text-cyan-800 mb-12 max-w-3xl mx-auto leading-relaxed">
              シンプルで洗練された学習時間管理アプリ<br />
              科目別の記録と可視化で、効率的な学習をサポート
            </p>
          </div>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
            <Link href="/signup">
              <Button variant="default" size="xl" className="w-full sm:w-auto text-lg px-12 py-4">
                今すぐ始める
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="xl" className="w-full sm:w-auto text-lg px-12 py-4">
                ログイン
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="flex items-center justify-center space-x-3 text-cyan-800 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md border border-cyan-200/50">
                  <Icon className="h-6 w-6 text-cyan-600" />
                  <span className="text-base font-medium">{benefit.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 機能セクション */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cyan-900 mb-4">
              学習を最適化する機能
            </h2>
            <p className="text-lg text-cyan-700 max-w-2xl mx-auto">
              Studyminusは、効率的な学習をサポートするための機能を提供します。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-cyan-200/50">
                  <CardContent>
                    <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-cyan-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-cyan-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-cyan-700 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cyan-50/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-cyan-900 mb-4">
            今すぐ学習を始めよう
          </h2>
          <p className="text-lg text-cyan-700 mb-8">
            Studyminusで効率的な学習習慣を身につけて、目標を達成しましょう。
          </p>
          <Link href="/signup">
            <Button variant="default" size="xl">
              無料で始める
            </Button>
          </Link>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-white/90 backdrop-blur-sm border-t border-cyan-200/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img 
              src="/studyminus.png" 
              alt="Studyminus" 
              className="w-6 h-6 object-contain"
            />
            <span className="text-lg font-semibold text-cyan-900">Studyminus</span>
          </div>
          <p className="text-cyan-700 text-sm">
            © 2024 Studyminus. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}