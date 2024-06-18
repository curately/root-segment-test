import { ErrorList } from '@/shared/ui/error/error-list'
import { getInitialReviewSummaryAndData } from '../../reviews/data-access/reviews-data-access'
import { Filters } from '../../reviews/ui/filters'
import { ReviewsList } from '../../reviews/ui/review-list'
import { ReviewSummary } from '../../reviews/ui/review-summary'

type Props = {
  prismaSlug: string
}
export async function Reviews({ prismaSlug }: Props) {
  const { data: reviewData, errors } = await getInitialReviewSummaryAndData(prismaSlug)

  if (errors) {
    return <ErrorList errors={errors} />
  }
  if (!reviewData) {
    return 'No reviews found.'
  }
  const { summary, reviews, hcomId } = reviewData
  if (!summary || !reviews || !hcomId || reviews.reviews.length === 0) {
    return null
  }
  return (
    <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
      <div className="w-full mb-4 bg-white lg:col-span-12">
        <h3 className="mb-2">Reviews that mention...</h3>
        <Filters filters={summary.filters} totalCount={reviews.totalNoReviews} />
      </div>
      <div className="lg:col-span-4">
        <ReviewSummary summary={summary} hcomId={hcomId} />
      </div>
      <div className="h-12 lg:h-0"></div>
      <div className="lg:col-span-7 lg:col-start-6 lg:mt-0">
        <ReviewsList initialReviews={reviews} hcomId={hcomId} />
      </div>
    </div>
  )
}
