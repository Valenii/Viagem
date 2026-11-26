import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useAuth } from '../hooks/useAuth.ts'
import { AuthProvider } from './AuthProvider.tsx'

function wrapper({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('arranca sin sesión si no hay token guardado', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current.token).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('arranca con sesión si hay un token guardado', () => {
    localStorage.setItem('viagem-token', 'token-de-prueba')

    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current.token).toBe('token-de-prueba')
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('signIn guarda el token y logout lo borra', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    act(() => result.current.signIn('token-nuevo'))
    expect(result.current.isAuthenticated).toBe(true)
    expect(localStorage.getItem('viagem-token')).toBe('token-nuevo')

    act(() => result.current.logout())
    expect(result.current.isAuthenticated).toBe(false)
    expect(localStorage.getItem('viagem-token')).toBeNull()
  })

  it('useAuth fuera de AuthProvider avisa con un error', () => {
    expect(() => renderHook(() => useAuth())).toThrow('useAuth tiene que usarse dentro de AuthProvider')
  })
})
