import { Outlet, Route, Routes } from 'react-router'
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
      <Route element={<Outlet />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<Outlet />}>
        <Route path="/" element={<Home />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/history" element={<History />} />
        <Route path="/assistant" element={<Assistant />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
