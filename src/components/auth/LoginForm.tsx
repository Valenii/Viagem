import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Loading } from '../ui/Loading'
import { Notice } from '../ui/Notice'
import { validateLogin, type LoginValues } from './validation'

export type LoginFormProps = {
  onSubmit: (values: LoginValues) => Promise<void>
  error?: string
}

type Field = keyof LoginValues

export function LoginForm({ onSubmit, error }: LoginFormProps) {
  const [values, setValues] = useState<LoginValues>({ email: '', password: '' })
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [submitting, setSubmitting] = useState(false)

  const errors = validateLogin(values)

  function visibleError(field: Field) {
    return touched[field] ? errors[field] : undefined
  }

  function handleChange(field: Field) {
    return (event: ChangeEvent<HTMLInputElement>) =>
      setValues((current) => ({ ...current, [field]: event.target.value }))
  }

  function handleBlur(field: Field) {
    return () => setTouched((current) => ({ ...current, [field]: true }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setTouched({ email: true, password: true })
    if (Object.keys(errors).length > 0) return
    setSubmitting(true)
    try {
      await onSubmit(values)
    } catch {
      return
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {error && <Notice variant="error">{error}</Notice>}
      <Input
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        value={values.email}
        onChange={handleChange('email')}
        onBlur={handleBlur('email')}
        error={visibleError('email')}
      />
      <Input
        label="Contraseña"
        type="password"
        name="password"
        autoComplete="current-password"
        value={values.password}
        onChange={handleChange('password')}
        onBlur={handleBlur('password')}
        error={visibleError('password')}
      />
      <Button type="submit" size="lg" fullWidth disabled={submitting}>
        {submitting ? <Loading size="sm" label="Ingresando" /> : 'Ingresar'}
      </Button>
      <p className="text-center text-sm text-muted">
        ¿No tenés cuenta?{' '}
        <Link to="/register" className="font-semibold text-primary">
          Crear cuenta
        </Link>
      </p>
    </form>
  )
}