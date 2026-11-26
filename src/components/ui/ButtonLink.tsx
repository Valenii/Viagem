import type { ReactNode } from 'react'
import { Link } from 'react-router'
import type { ButtonProps } from './Button'
import { buttonClasses } from './buttonClasses'

export interface ButtonLinkProps {
  to: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  fullWidth?: boolean
  children: ReactNode
}

export function ButtonLink({ to, variant, size, fullWidth, children }: ButtonLinkProps) {
  return (
    <Link to={to} className={buttonClasses({ variant, size, fullWidth })}>
      {children}
    </Link>
  )
}