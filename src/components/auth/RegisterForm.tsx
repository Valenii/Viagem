import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Loading } from '../ui/Loading'
import { Notice } from '../ui/Notice'
import {
  checkPassword,
  validateRegister,
  type RegisterFormValues,
  type RegisterValues,
} from './validation'

export type RegisterFormProps = {
  onSubmit: (values: RegisterValues) => Promise<void>
  error?: string
}

type Field = keyof RegisterFormValues

const initialValues: RegisterFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const allTouched: Record<Field, boolean> = {
  firstName: true,
  lastName: true,
  email: true,
  password: true,
  confirmPassword: true,
}

const requirements = [
  { key: 'length', label: 'Al menos 8 caracteres' },
  { key: 'letter', label: 'Una letra' },
  { key: 'number', label: 'Un número' },
] as const

export function RegisterForm({ onSubmit, error }: RegisterFormProps) {
  const [values, setValues] = useState<RegisterFormValues>(initialValues)
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [submitting, setSubmitting] = useState(false)

  const errors = validateRegister(values)
  const passwordChecks = checkPassword(values.password)

  function fieldProps(field: Field) {
    return {
      name: field,
      value: values[field],
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setValues((current) => ({ ...current, [field]: event.target.value })),
      onBlur: () => setTouched((current) => ({ ...current, [field]: true })),
      error: touched[field] ? errors[field] : undefined,
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setTouched(allTouched)
    if (Object.keys(errors).length > 0) return
    const data: RegisterValues = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    }
    setSubmitting(true)
    try {
      await onSubmit(data)
    } catch {
      return
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {error && <Notice variant="error">{error}</Notice>}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Nombre" autoComplete="given-name" {...fieldProps('firstName')} />
        <Input label="Apellido" autoComplete="family-name" {...fieldProps('lastName')} />
      </div>
      <Input label="Email" type="email" autoComplete="email" {...fieldProps('email')} />
      <div className="flex flex-col gap-2">
        <Input
          label="Contraseña"
          type="password"
          autoComplete="new-password"
          {...fieldProps('password')}
        />
        <ul aria-label="Requisitos de la contraseña" className="flex flex-col gap-1 text-sm">
          {requirements.map((requirement) => {
            const met = passwordChecks[requirement.key]
            return (
              <li
                key={requirement.key}
                className={`flex items-center gap-2 ${met ? 'text-success' : 'text-muted'}`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {met ? <path d="M5 12l5 5L20 7" /> : <circle cx="12" cy="12" r="8" />}
                </svg>
                <span className="sr-only">{met ? 'Cumplido:' : 'Pendiente:'}</span>
                {requirement.label}
              </li>
            )
          })}
        </ul>
      </div>
      <Input
        label="Confirmar contraseña"
        type="password"
        autoComplete="new-password"
        {...fieldProps('confirmPassword')}
      />
      <Button type="submit" size="lg" fullWidth disabled={submitting}>
        {submitting ? <Loading size="sm" label="Creando cuenta" /> : 'Crear cuenta'}
      </Button>
      <p className="text-center text-sm text-muted">
        ¿Ya tenés cuenta?{' '}
        <Link to="/login" className="font-semibold text-primary">
          Ingresar
        </Link>
      </p>
    </form>
  )
}