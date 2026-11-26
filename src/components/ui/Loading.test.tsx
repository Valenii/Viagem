import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Loading } from './Loading'

describe('Loading', () => {
  it('anuncia que está cargando', () => {
    render(<Loading />)
    expect(screen.getByRole('status')).toHaveTextContent('Cargando')
  })

  it('usa el texto que se le pasa', () => {
    render(<Loading label="Cargando movimientos" />)
    expect(screen.getByRole('status')).toHaveTextContent('Cargando movimientos')
  })
})