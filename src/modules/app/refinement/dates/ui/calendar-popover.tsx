import { Popover, Transition } from '@headlessui/react'
import { getLocalTimeZone, today } from '@internationalized/date'
import type { DateRange } from '@react-types/datepicker'
import { Fragment, useState, type SVGProps } from 'react'
import { CancelButton } from '@/shared/ui/cancel-button'
import { CalendarHasRangeSelected } from '../../dates/domain/calendar-has-range-selected'
import { useDates } from '../../dates/domain/use-dates'
import { Calendar } from '../../dates/ui/calendar/calendar'
import { useRefinements } from '../../shared/domain/use-refinements'
import { useActions } from '../../shared/domain/use-refinements-store'

interface Props {
  borderClassName?: string
}
export function CalendarPopover({ borderClassName }: Props) {
  //const { cancelDate } = useDateActions()
  const { setCheckin, setCheckout } = useActions()
  const {
    calendarDateRange: initialCalendarDate,
    displayDates: initialDisplayDateValue,
    checkin,
    checkout,
  } = useRefinements()
  const { hasDates } = useDates({ checkin, checkout })

  const [showDateError] = useState(false)

  const handleChanges = (newDateRange: DateRange) => {
    //cancelDate(false)
    const calendarHasRangeSelected = CalendarHasRangeSelected({
      newDateRange: newDateRange,
    })

    if (calendarHasRangeSelected) {
      setCheckin(newDateRange.start.toString().split('T')[0] ?? '')
      setCheckout(newDateRange.end.toString().split('T')[0] ?? '')
    } else {
      setCheckin('')
      setCheckout('')
    }
  }

  const clearCalendar = () => {
    //cancelDate(true)
    setCheckin('')
    setCheckout('')
  }

  return (
    <Popover className="relative w-[33%] border-r-0">
      {({ open }) => (
        <>
          <Popover.Button
            suppressHydrationWarning={true}
            className={`
                  ${open ? '' : 'text-opacity-90'}
                  ${borderClassName} flex h-14  w-full items-center border-l-0 border-r-0 bg-white pl-4 focus:outline-none focus-visible:ring-0`}
          >
            <CalendarDaysIcon className="w-5 h-5 ml-0 mr-3" />
            {initialDisplayDateValue}
            {showDateError === true && (
              <div className="absolute bottom-0 left-0  mb-[-12px] block rounded-lg bg-white px-2  text-sm">
                Dates must span 28 days or less
              </div>
            )}
            {hasDates ? (
              <div className="absolute right-6 top-[8px] h-6 w-6 cursor-pointer">
                <CancelButton onClick={clearCalendar} />
              </div>
            ) : (
              false
            )}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="xl:l-1/2 absolute z-50 mt-1 w-screen max-w-[700px] -translate-x-1/2 transform px-4 shadow-lg sm:px-0 md:left-10 lg:max-w-2xl">
              <div className="overflow-hidden rounded-lg ">
                <div className="grid gap-8 p-8 bg-white ">
                  <Calendar
                    pageBehavior="single"
                    minValue={today(getLocalTimeZone())}
                    defaultValue={initialCalendarDate}
                    autoFocus={true}
                    onChange={handleChanges}
                  />
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
function CalendarDaysIcon(props: SVGProps<SVGSVGElement>) {
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
/*
export function CalendarHasRangeSelected({ newDateRange }: { newDateRange: DateRange }) {
  let rangeSelected = false
  if (newDateRange.start.year !== newDateRange.end.year) {
    rangeSelected = true
  }
  if (newDateRange.start.month !== newDateRange.end.month) {
    rangeSelected = true
  }
  if (newDateRange.start.day !== newDateRange.end.day) {
    rangeSelected = true
  }
  return rangeSelected
}
*/
