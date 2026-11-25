import type { ReactNode } from 'react'

export interface CardProps {
  variant?: 'surface' | 'hero'
  as?: 'div' | 'section'
  className?: string
  children: ReactNode
}

const variants = {
  surface: 'bg-surface border border-line rounded-2xl',
  hero: 'bg-hero text-on-hero rounded-3xl',
}

export function Card({ variant = 'surface', as: Tag = 'div', className, children }: CardProps) {
  return (
    <Tag className={[variants[variant], className ?? ''].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  )
}