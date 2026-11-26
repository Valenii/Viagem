import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../hooks/useAuth.ts'

export function PublicOnlyRoute() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
