import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { LoginForm, type LoginFormProps } from './LoginForm'

function renderLoginForm(props: Partial<LoginFormProps> = {}) {
  const onSubmit = props.onSubmit ?? vi.fn().mockResolvedValue(undefined)
  render(
    <MemoryRouter>
      <LoginForm onSubmit={onSubmit} error={props.error} />
    </MemoryRouter>,
  )
  return { onSubmit, user: userEvent.setup() }
}

describe('LoginForm', () => {
  it('no muestra errores mientras se escribe la primera vez, sí al salir del campo', async () => {
    const { user } = renderLoginForm()
    await user.type(screen.getByLabelText('Email'), 'ana')
    expect(screen.queryByText('Ingresá un email válido')).not.toBeInTheDocument()
    await user.tab()
    expect(screen.getByText('Ingresá un email válido')).toBeInTheDocument()
  })

  it('el error se va al corregirlo', async () => {
    const { user } = renderLoginForm()
    await user.type(screen.getByLabelText('Email'), 'ana')
    await user.tab()
    await user.type(screen.getByLabelText('Email'), '@mail.com')
    expect(screen.queryByText('Ingresá un email válido')).not.toBeInTheDocument()
  })

  it('no envía con errores y los muestra todos', async () => {
    const { user, onSubmit } = renderLoginForm()
    await user.click(screen.getByRole('button', { name: 'Ingresar' }))
    expect(screen.getByText('Ingresá tu email')).toBeInTheDocument()
    expect(screen.getByText('Ingresá tu contraseña')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('envía los datos correctos', async () => {
    const { user, onSubmit } = renderLoginForm()
    await user.type(screen.getByLabelText('Email'), 'ana@mail.com')
    await user.type(screen.getByLabelText('Contraseña'), 'clave123')
    await user.click(screen.getByRole('button', { name: 'Ingresar' }))
    expect(onSubmit).toHaveBeenCalledWith({ email: 'ana@mail.com', password: 'clave123' })
  })

  it('muestra el error que recibe por props', () => {
    renderLoginForm({ error: 'Email o contraseña incorrectos' })
    expect(screen.getByRole('alert')).toHaveTextContent('Email o contraseña incorrectos')
  })
})