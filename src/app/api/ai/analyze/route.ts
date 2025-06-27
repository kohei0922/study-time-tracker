import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createClient } from '@/lib/supabase/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { profile, studyPattern, goals, recentSessions } = body

    const prompt = `
あなたは学習効率化の専門家です。以下のデータを分析して、具体的で実用的な学習アドバイスを提供してください。

# ユーザープロフィール
- 学年: ${profile?.grade || '不明'}
- 志望校: ${profile?.targetSchool || '不明'}

# 学習パターン分析結果
- 平均学習時間: ${studyPattern?.averageStudyTime || 0}分/日
- 最も生産的な時間帯: ${studyPattern?.mostProductiveTime || '不明'}
- 得意科目: ${studyPattern?.strongSubjects?.join(', ') || '不明'}
- 弱点科目: ${studyPattern?.weakSubjects?.join(', ') || '不明'}
- 学習頻度: 週${studyPattern?.studyFrequency || 0}日
- 最近のトレンド: ${studyPattern?.recentTrend === 'improving' ? '向上中' : studyPattern?.recentTrend === 'declining' ? '下降中' : '安定'}

# 現在の目標
${goals?.map((g: any) => `- ${g.type}: ${g.targetMinutes}分 (科目ID: ${g.subjectId})`).join('\n') || '設定されていません'}

# 直近2週間の学習記録
${recentSessions?.map((s: any) => `${s.date} (${s.dayOfWeek}): ${s.subject} - ${s.duration}分`).join('\n') || 'データがありません'}

以下のJSON形式で回答してください:

{
  "todaysPlan": [
    {
      "subject": "科目名",
      "duration": 分数,
      "reason": "推奨理由"
    }
  ],
  "weeklyGoalProgress": {
    "onTrack": true/false,
    "message": "進捗状況の説明",
    "adjustmentNeeded": 分数（調整が必要な時間）
  },
  "efficiencyTips": [
    "効率化のためのアドバイス1",
    "効率化のためのアドバイス2",
    "効率化のためのアドバイス3"
  ],
  "motivationalMessage": "今日のモチベーション向上メッセージ",
  "longTermPrediction": {
    "goalAchievable": true/false,
    "estimatedDate": "YYYY-MM-DD" または null,
    "recommendedPace": 分数（1日あたりの推奨学習時間）
  }
}

重要事項:
- 具体的で実践可能なアドバイスを提供する
- ユーザーの現在のパフォーマンスレベルに合わせる
- ポジティブで建設的なフィードバックを心がける
- 日本語で回答する
- 有効なJSONフォーマットで応答する
`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'あなたは学習効率化の専門家です。データを分析して具体的で実用的な学習アドバイスを日本語で提供します。必ず有効なJSONフォーマットで回答してください。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    const content = completion.choices[0]?.message?.content
    
    if (!content) {
      throw new Error('AI分析結果が取得できませんでした')
    }

    // JSONパース前にマークダウンのコードブロックを除去
    const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    
    try {
      const analysisResult = JSON.parse(cleanContent)
      return NextResponse.json(analysisResult)
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      console.error('Raw content:', content)
      
      // フォールバック：基本的な分析結果を返す
      const fallbackResult = {
        todaysPlan: [
          {
            subject: studyPattern?.weakSubjects?.[0] || '基礎学習',
            duration: Math.max(30, Math.round((studyPattern?.averageStudyTime || 60) * 0.8)),
            reason: '弱点分野の強化に集中することをお勧めします'
          }
        ],
        weeklyGoalProgress: {
          onTrack: studyPattern?.recentTrend === 'improving',
          message: studyPattern?.recentTrend === 'improving' ? '順調に進歩しています！' : '少し調整が必要かもしれません。',
          adjustmentNeeded: studyPattern?.recentTrend === 'declining' ? 30 : 0
        },
        efficiencyTips: [
          `${studyPattern?.mostProductiveTime}の時間帯を活用しましょう`,
          '短時間でも継続することが重要です',
          '弱点科目に重点的に取り組みましょう'
        ],
        motivationalMessage: '今日も一歩ずつ目標に近づいています。継続は力なり！',
        longTermPrediction: {
          goalAchievable: true,
          estimatedDate: null,
          recommendedPace: Math.max(60, studyPattern?.averageStudyTime || 60)
        }
      }
      
      return NextResponse.json(fallbackResult)
    }
    
  } catch (error) {
    console.error('AI Analysis error:', error)
    return NextResponse.json(
      { error: 'AI分析中にエラーが発生しました' },
      { status: 500 }
    )
  }
}