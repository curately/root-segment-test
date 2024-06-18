'use client'

//import { AvailabilityModal } from '@/property/check-availability/ui/availability-modal'
import { useRefinements } from '@/app/refinement/shared/domain/use-refinements'
import { useSearchParams } from 'next/navigation'
import { lazy } from 'react'
//import { GuestModal } from '@/property/check-availability/ui/guest-modal'
import { AvailabilityCard } from '../ui/availability-card'

const LazyAvailabilityModal = lazy(() =>
  import('../ui/availability-modal').then(module => ({
    default: module.AvailabilityModal,
  })),
)

const LazyGuestModal = lazy(() =>
  import('../ui/guest-modal').then(module => ({
    default: module.GuestModal,
  })),
)

type Props = {
  //propertyId: string
  prismaSlug: string
}
export function CheckAvailability({ prismaSlug }: Props) {
  const slugParams = prismaSlug.split('/')
  const propertyId = slugParams.pop() ?? ''

  const searchParams = useSearchParams()
  const modal = searchParams.get('modal')

  if (modal === 'dates') {
    return <LazyAvailabilityModal propertyId={propertyId} />
  }

  if (modal === 'rooms') {
    return <LazyGuestModal propertyId={propertyId} />
  }

  return <AvailabilityCard propertyId={propertyId} prismaSlug={prismaSlug} />
}
