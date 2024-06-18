import type { Prisma } from '@prisma/client'
import { unstable_cache } from 'next/cache'
import prisma from '@/shared/data-access/prisma'
import { prismaSelectToMongoProjection } from '@/shared/data-access/prisma-select-to-mongo-projection'

export const findSimilarPropertiesDataFields = {
  slug: true,
  heroImage: true,
  propertyName: true,
  city: true,
  country: true,
  starRating: true,
  curatelyScore: true,
  hcomId: true,
}

type FindSimilarPropertiesDataFieldsReturnType = Promise<
  Array<Prisma.ListingGetPayload<{ select: typeof findSimilarPropertiesDataFields }>>
>

function findProperty(slug: string) {
  return prisma.listing.findFirst({
    where: {
      slug: slug,
    },
    select: {
      propertyName: true,
      heroImage: true,
      breadcrumb: true,
      curatelyScore: true,
      slug: true,
      hcomId: true,
      similarHotels: true,
      amenities: true,
      geoLocation: true,
      listingDescription: true,
      areaDescription: true,
      checkIn: true,
      checkOut: true,
      childrenExtraBedPolicy: true,
      familyReviews: true,
      guestAvgRating: true,
      guestReviewCount: true,
      programmaticContent: {
        select: {
          airports: {
            select: {
              name: true,
              distance: true,
            },
          },
        },
      },
      latestReviews: {
        select: {
          totalNoReviews: true,
          avgRating: true,
          distribution: true,
          filters: true,
          reviews: true,
        },
      },
      city: true,
      country: true,
      starRating: true,
    },
  })
}

export const getProperty = unstable_cache(async (slug: string) => findProperty(slug), ['single-property'], {
  tags: ['property'],
})

function findSimilarPropertiesData(propertySlugs: Array<string>) {
  return prisma.listing.findRaw({
    filter: { slug: { $in: propertySlugs } },
    options: {
      sort: { curatelyScore: -1 },
      /*
      projection: {
        slug: 1,
        heroImage: 1,
        propertyName: 1,
        city: 1,
        country: 1,
        starRating: 1,
        curatelyScore: 1,
        hcomId: 1,
      },
      */
      projection: prismaSelectToMongoProjection({
        prismaSelection: findSimilarPropertiesDataFields,
      }),
    },
  }) as unknown as FindSimilarPropertiesDataFieldsReturnType
}

export const getSimilarPropertiesData = unstable_cache(
  async (propertySlugs: Array<string>) => findSimilarPropertiesData(propertySlugs),
  ['similar-property-data'],
  {
    tags: ['property'],
  },
)

function findPropertyImageGalleryData(slug: string) {
  return prisma.listing.findFirst({
    where: {
      slug: slug,
    },
    select: {
      propertyName: true,
      images: {
        select: {
          link: true,
        },
      },
    },
  })
}

export const getPropertyImageGalleryData = unstable_cache(
  async (slug: string) => findPropertyImageGalleryData(slug),
  ['property-image-data'],
  {
    tags: ['images', 'property'],
  },
)
