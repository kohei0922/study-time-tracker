import { AuthForm } from '@/components/auth/auth-form'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Study Time Tracker</h1>
          <p className="mt-2 text-gray-600">アカウントを作成して学習を記録しましょう</p>
        </div>
        <AuthForm mode="signup" />
      </div>
    </div>
  )
}