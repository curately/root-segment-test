import 'server-only'

import type {
  AirportsDto,
  AmenitiesDto,
  AreaDescriptionDto,
  CoordinatesDto,
  NumberOfReviewsDto,
  PropertyDescriptionDto,
  PropertyNameDto,
  StarRatingDto,
} from '../../property-description/domain/property-description-domain'

import { createServerErrorResponse, createServerSuccessResponse } from '@/shared/data-access/server-response'
import { genericInternalErrorMessage } from '@/shared/ui/error/generic-error-message'

import { Amenities } from '../../property-description/domain/property-description-domain'
import { getProperty } from '../../shared/data-access/cached-property-objects'

/*
export const getAmenities = unstable_cache(
  async (slug: string) => {
    try {
      const property = await getProperty(slug)

      if (!property) {
        return {}
      }
      // transform amenities to the desired shape
      const { success, error: zodError, data: amenities } = Amenities.safeParse(property.amenities)

      if (!success) {
        return createServerErrorResponse<AmenitiesDto>(zodError)
      }

      const AmenitiesDto: AmenitiesDto = amenities

      return createServerSuccessResponse(AmenitiesDto)
    } catch (error) {
      return createServerErrorResponse<AmenitiesDto>(genericInternalErrorMessage)
    }
  },
  ['amenities'],
  {
    tags: ['amenities', 'listing'],
    revalidate: 86400,
  },
)
*/
export async function getAmenities(slug: string) {
  //const property = getProperty(slug)
  //console.log(property)
  try {
    const property = await getProperty(slug)

    if (!property) {
      return {}
    }
    // transform amenities to the desired shape
    const { success, error: zodError, data: amenities } = Amenities.safeParse(property.amenities)

    if (!success) {
      return createServerErrorResponse<AmenitiesDto>(zodError)
    }

    const AmenitiesDto: AmenitiesDto = amenities

    return createServerSuccessResponse(AmenitiesDto)
  } catch (error) {
    return createServerErrorResponse<AmenitiesDto>(genericInternalErrorMessage)
  }
}
/*
export const getNumberOfReviews = unstable_cache(
  async (slug: string) => {
    try {
      const property = await getProperty(slug)

      if (!property) {
        return createServerErrorResponse<NumberOfReviewsDto>('No property found with the given slug')
      }

      return createServerSuccessResponse(property.latestReviews.totalNoReviews)
    } catch (error) {
      return createServerErrorResponse<NumberOfReviewsDto>(genericInternalErrorMessage)
    }
  },
  ['number-of-reviews'],
  {
    tags: ['number-of-reviews', 'listing'],
    revalidate: 86400,
  },
)
*/
export async function getNumberOfReviews(slug: string) {
  try {
    const property = await getProperty(slug)

    if (!property) {
      return createServerErrorResponse<NumberOfReviewsDto>('No property found with the given slug: ' + slug)
    }

    return createServerSuccessResponse(property.latestReviews.totalNoReviews)
  } catch (error) {
    return createServerErrorResponse<NumberOfReviewsDto>(genericInternalErrorMessage)
  }
}
/*
export const getAreaDescription = unstable_cache(
  async (slug: string) => {
    try {
      const property = await getProperty(slug)

      if (!property) {
        return createServerErrorResponse<AreaDescriptionDto>('No property found with the given slug')
      }

      return createServerSuccessResponse(property.areaDescription)
    } catch (error) {
      return createServerErrorResponse<AreaDescriptionDto>(genericInternalErrorMessage)
    }
  },
  ['area-description'],
  {
    tags: ['area-description', 'listing'],
    revalidate: 86400,
  },
)
*/
export async function getAreaDescription(slug: string) {
  try {
    const property = await getProperty(slug)

    if (!property) {
      return createServerErrorResponse<AreaDescriptionDto>('No property found with the given slug: ' + slug)
    }

    return createServerSuccessResponse(property.areaDescription)
  } catch (error) {
    return createServerErrorResponse<AreaDescriptionDto>(genericInternalErrorMessage)
  }
}

/*
export const getPropertyDescription = unstable_cache(
  async (slug: string) => {
    try {
      const property = await getProperty(slug)

      if (!property) {
        return createServerErrorResponse<PropertyDescriptionDto>('Property description not found.')
      }

      const { listingDescription: propertyDescription } = property

      return createServerSuccessResponse(propertyDescription)
    } catch (error) {
      return createServerErrorResponse<PropertyDescriptionDto>(genericInternalErrorMessage)
    }
  },
  ['property-description'],
  {
    tags: ['property-description', 'listing'],
    revalidate: 86400,
  },
)
*/
export async function getPropertyDescription(slug: string) {
  try {
    const property = await getProperty(slug)

    if (!property) {
      return createServerErrorResponse<PropertyDescriptionDto>('Property description not found.')
    }

    const { listingDescription: propertyDescription } = property

    return createServerSuccessResponse(propertyDescription)
  } catch (error) {
    return createServerErrorResponse<PropertyDescriptionDto>(genericInternalErrorMessage)
  }
}

