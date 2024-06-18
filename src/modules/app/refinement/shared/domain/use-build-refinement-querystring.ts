'use client'

import { type DateRange } from '@react-types/datepicker'
import { usePathname, useSearchParams } from 'next/navigation'
import { unSlugifyDestinationName } from '@/shared/domain/routes'
import { useIsDestinationPage } from '@/shared/domain/use-is-destination-page'
import { CleanAvailabilityRefinements, CleanRefinements } from '../../shared/domain/refinements-domain'
import { useRefinements } from '../../shared/domain/use-refinements'

type RefinementsValue = string | number | DateRange | null

type Refinements = Record<string, RefinementsValue>

export const useBuildRefinementQueryString = (
  mergedRefinements?: Record<string, string | number | DateRange | null> | null,
) => {
  const urlParams = useSearchParams()
  const isDestinationPage = useIsDestinationPage()
  const pathName = usePathname()
  let destination = ''
  if (isDestinationPage) {
    destination = unSlugifyDestinationName(pathName.split('/').pop() ?? '')
  }

  const refinementsInState = useRefinements()

  const refinements: Refinements = mergedRefinements
    ? { ...refinementsInState, ...mergedRefinements }
    : refinementsInState

  // const refinements: Refinements = useRefinements()

  //const mergedRefinements = mergedRefinements ?? refinements

  let safeSearchFilters: Refinements = {}

  // looop through all of our refinements and add to querystring if exists,
  // otherwise default to the existing querystring else default to empty string
  for (const key in refinements) {
    safeSearchFilters[key] = refinements[key] ?? urlParams.get(key) ?? ''
  }
  if (isDestinationPage && destination !== '') {
    safeSearchFilters.location = destination
  }

  //console.log(createQueryString({ refinements: safeSearchFilters }))

  const { success, data: cleanRefinements } = mergedRefinements
    ? CleanAvailabilityRefinements.safeParse(safeSearchFilters)
    : CleanRefinements.safeParse(safeSearchFilters)

  if (!success) {
    return ''
  }

  return new URLSearchParams(cleanRefinements).toString() ?? ''
  //console.log(cleanRefinements
  //return new URLSearchParams(createQueryString({ refinements: cleanRefinements })).toString()
  return new URLSearchParams(cleanRefinements).toString() ?? ''
}
type Props = {
  refinements: Record<string, RefinementsValue>
}

export function createQueryString({ refinements }: Props) {
  const safeSearchFilters = CleanRefinements.safeParse(refinements)
  //console.log(safeSearchFilters)
  if (!safeSearchFilters.success) {
    return ''
  }
  const searchFiltersWithDataSet = safeSearchFilters.data

  return new URLSearchParams(searchFiltersWithDataSet).toString() ?? ''
}
