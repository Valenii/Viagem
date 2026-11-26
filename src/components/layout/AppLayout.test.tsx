import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router'
import { AppLayout } from './AppLayout.tsx'

function renderAppLayout() {
  const onLogout = vi.fn()
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route element={<AppLayout onLogout={onLogout} />}>
          <Route path="/" element={<p>Página de prueba</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
  return onLogout
}

describe('AppLayout', () => {
  it('dibuja la página adentro del marco', () => {
    renderAppLayout()
    expect(screen.getByText('Página de prueba')).toBeInTheDocument()
  })

  it('tiene los 4 links con su href', () => {
    renderAppLayout()
    const nav = screen.getByRole('navigation', { name: 'Navegación principal' })
    expect(within(nav).getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/')
    expect(within(nav).getByRole('link', { name: 'Operar' })).toHaveAttribute('href', '/trade')
    expect(within(nav).getByRole('link', { name: 'Historial' })).toHaveAttribute('href', '/history')
    expect(within(nav).getByRole('link', { name: 'Asistente' })).toHaveAttribute('href', '/assistant')
  })

  it('al hacer clic en Cerrar sesión llama a onLogout', async () => {
    const onLogout = renderAppLayout()
    const [logoutButton] = screen.getAllByRole('button', { name: 'Cerrar sesión' })
    await userEvent.click(logoutButton)
    expect(onLogout).toHaveBeenCalledTimes(1)
  })
})