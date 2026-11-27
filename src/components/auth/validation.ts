export type LoginValues = { email: string; password: string }

export type RegisterValues = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type RegisterFormValues = RegisterValues & { confirmPassword: string }

export type FieldErrors<T> = Partial<Record<keyof T, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function checkPassword(password: string) {
  return {
    length: password.length >= 8,
    letter: /[A-Za-z]/.test(password),
    number: /\d/.test(password),
  }
}

function validateEmail(email: string) {
  if (!email.trim()) return 'Ingresá tu email'
  if (!EMAIL_PATTERN.test(email.trim())) return 'Ingresá un email válido'
  return undefined
}

export function validateLogin(values: LoginValues): FieldErrors<LoginValues> {
  const errors: FieldErrors<LoginValues> = {}
  const emailError = validateEmail(values.email)
  if (emailError) errors.email = emailError
  if (!values.password) errors.password = 'Ingresá tu contraseña'
  return errors
}

export function validateRegister(values: RegisterFormValues): FieldErrors<RegisterFormValues> {
  const errors: FieldErrors<RegisterFormValues> = {}
  if (!values.firstName.trim()) errors.firstName = 'Ingresá tu nombre'
  if (!values.lastName.trim()) errors.lastName = 'Ingresá tu apellido'
  const emailError = validateEmail(values.email)
  if (emailError) errors.email = emailError
  const checks = checkPassword(values.password)
  if (!values.password) {
    errors.password = 'Ingresá una contraseña'
  } else if (!checks.length || !checks.letter || !checks.number) {
    errors.password = 'La contraseña no cumple los requisitos'
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Repetí la contraseña'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Las contraseñas no coinciden'
  }
  return errors
}