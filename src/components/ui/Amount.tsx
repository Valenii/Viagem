import type { Currency } from '../../types/money.ts'

export interface AmountProps {
  value: string
  currency: Currency
  size?: 'sm' | 'md' | 'lg' | 'xl'
  approx?: boolean
}

const formatter = new Intl.NumberFormat('es-AR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const sizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'font-display font-extrabold text-2xl',
  xl: 'font-display font-extrabold text-4xl',
}

export function Amount({ value, currency, size = 'md', approx = false }: AmountProps) {
  const formatted = formatter.format(Number(value))

  return (
    <span className={`tabular-nums ${sizes[size]}`}>
      {`${approx ? '≈ ' : ''}${currency} ${formatted}`}
    </span>
  )
}