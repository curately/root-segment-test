import { env } from 'env'
import { z } from 'zod'

const noAvailability = {
  hcomId: '',
  available: false,
  averageNightlyPrice: '',
  totalPrice: '',
  deepLink: '',
}

const noAvailabilitySingleProperty = {
  hcomId: '',
  available: false,
  averageNightlyPrice: '',
  totalPrice: '',
  deepLink: '',
  numAdults: 0,
  numChildren: 0,
  lengthOfStay: 0,
}

const RoomTypesSchema = z
  .array(
    z.object({
      Price: z.object({
        AvgNightlyRate: z.object({
          Value: z.string(),
          Currency: z.string(),
        }),
        TotalPriceWithHotelFees: z.object({
          Value: z.string(),
          Currency: z.string(),
        }),
      }),
    }),
  )
  .optional()

// used to parse the expedia resonse from Search
export const SearchResultsResponse = z.object({
  TotalHotelCount: z.number(),
  LengthOfStay: z.number(),
  NumberOfRooms: z.number(),
  Hotels: z.array(
    z
      .object({
        Status: z.string(),
        HcomId: z.string(),
        RoomTypes: RoomTypesSchema,
      })
      .transform(data => {
        const firstRoomType = data.RoomTypes && data.RoomTypes[0] ? data.RoomTypes[0] : null
        if (!firstRoomType) {
          return noAvailability
        }
        return {
          hcomId: data.HcomId,
          available: data.Status === 'AVAILABLE' ? true : false,
          averageNightlyPrice: firstRoomType.Price.AvgNightlyRate.Value,
          totalPrice: firstRoomType.Price.TotalPriceWithHotelFees.Value,
        }
      }),
  ),
})

// used to parse the expedia resonse from Check Availability

export const SinglePropertyResponse = z
  .object({
    TotalHotelCount: z.number(),
    LengthOfStay: z.number().optional(),
    NumberOfRooms: z.number(),
    Occupants: z.array(
      z.object({
        Adults: z.number(),
        ChildAges: z.array(z.number()).optional(),
      }),
    ),
    Hotels: z.array(
      z.object({
        Status: z.string(),
        HcomId: z.string(),
        Links: z.object({
          WebSearchResult: z.object({
            Href: z.string(), //uk.hotels.com/PPCHotelDetails?adults=2&numberOfRooms=1&hotelid=180295&locale=en_GB&arrivalDate=04/07/2024&adultsPerRoom=2&view=prices&pos=HCOM_UK&regionId=500520&rateplanid=1027445&departureDate=11/07/2024&rm1=a2"
          }),
        }),
        RoomTypes: RoomTypesSchema,
      }),
    ),
  })
  .transform(({ Hotels, Occupants, ...rest }) => {
    const firstHotel = Hotels[0]
    if (!firstHotel) {
      return noAvailabilitySingleProperty
    }

    const firstRoomType = firstHotel.RoomTypes ? firstHotel.RoomTypes[0] : null
    if (!firstRoomType) {
      return noAvailabilitySingleProperty
    }

    return {
      hcomId: firstHotel.HcomId,
      available: firstHotel.Status === 'AVAILABLE' ? true : false,
      averageNightlyPrice: firstRoomType.Price.AvgNightlyRate.Value,
      totalPrice: firstRoomType.Price.TotalPriceWithHotelFees.Value,
      numAdults: Occupants.reduce((sum, occupant) => sum + occupant.Adults, 0),
      numChildren: Occupants.reduce((sum, occupant) => sum + (occupant.ChildAges ? occupant.ChildAges.length : 0), 0),
      deepLink: buildAffiliateLink(firstHotel.Links.WebSearchResult.Href),
      lengthOfStay: rest.LengthOfStay ? rest.LengthOfStay : 0,
    }
  })

export type SinglePropertyResponse = z.infer<typeof SinglePropertyResponse>

function buildAffiliateLink(expediaDeepLink: string) {
  if (env.NODE_ENV === 'development') {
    return expediaDeepLink
  }
  const affiliateLink = `${env.NEXT_PUBLIC_PARTNERIZE_BASE_AFF_LINK}${expediaDeepLink}`
  return affiliateLink
}
