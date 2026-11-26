import { useContext } from 'react'
import { AuthContext } from '../context/authContext.ts'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth tiene que usarse dentro de AuthProvider')
  }
  return context
}
