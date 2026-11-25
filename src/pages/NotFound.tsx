import { Link } from 'react-router'

export function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-4 p-4">
      <h1 className="text-3xl">No encontramos esta página</h1>
      <p className="text-muted">La dirección no existe o cambió.</p>
      <Link to="/" className="font-semibold text-primary underline">
        Volver al inicio
      </Link>
    </main>
  )
}
