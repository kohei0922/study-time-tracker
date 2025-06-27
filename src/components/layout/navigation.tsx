'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Home, Timer, Clock, BarChart3, Target, User, LogOut } from 'lucide-react'
import toast from 'react-hot-toast'

const navigation = [
  { name: 'ダッシュボード', href: '/dashboard', icon: Home },
  { name: 'タイマー', href: '/timer', icon: Timer },
  { name: '学習履歴', href: '/sessions', icon: Clock },
  { name: '統計', href: '/stats', icon: BarChart3 },
  { name: '目標', href: '/goals', icon: Target },
  { name: 'プロフィール', href: '/profile', icon: User },
]

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error('ログアウトに失敗しました')
    } else {
      toast.success('ログアウトしました')
      router.push('/login')
    }
  }

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-sm flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">Studyminus</h1>
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-3 py-1 rounded-sm text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-b-2 border-red-600'
                        : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="ml-4"
            >
              <LogOut className="w-4 h-4 mr-2" />
              ログアウト
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}