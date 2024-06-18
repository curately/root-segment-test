'use client'

import { useEffect } from 'react'
import { type InitialReviewDataDto } from '../../reviews/domain/reviews-domain'
import { useActions, useFilteredReviews, useReviewParams } from '../../reviews/domain/use-reviews-store'
import { Pagination } from '../../reviews/ui/pagination'
import { Review } from '../../reviews/ui/review'
import { ReviewHeading } from '../../reviews/ui/review-heading'

type Props = {
  initialReviews: InitialReviewDataDto['reviews']
  hcomId: string
}

export function ReviewsList({ initialReviews, hcomId }: Props) {
  const reviewParams = useReviewParams()
  const { resetQuery } = useActions()
  const filteredReviews = useFilteredReviews(initialReviews, hcomId)
  const { data: reviews, error, isSuccess, isFetching, isLoading } = filteredReviews
  useEffect(() => {
    resetQuery()
  }, [resetQuery])
  if (!reviews) {
    return null
  }
  if (!isSuccess) {
    return <div>loading...</div>
  }

  return (
    <div>
      <ReviewHeading totalNoReviews={reviews.totalNoReviews} />
      {reviewParams.currentFilterText !== '' ? (
        <h2 className="-mt-2 text-sm font-bold">
          @ <span className="bg-primary-200 px-1">{reviewParams.currentFilterText}</span>
        </h2>
      ) : (
        false
      )}
      <Pagination totalNoReviews={reviews.totalNoReviews} hcomId={hcomId} />

      <div className="mt-8 flow-root">
        <div className={`-my-12 divide-y divide-gray-200 ${isFetching ? 'animate-pulse opacity-50' : ''}`}>
          {reviews && reviews.reviews.map((review, index) => <Review review={review} key={index} />)}
        </div>
      </div>
    </div>
  )
}
