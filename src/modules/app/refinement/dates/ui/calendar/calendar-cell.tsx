import { CalendarDate, getDayOfWeek, isSameDay, isSameMonth } from '@internationalized/date'
import { type RangeCalendarState } from '@react-stately/calendar'
import React from 'react'
import { mergeProps, useCalendarCell, useFocusRing, useLocale } from 'react-aria'

type calendarCellProps = {
  state: RangeCalendarState
  date: CalendarDate
  currentMonth: CalendarDate
}

export function CalendarCell({ state, date, currentMonth }: calendarCellProps) {
  let ref = React.useRef(null)
  let { cellProps, buttonProps, isSelected, isOutsideVisibleRange, isDisabled, formattedDate, isInvalid } =
    useCalendarCell({ date }, state, ref)
  let isOutsideMonth = !isSameMonth(currentMonth, date)
  let isSelectionStart = state.highlightedRange ? isSameDay(date, state.highlightedRange.start) : isSelected
  let isSelectionEnd = state.highlightedRange ? isSameDay(date, state.highlightedRange.end) : isSelected

  // We add rounded corners on the left for the first day of the month,
  // the first day of each week, and the start date of the selection.
  // We add rounded corners on the right for the last day of the month,
  // the last day of each week, and the end date of the selection.
  let { locale } = useLocale()
  let dayOfWeek = getDayOfWeek(date, locale)
  let isRoundedLeft = isSelected && (isSelectionStart || dayOfWeek === 0 || date.day === 1)
  let isRoundedRight =
    isSelected && (isSelectionEnd || dayOfWeek === 6 || date.day === date.calendar.getDaysInMonth(date))

  let { focusProps, isFocusVisible } = useFocusRing()
  return (
    <td {...cellProps} className={`relative cursor-pointer py-0.5 ${isFocusVisible ? 'z-10' : 'z-0'}   `}>
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        //hidden={isOutsideVisibleRange}
        hidden={isOutsideMonth}
        className={` group h-[54px] w-[54px] outline-none  sm:w-full xl:h-10 xl:w-10 ${
          isRoundedLeft ? 'rounded-l-full' : ''
        } ${isRoundedRight ? 'rounded-r-full' : ''} ${
          isSelected ? (isInvalid ? 'bg-red-300' : 'bg-primary-100') : ''
        } ${isDisabled ? 'disabled font-normal' : ''}`}
      >
        <div
          className={`flex h-full w-full items-center justify-center rounded-full text-sm ${
            isDisabled && !isInvalid ? 'text-pill' : 'font-normal'
          } ${
            // Focus ring, visible while the cell has keyboard focus.
            isFocusVisible ? 'group-focus:z-2 ring-2 ring-accent ring-offset-2' : ''
          } ${
            // Darker selection background for the start and end.
            isSelectionStart || isSelectionEnd
              ? isInvalid
                ? 'bg-red-600 text-dark hover:bg-red-700'
                : 'hover:primary-600 border-indigi-200 cursor-pointer border bg-primary-300 font-bold text-black'
              : ''
          } ${
            // Hover state for cells in the middle of the range.
            isSelected && !isDisabled && !(isSelectionStart || isSelectionEnd)
              ? isInvalid
                ? 'hover:bg-red-400'
                : 'hover:bg-chill-600 cursor-pointer'
              : ''
          } ${
            // Hover state for non-selected cells.
            !isSelected && !isDisabled ? 'cursor-pointer hover:bg-primary-300 hover:text-black' : ''
          } cursor-default`}
        >
          {formattedDate}
        </div>
      </div>
    </td>
  )
}
