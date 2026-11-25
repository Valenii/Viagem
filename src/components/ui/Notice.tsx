import type { ReactNode } from 'react'

export interface NoticeProps {
  variant?: 'info' | 'error'
  children: ReactNode
}

export function Notice({ variant = 'info', children }: NoticeProps) {
  if (variant === 'error') {
    return (
      <div role="alert" className="rounded-xl bg-error-soft px-4 py-3 text-sm text-on-error-soft">
        {children}
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3 rounded-xl bg-primary-soft px-4 py-3 text-sm text-on-primary-soft">
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 shrink-0">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="7.5" r="1.25" fill="currentColor" />
      </svg>
      <div>{children}</div>
    </div>
  )
}