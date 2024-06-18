import { Prisma, PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { withOptimize } from '@prisma/extension-optimize'
import { env } from 'env'

// Learn more about instantiating PrismaClient in Next.js here: https://www.prisma.io/docs/data-platform/accelerate/getting-started
const cacheStrategy = {
  ttl: 36000,
}
export const curationFields = {
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
} satisfies Prisma.BestOfSelect

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })
    .$extends({
      name: '🦀 Prisma Monterey - Curations',
      model: {
        bestOf: {
          async findBySlug(slug: string) {
            return prismaCuration.bestOf.findFirst({
              where: { slug: slug },
              select: curationFields,
              cacheStrategy: cacheStrategy,
            })
          },

          async getAllRoutes() {
            return prismaCuration.bestOf.findMany({
              select: {
                slug: true,
              },
            })
          },
        },
      },
    })
    .$extends(withAccelerate())
  //.$extends(withOptimize())
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prismaCuration: PrismaClientSingleton | undefined
}

const prismaCuration = globalForPrisma.prismaCuration ?? prismaClientSingleton()

export default prismaCuration

if (env.NODE_ENV !== 'production') globalForPrisma.prismaCuration = prismaCuration
