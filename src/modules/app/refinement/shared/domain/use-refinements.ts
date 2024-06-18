import { getLocalTimeZone, parseDate } from '@internationalized/date'
import { type DateRange } from '@react-types/datepicker'
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDateFormatter, type DateFormatter } from 'react-aria'
import { unSlugifyDestinationName } from '@/shared/domain/routes'
import { useIsDestinationPage } from '@/shared/domain/use-is-destination-page'
import { useDateHasBeenCancelled } from '../../dates/domain/use-dates-store'
import { validateCheckinAndCheckoutDates } from '../../dates/domain/validate-travel-dates'
import { getTotalAdultsAndChildren, transformUrlToInternalState } from '../../guests/domain/guests-domain'
import { validateRooms } from '../../guests/domain/validate-rooms'
import { DEFAULT_REFINEMENTS } from '../../shared/domain/default-refinements'
import { CleanRefinements, Refinements } from '../../shared/domain/refinements-domain'
import { useAllRefinements } from '../../shared/domain/use-refinements-store'

export function useRefinements() {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const refinements = useAllRefinements()

  const dateHasBeenCancelled = useDateHasBeenCancelled()
  const dateFormatter = useDateFormatter({
    month: 'long',
    day: 'numeric',
    timeZone: getLocalTimeZone(),
  })

  const location = useIsDestinationPage()
    ? unSlugifyDestinationName(pathName.split('/').pop() ?? '') ?? ''
    : refinements.location ?? searchParams.get('location') ?? ''

  const checkin = refinements.checkin ?? searchParams.get('checkin') ?? null
  const checkout = refinements.checkout ?? searchParams.get('checkout') ?? null
  const { validatedCheckin, validatedCheckout } =
    checkin && checkout
      ? validateCheckinAndCheckoutDates({ checkin, checkout })
      : { validatedCheckin: null, validatedCheckout: null }

  const rooms = refinements.rooms ?? searchParams.get('rooms') ?? null
  const amenities = refinements.amenities ?? searchParams.get('amenities') ?? null
  const lat = refinements.lat ?? searchParams.get('lat') ?? null
  const lng = refinements.lng ?? searchParams.get('lng') ?? null
  const limit = refinements.limit ?? searchParams.get('limit') ?? null
  const offset = refinements.offset ?? searchParams.get('offset') ?? null
  const tc = refinements.tc ?? searchParams.get('tc') ?? null
  const returnType = refinements.returnType ?? searchParams.get('returnType') ?? null
  const type = refinements.type ?? searchParams.get('type') ?? null

  const validatedRooms = validateRooms(rooms)

  const calendarDateRangeNew = getDefaultCalendarDateNew({
    checkin: validatedCheckin,
    checkout: validatedCheckout,
    dateHasBeenCancelled,
  })

  const displayDatesNew = getInitialDisplayDateValueNew({
    checkin: validatedCheckin,
    checkout: validatedCheckout,
    dateFormatter,
    dateHasBeenCancelled,
  })

  const numberOfGuests = getTotalGuests({ rooms }) > 13 ? 2 : getTotalGuests({ rooms })

  return {
    location,
    checkin,
    checkout,
    rooms: validatedRooms,
    amenities,
    lat,
    lng,
    limit,
    offset,
    tc,
    returnType,
    type,
    calendarDateRange: calendarDateRangeNew,
    displayDates: displayDatesNew,
    numberOfGuests,
  }
}

// SUPPORTING FUNCTIONS

type GetDefaultCalendarDateProps = {
  allSearchFilters: Record<string, string | null>
  searchParams: ReadonlyURLSearchParams
  dateHasBeenCancelled: boolean
}

type GetInitialDisplayDateValueProps = {
  allSearchFilters: Record<string, string | null>
  searchParams: ReadonlyURLSearchParams
  dateFormatter: DateFormatter
  dateHasBeenCancelled: boolean
}

type GetTotalGuestsProps = {
  rooms: string | null
}

type HasCheckinStateSetProps = {
  checkinStateParam: string | null
  checkoutStateParam: string | null
}

function getDefaultCalendarDate({
  allSearchFilters,
  searchParams,
  dateHasBeenCancelled = false,
}: GetDefaultCalendarDateProps) {
  //
  const defaultCalendarValue = {
    start: parseDate('1970-01-01'),
    end: parseDate('1970-01-01'),
  }

  const { checkin: checkinStateParam, checkout: checkoutStateParam } = allSearchFilters
  const checkinSearchParam = searchParams.get('checkin')
  const checkoutSearchParam = searchParams.get('checkout')

  if (dateHasBeenCancelled) {
    return defaultCalendarValue
  }

  if (checkinStateParam && checkoutStateParam && hasCheckinStateSet({ checkinStateParam, checkoutStateParam })) {
    return {
      start: parseDate(checkinStateParam),
      end: parseDate(checkoutStateParam),
    }
  }

  if (checkinSearchParam && checkoutSearchParam && checkinSearchParam !== '' && checkoutSearchParam !== '') {
    return {
      start: parseDate(checkinSearchParam),
      end: parseDate(checkoutSearchParam),
    }
  }

  return defaultCalendarValue
}

