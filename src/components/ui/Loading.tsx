export interface LoadingProps {
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-10 w-10',
}

export function Loading({ label = 'Cargando', size = 'md' }: LoadingProps) {
  return (
    <div role="status" className="inline-flex items-center justify-center">
      <span
        aria-hidden="true"
        className={`${sizes[size]} animate-spin rounded-full border-2 border-line border-t-primary`}
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}