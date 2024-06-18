import 'server-only'

import type { DestinationDescription, DestinationName } from '../domain/destination-guide-domain'

import { unstable_cache } from 'next/cache'

import { db } from '@/app/destination/shared/data-access/db'

import { createServerErrorResponse, createServerSuccessResponse } from '@/shared/data-access/server-response'
import { genericInternalErrorMessage } from '@/shared/ui/error/generic-error-message'

import { getDestination } from '../../shared/data-access/cached-destination-objects'

/*
import {
  type DestinationDescription,
  type DestinationName,
} from '@/destination/destination-guide/domain/destination-guide-domain'
import { getDestination } from '@/destination/shared/data-access/cached-destination-objects'
*/
export async function preloadDestinationDescription(slug: string) {
  void getDestinationName(slug)
  void getDestinationDescription(slug)
}

export async function getDestinationName(slug: string) {
  try {
    var startTime = performance.now()
    const destination = await db.getDestination(slug)
    var endTime = performance.now()
    console.log(`Call to db.getDestination took ${endTime - startTime} milliseconds`)
    if (!destination) {
      return {}
    }

    const { name: destinationName } = destination

    const destinationNameDto: DestinationName = destinationName

    return createServerSuccessResponse(destinationNameDto)
  } catch (error) {
    return createServerErrorResponse<DestinationName>(genericInternalErrorMessage)
  }
}
/*
export const getDestinationName = unstable_cache(
  async (slug: string) => {
    try {
      const destination = await getDestination(slug)
      if (!destination) {
        return {}
      }
      const { name: destinationName } = destination
      const destinationNameDto: DestinationName = { destinationName }

      return createServerSuccessResponse(destinationNameDto)
    } catch (error) {
      return createServerErrorResponse<DestinationName>(genericInternalErrorMessage)
    }
  },
  ['destination-description'],
  {
    tags: ['destination-description'],
    revalidate: 3600,
  },
)
*/
export const getDestinationDescription = unstable_cache(
  async (slug: string) => {
    try {
      const destination = await db.getDestination(slug)
      if (!destination) {
        return {}
      }

      const { programmaticContent, content, name: destinationName } = destination
      const { introduction: destinationDescription, thingsToDo, whenToVisit, highlights } = content
      const { weather, airports } = programmaticContent
      const airportNames = airports.map(airport => airport.name)

      const destinationDescriptionDto: DestinationDescription = {
        destinationName,
        destinationDescription,
        thingsToDo,
        whenToVisit,
        weather,
        highlights,
        airportNames,
      }

      return createServerSuccessResponse(destinationDescriptionDto)
    } catch (error) {
      return createServerErrorResponse<DestinationDescription>(genericInternalErrorMessage)
    }
  },
  ['destination-description'],
  {
    tags: ['destination-description'],
    revalidate: 3600,
  },
)
