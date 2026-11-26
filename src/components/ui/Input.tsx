import { useId, type InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

export function Input({ label, error, hint, id, className, ...props }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`
  const message = error ?? hint

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-main">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={[
          'h-[50px] rounded-xl border bg-surface px-4 text-main placeholder:text-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          error ? 'border-error' : 'border-line-strong',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
      {message && (
        <p id={messageId} className={error ? 'text-sm text-error' : 'text-sm text-muted'}>
          {message}
        </p>
      )}
    </div>
  )
}