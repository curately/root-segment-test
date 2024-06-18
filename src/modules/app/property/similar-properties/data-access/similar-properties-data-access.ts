import 'server-only'
//import { unstable_cache } from 'next/cache'
//import { SimilarPropertyCards } from '@/shared/property-cards/domain/property-card-domain'
import { createServerErrorResponse, createServerSuccessResponse } from '@/shared/data-access/server-response'
import { genericInternalErrorMessage } from '@/shared/ui/error/generic-error-message'
import { getProperty, getSimilarPropertiesData } from '../../shared/data-access/cached-property-objects'
//import { SimilarPropertyCardsSchema, type SimilarPropertyCards } from '../domain/similar-properties-domain'
import type { SimilarPropertyCards } from '../domain/similar-properties-domain'

export async function preloadSimilarProperties(slug: string) {
  void getSimilarProperties(slug)
}

export async function getSimilarProperties(slug: string) {
  try {
    const property = await getProperty(slug)

    if (!property) {
      return {}
    }

    const similarPropertySlugs = property.similarHotels.map(hotel => hotel.slug)

    const similarProperties = await getSimilarPropertiesData(similarPropertySlugs)

    if (!similarProperties) {
      return createServerErrorResponse<SimilarPropertyCards>(
        'There was a problem retrieving the similar hotels. Please try again.',
      )
    }
    /*
    NO need to validate with zod if we are returning the data as is
    const {
      success,
      error: zodError,
      data: similarPropertiesCards,
    } = SimilarPropertyCardsSchema.safeParse(similarProperties)

    if (!success) {
      return createServerErrorResponse<SimilarPropertyCards>(zodError)
    }
    return createServerSuccessResponse<SimilarPropertyCards>(similarPropertiesCards)
    */
    return createServerSuccessResponse<SimilarPropertyCards>(similarProperties)
  } catch (error) {
    return createServerErrorResponse<SimilarPropertyCards>(genericInternalErrorMessage)
  }
}
/*
export const getSimilarProperties = unstable_cache(
  async (slug: string) => {
    try {
      const property = await getProperty(slug)

      if (!property) {
        return {}
      }

      const similarPropertySlugs = property.similarHotels.map(hotel => hotel.slug)

      const similarProperties = await getSimilarPropertiesData(similarPropertySlugs)

      if (!similarProperties) {
        return createServerErrorResponse<SimilarPropertyCards>(
          'There was a problem retrieving the similar hotels. Please try again.',
        )
      }
      const {
        success,
        error: zodError,
        data: similarPropertiesCards,
      } = SimilarPropertyCardsSchema.safeParse(similarProperties)

      if (!success) {
        return createServerErrorResponse<SimilarPropertyCards>(zodError)
      }
      return createServerSuccessResponse<SimilarPropertyCards>(similarPropertiesCards)
    } catch (error) {
      return createServerErrorResponse<SimilarPropertyCards>(genericInternalErrorMessage)
    }
  },
  ['similar-properties'],
  {
    tags: ['similar-properties', 'listing'],
    revalidate: 900,
  },
)
*/
