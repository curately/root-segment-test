import { findSimilarPropertiesDataFields } from '@/app/property/shared/data-access/cached-property-objects'
import type { Prisma } from '@prisma/client'
import type { Prettify, PrettifyNested } from '@/shared/domain/utility-types'

export type SimilarPropertyCard = Prettify<Prisma.ListingGetPayload<{ select: typeof findSimilarPropertiesDataFields }>>
export type SimilarPropertyCards = Prettify<Array<SimilarPropertyCard>>
//import { z } from 'zod'

/*
const SimilarPropertyCardSchema = z.object({
  slug: z.string(),
  starRating: z.number().catch(0),
  propertyName: z.string(),
  city: z.string(),
  country: z.string(),
  curatelyScore: z.number(),
  heroImage: z.string(),
})
export type SimilarPropertyCard = z.infer<typeof SimilarPropertyCardSchema>

export const SimilarPropertyCardsSchema = z.array(SimilarPropertyCardSchema)
export type SimilarPropertyCards = z.infer<typeof SimilarPropertyCardsSchema>
*/

//export type SimilarPropertyCards = any
