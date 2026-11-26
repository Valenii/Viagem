import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select } from './Select.tsx'

const currencies = [
  { value: 'ARS', label: 'Peso' },
  { value: 'USD', label: 'Dólar' },
  { value: 'EUR', label: 'Euro' },
]

describe('Select', () => {
  it('se encuentra por su label y muestra las opciones', () => {
    render(<Select label="Moneda" options={currencies} />)
    expect(screen.getByLabelText('Moneda')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(3)
  })

  it('permite elegir una opción', async () => {
    render(<Select label="Moneda" options={currencies} />)
    await userEvent.selectOptions(screen.getByLabelText('Moneda'), 'USD')
    expect(screen.getByLabelText('Moneda')).toHaveValue('USD')
  })

  it('con error muestra el mensaje y queda aria-invalid', () => {
    render(<Select label="Moneda" options={currencies} error="Elegí una moneda" />)
    expect(screen.getByText('Elegí una moneda')).toBeInTheDocument()
    expect(screen.getByLabelText('Moneda')).toHaveAttribute('aria-invalid', 'true')
  })
})