/*
export const getPropertyName = unstable_cache(
  async (slug: string) => {
    try {
      const property = await getProperty(slug)

      if (!property) {
        return createServerErrorResponse<PropertyNameDto>('Property Name Not Found.')
      }

      return createServerSuccessResponse(property.propertyName)
    } catch (error) {
      return createServerErrorResponse<PropertyNameDto>(genericInternalErrorMessage)
    }
  },
  ['property-name'],
  {
    tags: ['property-name', 'listing'],
    revalidate: 86400,
  },
)
*/
export async function getPropertyName(slug: string) {
  try {
    const property = await getProperty(slug)

    if (!property) {
      return createServerErrorResponse<PropertyNameDto>('Property Name Not Found.')
    }

    return createServerSuccessResponse(property.propertyName)
  } catch (error) {
    return createServerErrorResponse<PropertyNameDto>(genericInternalErrorMessage)
  }
}

/*
export const getNearbyAirports = unstable_cache(
  async (slug: string) => {
    try {
      const property = await getProperty(slug)

      if (!property) {
        return createServerErrorResponse<AirportsDto>('airports not found for the given property.')
      }

      const {
        programmaticContent: { airports },
      } = property

      const nearbyAirportsDto: AirportsDto = airports

      return createServerSuccessResponse(nearbyAirportsDto)
    } catch (error) {
      return createServerErrorResponse<AirportsDto>(genericInternalErrorMessage)
    }
  },
  ['nearby-airports'],
  {
    tags: ['nearby-airports', 'listing'],
    revalidate: 86400,
  },
)
*/

export async function getNearbyAirports(slug: string) {
  try {
    const property = await getProperty(slug)

    if (!property) {
      return createServerErrorResponse<AirportsDto>('airports not found for the given property.')
    }

    const {
      programmaticContent: { airports },
    } = property

    const nearbyAirportsDto: AirportsDto = airports

    return createServerSuccessResponse(nearbyAirportsDto)
  } catch (error) {
    return createServerErrorResponse<AirportsDto>(genericInternalErrorMessage)
  }
}

/*
export const getPropertyCoordinates = unstable_cache(
  async (slug: string) => {
    try {
      const property = await getProperty(slug)

      if (!property) {
        return createServerErrorResponse<CoordinatesDto>('Coordinates not found')
      }

      const {
        geoLocation: { coordinates: propertyCoordinates },
      } = property

      //const CoordinatedDto = { propertyCoordinates }
      return createServerSuccessResponse(propertyCoordinates)
    } catch (error) {
      return createServerErrorResponse<CoordinatesDto>(genericInternalErrorMessage)
    }
  },
  ['property-coordinates'],
  {
    tags: ['property-coordinates', 'listing'],
    revalidate: 86400,
  },
)
*/

export async function getPropertyCoordinates(slug: string) {
  try {
    const property = await getProperty(slug)

    if (!property) {
      return createServerErrorResponse<CoordinatesDto>('Coordinates not found')
    }

    const {
      geoLocation: { coordinates: propertyCoordinates },
    } = property

    //const CoordinatedDto = { propertyCoordinates }
    return createServerSuccessResponse(propertyCoordinates)
  } catch (error) {
    return createServerErrorResponse<CoordinatesDto>(genericInternalErrorMessage)
  }
}

/*
export const getPropertyStarRating = unstable_cache(
  async (slug: string) => {
    try {
      const property = await getProperty(slug)
      if (!property) {
        return createServerErrorResponse<StarRatingDto>('Star rating not found for the given property.')
      }
      return createServerSuccessResponse(property.starRating)
    } catch (error) {
      return createServerErrorResponse<StarRatingDto>(genericInternalErrorMessage)
    }
  },
  ['property-star-rating'],
  {
    tags: ['property-star-rating', 'listing'],
    revalidate: 86400,
  },
)
*/
export async function getPropertyStarRating(slug: string) {
  try {
    const property = await getProperty(slug)
    if (!property) {
      return createServerErrorResponse<StarRatingDto>('Star rating not found for the given property.')
    }
    return createServerSuccessResponse(property.starRating)
  } catch (error) {
    return createServerErrorResponse<StarRatingDto>(genericInternalErrorMessage)
  }
}
