import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from './Card.tsx'

describe('Card', () => {
  it('renderiza su contenido', () => {
    render(<Card>Mis monedas</Card>)
    expect(screen.getByText('Mis monedas')).toBeInTheDocument()
  })

  it('con as="section" es un section', () => {
    render(<Card as="section">Saldo</Card>)
    expect(screen.getByText('Saldo').tagName).toBe('SECTION')
  })
})