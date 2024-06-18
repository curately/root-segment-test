import type { findDestinationPropertiesFields } from '@/app/destination/shared/data-access/cached-destination-objects'
import type { Prisma } from '@prisma/client'
//import { type DestinationPropertiesPayload } from '@/monterey-payload-types'
import { z } from 'zod'
import { type Prettify } from 'modules/shared/domain/utility-types'

type findDestinationPropertiesPayload = Prettify<
  Prisma.ListingGetPayload<{ select: typeof findDestinationPropertiesFields }>
>

export type PropertiesForDestinationDto = Prettify<Array<findDestinationPropertiesPayload>>

export const extractImageLink = z.array(
  z.object({
    link: z.string(),
  }),
)

export type PropertyCountDto = {
  propertyCount: string
}
