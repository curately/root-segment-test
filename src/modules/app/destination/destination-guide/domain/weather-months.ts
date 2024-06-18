export const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const

export type Month = (typeof MONTHS)[number]

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

export type MonthName = (typeof MONTH_NAMES)[number]
/*
export const MONTHS_WITH_NAMES = MONTHS.map((month, index) => ({
  month,
  name: MONTH_NAMES[index],
}))
*/
