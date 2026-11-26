import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Logo } from './Logo.tsx'

describe('Logo', () => {
  it('con withText muestra el texto Viagem', () => {
    render(<Logo withText />)
    expect(screen.getByText('Viagem')).toBeInTheDocument()
  })

  it('sin withText no muestra el texto', () => {
    render(<Logo />)
    expect(screen.queryByText('Viagem')).not.toBeInTheDocument()
  })
})