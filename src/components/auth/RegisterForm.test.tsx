import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { RegisterForm } from './RegisterForm'

function renderRegisterForm() {
  const onSubmit = vi.fn().mockResolvedValue(undefined)
  render(
    <MemoryRouter>
      <RegisterForm onSubmit={onSubmit} />
    </MemoryRouter>,
  )
  return { onSubmit, user: userEvent.setup() }
}

describe('RegisterForm', () => {
  it('tilda los requisitos de la contraseña mientras se escribe', async () => {
    const { user } = renderRegisterForm()
    expect(screen.getByText('Una letra')).toHaveTextContent('Pendiente')

    await user.type(screen.getByLabelText('Contraseña'), 'abc')
    expect(screen.getByText('Una letra')).toHaveTextContent('Cumplido')
    expect(screen.getByText('Un número')).toHaveTextContent('Pendiente')
    expect(screen.getByText('Al menos 8 caracteres')).toHaveTextContent('Pendiente')

    await user.type(screen.getByLabelText('Contraseña'), '12345')
    expect(screen.getByText('Un número')).toHaveTextContent('Cumplido')
    expect(screen.getByText('Al menos 8 caracteres')).toHaveTextContent('Cumplido')
  })

  it('revisa de nuevo la confirmación si cambia la contraseña', async () => {
    const { user } = renderRegisterForm()
    await user.type(screen.getByLabelText('Contraseña'), 'clave123')
    await user.type(screen.getByLabelText('Confirmar contraseña'), 'clave123')
    await user.tab()
    expect(screen.queryByText('Las contraseñas no coinciden')).not.toBeInTheDocument()

    await user.type(screen.getByLabelText('Contraseña'), '4')
    expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument()
  })

  it('no envía con errores y los muestra todos', async () => {
    const { user, onSubmit } = renderRegisterForm()
    await user.click(screen.getByRole('button', { name: 'Crear cuenta' }))
    expect(screen.getByText('Ingresá tu nombre')).toBeInTheDocument()
    expect(screen.getByText('Ingresá tu apellido')).toBeInTheDocument()
    expect(screen.getByText('Ingresá tu email')).toBeInTheDocument()
    expect(screen.getByText('Ingresá una contraseña')).toBeInTheDocument()
    expect(screen.getByText('Repetí la contraseña')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('envía los datos correctos sin confirmPassword', async () => {
    const { user, onSubmit } = renderRegisterForm()
    await user.type(screen.getByLabelText('Nombre'), 'Ana')
    await user.type(screen.getByLabelText('Apellido'), 'Pérez')
    await user.type(screen.getByLabelText('Email'), 'ana@mail.com')
    await user.type(screen.getByLabelText('Contraseña'), 'clave123')
    await user.type(screen.getByLabelText('Confirmar contraseña'), 'clave123')
    await user.click(screen.getByRole('button', { name: 'Crear cuenta' }))
    expect(onSubmit).toHaveBeenCalledWith({
      firstName: 'Ana',
      lastName: 'Pérez',
      email: 'ana@mail.com',
      password: 'clave123',
    })
  })
})