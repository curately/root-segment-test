import type { Prettify } from '@/shared/domain/utility-types'

import { Prisma } from '@prisma/client'
import { z } from 'zod'

import { imageGalleryFields, propertyFields } from '../../shared/data-access/property-prisma-client'

export type PropertyPayload = Prettify<Prisma.ListingGetPayload<{ select: typeof propertyFields }>>
// use zod to narrow down the amenities to the desired shape and transform the keys to camelCase
const zodAmenity = z.array(z.string()).catch([])

export const Amenities = z
  .object({
    Accessibility: zodAmenity,
    Spa: zodAmenity,
    Conveniences: zodAmenity,
    Family_friendly: zodAmenity,
    Food_and_drink: zodAmenity,
    Guest_services: zodAmenity,
    Internet: zodAmenity,
    Things_to_do: zodAmenity,
    Outdoor: zodAmenity,
    More: zodAmenity,
  })
  .transform(({ ...fields }) => ({
    accessibility: fields.Accessibility,
    spa: fields.Spa,
    conveniences: fields.Conveniences,
    familyFriendly: fields.Family_friendly,
    foodAndDrink: fields.Food_and_drink,
    guestServices: fields.Guest_services,
    internet: fields.Internet,
    thingsToDo: fields.Things_to_do,
    outdoor: fields.Outdoor,
    more: fields.More,
  }))

export type Amenities = z.infer<typeof Amenities>
type AirportName = PropertyPayload['programmaticContent']['airports'][number]['name']
type AirportDistance = PropertyPayload['programmaticContent']['airports'][number]['distance']

export type AirportsDto = Array<{
  name: AirportName
  distance: AirportDistance
}>

export type AmenitiesDto = Amenities

export type PropertyNameDto = PropertyPayload['propertyName']

export type AreaDescriptionDto = PropertyPayload['areaDescription']

export type PropertyDescriptionDto = PropertyPayload['listingDescription']

export type CoordinatesDto = PropertyPayload['geoLocation']['coordinates']

export type StarRatingDto = PropertyPayload['starRating']

export type NumberOfReviewsDto = PropertyPayload['latestReviews']['totalNoReviews']

export type ImageGalleryPayload = Prettify<Prisma.ListingGetPayload<{ select: typeof imageGalleryFields }>>
