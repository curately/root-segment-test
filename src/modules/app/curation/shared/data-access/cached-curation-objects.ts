import { unstable_cache } from 'next/cache'

import prisma from '@/shared/data-access/prisma'

export const getCuration = unstable_cache(
  async (slug: string) => {
    return findCuration(slug)
  },
  ['curation-data'],
  {
    tags: ['curation'],
  },
)

export const getAllRoutes = unstable_cache(
  async () => {
    return findAllCurationRoutes()
  },
  ['curation-routes'],
  {
    tags: ['curation'],
  },
)

async function findCuration(slug: string) {
  return prisma.bestOf.findFirst({
    where: { slug: slug },
    select: {
      breadcrumb: true,
      propertyCards: {
        select: {
          propertyName: true,
          slug: true,
          images: true,
          curatelyScore: true,
          city: true,
          country: true,
          starRating: true,
        },
      },
      introText: true,
      bannerImage: true,
      bestOfLinks: true,
      metaData: true,
      heading: true,
    },
  })
}

function findAllCurationRoutes() {
  return prisma.bestOf.findMany({
    select: {
      slug: true,
    },
  })
}
