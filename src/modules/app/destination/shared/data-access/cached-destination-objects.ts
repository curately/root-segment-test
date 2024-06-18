import type { Prisma } from '@prisma/client'
import { unstable_cache } from 'next/cache'
import prisma from '@/shared/data-access/prisma'
import { prismaSelectToMongoProjection } from '@/shared/data-access/prisma-select-to-mongo-projection'
import type { Prettify } from '@/shared/domain/utility-types'

export const findDestinationFields = {
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

export const findDestinationPropertiesFields = {
  propertyName: true,
  curatelyScore: true,
  slug: true,
  hcomId: true,
  images: true,
  geoLocation: true,
  listingDescription: true,
  city: true,
  country: true,
} satisfies Prisma.ListingSelect

type findDestinationPropertiesFields = Prisma.ListingGetPayload<{ select: typeof findDestinationPropertiesFields }>

export const getDestination = unstable_cache(
  async (slug: string) => {
    return findDestination(slug)
  },
  ['destination-data'],
  {
    tags: ['destination'],
  },
)

export const getDestinationProperties = unstable_cache(
  async (slug: string) => {
    return findDestinationProperties(slug)
  },
  ['destination-data'],
  {
    tags: ['destination'],
  },
)

function findDestination(slug: string) {
  return prisma.collection.findFirst({
    where: {
      slug: slug,
    },
    select: findDestinationFields,
  })
}

function findDestinationProperties(destinationSlug: string) {
  return prisma.listing.findRaw({
    filter: { collections: { $in: [destinationSlug.toLowerCase()] } },
    options: {
      sort: { curatelyScore: -1 },
      limit: 20,
      skip: 0,
      projection: prismaSelectToMongoProjection({
        prismaSelection: findDestinationPropertiesFields,
        sliceImages: true,
        numImages: 5,
      }),
    },
  }) as unknown as Promise<Prettify<Array<findDestinationPropertiesFields>>>
}
