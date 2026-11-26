import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useTheme } from './useTheme.ts'

function mockSystemTheme(initialDark: boolean) {
  const listeners = new Set<() => void>()
  const media = {
    matches: initialDark,
    addEventListener: (_event: string, listener: () => void) => listeners.add(listener),
    removeEventListener: (_event: string, listener: () => void) => listeners.delete(listener),
  }
  vi.stubGlobal('matchMedia', () => media)
  return (dark: boolean) => {
    media.matches = dark
    listeners.forEach((listener) => listener())
  }
}

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('sin elección guardada sigue al sistema', () => {
    mockSystemTheme(true)

    const { result } = renderHook(() => useTheme())

    expect(result.current.preference).toBe('system')
    expect(result.current.resolved).toBe('dark')
  })

  it('cuando el sistema cambia de modo, se actualiza', () => {
    const setSystemDark = mockSystemTheme(false)
    const { result } = renderHook(() => useTheme())

    act(() => setSystemDark(true))

    expect(result.current.resolved).toBe('dark')
  })
})
