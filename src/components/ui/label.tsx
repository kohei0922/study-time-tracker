import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Label = forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    style={{
      writingMode: 'horizontal-tb',
      textOrientation: 'mixed',
      direction: 'ltr'
    }}
    {...props}
  />
))
Label.displayName = 'Label'

export { Label }