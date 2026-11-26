import { createContext } from 'react'

export interface AuthContextValue {
  token: string | null
  isAuthenticated: boolean
  signIn: (token: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
