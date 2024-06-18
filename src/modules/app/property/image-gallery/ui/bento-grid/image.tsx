import { Refinements } from '@/app/refinement/shared/domain/refinements-domain'
import { useRefinements } from '@/app/refinement/shared/domain/use-refinements'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ExpediaImage } from '@/shared/ui/expedia-image'
import { buildQueryString } from '../../../check-availability/domain/build-query-string'

type Props = {
  src: string | null
  className?: string
  priority?: boolean
}

export function MontageImage({ priority = false, ...props }: Props) {
  const path = usePathname()
  const refinements = useRefinements()
  const setRefinements = Refinements.parse(refinements)
  const queryString = buildQueryString({ ...setRefinements, modal: 'gallery' })
  if (!props.src) {
    return null
  }
  return (
    <Link href={`${path}${queryString}`} className={props.className}>
      <ExpediaImage src={props.src} alt="" priority={priority} className={props.className} />
    </Link>
  )
}
