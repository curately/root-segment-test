import { type DateRange } from '@react-types/datepicker'

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
