import { validateCheckinAndCheckoutDates } from '@/app/search/domain/validate-dates'
import { z } from 'zod'

export const AvailabilitySearchParams = z
  .object({
    checkin: z.string().default('').catch(''),
    checkout: z.string().default('').catch(''),
    rooms: z.string().default('2').catch('2'),
  })
  .transform(data => {
    const { validatedCheckin, validatedCheckout } = validateCheckinAndCheckoutDates({
      checkin: data.checkin,
      checkout: data.checkout,
    })
    data.checkin = validatedCheckin
    data.checkout = validatedCheckout

    return data
  })

export type AvailabilitySearchParams = z.infer<typeof AvailabilitySearchParams>
