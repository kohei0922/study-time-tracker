'use client'

import { useAIAnalysis } from '@/hooks/useAIAnalysis'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Clock, 
  Sparkles,
  CheckCircle,
  AlertCircle,
  Calendar,
  Lightbulb
} from 'lucide-react'
import { formatMinutesToHours } from '@/lib/utils/format'
import { cn } from '@/lib/utils'

export default function InsightsPage() {
  const { isAnalyzing, analysisResult, analyzeStudyData } = useAIAnalysis()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI学習アドバイス</h1>
            <p className="text-gray-600 mt-2">AIがあなたの学習パターンを分析し、最適な学習プランを提案します</p>
          </div>
          <Button 
            onClick={analyzeStudyData}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isAnalyzing ? (
              <>
                <LoadingSpinner className="mr-2 h-4 w-4" />
                分析中...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                AI分析を実行
              </>
            )}
          </Button>
        </div>

        {!analysisResult ? (
          <Card className="text-center py-20">
            <CardContent>
              <Brain className="h-20 w-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                AI分析を始めましょう
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                あなたの学習データを分析して、パーソナライズされたアドバイスを提供します
              </p>
              <Button 
                onClick={analyzeStudyData}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                分析を開始
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* 今日の学習プラン */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-purple-600" />
                  今日の推奨学習プラン
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisResult.todaysPlan.map((plan, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{plan.subject}</h4>
                        <p className="text-gray-600">推奨時間: {formatMinutesToHours(plan.duration)}</p>
                        <p className="text-sm text-gray-500 mt-1">{plan.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 週間目標の進捗 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5 text-blue-600" />
                  週間目標の進捗状況
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={cn(
                  "p-4 rounded-lg",
                  analysisResult.weeklyGoalProgress.onTrack ? "bg-green-50" : "bg-yellow-50"
                )}>
                  <div className="flex items-start space-x-3">
                    {analysisResult.weeklyGoalProgress.onTrack ? (
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    ) : (
                      <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">
                        {analysisResult.weeklyGoalProgress.message}
                      </p>
                      {analysisResult.weeklyGoalProgress.adjustmentNeeded > 0 && (
                        <p className="text-sm text-gray-600 mt-1">
                          追加で{formatMinutesToHours(analysisResult.weeklyGoalProgress.adjustmentNeeded)}の学習が必要です
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 効率化のヒント */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5 text-yellow-600" />
                  学習効率を上げるヒント
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysisResult.efficiencyTips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* モチベーションメッセージ */}
            <Card className="bg-gradient-to-r from-pink-50 to-purple-50">
              <CardContent className="py-8">
                <div className="text-center">
                  <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <p className="text-xl font-medium text-gray-800 italic">
                    "{analysisResult.motivationalMessage}"
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 長期予測 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                  長期予測
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">目標達成可能性</p>
                    <p className={cn(
                      "text-2xl font-bold",
                      analysisResult.longTermPrediction.goalAchievable ? "text-green-600" : "text-yellow-600"
                    )}>
                      {analysisResult.longTermPrediction.goalAchievable ? "達成可能" : "要改善"}
                    </p>
                  </div>
                  {analysisResult.longTermPrediction.estimatedDate && (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">目標達成予想日</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {new Date(analysisResult.longTermPrediction.estimatedDate).toLocaleDateString('ja-JP')}
                      </p>
                    </div>
                  )}
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">推奨ペース</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatMinutesToHours(analysisResult.longTermPrediction.recommendedPace)}/日
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}