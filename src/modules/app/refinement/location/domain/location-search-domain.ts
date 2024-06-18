import { z } from 'zod'

export const MapBoxPlaceItem = z
  .object({
    id: z.string(),
    type: z.string(),
    relevance: z.number(),
    place_name: z.string(),
    geometry: z.object({
      type: z.string(),
      coordinates: z.tuple([z.number(), z.number()]),
    }),
  })
  .transform(data => {
    return {
      id: data.id,
      type: data.type,
      placeName: data.place_name,
      lng: data.geometry.coordinates[0],
      lat: data.geometry.coordinates[1],
      relevance: data.relevance,
    }
  })

export const MapBoxPlacesSuggestions = z.object({
  features: z.array(MapBoxPlaceItem),
})

export const HotelPlaceItem = z
  .object({
    propertyName: z.string(),
    _id: z.object({
      $oid: z.string(),
    }),
    slug: z.string(),
    city: z.string(),
    country: z.string(),
    geoLocation: z.object({
      coordinates: z.tuple([z.number(), z.number()]),
    }),
  })
  .transform(data => {
    return {
      id: data._id.$oid,
      placeName: data.propertyName,
      type: 'hotel',
      lng: data.geoLocation.coordinates[0],
      lat: data.geoLocation.coordinates[1],
      relevance: 1,
    }
  })

export const HotelSuggestions = z.array(HotelPlaceItem)
/*

export const HotelSuggestions = z.array(
  z
    .object({
      propertyName: z.string(),
      _id: z.object({
        $oid: z.string(),
      }),
      slug: z.string(),
      city: z.string(),
      country: z.string(),
      geoLocation: z.object({
        coordinates: z.tuple([z.number(), z.number()]),
      }),
    })
    .transform(data => {
      return {
        id: data._id.$oid,
        placeName: data.propertyName,
        type: 'hotel',
        lng: data.geoLocation.coordinates[0],
        lat: data.geoLocation.coordinates[1],
        relevance: 1,
      }
    }),
)
*/
export type MapBoxPlaceItem = z.infer<typeof MapBoxPlaceItem>
export type HotelPlaceItem = z.infer<typeof HotelPlaceItem>
export type MapBoxPlacesSuggestions = z.infer<typeof MapBoxPlacesSuggestions>
export type HotelSuggestions = z.infer<typeof HotelSuggestions>
export type InputItem = MapBoxPlaceItem | HotelPlaceItem
