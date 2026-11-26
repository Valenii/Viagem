import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { AuthContext } from './authContext.ts'

const TOKEN_KEY = 'viagem-token'

function readToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

function writeToken(token: string | null) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token)
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }
  } catch {
    return
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(readToken)

  const signIn = useCallback((newToken: string) => {
    writeToken(newToken)
    setToken(newToken)
  }, [])

  const logout = useCallback(() => {
    writeToken(null)
    setToken(null)
  }, [])

  const value = useMemo(
    () => ({ token, isAuthenticated: token !== null, signIn, logout }),
    [token, signIn, logout],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
