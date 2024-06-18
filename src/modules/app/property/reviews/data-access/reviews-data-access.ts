'use server'

import type { ReviewsResponse } from '@/shared/domain/review-domain'
import type { InitialReviewDataDto } from '../../reviews/domain/reviews-domain'

// make sure to keep 'use server' at the top of the file as we use the functions here to call data from the client so we need to make sure it's server action
import { unstable_cache } from 'next/cache'

import { Prisma, PrismaClient } from '@prisma/client'

import prisma from '@/shared/data-access/prisma'
import { createServerErrorResponse, createServerSuccessResponse } from '@/shared/data-access/server-response'
import { genericInternalErrorMessage } from '@/shared/ui/error/generic-error-message'

import { getProperty } from '../../shared/data-access/cached-property-objects'

//import prismaReviews from '../../shared/data-access/reviews-prisma-client'

const reviewFields = {
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

//const montereyReviewsClient = prismaReviews.review
type Props = {
  hcomId: string
  starRating: number
  currentPage: number
  filters: Array<string>
  currentFilterText: string
}
// Pulling from the property domain
export const getInitialReviewSummaryAndData = unstable_cache(
  async (slug: string) => {
    try {
      const property = await getProperty(slug)
      if (!property) {
        return createServerErrorResponse<InitialReviewDataDto>('No property found')
      }
      const { latestReviews } = property
      const latestReviewsDto: InitialReviewDataDto = {
        summary: {
          avgRating: latestReviews.avgRating,
          totalNoReviews: latestReviews.totalNoReviews,
          distribution: latestReviews.distribution,
          filters: latestReviews.filters,
        },
        reviews: { totalNoReviews: latestReviews.totalNoReviews, reviews: latestReviews.reviews },
        hcomId: property.hcomId,
      }

      return createServerSuccessResponse(latestReviewsDto)
    } catch (error) {
      return createServerErrorResponse<InitialReviewDataDto>(genericInternalErrorMessage)
    }
  },
  ['latest-reviews'],
  {
    tags: ['reviews', 'property'],
    revalidate: 3600,
  },
)

export const filterReviews = unstable_cache(
  async ({ hcomId, starRating, currentPage, filters, currentFilterText }: Props) => {
    try {
      /*
      const reviews = await montereyReviewsClient.filterReviews({
        hcomId,
        starRating,
        currentPage,
        filters,
        currentFilterText,
      })
      */
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
        return createServerSuccessResponse({
          totalNoReviews,
          reviews,
        })
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

      return createServerSuccessResponse({
        totalNoReviews: count.length as number,
        reviews: data,
      })
    } catch (error) {
      return createServerErrorResponse<ReviewsResponse>(genericInternalErrorMessage)
    }
  },
  ['filtered-reviews'],
  {
    tags: ['reviews', 'property'],
    revalidate: 3600,
  },
)
