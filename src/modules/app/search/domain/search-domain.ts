import { Refinements } from '@/app/refinement/shared/domain/refinements-domain'
import { PropertyExplorerCardsSchema } from '@/app/shared/marco-polo/domain/property-card-domain'
import { z } from 'zod'

export const SearchResultsDto = z.object({
  properties: PropertyExplorerCardsSchema,
  totalCount: z.number(),
})
export type SearchResultsDto = z.infer<typeof SearchResultsDto>

export function isValidParamCombination(searchParams: Refinements) {
  if ((!searchParams.location || searchParams.location === '') && searchParams.type !== 'hotel') {
    return false
  }
  return true
}
