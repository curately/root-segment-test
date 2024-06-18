//import { PropertyParamsDto } from '@/property/route-params/domain/route-params-domain'
//import { getProperty } from '@/shared/data-access/property-data-access'
import { unstable_cache } from 'next/cache'
import { createServerErrorResponse, createServerSuccessResponse } from '@/shared/data-access/server-response'
import { getProperty } from '../../shared/data-access/cached-property-objects'

type PropertyParamsDto = {
  propertySlug: string
  propertyId: string
}

export const getPropertyRouteParams = unstable_cache(
  async (prismaSlug: string) => {
    try {
      const property = await getProperty(prismaSlug)

      if (!property || !property.slug) {
        return createServerErrorResponse<PropertyParamsDto>('Property not found')
      }

      const { slug: propertySlug, hcomId: propertyId } = property

      return createServerSuccessResponse({ propertySlug, propertyId })
    } catch (error) {
      return createServerErrorResponse<PropertyParamsDto>(error)
    }
  },
  ['property-page-params'],
  {
    //revalidate: 864000,
  },
)
