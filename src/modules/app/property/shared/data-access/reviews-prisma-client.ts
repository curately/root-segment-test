import { Prisma, PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { withOptimize } from '@prisma/extension-optimize'
import { env } from 'env'

export const reviewFields = {
  reviewerName: true,
  reviewerScore: true,
  reviewBrand: true,
  checkinDate: true,
  checkoutDate: true,
  reviewText: true,
  filterHighlighter: true,
} satisfies Prisma.ReviewSelect

type FindReviewsProps = {
  hcomId: string
  starRating: number
  currentPage: number
  filters: Array<string>
  currentFilterText: string
}

type RawReview = {
  hcomId: string
  reviewerName: string
  reviewerScore: number
  reviewBrand: string
  checkinDate: string
  checkoutDate: string
  reviewText: string
  filterHighlighter: {
    filter: string
    occurences: {
      keyword: string
      sentence: string
      startHighlight: number
      endHighlight: number
    }[]
  }[]
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })
    .$extends({
      name: '🦀 Prisma Monterey - Reviews',
      model: {
        review: {
          async filterReviews({ hcomId, starRating, currentPage, filters, currentFilterText }: FindReviewsProps) {
            if (filters.length === 0) {
              const whereClause = starRating === 0 ? { hcomId: hcomId } : { hcomId: hcomId, reviewerScore: starRating }
              const [totalNoReviews, reviews] = await Promise.all([
                prismaReviews.review.count({
                  where: whereClause,
                }),
                prismaReviews.review.findMany({
                  where: whereClause,
                  select: reviewFields,
                  skip: (currentPage - 1) * 10,
                  take: 10,
                  orderBy: {
                    creationDate: 'desc',
                  },
                }),
              ])
              return {
                totalNoReviews,
                reviews,
              }
            }

            const [count, data] = await Promise.all([
              prismaReviews.review.findRaw({
                filter: {
                  reviewId: { $in: filters },
                },
              }),

              prismaReviews.review.findRaw({
                filter: {
                  reviewId: { $in: filters },
                },

                options: {
                  projection: {
                    hcomId: true,
                    reviewerName: true,
                    reviewerScore: true,
                    reviewBrand: true,
                    checkinDate: true,
                    checkoutDate: true,
                    reviewText: true,
                    filterHighlighter: true,
                  },
                  skip: (currentPage - 1) * 10,
                  limit: 10,
                  sort: { creationDate: -1 },
                },
              }) as unknown as RawReview[],
            ])

            data.map(review => {
              review.filterHighlighter.map(filter => {
                if (filter.filter === currentFilterText) {
                  if (filter?.occurences[0]?.sentence) {
                    review.reviewText = review.reviewText.replaceAll(
                      filter.occurences[0].sentence,
                      `<span class="bg-primary-200 px-1">${filter.occurences[0].sentence}</span>`,
                    )
                  }
                }
              })
            })

            return {
              totalNoReviews: count.length as number,
              reviews: data,
            }
          },
        },
      },
    })

    .$extends(withAccelerate())
  //.$extends(withOptimize())
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prismaReviews: PrismaClientSingleton | undefined
}

const prismaReviews = globalForPrisma.prismaReviews ?? prismaClientSingleton()

export default prismaReviews

if (env.NODE_ENV !== 'production') globalForPrisma.prismaReviews = prismaReviews
