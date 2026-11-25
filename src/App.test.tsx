// Test de ejemplo: se reemplaza cuando App deje de ser la pantalla temporal.
// Sirve para comprobar que el setup de Vitest + Testing Library anda y como modelo.
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App.tsx'

describe('App', () => {
  it('muestra el nombre de la app como título principal', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: 'Viagem' })).toBeInTheDocument()
  })

  it('muestra los botones Operar y Confirmar', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: 'Operar' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Confirmar' })).toBeInTheDocument()
  })
})
