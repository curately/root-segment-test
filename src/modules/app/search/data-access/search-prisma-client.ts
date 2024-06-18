import { Prisma, PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { withOptimize } from '@prisma/extension-optimize'
import { env } from 'env'

// Learn more about instantiating PrismaClient in Next.js here: https://www.prisma.io/docs/data-platform/accelerate/getting-started
const cacheStrategy = {
  ttl: 36000,
}
type geoSearchProps = {
  coordinates: Array<number>
  maxDistance: number
  limit: string
  offset: string
}
const projection = {
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
}

export const propertyFields = {
  propertyName: true,

  curatelyScore: true,
  slug: true,
  hcomId: true,
  similarHotels: true,
  amenities: true,
  geoLocation: true,
  listingDescription: true,
  images: true,
  city: true,
  country: true,
  starRating: true,
} satisfies Prisma.ListingSelect

const prismaClientSingleton = () => {
  return (
    new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    })
      .$extends({
        name: '🦀 Prisma Monterey - Search',
        model: {
          listing: {
            async searchByDestination({
              destination,
              offset,
              limit,
            }: {
              destination: string
              offset: number
              limit: number
            }) {
              return prismaSearch.listing.findRaw({
                filter: { collections: { $eq: '/' + destination.toLowerCase() } },
                options: {
                  skip: offset,
                  limit: limit,
                  sort: { curatelyScore: -1 },
                  projection: projection,
                },
              })
            },

            async searchAllByDestination({ destination }: { destination: string }) {
              return prismaSearch.listing.findRaw({
                filter: { collections: { $eq: '/' + destination.toLowerCase() } },
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
            },

            async searchByHcomId(hcomIds: Array<string>) {
              return prismaSearch.listing.findRaw({
                filter: {
                  hcomId: { $in: hcomIds },
                },
                options: {
                  sort: { curatelyScore: -1 },
                  projection: projection,
                },
              })
            },

            async getAllPropertiesByDestination(destination: string) {
              return prismaSearch.listing.findRaw({
                filter: { collections: { $eq: '/' + destination.toLowerCase() } },
                options: {
                  sort: { curatelyScore: -1 },
                  projection: {
                    hcomId: 1,
                    amenitiesNormal: 1,
                    curatelyScore: 1,
                  },
                },
              })
            },

            async searchByCoordinates({ coordinates, maxDistance = 1000, limit = '0', offset = '0' }: geoSearchProps) {
              const geoFilter = {
                geoLocation: {
                  $nearSphere: {
                    $geometry: {
                      type: 'Point',
                      coordinates: coordinates,
                    },
                    $maxDistance: maxDistance,
                  },
                },
              }
              console.log(geoFilter)
              return await prismaSearch.listing.findRaw({
                filter: geoFilter,
                options: {
                  skip: parseInt(offset) * parseInt(limit),
                  limit: parseInt(limit),
                  projection: projection,
                },
              })
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
  prismaSearch: PrismaClientSingleton | undefined
}

const prismaSearch = globalForPrisma.prismaSearch ?? prismaClientSingleton()

export default prismaSearch

if (env.NODE_ENV !== 'production') globalForPrisma.prismaSearch = prismaSearch
