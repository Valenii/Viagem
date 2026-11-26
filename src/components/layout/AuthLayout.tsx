import { Outlet } from 'react-router'
import { Logo } from '../ui/Logo'
import { Notice } from '../ui/Notice'
import { ThemeToggle } from '../ui/ThemeToggle'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-page text-main">
      <header className="mx-auto flex w-full max-w-md items-center justify-between px-4 py-4">
        <Logo withText />
        <ThemeToggle variant="icon" />
      </header>
      <main className="mx-auto w-full max-w-md flex-1 px-4">
        <Outlet />
      </main>
      <footer className="mx-auto w-full max-w-md px-4 py-6">
        <Notice>Operaciones simuladas: no se usa dinero real.</Notice>
      </footer>
    </div>
  )
}