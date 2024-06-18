import type { Prisma } from '@prisma/client'
import { unstable_cache } from 'next/cache'
import prisma from '@/shared/data-access/prisma'
import { prismaSelectToMongoProjection } from '@/shared/data-access/prisma-select-to-mongo-projection'

export const reviewFields = {
  reviewerName: true,
  reviewerScore: true,
  reviewBrand: true,
  checkinDate: true,
  checkoutDate: true,
  reviewText: true,
  filterHighlighter: true,
} satisfies Prisma.ReviewSelect

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

type FindReviewsProps = {
  hcomId: string
  starRating: number
  currentPage: number
  filters: Array<string>
  currentFilterText: string
}

export async function filterReviews({ hcomId, starRating, currentPage, filters, currentFilterText }: FindReviewsProps) {
  if (filters.length === 0) {
    const whereClause = starRating === 0 ? { hcomId: hcomId } : { hcomId: hcomId, reviewerScore: starRating }
    const [totalNoReviews, reviews] = await Promise.all([
      prisma.review.count({
        where: whereClause,
      }),
      prisma.review.findMany({
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
    prisma.review.findRaw({
      filter: {
        reviewId: { $in: filters },
      },
    }),

    prisma.review.findRaw({
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
}
