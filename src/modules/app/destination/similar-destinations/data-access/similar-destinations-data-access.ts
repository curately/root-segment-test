//import { getDestination } from '@/shared/data-access/destination-data-access'

//import { getDestination } from '../../shared/data-access/cached-destination-objects'
import 'server-only'

import type { SimilarDestinations } from '../domain/similar-destinations-domain'

import { unstable_cache } from 'next/cache'

import { db } from '@/app/destination/shared/data-access/db'

import { createServerErrorResponse, createServerSuccessResponse } from '@/shared/data-access/server-response'
import { genericInternalErrorMessage } from '@/shared/ui/error/generic-error-message'

export async function preloadSimilarDestination(slug: string) {
  void getSimilarDestinations(slug)
}

export const getSimilarDestinations = unstable_cache(
  async (slug: string) => {
    try {
      const destination = await db.getDestination(slug)
      if (!destination) {
        return createServerErrorResponse<SimilarDestinations>('Destination not found')
      }
      const { similarCollections: similarDestinations } = destination

      const similarDestinationDto: SimilarDestinations = similarDestinations

      return createServerSuccessResponse(similarDestinationDto)
    } catch (error) {
      return createServerErrorResponse<SimilarDestinations>(genericInternalErrorMessage)
    }
  },
  ['similar-destinations'],
  {
    tags: ['similar-destinations'],
    revalidate: 3600,
  },
)
