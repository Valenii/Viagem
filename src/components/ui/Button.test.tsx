import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button.tsx'

describe('Button', () => {
  it('muestra su texto', () => {
    render(<Button>Ingresar</Button>)
    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument()
  })

  it('llama a onClick al hacer clic', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Ingresar</Button>)
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('deshabilitado no llama a onClick', async () => {
    const onClick = vi.fn()
    render(
      <Button onClick={onClick} disabled>
        Ingresar
      </Button>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }))
    expect(onClick).not.toHaveBeenCalled()
  })
})
