import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Como los tests no usan "globals", Testing Library no limpia sola:
// después de cada test desmontamos lo que se renderizó.
afterEach(() => {
  cleanup()
})
