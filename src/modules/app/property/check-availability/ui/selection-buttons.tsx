import { CleanAvailabilityRefinements } from '@/app/refinement/shared/domain/refinements-domain'
import { useRefinements } from '@/app/refinement/shared/domain/use-refinements'
import Link from 'next/link'
import { useEffect } from 'react'
import { Calendar, Users } from 'react-feather'
import { useInView } from 'react-intersection-observer'

const loadAvailabilityModal = () => {
  return import('../ui/availability-modal')
}
/*
const loadGuestsModal = () => {
  return import('../ui/guest-modal')
}
*/
const loadGuestsModal = () => {
  return import('@/app/refinement/guests/ui/guest-modal')
}

interface Props {
  propertyId: string
}
export function SelectionButtons({ propertyId }: Props) {
  const refinements = useRefinements()

  const cleanRefinements = CleanAvailabilityRefinements.parse(refinements)

  const { numberOfGuests, displayDates } = useRefinements()

  const guestText = numberOfGuests > 1 ? ' guests' : ' guest'

  const { ref, inView } = useInView({
    threshold: 0.9,
  })
  useEffect(() => {
    if (inView) {
      loadAvailabilityModal()
      loadGuestsModal()
    }
  }, [inView])

  return (
    <div className="flex justify-start w-full gap-2" ref={ref}>
      <div className="w-full ">
        <Link
          className="flex items-center justify-center w-full h-10 gap-2 px-4 py-2 text-base font-medium transition-colors bg-white border focus-visible:ring-ring whitespace-nowrap rounded-3xl border-pill ring-offset-background hover:bg-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          href={{
            pathname: `./${propertyId}`,
            query: { ...cleanRefinements, modal: 'dates' },
          }}
        >
          <Calendar size={14} className="font-bold text-primary-600" strokeWidth={3} />
          {displayDates}
        </Link>
      </div>
      <div className="w-full ">
        <Link
          className="flex items-center justify-center w-full h-10 gap-2 px-4 py-2 text-base font-medium transition-colors bg-white border focus-visible:ring-ring whitespace-nowrap rounded-3xl border-pill ring-offset-background hover:bg-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          href={{
            pathname: `./${propertyId}`,
            query: { ...cleanRefinements, modal: 'rooms' },
          }}
        >
          <div className="flex items-center gap-2 px-2 py-2 text-base leading-4 text-black">
            <Users size={14} className="font-bold text-primary-600" strokeWidth={3} />
            {numberOfGuests ? `${numberOfGuests} ${guestText}` : null}
          </div>
        </Link>
      </div>
    </div>
  )
}
