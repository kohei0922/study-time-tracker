import { AuthForm } from '@/components/auth/auth-form'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Studyminus
          </h1>
          <p className="mt-2 text-gray-600">
            学習を記録して、成長を実感
          </p>
        </div>
        <AuthForm mode="login" />
      </div>
    </div>
  )
}