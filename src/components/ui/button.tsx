import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-cyan-600 text-white hover:bg-cyan-700 active:bg-cyan-800 shadow-md hover:shadow-lg',
        outline: 'border border-cyan-300 bg-transparent text-cyan-700 hover:bg-cyan-50 backdrop-blur-sm',
        ghost: 'text-cyan-700 hover:bg-cyan-100 backdrop-blur-sm',
        destructive: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
        secondary: 'bg-cyan-100 text-cyan-900 hover:bg-cyan-200 backdrop-blur-sm',
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
        style={{
          writingMode: 'horizontal-tb',
          textOrientation: 'mixed',
          direction: 'ltr'
        }}
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