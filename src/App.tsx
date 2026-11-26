import { Route, Routes } from 'react-router'
import { AppLayout } from './components/layout/AppLayout.tsx'
import { AuthLayout } from './components/layout/AuthLayout.tsx'
import { useAuth } from './hooks/useAuth.ts'
import { Assistant } from './pages/Assistant.tsx'
import { History } from './pages/History.tsx'
import { Home } from './pages/Home.tsx'
import { Login } from './pages/Login.tsx'
import { NotFound } from './pages/NotFound.tsx'
import { Register } from './pages/Register.tsx'
import { Trade } from './pages/Trade.tsx'
import { ProtectedRoute } from './routes/ProtectedRoute.tsx'
import { PublicOnlyRoute } from './routes/PublicOnlyRoute.tsx'

export default function App() {
  const { logout } = useAuth()

  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout onLogout={logout} />}>
          <Route path="/" element={<Home />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/history" element={<History />} />
          <Route path="/assistant" element={<Assistant />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
