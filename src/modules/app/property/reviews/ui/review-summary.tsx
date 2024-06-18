'use client'

import { StarIcon } from '@heroicons/react/20/solid'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { cn } from '@/shared/ui/helpers'
import { type ReviewsSummary } from '../../reviews/domain/reviews-domain'
import { useActions, useReviewParams } from '../../reviews/domain/use-reviews-store'
import StarEmpty from '../../reviews/ui/assets/star-empty.svg'
import StarFull from '../../reviews/ui/assets/star-full.svg'
import StarHalf from '../../reviews/ui/assets/star-half.svg'

//import { useInView } from 'react-intersection-observer'

type Props = {
  summary: ReviewsSummary
  hcomId: string
}

export function ReviewSummary({ summary, hcomId }: Props) {
  const queryClient = useQueryClient()
  //const filters = useFilters()
  //const currentFilterText = useCurrentFilterText()
  const { prefetchReviews, setReviewParams } = useActions()
  const reviewParams = useReviewParams()

  const { filters, currentFilterText } = reviewParams
  const { avgRating: average, totalNoReviews, distribution } = summary

  const startingReviewsData = {
    average: average,
    totalCount: totalNoReviews,
    counts: [
      { rating: 5, count: distribution.five || 0 },
      { rating: 4, count: distribution.four || 0 },
      { rating: 3, count: distribution.three || 0 },
      { rating: 2, count: distribution.two || 0 },
      { rating: 1, count: distribution.one || 0 },
    ],
  }

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">Family Reviews</h2>
      <div className="flex items-center mt-3">
        <div>
          <div className="flex items-center gap-[2.2px]">
            {[0, 1, 2, 3, 4].map(rating => {
              return <RatingImage key={rating} rating={rating} average={average || 0} />
            })}
          </div>
          <p className="sr-only">{average} out of 5 stars</p>
        </div>
        <p className="ml-2 text-sm text-gray-900">{totalNoReviews} reviews</p>
      </div>
      <div className="mt-6">
        <h3 className="sr-only">Review data</h3>

        <dl className="space-y-3">
          {startingReviewsData.counts.map((count, index) => (
            <div
              key={count.rating}
              className={`flex items-center text-sm ${count.count > 0 ? 'group cursor-pointer hover:underline' : ''}`}
              onClick={() => {
                if (count.count > 0) {
                  setReviewParams({
                    starRating: count.rating,
                    currentPage: 1,
                    filters: [],
                    currentFilterText: '',
                  })
                }
              }}
              onMouseEnter={() => {
                if (count.count > 0) {
                  prefetchReviews(queryClient, hcomId, {
                    ...reviewParams,
                    currentPage: 1,
                    starRating: count.rating,
                    filters: filters,
                    currentFilterText: currentFilterText,
                  })
                }
              }}
            >
              <dt className="flex items-center flex-1">
                <p className="w-3 font-medium text-gray-900">
                  {count.rating}
                  <span className="sr-only"> star reviews</span>
                </p>
                <div aria-hidden="true" className="flex items-center flex-1 ml-1">
                  <StarIcon
                    className={cn(
                      count.count > 0 ? 'text-yellow-400 group-hover:text-yellow-500' : 'text-gray-300',
                      'h-5 w-5 flex-shrink-0',
                    )}
                    aria-hidden="true"
                  />

                  <div className="relative flex-1 ml-3 group">
                    <div className="h-3 bg-gray-100 border border-gray-200 rounded-full" />
                    {count.count > 0 ? (
                      <>
                        <div
                          className="absolute inset-y-0 bg-yellow-400 border border-yellow-400 rounded-full group-hover:bg-yellow-500"
                          style={{
                            width: `calc(${count.count}%)`,
                          }}
                        />
                      </>
                    ) : null}
                  </div>
                </div>
              </dt>
              <dd className="w-10 ml-3 text-sm text-right text-gray-900 tabular-nums">{Math.round(count.count)}%</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="w-full mt-10 text-base bg-white rounded-lg flex-cols">
        <p>
          We have collected a sample of reviews which reflect what families have said about this hotel to help you
          decide if it is the right place for you.
        </p>
      </div>
    </div>
  )
}

function RatingImage({ rating, average }: { rating: number; average: number }) {
  const integerPart = Math.floor(average)
  const decimalPart = average % 1
  const hasHalfStar = decimalPart > 0

  if (rating === integerPart && hasHalfStar) {
    return <Image src={StarHalf} alt="star-empty" className="h-[18px] w-[18px] flex-shrink-0" />
  }
  if (average <= rating) {
    return <Image src={StarEmpty} alt="star-empty" className="h-[18px] w-[18px] flex-shrink-0" />
  }
  if (average > rating) {
    return <Image src={StarFull} alt="star-full" className="h-[18px] w-[18px] flex-shrink-0" />
  }
}
