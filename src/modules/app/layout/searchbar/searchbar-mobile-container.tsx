'use client'

import { useRefinements } from '@/app/refinement/shared/domain/use-refinements'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

const SearchBarMobile = dynamic(
  () =>
    import('@/app/layout/searchbar/searchbar-mobile').then(module => ({
      default: module.SearchBarMobile,
    })),
  {
    loading: () => <SearchBarSkeleton />,
  },
)

export function SearchBarMobileContainer() {
  const [loadSearchBar, setLoadSearchBar] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    fallbackInView: true,
  })

  return (
    <div
      ref={ref}
      onMouseEnter={() => {
        setLoadSearchBar(true)
      }}
    >
      {loadSearchBar ? <SearchBarMobile /> : <SearchBarSkeleton />}
    </div>
  )
}
interface Props {
  initialValue?: string
}
export function SearchBarSkeleton({ initialValue = '' }: Props) {
  //const { initialLocationValue, initialGuestsValue, initialDisplayDateValue } = useInitialSearchFilterValues()
  const {
    location: initialLocationValue,
    numberOfGuests: initialGuestsValue,
    displayDates: initialDisplayDateValue,
  } = useRefinements()
  return (
    <>
      <div className="">
        <div className="flex flex-col justify-center w-full px-2 h-searchbar bg-accent">
          <div className="flex items-center justify-center gap-0 border rounded-lg border-accent-dark/80">
            <div className=" flex h-14 w-[41%]  items-center rounded-l-lg border-r-0 bg-white pl-4 pr-2  ">
              <div>
                <div className="text-sm capitalize line-clamp-1">
                  {!initialLocationValue || initialLocationValue === '' ? 'Add destination' : initialLocationValue}
                </div>
              </div>
            </div>

            <div className="flex h-14  w-[32%] items-center justify-end border-l-0 bg-white pr-4">
              <div className="w-2 h-2 mr-2 rounded-full bg-pill"></div>
              <div className="text-sm tracking-tighter line-clamp-1" suppressHydrationWarning={true}>
                {initialDisplayDateValue}
              </div>
            </div>
            <div className="flex h-14 w-[27%] items-center justify-end rounded-r-lg border-l-0 bg-white pr-4">
              <div className="w-2 h-2 mr-2 rounded-full bg-pill"></div>
              <div className="text-sm tracking-tighter line-clamp-1">
                {initialGuestsValue ? initialGuestsValue + ' guests' : '2 guests'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
