import { Award } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AchievementBadgeProps {
  title: string
  description: string
  isUnlocked: boolean
  icon?: React.ReactNode
}

export function AchievementBadge({
  title,
  description,
  isUnlocked,
  icon = <Award className="h-8 w-8" />
}: AchievementBadgeProps) {
  return (
    <div className={cn(
      'p-4 rounded-lg border-2 transition-all',
      isUnlocked
        ? 'bg-yellow-50 border-yellow-400 text-yellow-900'
        : 'bg-gray-50 border-gray-200 text-gray-400'
    )}>
      <div className="flex items-center space-x-3">
        <div className={cn(
          'flex-shrink-0',
          !isUnlocked && 'opacity-50'
        )}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  )
}