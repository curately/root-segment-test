import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/ui/helpers'

const spacerVariants = cva('', {
  variants: {
    size: {
      sm: 'h-4',
      md: 'h-8',
      lg: 'h-12',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})
export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spacerVariants> {}

export function Spacer({ size, className, ...props }: SpacerProps) {
  return <div className={cn(spacerVariants({ size }), className)} {...props} />
}
