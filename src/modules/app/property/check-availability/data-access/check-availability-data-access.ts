'use server'

//import { ExpediaPropertyResultsResponse } from '../domain/check-availability-domain'
import { env } from 'env'
import { unstable_cache } from 'next/cache'

import { createServerErrorResponse, createServerSuccessResponse } from '@/shared/data-access/server-response'
import { SinglePropertyResponse } from '@/shared/domain/price-and-availability-domain'

import { buildExpediaRoomString } from '../data-access/helpers'

export const checkAvailability = unstable_cache(
  async ({
    propertyId,
    checkin,
    checkout,
    rooms,
  }: {
    propertyId: string
    checkin: string | null
    checkout: string | null
    rooms: string | null
  }) => {
    if (!propertyId || !checkin || !checkout) {
      return createServerErrorResponse<SinglePropertyResponse>('missing propertyId, checkin or checkout')
    }
    if (!env.EXPEDIA_LISTINGS_BASE_URL) {
      return createServerErrorResponse<SinglePropertyResponse>('EXPEDIA_LISTINGS_BASE_URL not found in .env')
    }

    if (!rooms) {
      rooms = ''
    }

    const roomString = buildExpediaRoomString(rooms)

    const expediaApiUrl = `${env.EXPEDIA_LISTINGS_BASE_URL}?checkIn=${checkin}&checkOut=${checkout}&hcomHotelIds=${propertyId}${roomString}`

    const auth = `Basic ${env.EXPEDIA_AUTH_BASE_64}`
    const key = env.EXPEDIA_KEY
    if (!key || !auth) {
      return createServerErrorResponse<SinglePropertyResponse>('Missing key or auth for Expedia api')
    }
    const response = await fetch(expediaApiUrl, {
      method: 'GET',
      headers: {
        Authorization: auth,
        Accept: 'application/vnd.exp-hotel.v3+json',
        Key: key,
        'Partner-Transaction-Id': key,
      },
    })
    if (!response) {
      return createServerErrorResponse<SinglePropertyResponse>('No results from Expedia')
    }
    const results = await response.json()
    console.log(results)
    const { success, error: zodError, data: roomAvailability } = SinglePropertyResponse.safeParse(results)

    if (!success) {
      console.log(zodError)
      return createServerErrorResponse<SinglePropertyResponse>(zodError.message)
    }
    console.log(roomAvailability)
    return createServerSuccessResponse(roomAvailability)
  },
  ['hotel-check-availability'],
  {
    tags: ['hotel-check-availability', 'listing'],
    revalidate: 900,
  },
)
