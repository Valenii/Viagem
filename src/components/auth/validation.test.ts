import { describe, it, expect } from 'vitest'
import { checkPassword, validateLogin, validateRegister } from './validation'

const validRegister = {
  firstName: 'Ana',
  lastName: 'Pérez',
  email: 'ana@mail.com',
  password: 'clave123',
  confirmPassword: 'clave123',
}

describe('validateLogin', () => {
  it('no devuelve errores con datos correctos', () => {
    expect(validateLogin({ email: 'ana@mail.com', password: 'secreta' })).toEqual({})
  })

  it('pide el email', () => {
    expect(validateLogin({ email: '', password: 'secreta' }).email).toBe('Ingresá tu email')
  })

  it('pide un email válido', () => {
    expect(validateLogin({ email: 'ana@', password: 'secreta' }).email).toBe('Ingresá un email válido')
  })

  it('pide la contraseña', () => {
    expect(validateLogin({ email: 'ana@mail.com', password: '' }).password).toBe('Ingresá tu contraseña')
  })
})

describe('validateRegister', () => {
  it('no devuelve errores con datos correctos', () => {
    expect(validateRegister(validRegister)).toEqual({})
  })

  it('pide el nombre', () => {
    expect(validateRegister({ ...validRegister, firstName: '  ' }).firstName).toBe('Ingresá tu nombre')
  })

  it('pide el apellido', () => {
    expect(validateRegister({ ...validRegister, lastName: '' }).lastName).toBe('Ingresá tu apellido')
  })

  it('pide un email válido', () => {
    expect(validateRegister({ ...validRegister, email: 'ana.mail.com' }).email).toBe(
      'Ingresá un email válido',
    )
  })

  it('pide la contraseña', () => {
    expect(
      validateRegister({ ...validRegister, password: '', confirmPassword: '' }).password,
    ).toBe('Ingresá una contraseña')
  })

  it('rechaza una contraseña que no cumple los requisitos', () => {
    expect(
      validateRegister({ ...validRegister, password: 'abc', confirmPassword: 'abc' }).password,
    ).toBe('La contraseña no cumple los requisitos')
  })

  it('pide repetir la contraseña', () => {
    expect(validateRegister({ ...validRegister, confirmPassword: '' }).confirmPassword).toBe(
      'Repetí la contraseña',
    )
  })

  it('avisa si las contraseñas no coinciden', () => {
    expect(
      validateRegister({ ...validRegister, confirmPassword: 'otra1234' }).confirmPassword,
    ).toBe('Las contraseñas no coinciden')
  })
})

describe('checkPassword', () => {
  it('revisa cada requisito por separado', () => {
    expect(checkPassword('')).toEqual({ length: false, letter: false, number: false })
    expect(checkPassword('abcdefgh')).toEqual({ length: true, letter: true, number: false })
    expect(checkPassword('12345678')).toEqual({ length: true, letter: false, number: true })
    expect(checkPassword('clave123')).toEqual({ length: true, letter: true, number: true })
  })
})