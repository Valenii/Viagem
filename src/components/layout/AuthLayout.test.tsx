import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { AuthLayout } from './AuthLayout'

function renderAuthLayout() {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<p>Página de prueba</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('AuthLayout', () => {
  it('dibuja la página adentro del marco', () => {
    renderAuthLayout()
    expect(screen.getByText('Página de prueba')).toBeInTheDocument()
  })

  it('muestra el aviso de operaciones simuladas', () => {
    renderAuthLayout()
    expect(screen.getByText('Operaciones simuladas: no se usa dinero real.')).toBeInTheDocument()
  })
})