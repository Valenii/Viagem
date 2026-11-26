import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from './ThemeToggle'

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('alterna entre modo oscuro y claro y lo guarda', async () => {
    render(<ThemeToggle />)

    await userEvent.click(screen.getByRole('button', { name: 'Cambiar a modo oscuro' }))
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(localStorage.getItem('viagem-theme')).toBe('dark')

    await userEvent.click(screen.getByRole('button', { name: 'Cambiar a modo claro' }))
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    expect(localStorage.getItem('viagem-theme')).toBe('light')
  })
})