import dayjs, { Dayjs } from 'dayjs'

//import { QueryParams } from '@/search/domain/query-domain'

var customParseFormat = require('dayjs/plugin/customParseFormat')
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter')

declare module 'dayjs' {
  interface Dayjs {
    isSameOrAfter(compared: Dayjs): string
    isBefore(compared: Dayjs): string
  }
}
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrAfter)
//dayjs.extend(isBefore)
//type DateType = string | number | Date | Dayjs
type Props = {
  checkin: string
  checkout: string
}
export function validateCheckinAndCheckoutDates({ checkin, checkout }: Props) {
  const defaultDates = {
    validatedCheckin: '1971-01-01',
    validatedCheckout: '1971-01-01',
  }
  const checkinDayJS = dayjs(checkin, 'YYYY-MM-DD')
  const checkoutDayJS = dayjs(checkout, 'YYYY-MM-DD')

  const today = dayjs()

  /* validate for blank dates */
  if (checkin === '' || checkout === '') {
    return defaultDates
  }

  /* validate for valid dates */
  const isValidCheckin = dayjs(checkin, 'YYYY-MM-DD', true).isValid()
  const isValidCheckout = dayjs(checkout, 'YYYY-MM-DD', true).isValid()
  if (!isValidCheckin || !isValidCheckout) {
    return defaultDates
  }

  /* validate that checkout  is after checkin */
  if (checkinDayJS.isSameOrAfter(checkoutDayJS)) {
    return defaultDates
  }

  /* validate that checkin is today or after today */
  if (checkinDayJS.isBefore(today) || checkoutDayJS.isBefore(today)) {
    return defaultDates
  }

  /* validate that checkout is 28 days or less from checkin */
  if (checkoutDayJS.diff(checkinDayJS, 'day') > 28) {
    return {
      validatedCheckin: checkin,
      validatedCheckout: checkinDayJS.add(28, 'day').format('YYYY-MM-DD'),
    }
  }

  return {
    validatedCheckin: checkin,
    validatedCheckout: checkout,
  }
}
