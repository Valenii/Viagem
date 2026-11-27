import { useState } from 'react'
import { LoginForm } from '../components/auth/LoginForm'

function fakeRequest() {
  return new Promise<void>((_resolve, reject) => {
    setTimeout(() => reject(new Error('Sin conexión con el servidor')), 1000)
  })
}

export function Login() {
  const [error, setError] = useState<string>()

  async function handleSubmit() {
    setError(undefined)
    try {
      await fakeRequest()
    } catch {
     setError('Email o contraseña incorrectos')
    }
  }

  return (
    <div className="flex flex-col gap-6 py-6">
      <h1 className="text-2xl">Ingresar</h1>
      <LoginForm onSubmit={handleSubmit} error={error} />
    </div>
  )
}