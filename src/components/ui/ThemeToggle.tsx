import { useTheme } from '../../hooks/useTheme.ts'

export interface ThemeToggleProps {
  variant?: 'icon' | 'full'
}

function MoonIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'

export function ThemeToggle({ variant = 'icon' }: ThemeToggleProps) {
  const { resolved, toggle } = useTheme()
  const isDark = resolved === 'dark'
  const icon = isDark ? <SunIcon /> : <MoonIcon />

  if (variant === 'full') {
    return (
      <button
        type="button"
        onClick={toggle}
        className={`inline-flex h-11 items-center gap-2 rounded-full bg-hero-sub px-4 text-sm font-semibold text-on-hero ${focusRing}`}
      >
        {icon}
        {isDark ? 'Modo claro' : 'Modo oscuro'}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-main ${focusRing}`}
    >
      {icon}
    </button>
  )
}