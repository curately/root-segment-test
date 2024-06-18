'use server'

import { env } from 'env'
//import { createServerErrorResponse, createServerSuccessResponse } from '@/shared/data-access/server-response'
import { unstable_cache } from 'next/cache'
import prisma from '@/shared/data-access/prisma'
import { buildMapboxAutoCompleteUrl } from '../../location/domain/build-mapbox-url'
import { HotelSuggestions, MapBoxPlacesSuggestions } from '../../location/domain/location-search-domain'
import 'server-only'

const cachedSearchListings = async (searchTerm: string) => {
  if (!searchTerm || searchTerm.length < 3) {
    return []
  }
  return await prisma.listing.aggregateRaw({
    pipeline: [
      {
        $search: {
          index: 'hotel-names',
          autocomplete: {
            query: searchTerm,
            path: 'propertyName',
          },
          returnStoredSource: true,
        },
      },
      {
        $limit: 10,
      },
    ],
  })
}

export async function getAutoCompleteSuggestions(searchTerm: string) {
  const showHotels = env.NEXT_PUBLIC_SHOW_HOTELS_IN_AUTOCOMPLETE === 'true' ? true : false
  const places = await getPlaceSuggestions(searchTerm)
  if (showHotels) {
    const hotels = await getHotelSuggestions(searchTerm)
    return places.concat(hotels)
  }
  return places
}

export const getPlaceSuggestions = unstable_cache(
  async (searchTerm: string) => {
    const placesApiUrl = buildMapboxAutoCompleteUrl(searchTerm)
    const placesData = await fetch(placesApiUrl)
    const places = await placesData.json()
    const { success, data: mapBoxPlaceSuggestions } = MapBoxPlacesSuggestions.safeParse(places)

    if (!success) {
      return []
    }
    return mapBoxPlaceSuggestions.features
  },
  ['autocomplete-places'],
  {
    tags: ['autocomplete-places', 'autocomplete'],
    revalidate: 900,
  },
)

export const getHotelSuggestions = unstable_cache(
  async (searchTerm: string) => {
    const rawHotelSuggestions = await cachedSearchListings(searchTerm)

    const { success, data: hotelSuggestions } = HotelSuggestions.safeParse(rawHotelSuggestions)

    if (!success) {
      return []
    }
    return hotelSuggestions
  },
  ['autocomplete-hotels'],
  {
    tags: ['autocomplete-hotels', 'autocomplete'],
    revalidate: 900,
  },
)
