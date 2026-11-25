import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import App from './App.tsx'

function renderAt(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App', () => {
  it.each([
    ['/', 'Inicio'],
    ['/trade', 'Operar'],
    ['/history', 'Historial'],
    ['/assistant', 'Asistente'],
    ['/login', 'Ingresar'],
    ['/register', 'Crear cuenta'],
  ])('en %s muestra la página %s', (path, title) => {
    renderAt(path)

    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument()
  })

  it('en una ruta que no existe muestra la página de no encontrada', () => {
    renderAt('/no-existe')

    expect(screen.getByRole('heading', { level: 1, name: 'No encontramos esta página' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Volver al inicio' })).toHaveAttribute('href', '/')
  })
})
