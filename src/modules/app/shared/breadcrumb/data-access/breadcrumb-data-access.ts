import 'server-only'
import { getCuration } from '@/app/curation/shared/data-access/cached-curation-objects'
import { getDestination } from '@/app/destination/shared/data-access/cached-destination-objects'
import { getProperty } from '@/app/property/shared/data-access/cached-property-objects'
import { formatBreadcrumb, type BreadcrumbDto } from '@/app/shared/breadcrumb/domain/breadcrumb-domain'
import { unstable_cache } from 'next/cache'
import { createServerErrorResponse, createServerSuccessResponse } from '@/shared/data-access/server-response'

type BreadcrumbProps = {
  slug: string
  type: 'destination' | 'property' | 'curation'
  hideLast?: boolean
}

export async function getBreadcrumb({ slug, type, hideLast = false }: BreadcrumbProps) {
  try {
    switch (type) {
      case 'destination':
        const { breadcrumb: destinationBreadcrumb } = await getDestinationBreadcrumb(slug)
        if (!destinationBreadcrumb) {
          return createServerErrorResponse<BreadcrumbDto>('Breadcrumb not found')
        }
        return createServerSuccessResponse<BreadcrumbDto>({
          breadcrumb: formatBreadcrumb(destinationBreadcrumb, hideLast),
        })

      case 'property':
        const { breadcrumb: propertyBreadcrumb } = await getPropertyBreadcrumb(slug)
        if (!propertyBreadcrumb) {
          return createServerErrorResponse<BreadcrumbDto>('Breadcrumb not found')
        }
        return createServerSuccessResponse<BreadcrumbDto>({
          breadcrumb: formatBreadcrumb(propertyBreadcrumb, hideLast),
        })

      case 'curation':
        const { breadcrumb: curationBreadcrumb } = await getCurationBreadcrumb(slug)
        if (!curationBreadcrumb) {
          return createServerErrorResponse<BreadcrumbDto>('Breadcrumb not found')
        }
        return createServerSuccessResponse<BreadcrumbDto>({
          breadcrumb: formatBreadcrumb(curationBreadcrumb, hideLast),
        })

      default:
        return createServerErrorResponse<BreadcrumbDto>(
          'please pass a valid breadcrumb type of destination, property or curation',
        )
    }
  } catch (error) {
    return createServerErrorResponse<BreadcrumbDto>('Error retreiving breadcrumb')
  }
}

const getPropertyBreadcrumb = unstable_cache(
  async (slug: string) => {
    const property = await getProperty(slug)
    if (!property) return { breadcrumb: null }
    return { breadcrumb: property.breadcrumb.sort((a, b) => a.url.length - b.url.length) }
  },
  ['property-breadcrumb'],
  {
    tags: ['property-breadcrumb', 'property'],
    revalidate: 900,
  },
)

const getDestinationBreadcrumb = unstable_cache(
  async (slug: string) => {
    const destination = await getDestination(slug)
    if (!destination) return { breadcrumb: null }
    return { breadcrumb: destination.breadcrumb.sort((a, b) => a.url.length - b.url.length) }
  },
  ['collection-breacrumb'],
  {
    tags: ['destination-breadcrumb', 'destination'],
    revalidate: 900,
  },
)

const getCurationBreadcrumb = unstable_cache(
  async (slug: string) => {
    const curation = await getCuration(slug)
    if (!curation)
      return {
        breadcrumb: null,
      }
    return {
      breadcrumb: curation.breadcrumb.sort((a, b) => a.url.length - b.url.length),
    }
  },
  ['curation-breadcrumb'],
  {
    tags: ['curation-breadcrumb', 'curation'],
    revalidate: 900,
  },
)