function getInitialDisplayDateValue({
  allSearchFilters,
  searchParams,
  dateFormatter,
  dateHasBeenCancelled = false,
}: GetInitialDisplayDateValueProps) {
  //
  const { checkin: checkinStateParam, checkout: checkoutStateParam } = allSearchFilters
  const checkinSearchParam = searchParams.get('checkin')
  const checkoutSearchParam = searchParams.get('checkout')
  const defaultDateValue = 'Choose dates'

  if (dateHasBeenCancelled) {
    return defaultDateValue
  }

  if (checkinStateParam && checkoutStateParam && hasCheckinStateSet({ checkinStateParam, checkoutStateParam })) {
    return dateFormatter.formatRange(new Date(checkinStateParam), new Date(checkoutStateParam))
  }

  if (checkinSearchParam && checkoutSearchParam && checkinSearchParam !== '' && checkoutSearchParam !== '') {
    return dateFormatter.formatRange(new Date(checkinSearchParam), new Date(checkoutSearchParam))
  }

  return defaultDateValue
}

type getDefaultCalendarDateNewProps = {
  checkin: string | null
  checkout: string | null

  dateHasBeenCancelled: boolean
}
function getDefaultCalendarDateNew({
  checkin,
  checkout,
  dateHasBeenCancelled = false,
}: getDefaultCalendarDateNewProps) {
  //

  const defaultCalendarValue = {
    start: parseDate('1970-01-01'),
    end: parseDate('1970-01-01'),
  }
  if (!checkin || !checkout) {
    return defaultCalendarValue
  }
  if (checkin === '' || checkout === '') {
    return defaultCalendarValue
  }
  /*
  if (dateHasBeenCancelled) {
    return defaultDateValue
  }
*/

  return {
    start: parseDate(checkin),
    end: parseDate(checkout),
  }

  //return defaultDateValue
}

type getInitialDisplayDateValueNewProps = {
  checkin: string | null
  checkout: string | null
  dateFormatter: DateFormatter
  dateHasBeenCancelled: boolean
}
function getInitialDisplayDateValueNew({
  checkin,
  checkout,
  dateFormatter,
  dateHasBeenCancelled = false,
}: getInitialDisplayDateValueNewProps) {
  //

  const defaultDateValue = 'Choose dates'

  if (dateHasBeenCancelled) {
    return defaultDateValue
  }

  if (checkin && checkout) {
    return dateFormatter.formatRange(new Date(checkin), new Date(checkout))
  }

  return defaultDateValue
}

function getTotalGuests({ rooms }: GetTotalGuestsProps) {
  if (!rooms) {
    return parseInt(DEFAULT_REFINEMENTS.rooms)
  }
  //const rooms = allSearchFilters.rooms ?? searchParams.get('rooms') ?? ''
  const internalRoomsState = transformUrlToInternalState(rooms)

  const totalGuests = getTotalAdultsAndChildren(internalRoomsState)
  return totalGuests
}

function hasCheckinStateSet({ checkinStateParam, checkoutStateParam }: HasCheckinStateSetProps) {
  if (checkinStateParam && checkoutStateParam) {
    return checkinStateParam !== '' && checkoutStateParam !== ''
  }
  return false
}

// SPLIT INTO NEW FILE
type RefinementsValue = string | number | DateRange | null
type Props = {
  refinements: Record<string, RefinementsValue>
}

function removeEmptyValuesFromSearchParams({ refinements }: Props) {
  if (!refinements) {
    return {}
  }
  const { success, data: safeRefinements } = Refinements.safeParse(refinements)

  if (!success) {
    return {}
  }
  const safeSearchParams: Record<string, string> = safeRefinements

  const fullFatSearchParams: Record<string, string> = {}

  for (const key in safeSearchParams) {
    const value = safeSearchParams[key] ?? ''
    if (value !== '') {
      fullFatSearchParams[key] = value
    }
  }

  return fullFatSearchParams
}

export function createQueryString({ refinements }: Props) {
  const safeSearchFilters = CleanRefinements.safeParse(refinements)
  if (!safeSearchFilters.success) {
    return ''
  }
  const searchFiltersWithDataSet = safeSearchFilters.data

  return new URLSearchParams(searchFiltersWithDataSet).toString() ?? ''
  //const safeParams = removeEmptyValuesFromSearchParams({ searchFilters })

  //return new URLSearchParams(safeParams).toString() ?? ''
}

type useUpdateRouteProps = {
  route?: string
  searchParams: Record<string, string>
}
export function useUpdateRoute({ route, searchParams }: useUpdateRouteProps) {
  const router = useRouter()
  const pathName = usePathname()
  let routePath = route ?? pathName
  function updateRoute(searchParams: Record<string, string>) {
    const newSearchParams = createQueryString({ refinements: searchParams })
    router.push(routePath + newSearchParams.toString(), {
      scroll: false,
    })
  }

  return { updateRoute }
}
