import { endOfMonth, getWeeksInMonth } from '@internationalized/date'
import { type RangeCalendarState } from '@react-stately/calendar'
import React from 'react'
import { useCalendarGrid, useLocale } from 'react-aria'
import { CalendarCell } from './calendar-cell'

type calendarGridProps = {
  state: RangeCalendarState
  offset: { months: number }
}

export function CalendarGrid({ state, offset }: calendarGridProps) {
  let startDate = state.visibleRange.start.add(offset)

  let endDate = endOfMonth(startDate)

  let { locale } = useLocale()
  let { gridProps, headerProps, weekDays } = useCalendarGrid(
    {
      startDate,
      endDate,
    },
    state,
  )

  // Get the number of weeks in the month so we can render the proper number of rows.
  let weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale)
  weeksInMonth = 6 /* this corrects for jan 2023 not displaying enough days */

  return (
    <div className="mb-4">
      <h3 className="mb-4 py-0 text-left text-xl font-normal text-black sm:hidden">{gridProps['aria-label']}</h3>
      <table {...gridProps} cellPadding="0" className="mx-auto w-full">
        <thead {...headerProps} className="text-sm text-dark/50 ">
          <tr className="w-full">
            {weekDays.map((day, index) => (
              <th className="" key={index}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="h-4 xl:hidden"></tr>
          {[...new Array(weeksInMonth).keys()].map(weekIndex => (
            <tr key={weekIndex}>
              {state
                .getDatesInWeek(weekIndex, startDate)
                .map((date, i) =>
                  date ? <CalendarCell key={i} state={state} date={date} currentMonth={startDate} /> : <td key={i} />,
                )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
