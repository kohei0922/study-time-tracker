import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
        outline: 'border-2 border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40',
        ghost: 'text-gray-300 hover:bg-white/10 hover:text-white',
        destructive: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
        secondary: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm',
        accent: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 animate-pulse-glow',
        playstation: 'bg-[#006FED] text-white hover:bg-[#0055CC] active:bg-[#0044AA] shadow-lg',
      },
      size: {
        default: 'h-12 px-8 py-3 text-base',
        sm: 'h-10 px-6 py-2 text-sm',
        lg: 'h-14 px-10 py-3 text-lg',
        xl: 'h-16 px-12 py-4 text-xl',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading = false, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }