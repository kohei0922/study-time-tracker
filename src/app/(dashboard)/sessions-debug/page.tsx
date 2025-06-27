import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function SessionsDebugPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // シンプルなクエリでセッションを取得
  const { data: sessions, error } = await supabase
    .from('study_sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-4">セッションデバッグ</h1>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">ユーザーID: {user.id}</p>
        <p className="text-sm text-gray-600">セッション数: {sessions?.length || 0}</p>
      </div>

      {error && (
        <div className="bg-red-100 p-4 rounded mb-4">
          <p className="text-red-600">エラー: {JSON.stringify(error)}</p>
        </div>
      )}

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">生データ:</h2>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(sessions, null, 2)}
        </pre>
      </div>
    </div>
  )
}