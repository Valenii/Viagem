import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'

function renderAt(path: string, { loggedIn }: { loggedIn: boolean }) {
  if (loggedIn) {
    localStorage.setItem('viagem-token', 'token-de-prueba')
  }
  render(
    <MemoryRouter initialEntries={[path]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>,
  )
}

function expectPage(title: string) {
  expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument()
}

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it.each([
    ['/', 'Inicio'],
    ['/trade', 'Operar'],
    ['/history', 'Historial'],
    ['/assistant', 'Asistente'],
  ])('con sesión, en %s muestra la página %s', (path, title) => {
    renderAt(path, { loggedIn: true })

    expectPage(title)
  })

  it.each([
    ['/login', 'Ingresar'],
    ['/register', 'Crear cuenta'],
  ])('sin sesión, en %s muestra la página %s', (path, title) => {
    renderAt(path, { loggedIn: false })

    expectPage(title)
  })

  it.each(['/', '/trade', '/history', '/assistant'])('sin sesión, %s lleva a Ingresar', (path) => {
    renderAt(path, { loggedIn: false })

    expectPage('Ingresar')
  })

  it.each(['/login', '/register'])('con sesión, %s lleva a Inicio', (path) => {
    renderAt(path, { loggedIn: true })

    expectPage('Inicio')
  })

  it('al cerrar sesión borra el token y lleva a Ingresar', async () => {
    renderAt('/', { loggedIn: true })

    const [logoutButton] = screen.getAllByRole('button', { name: 'Cerrar sesión' })
    await userEvent.click(logoutButton)

    expectPage('Ingresar')
    expect(localStorage.getItem('viagem-token')).toBeNull()
  })

  it('en una ruta que no existe muestra la página de no encontrada', () => {
    renderAt('/no-existe', { loggedIn: false })

    expectPage('No encontramos esta página')
    expect(screen.getByRole('link', { name: 'Volver al inicio' })).toHaveAttribute('href', '/')
  })
})
