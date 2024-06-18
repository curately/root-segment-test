import { useRefinements } from '@/app/refinement/shared/domain/use-refinements'
import { SearchModal } from '@/app/refinement/shared/ui/search-summary-modal'
import { type ReactNode } from 'react'
import {
  useActions,
  useCalendarModal,
  useDestinationModal,
  useGuestModal,
  useSearchModal,
} from '@/shared/domain/use-modal-store'

interface Props {
  initialValue?: string
  children?: ReactNode
}
export function SearchBarMobile({ initialValue = '', children }: Props) {
  //const { initialLocationValue, initialGuestsValue, initialDisplayDateValue } = useInitialSearchFilterValues()
  const {
    location: initialLocationValue,
    numberOfGuests: initialGuestsValue,
    displayDates: initialDisplayDateValue,
  } = useRefinements()
  const autoCompleteInitialValue = initialLocationValue === '' ? initialValue : initialLocationValue

  const { openSearchModal } = useActions()
  const searchModalIsOpen = useSearchModal()

  const calendarModalIsOpen = useCalendarModal()
  const destinationModalIsOpen = useDestinationModal()
  const guestModalIsOpen = useGuestModal()

  return (
    <>
      <div className="">
        <div className="flex flex-col justify-center w-full px-2 h-searchbar bg-accent">
          <div
            className="flex items-center justify-center gap-0 border rounded-lg border-accent-dark/80"
            onClick={() => {
              openSearchModal()
            }}
          >
            <div className=" flex h-14 w-[41%]  items-center rounded-l-lg border-r-0 bg-white pl-4 pr-2  ">
              <div>
                <div className="text-sm capitalize line-clamp-1">
                  {!initialLocationValue || initialLocationValue === ''
                    ? initialValue !== ''
                      ? initialValue
                      : 'Add destination'
                    : initialLocationValue}
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
                {initialGuestsValue > 0 ? initialGuestsValue + ' guests' : 'Add guests'}
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
      {searchModalIsOpen && <SearchModal autoCompleteInitialValue={autoCompleteInitialValue} />}
      {/*}
      {destinationModalIsOpen && <DestinationModal autoCompleteInitialValue={autoCompleteInitialValue} />}
      {calendarModalIsOpen && <CalendarModal />}
      {guestModalIsOpen && <GuestModal />}
          */}
    </>
  )
}
