import { unstable_cache } from 'next/cache'

import { createServerErrorResponse, createServerSuccessResponse } from '@/shared/data-access/server-response'
import { type Prettify } from '@/shared/domain/utility-types'
import { genericInternalErrorMessage } from '@/shared/ui/error/generic-error-message'

import { type ImageGalleryDto } from '../../image-gallery/domain/image-gallery-domain'
//import { getPropertyImageGalleryData } from "@/shared/data-access/property-data-access"
import { getPropertyImageGalleryData } from '../../shared/data-access/cached-property-objects'

import 'server-only'

export async function getImageGalleryData(slug: string) {
  try {
    const propertyImageData = await getPropertyImageGalleryData(slug)
    if (!propertyImageData) {
      return createServerErrorResponse<ImageGalleryDto>('No property images found')
    }
    const { images, propertyName } = propertyImageData

    const imageGalleryDto: Prettify<ImageGalleryDto> = {
      images,
      propertyName,
    }

    return createServerSuccessResponse(imageGalleryDto)
  } catch (error) {
    return createServerErrorResponse<ImageGalleryDto>(genericInternalErrorMessage)
  }
}
/*
export const getImageGalleryData = unstable_cache(
  async (slug: string) => {
    try {
      const propertyImageData = await getPropertyImageGalleryData(slug)
      if (!propertyImageData) {
        return createServerErrorResponse<ImageGalleryDto>('No property images found')
      }
      const { images, propertyName } = propertyImageData

      const imageGalleryDto: Prettify<ImageGalleryDto> = {
        images,
        propertyName,
      }

      return createServerSuccessResponse(imageGalleryDto)
    } catch (error) {
      return createServerErrorResponse<ImageGalleryDto>(genericInternalErrorMessage)
    }
  },
  ['image-gallery-data'],
  {
    tags: ['property-images'],
    revalidate: 3600,
  },
)
*/
