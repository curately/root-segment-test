import { cache } from 'react'

import 'server-only'

import prisma from '@/shared/data-access/prisma'

export const preloadCuration = (slug: string) => {
  void getCuration(slug)
}

export const getCuration = cache(async (slug: string) => {
  return await prisma.bestOf.findFirst({
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
})
