import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Notice } from './Notice'

describe('Notice', () => {
  it('muestra el texto', () => {
    render(<Notice>Operaciones simuladas</Notice>)
    expect(screen.getByText('Operaciones simuladas')).toBeInTheDocument()
  })

  it('el de error tiene role="alert"', () => {
    render(<Notice variant="error">Saldo insuficiente</Notice>)
    expect(screen.getByRole('alert')).toHaveTextContent('Saldo insuficiente')
  })
})