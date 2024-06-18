import { CircularProgress } from '@nextui-org/progress'
import { cn } from '@/shared/ui/helpers'

export interface CuratelyScoreProps extends React.HTMLAttributes<HTMLDivElement> {
  score: number
  svgClassName?: string
  indicatorClassName?: string
  trackClassName?: string
  valueClassName?: string
}

export function CuratelyScore({
  score,
  className,
  svgClassName = '',
  indicatorClassName = '',
  trackClassName = '',
  valueClassName = '',
  ...props
}: CuratelyScoreProps) {
  if (score < 0) score = 0
  if (score > 100) score = 100
  return (
    <div className={cn('text-md font-body', className)} {...props}>
      <CircularProgress
        size="md"
        value={score}
        formatOptions={{ maximumSignificantDigits: 2 }}
        strokeWidth={1}
        color="success"
        aria-label="Curately Score"
        showValueLabel={true}
        classNames={{
          svg: cn('w-11 h-11 drop-shadow-sm', svgClassName),
          indicator: cn('stroke-brand-600', indicatorClassName),
          track: cn('stroke-brand-200', trackClassName),
          value: cn('text-[12px] font-semibold text-dark font-body', valueClassName),
        }}
      />
    </div>
  )
}
