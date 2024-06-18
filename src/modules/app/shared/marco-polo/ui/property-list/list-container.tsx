'use client'

import { useBuildAvailabilityRefinementQueryString } from '@/app/refinement/shared/domain/use-build-availability-refinement-querystring'
import { useActions } from '@/app/shared/marco-polo/domain/use-marco-polo-store'
import Link from 'next/link'
import { cn } from '@/shared/ui/helpers'

type Props = {
  slug: string
  children: React.ReactNode
  props?: React.AnchorHTMLAttributes<HTMLAnchorElement>
  className?: string
}
export function ListContainer({ slug, children, props, className = '' }: Props) {
  const { updateActiveMarker } = useActions()
  const queryString = useBuildAvailabilityRefinementQueryString()
  const propertyLink = queryString ? `${slug}?${queryString}` : slug
  return (
    <Link
      href={propertyLink}
      className={cn('', className)}
      {...props}
      onMouseEnter={() => {
        updateActiveMarker(slug)
      }}
    >
      {children}
    </Link>
  )
}
