# Viagem — Frontend

Billetera multi-moneda para viajeros: personas que viajan por turismo, estudio o trabajo y necesitan manejar varias monedas en un mismo lugar.

La billetera reúne el saldo de cada moneda (**ARS, USD y EUR**), muestra la tasa aplicada **antes** de confirmar cada operación y deja un historial claro.

> Todas las operaciones son simuladas.

## Funcionalidades

- Saldos por moneda (ARS, USD, EUR)
- Compra, venta e intercambio de monedas con tasas reales
- Vista previa de cada operación: cuánto recibís y qué tasa se aplica
- Historial con filtros por tipo de operación y por moneda
- Email de confirmación después de cada transacción
- Asistente con IA para consultar saldos, simular conversiones y pedir consejos de viaje

## Stack

| Capa | Tecnología |
| --- | --- |
| Frontend | React + TypeScript + Vite |
| Estilos | Tailwind CSS v4 |
| Deploy | Vercel |
| Testing | Vitest |
| Backend (repo aparte) | Express + TypeScript + PostgreSQL (Railway), JWT |

## Cómo correrlo

**Requisitos:** Node.js 20.19+ o 22.12+ (lo pide Vite) y npm.

```bash
git clone https://github.com/Valenii/viagem-frontend.git
cd viagem-frontend
npm install
npm run dev
```

La app queda en http://localhost:5173.

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo, se recarga al guardar |
| `npm run build` | Revisa los tipos con TypeScript y genera la versión de producción en `dist/` |
| `npm run preview` | Sirve lo que quedó en `dist/` para probarlo antes de deployar |
| `npm run lint` | Revisa el código con oxlint |
| `npm test` | Corre los tests y se queda mirando: los repite cada vez que guardás |
| `npm run test:run` | Corre los tests una vez y termina (antes de un commit o en el deploy) |

## Estilos

Tailwind CSS v4, sin `tailwind.config.js`: la configuración está en `src/index.css`.

- **Colores:** usar las clases de la paleta, que cambian solas en modo oscuro.
  - `bg-primary` / `text-on-primary`, `bg-primary-soft`
  - `bg-accent` / `text-on-accent` (lima: solo para lo que tiene que resaltar)
  - `bg-page`, `bg-surface`, `text-main`, `text-muted`, `border-line`
  - `text-success`, `text-error`, `text-warning`
- **No usar `dark:`**: el modo oscuro ya está en las variables.
- **Modo:** sigue al sistema; `data-theme="dark"` o `"light"` en `<html>` lo fuerza.
- **Tipografías:** Inter (texto, por defecto) e Inter Tight 800 (`font-display`, ya aplicada a `h1`–`h3`). Montos con `tabular-nums`.

## Tests

Vitest + Testing Library, sobre un navegador simulado (jsdom).

- Cada test va **al lado** del archivo que prueba: `App.tsx` → `App.test.tsx`.
- Buscar los elementos como los ve el usuario (`getByRole`, `getByText`), no por clases CSS.
- Importar `describe`, `it` y `expect` desde `vitest` (no son globales).
- Configuración: bloque `test` en `vite.config.ts` y `src/test/setup.ts`.

## Flujo de trabajo

- `main`: versión estable. **Solo se actualiza con Pull Request** desde `dev`.
- `dev`: rama de integración. Las features se mergean acá.
- Ramas de trabajo: se crean desde `dev` con el formato `feature/nombre-corto` o `fix/nombre-corto`.

```bash
git checkout dev
git pull
git checkout -b feature/login
# ...cambios...
git push -u origin feature/login
# Abrir Pull Request hacia dev
```

## Equipo

- Frontend: _(completar)_
- Frontend: _(completar)_
- Backend: _(completar)_
