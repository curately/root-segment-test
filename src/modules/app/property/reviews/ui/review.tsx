import type { Review, ReviewPayload } from '@/app/property/reviews/domain/reviews-domain'

import { StarIcon } from '@heroicons/react/20/solid'

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  review: Review | ReviewPayload
}

export function Review({ review }: Props) {
  const travelDates =
    new Date(review.checkinDate).toLocaleDateString('en-GB', {
      //weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }) +
    ' - ' +
    new Date(review.checkoutDate).toLocaleDateString('en-GB', {
      //weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

  //const travelDates = review.checkinDate + ' - ' + review.checkoutDate
  return (
    <div className="py-12">
      <div className="flex items-start">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
          {review.reviewerName?.charAt(0) || 'A'}
        </div>
        <div className="ml-4">
          <h4 className="text-sm font-bold text-gray-900">{review.reviewerName}</h4>
          <div className="text-sm" suppressHydrationWarning>
            {travelDates}
          </div>
          <div className="text-sm">reviewed on {review.reviewBrand}</div>
          <div className="mt-1 flex items-center">
            {[0, 1, 2, 3, 4].map(rating => (
              <StarIcon
                key={rating}
                className={classNames(
                  review.reviewerScore > rating ? 'text-yellow-400' : 'text-gray-300',
                  'h-5 w-5 flex-shrink-0',
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="sr-only">{review.reviewerScore} out of 5 stars</p>
        </div>
      </div>

      <div
        className="mt-4 space-y-6 text-base italic text-gray-700"
        dangerouslySetInnerHTML={{ __html: review.reviewText }}
      />
    </div>
  )
}
