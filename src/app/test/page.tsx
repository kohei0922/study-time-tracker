// src/app/test/page.tsx
import { createClient } from '@/lib/supabase/server'

export default async function TestPage() {
  const supabase = await createClient()
  
  // 科目データを取得
  const { data: subjects, error } = await supabase
    .from('subjects')
    .select('*')
    .order('name')

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">接続エラー</h1>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase接続テスト</h1>
      <div className="mb-4">
        <p className="text-green-600 font-semibold">✅ 接続成功！</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">プリセット科目一覧:</h2>
        <div className="grid grid-cols-3 gap-4">
          {subjects?.map((subject) => (
            <div
              key={subject.id}
              className="p-4 border rounded-lg"
              style={{ borderColor: subject.color }}
            >
              <div className="font-medium">{subject.name}</div>
              <div className="text-sm text-gray-500">{subject.color}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Raw Data:</h3>
        <pre className="bg-gray-100 p-4 rounded text-sm">
          {JSON.stringify(subjects, null, 2)}
        </pre>
      </div>
    </div>
  )
}