import { findDestinationFields } from '@/app/destination/shared/data-access/cached-destination-objects'
import type { Prisma } from '@prisma/client'
import type { Prettify } from '@/shared/domain/utility-types'

export type findDestinationPayload = Prettify<Prisma.CollectionGetPayload<{ select: typeof findDestinationFields }>>
