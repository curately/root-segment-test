'use client'

import { type Listing } from '@prisma/client'
import { Button } from '@/shared/ui/button'
import { useActions, useReviewParams } from '../../reviews/domain/use-reviews-store'

type Props = {
  filters: Listing['latestReviews']['filters']
  totalCount: number
}

export function Filters({ filters, totalCount }: Props) {
  const reviewParams = useReviewParams()
  const { currentFilterText } = reviewParams

  const { resetQuery, setReviewParams } = useActions()

  return (
    <div className="relative flex w-full gap-1 overflow-x-auto md:block">
      <Button
        key="all reviews"
        variant="pill"
        className={`${'' === currentFilterText ? 'bg-ivory text-2xl' : 'bg-white'}   mb-2 mr-2 inline-block w-fit shrink-0 px-4 text-sm hover:bg-ivory`}
        onClick={() => {
          resetQuery()
        }}
      >
        All reviews ({totalCount})
      </Button>
      {filters.map((filter, index) => (
        <Button
          key={filter.name}
          variant="pill"
          className={`${filter.name === currentFilterText ? 'bg-ivory text-2xl' : 'bg-white'}  mb-2  mr-2 inline-block w-fit shrink-0 px-4 text-sm  hover:bg-ivory`}
          //disabled={filter.name === currentFilterText}
          onClick={() => {
            setReviewParams({
              ...reviewParams,
              starRating: 0,
              currentPage: 1,
              filters: filter.reviewIds,
              currentFilterText: filter.name,
            })
          }}
        >
          {filter.name}
          {filter.reviewIds.length > 0 ? ` (${filter.reviewIds.length})` : ''}
        </Button>
      ))}
    </div>
  )
}
