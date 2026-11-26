import { Route, Routes } from 'react-router'
import { AppLayout } from './components/layout/AppLayout.tsx'
import { AuthLayout } from './components/layout/AuthLayout.tsx'
import { Assistant } from './pages/Assistant.tsx'
import { History } from './pages/History.tsx'
import { Home } from './pages/Home.tsx'
import { Login } from './pages/Login.tsx'
import { NotFound } from './pages/NotFound.tsx'
import { Register } from './pages/Register.tsx'
import { Trade } from './pages/Trade.tsx'

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<AppLayout onLogout={() => {}} />}>
        <Route path="/" element={<Home />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/history" element={<History />} />
        <Route path="/assistant" element={<Assistant />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
