'use client'

import { type DateRange } from '@react-types/datepicker'
import { CleanAvailabilityRefinements } from '../../shared/domain/refinements-domain'
import { useRefinements } from '../../shared/domain/use-refinements'

type RefinementsValue = string | number | DateRange | null

type Refinements = Record<string, RefinementsValue>

export const useBuildAvailabilityRefinementQueryString = (
  availabilityRefinementsToOveride?: Record<string, string | number | DateRange | null> | null,
) => {
  // use our override values or else use the current refinements

  const refinementsInState = useRefinements()

  const refinements: Refinements = availabilityRefinementsToOveride
    ? availabilityRefinementsToOveride
    : refinementsInState

  const { success, data: cleanRefinements } = CleanAvailabilityRefinements.safeParse(refinements)

  if (!success) {
    return ''
  }

  return new URLSearchParams(cleanRefinements).toString() ?? ''
}
