import { useActions, useReviewParams } from '../../reviews/domain/use-reviews-store'

export function ReviewHeading({ totalNoReviews }: { totalNoReviews: number }) {
  const { resetQuery } = useActions()

  const reviewParams = useReviewParams()
  const { starRating, currentFilterText } = reviewParams
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="gap-2 py-4 text-3xl tracking-tight text-gray-900">
          {getStarRatingHeading(starRating)} reviews <span className="text-sm text-gray-600">({totalNoReviews})</span>
        </h3>
        {starRating || currentFilterText ? (
          <div
            className="cursor-pointer text-sm font-bold underline md:text-base"
            onClick={() => {
              resetQuery()
            }}
          >
            All reviews
          </div>
        ) : (
          false
        )}
      </div>
    </>
  )
}
function getStarRatingHeading(starRating: number) {
  if (starRating === 0) return 'Latest'
  return <span className="">{`${starRating} star`}</span>
}
