import { Refinements } from '@/app/refinement/shared/domain/refinements-domain'
import { isValidParamCombination, SearchResultsDto } from '@/app/search/domain/search-domain'
import { env } from 'env'
import { unstable_cache } from 'next/cache'
import { z } from 'zod'
import prisma from '@/shared/data-access/prisma'
import { createServerErrorResponse, createServerSuccessResponse } from '@/shared/data-access/server-response'
import { SearchResultsResponse } from '@/shared/domain/price-and-availability-domain'
import { tranformRoomToExpediaFormat } from '@/shared/domain/rooms'
import { genericInternalErrorMessage } from '@/shared/ui/error/generic-error-message'
import prismaSearch from '../data-access/search-prisma-client'

const montereySearchClient = prismaSearch.listing

const hcomSchema = z.array(
  z.object({
    hcomId: z.string(),
    amenitiesNormal: z.array(z.string()),
    curatelyScore: z.number(),
  }),
)

const noResults = { properties: [], totalCount: 0 }
function containsAllElements(arr1: Array<string>, arr2: Array<string>): boolean {
  // Create a set for faster lookup
  const elementSet: Set<any> = new Set(arr1)

  for (const element of arr2) {
    if (!elementSet.has(element)) {
      // If any element in arr2 is not found in arr1, return false
      return false
    }
  }
  // If all elements in arr2 are found in arr1, return true
  return true
}

export const getSearchedProperties = unstable_cache(
  async (searchParams: Refinements) => {
    //const a = await new Promise(resolve => setTimeout(resolve, 3000))
    try {
      if (!isValidParamCombination(searchParams)) {
        return createServerSuccessResponse(noResults)
      }

      searchParams.location = searchParams.location.replaceAll('United States', 'United States of America')

      if (searchParams.type === 'hotel') {
        const searchResultsDto: SearchResultsDto = await getPropertiesByGeoLocation(searchParams)

        return createServerSuccessResponse(searchResultsDto)
      }

      const searchResultsDto: SearchResultsDto = await getPropertiesByCollectionSlug(searchParams)

      return createServerSuccessResponse(searchResultsDto)
    } catch (error) {
      return createServerErrorResponse<SearchResultsDto>(genericInternalErrorMessage)
    }
  },
  ['search-properties'],
  {
    tags: ['search-properties', 'search'],
    revalidate: 90000,
  },
)

async function getPropertiesByCollectionSlug(searchParams: Refinements) {
  if (searchParams.amenities.length > 0) {
    //return await searchBySlugWithFilters(searchParams)
  }
  /*
  if (searchParams.checkin && searchParams.checkout) {
    const initialSearchResults = await searchBySlugWithoutFilters(searchParams)
    console.log(initialSearchResults)
    const propertiesWithPricing = await maybeGetAvailabilityAndPricing({
      searchParams,
      searchResults: initialSearchResults,
    })
    console.log(propertiesWithPricing)

    return propertiesWithPricing
  }
  */
  let initialSearchResults
  if (searchParams.amenities.length > 0) {
    initialSearchResults = await searchBySlugWithFilters(searchParams)
  } else {
    initialSearchResults = await searchBySlugWithoutFilters(searchParams)
  }
  //const initialSearchResults = await searchBySlugWithoutFilters(searchParams)
  if (!initialSearchResults || initialSearchResults.properties.length === 0) {
    initialSearchResults = await getPropertiesByGeoLocation(searchParams)
  }
  return await maybeGetAvailabilityAndPricing({ searchParams, searchResults: initialSearchResults })
  //return await searchBySlugWithoutFilters(searchParams)
}

async function searchBySlugWithoutFilters(searchParams: Refinements) {
  console.log(searchParams.location, searchParams.limit, searchParams.offset)
  let limit, offset
  if (searchParams.limit === '0' || searchParams.offset === '') {
    limit = 20
    offset = 0
  } else {
    limit = parseInt(searchParams.limit)
    offset = (parseInt(searchParams.offset) - 1) * limit
  }
  console.log(limit, offset)
  searchParams.location = searchParams.location.replaceAll('United States', 'United States of America')

  const rawProperties = await montereySearchClient.searchByDestination({
    destination: searchParams.location.toLowerCase(),
    offset: offset,
    limit: limit,
  })

  if (!rawProperties) {
    return noResults
  }

  let returnValue = {
    properties: rawProperties ?? [],
    totalCount: rawProperties.length ?? 0,
  }
  const { error, success, data: properties } = SearchResultsDto.safeParse(returnValue)
  console.log(error)
  if (!success) {
    return {
      properties: [],
      totalCount: 0,
    }
  }

  return properties
}

