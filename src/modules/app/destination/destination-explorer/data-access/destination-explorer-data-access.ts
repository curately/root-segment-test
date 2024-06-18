import 'server-only'
import {
  PropertyExplorerCardsSchema,
  type PropertyExplorerCards,
} from '@/app/shared/marco-polo/domain/property-card-domain'
import { unstable_cache } from 'next/cache'
import { createServerErrorResponse, createServerSuccessResponse } from '@/shared/data-access/server-response'
import { genericInternalErrorMessage } from '@/shared/ui/error/generic-error-message'
import { getDestination, getDestinationProperties } from '../../shared/data-access/cached-destination-objects'
import { type PropertyCountDto } from '../domain/destination-explorer-domain'

export const getPropertiesForDestination = unstable_cache(
  async (destinationSlug: string) => {
    try {
      //time this function takes to run
      const start = Date.now()
      const properties = await getDestinationProperties(destinationSlug)
      const end = Date.now()
      console.log(`getDestinationProperties took ${end - start} milliseconds`)

      if (!properties) {
        return createServerErrorResponse<PropertyExplorerCards>('No properties found for this destination')
      }

      const { success, error: zodError, data: propertyCards } = PropertyExplorerCardsSchema.safeParse(properties)
      if (!success) {
        return createServerErrorResponse<PropertyExplorerCards>(zodError.message)
      }

      return createServerSuccessResponse(propertyCards)
    } catch (error) {
      console.error(error)
      return createServerErrorResponse<PropertyExplorerCards>(error)
    }
  },
  ['get-properties-for-destination', 'hotel-explorer'],
  {
    tags: ['get-properties-for-destination', 'hotel-explorer'],
    revalidate: 900,
  },
)

export const getPropertyCount = unstable_cache(
  async (slug: string) => {
    try {
      const destination = await getDestination(slug)
      if (!destination) {
        return {}
      }

      const dto: PropertyCountDto = {
        propertyCount: destination.propertyCount > 300 ? '300+' : `${destination.propertyCount}`,
      }

      return createServerSuccessResponse(dto)
    } catch (error) {
      return createServerErrorResponse<PropertyCountDto>(genericInternalErrorMessage)
    }
  },
  ['property-count'],
  {
    tags: ['property-count'],
    revalidate: 3600,
  },
)
