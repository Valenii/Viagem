import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { ButtonLink } from './ButtonLink'

describe('ButtonLink', () => {
  it('tiene el href correcto', () => {
    render(
      <MemoryRouter>
        <ButtonLink to="/trade">Operar</ButtonLink>
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'Operar' })).toHaveAttribute('href', '/trade')
  })
})