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
        viewBox="0 0 240 240"
        fill="none"
        role={withText ? undefined : 'img'}
        aria-label={withText ? undefined : 'Viagem'}
        aria-hidden={withText ? true : undefined}
      >
        <rect width="240" height="240" rx="56" fill="var(--primary-soft)" />
        <path
          d="M66.45 52.8H75.9C81.5 52.8 85.35 55.6 87.45 61.2L120 134.7L152.55 61.2C154.65 55.6 158.5 52.8 164.1 52.8H173.55C184.05 52.8 189.3 60.15 185.1 69.6L139.95 172.5C135.05 182.3 128.4 187.2 120 187.2C111.6 187.2 104.95 182.3 100.05 172.5L54.9 69.6C50.7 60.15 55.95 52.8 66.45 52.8Z"
          fill="var(--primary)"
        />
        <path
          d="M152.55 61.2C154.65 55.6 158.5 52.8 164.1 52.8H173.55C184.05 52.8 189.3 60.15 185.1 69.6L176.807 88.5L143.25 82.2L152.55 61.2Z"
          fill="var(--accent)"
        />
      </svg>
      {withText && <span className="font-display text-xl font-extrabold">Viagem</span>}
    </span>
  )
}
