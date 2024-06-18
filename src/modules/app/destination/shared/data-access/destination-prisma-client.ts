import { Prisma, PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { withOptimize } from '@prisma/extension-optimize'
import { env } from 'env'
import { type Prettify } from '@/shared/domain/utility-types'

// Learn more about instantiating PrismaClient in Next.js here: https://www.prisma.io/docs/data-platform/accelerate/getting-started
const cacheStrategy = {
  ttl: 36000,
}
export const destinationFields = {
  slug: true,
  name: true,
  breadcrumb: true,
  programmaticContent: {
    select: {
      weather: true,
      airports: {
        select: {
          name: true,
        },
      },
    },
  },
  content: true,
  similarCollections: true,
  isFilterCollection: true,
  metaData: true,
  propertyCount: true,
} satisfies Prisma.CollectionSelect

function capitalise(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const destinationFindBySlugSelection = {
  slug: true,
  name: true,
  breadcrumb: true,
  programmaticContent: {
    select: {
      weather: true,
      airports: {
        select: {
          name: true,
        },
      },
    },
  },
  content: true,
  similarCollections: true,
  isFilterCollection: true,
  metaData: true,
  propertyCount: true,
} satisfies Prisma.CollectionSelect

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
        name: '🦀 Prisma Monterey - Destinations', // Optional: name appears in error logs
        model: {
          collection: {
            async findPageParams(slug: string) {
              return prismaDestination.collection.findFirst({
                where: {
                  slug: slug,
                },
                select: {
                  slug: true,
                  content: {
                    select: {
                      introduction: true,
                    },
                  },
                },
              })
            },

            async findBySlug(slug: string) {
              return prismaDestination.collection.findFirst({
                where: {
                  slug: slug,
                },
                select: destinationFindBySlugSelection,
                cacheStrategy: cacheStrategy,
              })
            },

            async findSlugByExtendedName(extendedName: string) {
              return prismaDestination.collection.findFirst({
                where: {
                  extendedName: extendedName,
                },
                select: {
                  slug: true,
                },
                cacheStrategy: cacheStrategy,
              })
            },

            async findSlugByLocation({
              location,
              locationSlug,
              mapBoxSlug,
            }: {
              location: string
              locationSlug: string
              mapBoxSlug: string
            }) {
              return prismaDestination.collection.findFirst({
                where: {
                  OR: [
                    {
                      extendedName: location,
                    },
                    {
                      name: capitalise(location),
                    },
                    {
                      slug: locationSlug,
                    },
                    {
                      slug: mapBoxSlug,
                    },
                  ],
                },
                select: {
                  slug: true,
                },
              })
            },
          },
        },
      })
      .$extends({
        name: '🦀 Prisma Monterey - Properties', // Optional: name appears in error logs
        model: {
          listing: {
            /* IS THIS QUERY CAUSING ISSUES ? */

            async findByDestinationSlug(destinationSlug: string) {
              return prismaDestination.listing.findRaw({
                //filter: { collections: [destinationSlug] },
                filter: { collections: { $in: [destinationSlug.toLowerCase()] } },
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
          },
        },
      })
      //.$extends(withOptimize())
      .$extends(withAccelerate())
  )
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prismaDestination: PrismaClientSingleton | undefined
}

const prismaDestination = globalForPrisma.prismaDestination ?? prismaClientSingleton()

export default prismaDestination

if (env.NODE_ENV !== 'production') globalForPrisma.prismaDestination = prismaDestination
