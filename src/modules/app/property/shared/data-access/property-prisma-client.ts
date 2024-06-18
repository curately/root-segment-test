import { Prisma, PrismaClient, type Listing as PrismaListing } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { withOptimize } from '@prisma/extension-optimize'
import { env } from 'env'
import { type Prettify } from '@/shared/domain/utility-types'

const cacheStrategy = {
  ttl: 36000,
}
export const propertyFields = {
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
      reviews: {
        select: {
          reviewerName: true,
          reviewerScore: true,
          reviewBrand: true,
          checkinDate: true,
          checkoutDate: true,
          reviewText: true,
        },
      },
    },
  },
  city: true,
  country: true,
  starRating: true,
} satisfies Prisma.ListingSelect

export const imageGalleryFields = {
  propertyName: true,
  images: {
    select: {
      link: true,
    },
  },
} satisfies Prisma.ListingSelect

export const DestinationPropertyFields = {
  propertyName: true,
  curatelyScore: true,
  slug: true,
  hcomId: true,
  images: {
    select: {
      link: true,
    },
  },
  geoLocation: true,
  listingDescription: true,
  city: true,
  country: true,
} satisfies Prisma.ListingSelect

type DestinationPropertiesPayload = Prettify<Prisma.ListingGetPayload<{ select: typeof DestinationPropertyFields }>>

const prismaClientSingleton = () => {
  return (
    new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    })
      .$extends({
        name: '🦀 Prisma Monterey - Properties',
        model: {
          listing: {
            async findPageParams(slug: string) {
              return prismaProperty.listing.findFirst({
                where: {
                  slug: slug,
                },
                select: {
                  slug: true,
                  hcomId: true,
                },
                cacheStrategy: cacheStrategy,
              })
            },

            async findBySlug(slug: string) {
              return prismaProperty.listing.findFirst({
                where: {
                  slug: slug,
                },
                select: propertyFields,
                cacheStrategy: cacheStrategy,
              })
            },

            async findSimilarProperties(propertySlugs: Array<string>) {
              return prismaProperty.listing.findRaw({
                filter: { slug: { $in: propertySlugs } },
                options: {
                  sort: { curatelyScore: -1 },
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
                },
              }) as unknown as Prettify<
                Array<{
                  kind: 'similarProperty'
                  slug: PrismaListing['slug']
                  heroImage: PrismaListing['heroImage']
                  propertyName: PrismaListing['propertyName']
                  city: PrismaListing['city']
                  country: PrismaListing['country']
                  starRating: PrismaListing['starRating']
                  curatelyScore: PrismaListing['curatelyScore']
                  hcomId: PrismaListing['hcomId']
                }>
              >
            },
            async findImageGalleryData(slug: string) {
              return prismaProperty.listing.findFirst({
                where: {
                  slug: slug,
                },
                select: imageGalleryFields,
                cacheStrategy: cacheStrategy,
              })
            },
            /*
          async findByDestinationSlug(destinationSlug: string) {
            return prismaProperty.listing.findRaw({
              filter: { collections: destinationSlug },
              options: {
                sort: { curatelyScore: -1 },
                limit: 20,
                skip: 0,
                projection: {
                  propertyName: 1,
                  curatelyScore: 1,
                  slug: 1,
                  hcomId: 1,
                  images: {
                    $slice: ['$images', 5],
                  },
                  geoLocation: 1,
                  listingDescription: 1,
                  city: 1,
                  country: 1,
                },
              },
            }) as unknown as Prettify<Array<DestinationPropertiesPayload>>
          },
          */
          },
        },
      })
      //.$extends(withOptimize())
      .$extends(withAccelerate())
  )
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prismaProperty: PrismaClientSingleton | undefined
}

const prismaProperty = globalForPrisma.prismaProperty ?? prismaClientSingleton()

export default prismaProperty

if (env.NODE_ENV !== 'production') globalForPrisma.prismaProperty = prismaProperty
