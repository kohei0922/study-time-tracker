'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Brain, Target, TrendingUp, Lightbulb, Clock, Calendar } from 'lucide-react'

interface AIAnalysisResult {
  todaysPlan: {
    subject: string
    duration: number
    reason: string
  }[]
  weeklyGoalProgress: {
    onTrack: boolean
    message: string
    adjustmentNeeded: number
  }
  efficiencyTips: string[]
  motivationalMessage: string
  longTermPrediction: {
    goalAchievable: boolean
    estimatedDate: string | null
    recommendedPace: number
  }
}

interface AIAnalysisDisplayProps {
  result: AIAnalysisResult | null | undefined
  isAnalyzing: boolean
  onAnalyze: () => void
}

export function AIAnalysisDisplay({ result, isAnalyzing, onAnalyze }: AIAnalysisDisplayProps) {
  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-cyan-600 mr-3" />
            <CardTitle className="text-2xl text-cyan-900">AI学習分析</CardTitle>
          </div>
          <CardDescription className="text-lg text-cyan-700">
            あなたの学習パターンを分析して、最適な学習プランを提案します
          </CardDescription>
          <Button 
            onClick={onAnalyze} 
            disabled={isAnalyzing}
            className="mt-4 bg-cyan-600 hover:bg-cyan-700"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                分析中...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                学習データを分析
              </>
            )}
          </Button>
        </CardHeader>
      </Card>

      {result && (
        <>
          {/* 今日の学習プラン */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-cyan-900">
                <Target className="h-5 w-5 mr-2 text-cyan-600" />
                今日の推奨学習プラン
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.todaysPlan.map((plan, index) => (
                  <div key={index} className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-cyan-900">{plan.subject}</h4>
                      <span className="bg-cyan-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {plan.duration}分
                      </span>
                    </div>
                    <p className="text-cyan-700 text-sm">{plan.reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 週間目標の進捗 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-cyan-900">
                <TrendingUp className="h-5 w-5 mr-2 text-cyan-600" />
                週間目標の進捗状況
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg border-l-4 ${
                result.weeklyGoalProgress.onTrack 
                  ? 'bg-green-50 border-green-500' 
                  : 'bg-yellow-50 border-yellow-500'
              }`}>
                <div className="flex items-center mb-2">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    result.weeklyGoalProgress.onTrack ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <span className="font-medium text-gray-900">
                    {result.weeklyGoalProgress.onTrack ? '順調です！' : '調整が必要'}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{result.weeklyGoalProgress.message}</p>
                {result.weeklyGoalProgress.adjustmentNeeded > 0 && (
                  <div className="bg-white rounded-md p-3 border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <Clock className="h-4 w-4 inline mr-1" />
                      追加で{result.weeklyGoalProgress.adjustmentNeeded}分の学習をお勧めします
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 効率化のヒント */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-cyan-900">
                <Lightbulb className="h-5 w-5 mr-2 text-cyan-600" />
                効率化のヒント
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.efficiencyTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-600 text-sm font-medium">{index + 1}</span>
                    </div>
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 長期予測 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-cyan-900">
                <Calendar className="h-5 w-5 mr-2 text-cyan-600" />
                長期目標の予測
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  result.longTermPrediction.goalAchievable 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-orange-50 border border-orange-200'
                }`}>
                  <h4 className="font-medium mb-2 text-gray-900">目標達成可能性</h4>
                  <p className={`text-sm ${
                    result.longTermPrediction.goalAchievable ? 'text-green-700' : 'text-orange-700'
                  }`}>
                    {result.longTermPrediction.goalAchievable 
                      ? '現在のペースで目標達成が期待できます' 
                      : '目標達成にはペースアップが必要です'
                    }
                  </p>
                </div>
                
                {result.longTermPrediction.estimatedDate && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium mb-2 text-gray-900">予想達成日</h4>
                    <p className="text-blue-700">{result.longTermPrediction.estimatedDate}</p>
                  </div>
                )}
                
                <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                  <h4 className="font-medium mb-2 text-gray-900">推奨学習ペース</h4>
                  <p className="text-cyan-700">
                    1日あたり {result.longTermPrediction.recommendedPace}分の学習を継続することをお勧めします
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* モチベーションメッセージ */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl mb-4">🌟</div>
                <p className="text-lg font-medium text-purple-900 mb-2">今日の一言</p>
                <p className="text-purple-700">{result.motivationalMessage}</p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!result && !isAnalyzing && (
        <Card className="border-dashed border-2 border-cyan-300">
          <CardContent className="pt-6">
            <div className="text-center text-cyan-600">
              <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">AI分析を開始</p>
              <p className="text-sm opacity-75">
                上のボタンをクリックして、あなたの学習パターンを分析しましょう
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}