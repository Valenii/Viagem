export interface LogoProps {
  size?: number
  withText?: boolean
}

export function Logo({ size = 40, withText = false }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        role={withText ? undefined : 'img'}
        aria-label={withText ? undefined : 'Viagem'}
        aria-hidden={withText ? true : undefined}
      >
        <rect width="40" height="40" rx="12" fill="var(--primary-soft)" />
        <path
          d="M11 12 L20 29 L29 12"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="29" cy="12" r="3" fill="var(--accent)" />
      </svg>
      {withText && (
        <span className="font-display text-xl font-extrabold">Viagem</span>
      )}
    </span>
  )
}