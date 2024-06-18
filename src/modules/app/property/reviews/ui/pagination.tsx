import { useActions, useReviewParams } from '@/app/property/reviews/domain/use-reviews-store'
import { useQueryClient } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight, Loader } from 'react-feather'

export function Pagination({ totalNoReviews, hcomId }: { totalNoReviews: number; hcomId: string }) {
  const queryClient = useQueryClient()
  const { prefetchReviews, setReviewParams } = useActions()
  const reviewParams = useReviewParams()
  const { currentPage } = reviewParams

  if (totalNoReviews < 10)
    return (
      <div className="flex items-center justify-between w-full h-8 sm:justify-left lg:gap-4 ">
        <div>
          Showing 1 - {totalNoReviews} of {totalNoReviews} reviews
        </div>
      </div>
    )
  return (
    <div className="flex items-center justify-between w-full sm:justify-left lg:gap-4">
      <div>
        Showing {(currentPage - 1) * 10 + 1} -{' '}
        {currentPage * 10 <= totalNoReviews
          ? currentPage * 10
          : `${currentPage > 1 ? currentPage - 1 : ''}${totalNoReviews % 10}`}{' '}
        of {totalNoReviews} reviews
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            if (currentPage < 2) return false
            setReviewParams({
              ...reviewParams,
              currentPage: currentPage - 1,
            })
            //setCurrentPage(currentPage - 1)
          }}
        >
          <ChevronLeft
            className={`${
              currentPage === 1
                ? 'h-8 w-8 bg-white p-1 text-gray-300'
                : 'h-8 w-8 cursor-pointer rounded-full bg-white p-1 text-gray-900 hover:bg-ivory'
            }`}
          />{' '}
        </button>
        <button
          onClick={() => {
            if (currentPage * 10 > totalNoReviews) return false
            setReviewParams({
              ...reviewParams,
              currentPage: currentPage + 1,
            })
            //upDateReviews(starRatingToFilterBy, page + 1)
            //selectStarRating(0)
            //setCurrentPage(currentPage + 1)
            //prefetchReviews(queryClient, hcomId, page + 2, starRating)
            prefetchReviews(queryClient, hcomId, {
              ...reviewParams,
              currentPage: currentPage + 2,
            })
          }}
          onMouseEnter={() => {
            if (currentPage * 10 > totalNoReviews) return false
            {
              prefetchReviews(queryClient, hcomId, {
                ...reviewParams,
                currentPage: currentPage + 1,
              })
            }
          }}
        >
          <ChevronRight
            className={`${
              currentPage * 10 > totalNoReviews
                ? 'h-8 w-8 bg-white p-1 text-gray-300'
                : 'h-8 w-8 cursor-pointer rounded-full bg-white p-1 text-gray-900 hover:bg-ivory'
            }`}
          />
        </button>
      </div>
    </div>
  )
}
