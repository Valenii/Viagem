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
| Deploy | Vercel |
| Testing | Vitest |
| Backend (repo aparte) | Express + TypeScript + PostgreSQL (Railway), JWT |

## Cómo correrlo

> Se completa cuando esté inicializado el proyecto de Vite.

```bash
npm install
npm run dev
```

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
