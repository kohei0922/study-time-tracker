import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileForm } from '@/components/profile/profile-form'

export default async function ProfilePage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // プロフィールデータを取得
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const initialData = profile ? {
    username: profile.username || '',
    fullName: profile.full_name || '',
    grade: profile.grade || '',
    targetSchool: profile.target_school || '',
  } : undefined

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">プロフィール設定</h1>
          <p className="mt-2 text-gray-600">
            あなたの学習情報を設定して、より効果的な管理を行いましょう
          </p>
        </div>
        
        <div className="flex justify-center">
          <ProfileForm initialData={initialData} userId={user.id} />
        </div>
      </div>
    </div>
  )
}