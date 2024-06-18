import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'
import { cn } from '@/shared/ui/helpers'

const buttonVariants = cva(
  //'inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary/90 rounded-3xl px-8',
        secondary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        cta: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        pill: 'border border-pill bg-white hover:bg-ivory rounded-3xl',
        search: 'bg-primary-800 text-white hover:bg-primary/80',
        reveal: 'hover:bg-accent hover:text-accent-foreground',
        indicator: 'text-primary underline-offset-4 hover:underline',
        card: 'text-primary underline-offset-4 hover:underline',
        outline: 'border border-input bg-white hover:bg-white hover:text-accent-foreground',
        accent:
          'border border-primary-400 bg-accent hover:bg-accent/100 hover:text-accent-foreground hover:border-primary-500 text-black',
      },
      size: {
        default: 'h-10',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-14 rounded-md px-8  text-xl ',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full ',
      },
      shape: {
        default: 'rounded-md',
        pill: 'rounded-3xl',
        circle: 'rounded-full',
      },
      effect: {
        default: '',
        blur: 'backdrop-blur-sm  hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)]   transition duration-200',
        shadow: 'hover:shadow-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      shape: 'default',
      effect: 'default',
      fullWidth: true,
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  // fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, effect, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
