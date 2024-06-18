import { type ServerError } from '@/shared/data-access/server-response'
import { cn } from '@/shared/ui/helpers'

type ErrorListProps = {
  errors: Array<ServerError>
  className?: string
  props?: React.HTMLProps<HTMLDivElement>
}

export function ErrorList({ errors, props, className = '' }: ErrorListProps) {
  const errorClass = cn('mb-2 text-sm text-red-600', className)
  return (
    <div className="flex flex-col" {...props}>
      {errors.map(error => (
        <p key={error.message} className={errorClass}>
          {error.message}
        </p>
      ))}
    </div>
  )
}