async function searchBySlugWithFilters(searchParams: Refinements) {
  console.log(searchParams.amenities)
  searchParams.location = searchParams.location.replaceAll('United States', 'United States of America')

  const properties = await montereySearchClient.searchAllByDestination({
    destination: searchParams.location,
  })
  /*
  const filter = { collections: { $eq: '/' + searchParams.location.toLowerCase() } }
  const properties = await prisma.listing.findRaw({
    filter: filter,
    options: {
      skip: 0,
      sort: { curatelyScore: -1 },
      projection: {
        hcomId: 1,
        amenitiesNormal: 1,
        curatelyScore: 1,
      },
    },
  })
  */
  console.log(properties)
  const { success, error, data: safeProperties } = hcomSchema.safeParse(properties)

  if (!success) {
    console.log(error)
    return noResults
  }
  console.log(searchParams.amenities.split(','))
  console.log(safeProperties)
  const filteredListings = safeProperties.filter(function (property) {
    const contains = containsAllElements(property.amenitiesNormal, searchParams.amenities.split(','))
    console.log(property.amenitiesNormal)
    console.log(searchParams.amenities.split(','))
    if (contains) {
      console.log(contains)
    }
    return contains
  })
  console.log(filteredListings)
  console.log(searchParams.limit, searchParams.offset)
  let limit = searchParams.limit && searchParams.limit !== '' ? parseInt(searchParams.limit) : 20
  let offset = searchParams.offset && searchParams.offset !== '' ? parseInt(searchParams.limit) : 0
  //let offset = parseInt(searchParams.offset) ?? 0
  console.log(limit, offset)
  // slice our filteredListings on limit and offset
  const slicedProperties = filteredListings.slice(offset * limit, offset * limit + limit)
  //const slicedProperties = filteredListings.slice(0, 20)
  console.log(slicedProperties)
  const hcomIds = slicedProperties.map(property => property.hcomId)

  const propertiesByHcomId = await montereySearchClient.searchByHcomId(hcomIds)
  /*
  const propertiesByHcomId = await prisma.listing.findRaw({
    filter: {
      hcomId: { $in: hcomIds },
    },
    options: {
      sort: { curatelyScore: -1 },
      projection: {
        propertyName: 1,
        curatelyScore: 1,
        slug: 1,
        hcomId: 1,
        images: { $slice: 6 },
        geoLocation: 1,
        listingDescription: 1,
        city: 1,
        country: 1,
        amenitiesNormal: 1,
      },
    },
  })
*/
  if (!propertiesByHcomId) {
    return noResults
  }

  let returnValue = {
    properties: propertiesByHcomId ?? [],
    totalCount: propertiesByHcomId.length ?? 0,
  }
  const { success: validSearchResults, data: safeReturnValue } = SearchResultsDto.safeParse(returnValue)

  if (validSearchResults) {
    return {
      properties: safeReturnValue.properties ?? [],
      totalCount: safeReturnValue.totalCount ?? 0,
    }
  }
  return noResults
}

async function getPropertiesByGeoLocation(searchParams: Refinements) {
  console.log('getting here')
  const propertiesRaw = await montereySearchClient.searchByCoordinates({
    coordinates: [parseFloat(searchParams.lng), parseFloat(searchParams.lat)],
    maxDistance: 10000,
    offset: '0',
    limit: '20',
  })
  console.log(propertiesRaw)
  if (!propertiesRaw) {
    return noResults
  }

  const rawReturnValue = {
    properties: propertiesRaw ?? [],
    totalCount: propertiesRaw.length ?? 0,
  }
  const { success, data: returnValue } = SearchResultsDto.safeParse(rawReturnValue)

  if (!success) {
    return noResults
  }
  return {
    properties: returnValue.properties ?? [],
    totalCount: returnValue.totalCount ?? 0,
  }
}

type GetAvailabilityAndPricingProps = {
  searchParams: Refinements
  searchResults: SearchResultsDto
}

async function maybeGetAvailabilityAndPricing({ searchParams, searchResults }: GetAvailabilityAndPricingProps) {
  const { checkin, checkout, rooms } = searchParams
  // If no checkin or checkout date, return the search results as is
  if (!checkin || !checkout) {
    return searchResults
  }
  const { properties } = searchResults

  const hcomIds = properties.map(property => property.hcomId)

  const hcomIdList = hcomIds.toString()

  const roomStringExpedia = tranformRoomToExpediaFormat(rooms)

  const url =
    env.EXPEDIA_LISTINGS_BASE_URL +
    `?checkIn=${checkin}&checkOut=${checkout}&hcomHotelIds=${hcomIdList}${roomStringExpedia}`

  const auth = 'Basic ' + env.EXPEDIA_AUTH_BASE_64
  const key = env.EXPEDIA_KEY

  if (!key || !auth || !url) {
    return noResults
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: auth,
      Accept: 'application/vnd.exp-hotel.v3+json',
      Key: key,
      'Partner-Transaction-Id': key,
    },
  })

  const PricingAndAvailabilityData = await response.json()

  const { success, data: expediaPricingData } = SearchResultsResponse.safeParse(PricingAndAvailabilityData)

  if (!success) {
    return noResults
  }
  const { Hotels: hotelsFromExpediaResponse, LengthOfStay: lengthOfStay } = expediaPricingData

  let propertiesWithPricing: SearchResultsDto['properties'] = []
  searchResults.properties.map(property => {
    const matchedProperty = hotelsFromExpediaResponse.find(hotel => {
      return hotel.hcomId === property.hcomId
    })
    if (matchedProperty) {
      propertiesWithPricing.push({
        ...property,
        pricingAndAvailability: {
          hcomId: matchedProperty.hcomId,
          available: matchedProperty.available,
          totalPrice: matchedProperty.totalPrice,
          averageNightlyPrice: matchedProperty.averageNightlyPrice,
        },
        lengthOfStay: expediaPricingData.LengthOfStay ? expediaPricingData.LengthOfStay : 0,
      })
    } else {
      propertiesWithPricing.push({
        ...property,
        pricingAndAvailability: {
          hcomId: '',
          available: false,
          averageNightlyPrice: '',
          totalPrice: '',
        },
        lengthOfStay: lengthOfStay ? lengthOfStay : 0,
      })
    }
  })

  const returnValue = {
    properties: propertiesWithPricing,
    totalCount: searchResults.totalCount,
  }

  return returnValue
}
