import type { ReactNode } from 'react'
import { NavLink, Outlet } from 'react-router'
import { Logo } from '../ui/Logo.tsx'
import { ThemeToggle } from '../ui/ThemeToggle.tsx'

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
        <path d="M3 11l9-7 9 7" />
        <path d="M5 10v10h14V10" />
      </svg>
    ),
  },
  {
    to: '/trade',
    label: 'Operar',
    icon: (
      <svg {...iconProps}>
        <path d="M7 7h13l-4-4" />
        <path d="M17 17H4l4 4" />
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
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  )
}

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'

export function AppLayout({ onLogout }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-page text-main lg:flex">
      <aside className="hidden h-screen w-64 shrink-0 flex-col gap-8 bg-hero p-6 text-on-hero lg:sticky lg:top-0 lg:flex">
        <Logo withText />
        <nav aria-label="Menú lateral" className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex h-11 items-center gap-3 rounded-full px-4 text-sm font-semibold ${focusRing} ${
                  isActive ? 'bg-hero-sub text-on-hero' : 'text-hero-muted hover:bg-hero-sub'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex flex-col gap-2">
          <ThemeToggle variant="full" />
          <button
            type="button"
            onClick={onLogout}
            className={`flex h-11 items-center gap-3 rounded-full px-4 text-sm font-semibold text-hero-muted hover:bg-hero-sub ${focusRing}`}
          >
            <LogoutIcon />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-end gap-2 px-4 py-4 lg:hidden">
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

        <main className="mx-auto w-full max-w-6xl px-4 pb-28 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>

      <nav
        aria-label="Navegación principal"
        className="fixed inset-x-0 bottom-0 border-t border-line bg-surface lg:hidden"
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