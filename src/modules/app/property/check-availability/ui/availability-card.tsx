import { useRefinements } from '@/app/refinement/shared/domain/use-refinements'
import { usePathname, useRouter } from 'next/navigation'
import { Check as CheckIcon } from 'react-feather'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'
import { buildQueryString } from '../domain/build-query-string'
import { useGetAvailability } from '../domain/use-check-availability'
import { BookButton } from '../ui/book-button'
import { AvailabilityCardSkeleton } from '../ui/check-availabiity-skeleton'
import { isValidDateRange } from '../ui/helpers'
import { Message } from '../ui/message'
import { SelectionButtons } from '../ui/selection-buttons'
import { TripSummary } from '../ui/trip-summary'

type Props = {
  propertyId: string
  prismaSlug: string
}

export function AvailabilityCard({ propertyId, prismaSlug }: Props) {
  const { checkin, checkout, rooms } = useRefinements()

  const {
    isPending,
    isError,
    error,
    data: availabilityData,
  } = useGetAvailability({ checkin, checkout, rooms, propertyId })

  const router = useRouter()
  const pathName = usePathname()
  function openDatesModal() {
    const newSearchParams = {
      checkin: checkin,
      checkout: checkout,
      rooms: rooms,
      modal: 'dates',
    }

    router.push(pathName + buildQueryString(newSearchParams), {
      scroll: false,
    })
  }

  if (isError) {
    return (
      <CheckAvailabilityCardContainer>
        <div>XError from react query..</div>
      </CheckAvailabilityCardContainer>
    )
  }

  if (isPending) {
    return <AvailabilityCardSkeleton />
  }

  if (!availabilityData) {
    return (
      <CheckAvailabilityCardContainer>
        <div className="text-2xl font-bold">Check availability</div>
        <div>Add dates for pricing & availability</div>
        <div className="py-6">
          <SelectionButtons propertyId={propertyId} />
        </div>
        <Button
          variant="accent"
          shape="pill"
          className="w-full"
          fullWidth={true}
          size="lg"
          effect="blur"
          onClick={() => {
            openDatesModal()
          }}
        >
          Check Availability
        </Button>
      </CheckAvailabilityCardContainer>
    )
  }
  console.log(availabilityData)
  const isValidRange = checkin && checkout ? isValidDateRange({ checkin, checkout }) : false

  if (!isValidRange) {
    const errorMessages = ['Check in and check out dates need to be within a range of 28 days.']
    return (
      <CheckAvailabilityCardContainer>
        <div className="text-2xl font-bold">Check availability</div>
        <div className="py-6">
          <SelectionButtons propertyId={propertyId} />
        </div>

        <Message messageType="error" errorMessages={errorMessages} />
      </CheckAvailabilityCardContainer>
    )
  }
  let message: 'empty' | 'available' | 'unavailable' | 'error' = 'available'

  /*
    hcomId: '688609',
    available: true,
    averageNightlyPrice: '245.41',
    totalPrice: '1952.24',
    numAdults: 2,
    numChildren: 0,
    deepLink: 
    */
  const { available, totalPrice: rawTotalPrice, deepLink, lengthOfStay } = availabilityData
  const totalPrice = parseFloat(rawTotalPrice)
  if (!available) {
    message = 'unavailable'
    return (
      <CheckAvailabilityCardContainer>
        <div className="text-orange-700">Chosen dates are not available</div>
        <div className="py-6">
          <SelectionButtons propertyId={propertyId} />
        </div>
        <Button variant="accent" shape="pill" className="w-full" fullWidth={true} size="lg">
          Check Availability
        </Button>
      </CheckAvailabilityCardContainer>
    )
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <>
          <div className="flex items-center gap-2 text-base">
            <div className="text-2xl font-bold">£{new Intl.NumberFormat('en-US').format(Math.round(totalPrice))}</div>

            <div className="">
              for {lengthOfStay} night
              {lengthOfStay && lengthOfStay > 1 && 's'}
            </div>
          </div>
          <CardDescription>
            <Badge variant="ivory" className="p-1 px-2">
              <CheckIcon className="w-4 h-4 mr-1" /> Available
            </Badge>
          </CardDescription>
        </>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-8">
          <SelectionButtons propertyId={propertyId} />

          <div>
            <TripSummary totalPrice={totalPrice} lengthOfStay={lengthOfStay ?? 0} rooms={rooms ?? '2'} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <BookButton
          expediaDeepLink={deepLink}
          slug={prismaSlug}
          rooms={rooms ?? '2'}
          totalPrice={totalPrice}
          lengthOfStay={lengthOfStay}
          checkin={checkin ?? ''}
          checkout={checkout ?? ''}
        />
      </CardFooter>
    </Card>
  )
}

const CheckAvailabilityCardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="width-12 fixed bottom-0  z-20 me-0 ms-0 w-full max-w-[100%] rounded-xl border border-ivory bg-white p-4 md:relative md:shadow-lg">
      {children}
    </div>
  )
}
