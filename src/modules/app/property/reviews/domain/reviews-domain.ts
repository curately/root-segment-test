//import { type PropertyPayload, type ReviewPayload } from '@/shared/domain/monterey-payload-types'
import type { Prettify } from '@/shared/domain/utility-types'
import type { Listing, Prisma } from '@prisma/client'

/**
 * Initial reviews which are held in the lastestReviews field of the listing collection
 * This includes the summary of the reviews and the reviews themselves
 */

const reviewFields = {
  reviewerName: true,
  reviewerScore: true,
  reviewBrand: true,
  checkinDate: true,
  checkoutDate: true,
  reviewText: true,
  filterHighlighter: true,
} satisfies Prisma.ReviewSelect

export type ReviewPayload = Prisma.ReviewGetPayload<{ select: typeof reviewFields }>

type InitialReviewsData = Prettify<Listing['latestReviews']>

export type InitialReviews = InitialReviewsData['reviews']

export type ReviewsSummary = Omit<InitialReviewsData, 'reviews'>

export type Review = InitialReviews[number]

export type InitialReviewDataDto = {
  summary: ReviewsSummary
  reviews: {
    totalNoReviews: number
    reviews: InitialReviews
  }
  hcomId: string
}

export type InitialReviewsResponse = {
  totalNoReviews: number
  reviews: InitialReviews
}
/**
 * Reviews which are held in the review collection. This is reviews only and does not include the summary
 */
export type Reviews = Prettify<Array<ReviewPayload>>

export type ReviewsResponse = {
  totalNoReviews: number
  reviews: Reviews
}
