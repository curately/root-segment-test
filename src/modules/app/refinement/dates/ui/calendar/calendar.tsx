import { GregorianCalendar } from '@internationalized/date'
import { type RangeCalendarProps } from '@react-types/calendar'
import { type DateValue } from '@react-types/datepicker'
import React, { useRef } from 'react'
import { useLocale, useRangeCalendar } from 'react-aria'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { useRangeCalendarState } from 'react-stately'
import { CalendarButton } from './calendar-button'
import { CalendarGrid } from './calendar-grid'

const displayDates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function createCalendar(identifier: string) {
  switch (identifier) {
    case 'gregory':
      return new GregorianCalendar()
    default:
      throw new Error(`Unsupported calendar ${identifier}`)
  }
}

interface CalendarProps extends RangeCalendarProps<DateValue> {
  mobile?: boolean
}

export function Calendar(props: CalendarProps) {
  let { locale } = useLocale()
  let state = useRangeCalendarState({
    ...props,
    visibleDuration: { months: props.mobile ? 12 : 2 },
    locale,
    createCalendar,
  })

  let ref = useRef(null)

  let { calendarProps, prevButtonProps, nextButtonProps, title } = useRangeCalendar(props, state, ref)

  const titleArray = title.split(' ')
  const firstMonthTitle = titleArray[0]
  const secondMonthTitle = titleArray[1]

  return (
    <div {...calendarProps} ref={ref} className="w-full">
      <div className="mb-4 flex items-center justify-between text-lg xl:justify-between ">
        <div className="flex items-center justify-start ">
          <CalendarButton {...prevButtonProps}>
            <div className="group flex items-center justify-start">
              <ChevronLeft className="sm:hover:border-accent-darker group-hover:border-accent-darker hidden h-10 w-10 rounded-full border-white text-dark/50 outline-none group-hover:border sm:-ml-px sm:inline-block sm:border sm:p-2 sm:transition-colors sm:group-hover:bg-ivory" />
            </div>
          </CalendarButton>
          <div className="hidden sm:pl-2 md:block">
            {displayDates[state.visibleRange.start.month - 1]} {state.visibleRange.start.year}
          </div>
        </div>
        <div className="flex items-center lg:mr-4">
          <div className="hidden sm:pr-2 md:block">
            {displayDates[state.visibleRange.end.month - 1]} {state.visibleRange.end.year}
          </div>
          <CalendarButton {...nextButtonProps}>
            <div className="group flex items-center justify-start">
              <ChevronRight className="sm:hover:border-accent-darker hidden h-10 w-10 rounded-full border-white text-dark/50 outline-none disabled:opacity-20 disabled:hover:bg-white sm:-ml-px sm:inline-block sm:border sm:p-2 sm:transition-colors sm:group-hover:bg-ivory" />
            </div>
          </CalendarButton>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <CalendarGrid state={state} offset={{ months: 0 }} />
        <CalendarGrid state={state} offset={{ months: 1 }} />
        {props.mobile && (
          <>
            <CalendarGrid state={state} offset={{ months: 2 }} />
            <CalendarGrid state={state} offset={{ months: 3 }} />
            <CalendarGrid state={state} offset={{ months: 4 }} />
            <CalendarGrid state={state} offset={{ months: 5 }} />
            <CalendarGrid state={state} offset={{ months: 6 }} />
            <CalendarGrid state={state} offset={{ months: 7 }} />
            <CalendarGrid state={state} offset={{ months: 8 }} />
            <CalendarGrid state={state} offset={{ months: 9 }} />
            <CalendarGrid state={state} offset={{ months: 10 }} />
            <CalendarGrid state={state} offset={{ months: 11 }} />
          </>
        )}
      </div>
    </div>
  )
}
