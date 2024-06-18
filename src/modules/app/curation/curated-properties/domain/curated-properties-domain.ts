import { z } from 'zod'

export const CuratedPropertyCardSchema = z.object({
  slug: z.string(),
  starRating: z.number().catch(0),
  propertyName: z.string(),
  city: z.string(),
  country: z.string(),
  curatelyScore: z.number(),
  images: z.array(
    z.object({
      group: z.string(),
      link: z.string(),
      title: z.string(),
    }),
  ),
})

export const CuratedPropertyCardsSchema = z.array(CuratedPropertyCardSchema)

export type CuratedPropertyCard = z.infer<typeof CuratedPropertyCardSchema>
export type CuratedPropertyCards = z.infer<typeof CuratedPropertyCardsSchema>
