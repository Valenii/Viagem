function App() {
  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-6 p-4">
      <h1 className="text-4xl text-primary">Viagem</h1>
      <p className="text-muted">Billetera multi-moneda para viajeros.</p>

      <section className="rounded-2xl border border-line bg-surface p-6">
        <p className="text-sm text-muted">Saldo en USD</p>
        <p className="font-display text-3xl font-extrabold tabular-nums">1.250,00</p>
      </section>

      <div className="flex gap-3">
        <button type="button" className="rounded-full bg-primary px-5 py-2.5 font-semibold text-on-primary">
          Operar
        </button>
        <button type="button" className="rounded-full bg-accent px-5 py-2.5 font-semibold text-on-accent">
          Confirmar
        </button>
      </div>
    </main>
  )
}

export default App
