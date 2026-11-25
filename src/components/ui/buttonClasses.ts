import type { ButtonProps } from './Button'

interface ButtonClassOptions {
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  fullWidth?: boolean
  className?: string
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-disabled disabled:text-on-disabled disabled:border-transparent'

const variants = {
  primary: 'bg-primary text-on-primary hover:bg-primary-strong',
  accent: 'bg-accent text-on-accent hover:opacity-90',
  secondary: 'border border-line-strong bg-surface text-main hover:bg-surface-2',
  'on-hero': 'bg-hero-sub text-on-hero hover:opacity-90',
}

const sizes = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-[52px] px-6 text-base',
}

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
}: ButtonClassOptions) {
  return [base, variants[variant], sizes[size], fullWidth ? 'w-full' : '', className ?? '']
    .filter(Boolean)
    .join(' ')
}