//import { type ReviewPayload } from '@/shared/domain/monterey-payload-types'
import type { Prisma } from '@prisma/client'

import { type Prettify } from '@/shared/domain/utility-types'

const reviewFields = {
  reviewerName: true,
  reviewerScore: true,
  reviewBrand: true,
  checkinDate: true,
  checkoutDate: true,
  reviewText: true,
  filterHighlighter: true,
} satisfies Prisma.ReviewSelect

type ReviewPayload = Prisma.ReviewGetPayload<{ select: typeof reviewFields }>

export type Reviews = Prettify<Array<ReviewPayload>>

export type ReviewsResponse = {
  totalNoReviews: number
  reviews: Reviews
}
