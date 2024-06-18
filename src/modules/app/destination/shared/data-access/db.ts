import type { Prettify } from '@/shared/domain/utility-types'
import type { Prisma } from '@prisma/client'

import { cache } from 'react'

import { unstable_cache } from 'next/cache'

import prisma from '@/shared/data-access/prisma'
import { prismaSelectToMongoProjection } from '@/shared/data-access/prisma-select-to-mongo-projection'

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

export const db = {
  preloadDestinationData: (slug: string) => {
    void db.getDestination(slug)
    void db.getDestinationProperties(slug)
  },

  getDestination: cache(async (slug: string) => {
    console.log('cached getDestination db function being called')
    return await prisma.collection.findFirst({
      where: {
        slug: slug,
      },
      select: findDestinationFields,
    })
  }),

  getDestinationProperties: cache(async (slug: string) => {
    const destinationProperties = await prisma.listing.findRaw({
      filter: { collections: { $in: [slug.toLowerCase()] } },
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
    })
    return destinationProperties as unknown as Promise<Prettify<Array<findDestinationPropertiesFields>>>

    /*
    return prisma.listing.findRaw({
      filter: { collections: { $in: [slug.toLowerCase()] } },
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
     */
  }),
}
