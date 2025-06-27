import { AuthForm } from '@/components/auth/auth-form'
import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center space-x-3 mb-8">
            <img 
              src="/studyminus.png" 
              alt="Studyminus" 
              className="w-12 h-12 object-contain"
            />
            <h1 className="text-3xl font-bold text-white">Studyminus</h1>
          </Link>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">ゲームを始める</h2>
            <p className="text-blue-100">アカウントを作成して学習の冒険を開始</p>
          </div>
        </div>
        <AuthForm mode="signup" />
        <div className="text-center">
          <p className="text-gray-400">
            すでにアカウントをお持ちですか？{' '}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
              ログイン
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}