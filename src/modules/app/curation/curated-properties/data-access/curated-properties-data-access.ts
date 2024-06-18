import type { CuratedPropertyCards } from '../domain/curated-properties-domain'

import { unstable_cache } from 'next/cache'

//import { getCuration } from '../../shared/data-access/cached-curation-objects'
import { getCuration } from '@/app/curation/shared/data-access/get-curation'
import { createServerErrorResponse, createServerSuccessResponse } from '@/shared/data-access/server-response'

import { CuratedPropertyCardsSchema } from '../domain/curated-properties-domain'

export const getCuratedProperties = unstable_cache(
  async (slug: string) => {
    try {
      const curation = await getCuration(slug)
      if (!curation) {
        return createServerErrorResponse<CuratedPropertyCards>('No curation found.')
      }
      if (!curation.propertyCards || curation.propertyCards.length === 0) {
        return createServerErrorResponse<CuratedPropertyCards>('No properties found for this curation.')
      }
      const { propertyCards } = curation

      const { success, error: zodError, data: curatedProperties } = CuratedPropertyCardsSchema.safeParse(propertyCards)

      if (!success) {
        return createServerErrorResponse<CuratedPropertyCards>(zodError)
      }

      return createServerSuccessResponse(curatedProperties)
    } catch {
      return createServerErrorResponse<CuratedPropertyCards>('There was a problem with this request. Please try again.')
    }
  },
  ['curation-properties'],
  {
    tags: ['curation-properties', 'curation'],
  },
)
