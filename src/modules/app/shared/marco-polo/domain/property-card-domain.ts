import { extractImageLink } from '@/app/destination/destination-explorer/domain/destination-explorer-domain'
import { z } from 'zod'

export const PropertyExplorerCardSchema = z
  .object({
    slug: z.string(),
    starRating: z.number().catch(0),
    propertyName: z.string(),
    city: z.string(),
    country: z.string(),
    curatelyScore: z.number(),
    hcomId: z.string(),
    pricingAndAvailability: z
      .object({
        hcomId: z.string(),
        available: z.boolean(),
        averageNightlyPrice: z.string(),
        totalPrice: z.string(),
      })
      .optional(), //expedia augmentation
    lengthOfStay: z.number().catch(0),
    listingDescription: z.string(),
    geoLocation: z.object({
      coordinates: z.array(z.number()),
    }),
    amenitiesNormal: z.array(z.string()).catch([]),
    images: z.array(
      z.object({
        group: z.string(),
        link: z.string(),
        title: z.string(),
      }),
    ),
  })
  .transform(({ images, listingDescription, geoLocation, ...rest }) => ({
    images: extractImageLink.parse(images),
    description: listingDescription,
    coordinates: geoLocation.coordinates,
    ...rest,
  }))

export const PropertyExplorerCardsSchema = z.array(PropertyExplorerCardSchema)

export type PropertyExplorerCard = z.infer<typeof PropertyExplorerCardSchema>
export type PropertyExplorerCards = z.infer<typeof PropertyExplorerCardsSchema>
