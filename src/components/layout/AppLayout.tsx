import type { ReactNode } from 'react'
import { NavLink, Outlet } from 'react-router'
import { ThemeToggle } from '../ui/ThemeToggle'

export interface AppLayoutProps {
  onLogout: () => void
}

const iconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

const navItems: { to: string; label: string; icon: ReactNode }[] = [
  {
    to: '/',
    label: 'Inicio',
    icon: (
      <svg {...iconProps}>
        <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
      </svg>
    ),
  },
  {
    to: '/trade',
    label: 'Operar',
    icon: (
      <svg {...iconProps}>
        <path d="M4 7h16l-4-4M20 17H4l4 4" />
      </svg>
    ),
  },
  {
    to: '/history',
    label: 'Historial',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    to: '/assistant',
    label: 'Asistente',
    icon: (
      <svg {...iconProps}>
        <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
      </svg>
    ),
  },
]

function LogoutIcon() {
  return (
    <svg {...iconProps} width={20} height={20}>
      <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11" />
    </svg>
  )
}

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'

export function AppLayout({ onLogout }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-page text-main">
      <header className="flex items-center justify-end gap-2 px-4 py-4">
        <ThemeToggle variant="icon" />
        <button
          type="button"
          onClick={onLogout}
          aria-label="Cerrar sesión"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-main ${focusRing}`}
        >
          <LogoutIcon />
        </button>
      </header>

      <main className="px-4 pb-28">
        <Outlet />
      </main>

      <nav
        aria-label="Navegación principal"
        className="fixed inset-x-0 bottom-0 border-t border-line bg-surface"
      >
        <ul className="flex">
          {navItems.map((item) => (
            <li key={item.to} className="flex-1">
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-medium ${focusRing} ${
                    isActive ? 'text-primary' : 'text-muted'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}