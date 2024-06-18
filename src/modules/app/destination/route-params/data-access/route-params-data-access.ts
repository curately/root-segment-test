import 'server-only'
import { getDestination } from '@/app/destination/shared/data-access/cached-destination-objects'
import { unstable_cache } from 'next/cache'
import { createServerErrorResponse, createServerSuccessResponse } from '@/shared/data-access/server-response'
import { type Prettify } from '@/shared/domain/utility-types'
import { type DestinationParamsDto } from '../domain/route-params-domain'

export const getDestinationRouteParams = unstable_cache(
  async (prismaSlug: string) => {
    try {
      const destination = await getDestination(prismaSlug)
      if (!destination) {
        return createServerErrorResponse<Prettify<DestinationParamsDto>>(
          'Destination route not found for prismaSlug: ' + prismaSlug,
        )
      }

      const hasContent = destination.content.introduction && destination.content.introduction !== '' ? true : false

      return createServerSuccessResponse({ destinationSlug: prismaSlug, hasContent })
    } catch (error) {
      return createServerErrorResponse<Prettify<DestinationParamsDto>>(error)
    }
  },
  ['destination-page-params'],
  {
    revalidate: 864000,
  },
)

/* for our cron job */
export const getDestinationRouteParamsUncached = async (prismaSlug: string) => {
  try {
    const destination = await getDestination(prismaSlug)
    if (!destination) {
      return createServerErrorResponse<Prettify<DestinationParamsDto>>(
        'Destination route not found for prismaSlug: ' + prismaSlug,
      )
    }

    const hasContent = destination.content.introduction && destination.content.introduction !== '' ? true : false

    return createServerSuccessResponse({ destinationSlug: prismaSlug, hasContent })
  } catch (error) {
    return createServerErrorResponse<Prettify<DestinationParamsDto>>(error)
  }
}
