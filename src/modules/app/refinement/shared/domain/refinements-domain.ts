import { z } from 'zod'
import { validateCheckinAndCheckoutDates } from '../../dates/domain/validate-travel-dates'

type ZodData = {
  [key: string]: string
}

export const Refinements = z
  .object({
    location: z.string().catch(''),
    checkin: z.string().catch(''),
    checkout: z.string().catch(''),
    amenities: z.string().catch(''),
    offset: z.string().catch(''),
    limit: z.string().catch(''),
    returnType: z.string().catch(''),
    lng: z.string().catch(''),
    lat: z.string().catch(''),
    type: z.string().catch(''),
    tc: z.string().catch(''),
    rooms: z.string().catch(''),
    cache: z.string().optional().catch(''),
    modalOpen: z.string().optional().catch(''),
  })
  .transform(data => {
    // this is a good place to do some validation on the checkin and checkout date
    if (data.checkin && data.checkout) {
      const { validatedCheckin, validatedCheckout } = validateCheckinAndCheckoutDates({
        checkin: data.checkin,
        checkout: data.checkout,
      })
      data.checkin = validatedCheckin ?? ''
      data.checkout = validatedCheckout ?? ''
    }

    return data
  })

export type Refinements = z.infer<typeof Refinements>

export const CleanRefinements = Refinements.transform((data: ZodData) => {
  // remove empty values from the refinements
  for (const key in data) {
    if (data[key] === '') {
      delete data[key]
    }
  }

  // type, lat, and lng are only needed if the user is searching for a hotel
  if (data.type !== 'hotel') {
    delete data.type
    //delete data.lat
    //delete data.lng
  }
  return data
})
export type CleanRefinements = z.infer<typeof Refinements>

export const AvailabilityRefinements = z
  .object({
    checkin: z.string().catch(''),
    checkout: z.string().catch(''),
    rooms: z.string().catch(''),
    propertyId: z.string().optional().catch(''),
  })
  .transform(data => {
    // this is a good place to do some validation on the checkin and checkout date
    if (data.checkin && data.checkout) {
      const { validatedCheckin, validatedCheckout } = validateCheckinAndCheckoutDates({
        checkin: data.checkin,
        checkout: data.checkout,
      })
      data.checkin = validatedCheckin ?? ''
      data.checkout = validatedCheckout ?? ''
    }

    return data
  })

export const CleanAvailabilityRefinements = AvailabilityRefinements.transform((data: ZodData) => {
  // remove empty values from the refinements
  for (const key in data) {
    if (data[key] === '') {
      delete data[key]
    }
  }

  // type, lat, and lng are only needed if the user is searching for a hotel
  if (data.type !== 'hotel') {
    delete data.type
    delete data.lat
    delete data.lng
  }
  return data
})
export type CleanAvailabilityRefinements = z.infer<typeof Refinements>
