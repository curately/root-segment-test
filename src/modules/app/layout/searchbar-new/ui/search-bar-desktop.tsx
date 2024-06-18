'use client'

import { useApplyRefinements } from '@/app/refinement/shared/domain/use-apply-refinements'
import { useRefinements } from '@/app/refinement/shared/domain/use-refinements'
import { lazy, useState, useTransition } from 'react'
import { Button } from '@/shared/ui/button'
import { CancelButton } from '@/shared/ui/cancel-button'
import { useLocation } from '../domain/location-domain'
import { useSearchBarKey } from '../domain/use-search-store'

//import { CalendarPopover } from "@/layout/searchbar/desktop/ui/calendar-popover"
//import { GuestsPopover } from "@/layout/searchbar/desktop/ui/guests-popover"
//import { AutoComplete } from "@/layout/searchbar/shared/autocomplete/ui/auto-complete"

//const HeavyComponent = lazy(() => import('@/layout/searchbar/desktop/ui/calendar-popover'))

const HeavyCalendarPopover = lazy(() =>
  import('@/app/refinement/dates/ui/calendar-popover').then(module => ({
    default: module.CalendarPopover,
  })),
)
const HeavyGuestsPopover = lazy(() =>
  import('@/app/refinement/guests/ui/guests-popover').then(module => ({
    default: module.GuestsPopover,
  })),
)
const HeavyAutoComplete = lazy(() =>
  import('@/app/refinement/location/ui/location-search/location-search').then(module => ({
    default: module.LocationSearch,
  })),
)

interface ContainerProps {
  children: React.ReactNode
}

interface Props {
  borderClassName?: string
  autoCompleteMargin?: string
  dividerHeight?: 'full' | 'half'
  initialValue?: string | null // we are passing this (rather than getting it direct from the url) so that we can cater for the case where we are on a destination page and the initial value is coming from the destination name
}

export function SearchBarDesktop({
  borderClassName = 'border border-primary-500',
  autoCompleteMargin = 'tight',
  dividerHeight = 'half',
  initialValue = null,
}: Props) {
  //const { initialLocationValue, initialGuestsValue, initialDisplayDateValue } = useInitialSearchFilterValues()
  const {
    location: initialLocationValue,
    displayDates: initialDisplayDateValue,
    numberOfGuests: initialGuestsValue,
  } = useRefinements()
  const initialLocation = initialLocationValue

  const { inputRef } = useLocation()

  const { updateSearch, prefetchSearch } = useApplyRefinements()

  const searchBarKey = useSearchBarKey()

  const [, startTransition] = useTransition()

  const [load, setLoad] = useState(false)
  /*
return (
    <div
      className="hidden w-full border-primary md:block"
      onMouseEnter={() => {
        startTransition(() => {
          setLoad(true)
        })
      }}
    >
      <div className="grid items-center justify-between w-full h-20 grid-cols-4 gap-0 mx-auto bg-white rounded-4xl">
        <div>
          {load ? (
            <HeavyAutoComplete
              initialValue={initialLocation}
              inputRef={inputRef}
              autoCompleteMargin={autoCompleteMargin}
            />
          ) : (
            <div className="relative w-full">
              <div className="relative md:w-full md:pr-2">
                <div
                  className={`md:rounded-r-0 relative flex w-full items-center justify-start rounded-md border border-pill p-1 md:border-0 md:border-r-0`}
                >
                  <input
                    className="w-[85%]  border-0 bg-white  py-2  pl-9 pr-2 capitalize text-input-text placeholder-black focus:border-green-200 focus:outline-none focus:ring-0"
                    placeholder={initialLocation && initialLocation !== '' ? initialLocation : 'Where are you going?'}
                  />
                  <MapPinIcon className="absolute left-0 top-[14px] ml-3 h-5 w-5 " />
                  {initialLocation ? (
                    <div className="absolute right-0 top-[4px]">
                      <CancelButton
                        onClick={() => {
                          console.log('click')
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
        <div>Dates</div>
        <div>Guests</div>
        <div>
          <Button
            variant="search"
            //size="lg"
            className="mr-sm h-[55px] w-[150px] rounded-4xl"
            onClick={() => {
              updateSearch()
            }}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  )
  */
  return (
    <SearchBarWideContainer key={searchBarKey}>
      <div
        className="flex w-[1200px] items-center justify-start rounded-l-lg rounded-r-lg bg-white shadow-md"
        onMouseEnter={() => {
          startTransition(() => {
            setLoad(true)
          })
        }}
      >
        <div className={`  flex h-14 w-[33%] min-w-[200px] items-center justify-start rounded-l-lg border-r-0`}>
          {load ? (
            <HeavyAutoComplete
              initialValue={initialLocation}
              inputRef={inputRef}
              autoCompleteMargin={autoCompleteMargin}
            />
          ) : (
            <div className="relative w-full">
              <div className="relative md:w-full md:pr-2">
                <div
                  className={`md:rounded-r-0 relative flex w-full items-center justify-start rounded-md border border-pill p-1 md:border-0 md:border-r-0`}
                >
                  <input
                    className="w-[85%]  border-0 bg-white  py-2  pl-9 pr-2 capitalize text-input-text placeholder-black focus:border-green-200 focus:outline-none focus:ring-0"
                    placeholder={initialLocation && initialLocation !== '' ? initialLocation : 'Where are you going?'}
                  />
                  <MapPinIcon className="absolute left-0 top-[14px] ml-3 h-5 w-5 " />
                  {initialLocation ? (
                    <div className="absolute right-0 top-[4px]">
                      <CancelButton
                        onClick={() => {
                          console.log('click')
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
        <Divider />
        {load ? (
          <HeavyCalendarPopover />
        ) : (
          <div className={`flex  h-14 w-[33%] min-w-[200px] items-center justify-start border-r-0 pl-4`}>
            <CalendarDaysIcon className="w-5 h-5 ml-0 mr-3" />
            {initialDisplayDateValue}
          </div>
        )}

        <Divider />
        {load ? (
          <HeavyGuestsPopover />
        ) : (
          <div className={`flex  h-14 w-[33%] min-w-[200px] items-center justify-start    border-r-0 pl-4`}>
            <BedIcon className="w-5 h-5 ml-0 mr-3" /> {initialGuestsValue ? initialGuestsValue + ' guests' : '2 guests'}
          </div>
        )}
      </div>

      <Button
        variant="search"
        //size="lg"
        className="ml-2 mr-0 h-[52px] w-[150px] bg-blue-500 text-lg font-bold"
        onMouseOver={() => {
          prefetchSearch()
        }}
        onClick={() => {
          updateSearch()
        }}
      >
        Search
      </Button>
    </SearchBarWideContainer>
  )
}

function SearchBarWideContainer({ children }: ContainerProps) {
  return (
    <div className="hidden w-full border-primary md:block">
      <div className="flex items-center justify-start w-full gap-0 mx-auto ">{children}</div>
    </div>
  )
}
function Divider() {
  return <div className="h-[55px] border border-[#f2f2f2]"></div>
}

function BedIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </svg>
  )
}
function CalendarDaysIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}

type MapPinProps = {
  className?: string
  props?: React.SVGProps<SVGSVGElement>
}
function MapPinIcon({ className = '', props }: MapPinProps) {
  return (
    <svg
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
