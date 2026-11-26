import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Amount } from './Amount'

describe('Amount', () => {
  it('formatea el monto con formato argentino', () => {
    render(<Amount value="1250.5" currency="USD" />)
    expect(screen.getByText('USD 1.250,50')).toBeInTheDocument()
  })

  it('con approx empieza con ≈', () => {
    render(<Amount value="1250.5" currency="USD" approx />)
    expect(screen.getByText(/^≈/)).toBeInTheDocument()
  })
})