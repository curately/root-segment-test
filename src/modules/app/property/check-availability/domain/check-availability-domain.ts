/*
import { env } from 'env'
import { dkiuskfusduf, roomTypes } from '@/shared/domain/price-and-availability-domain'
import { z } from 'zod'

export const ExpediaPropertyResponse = dkiuskfusduf
  .merge(
    z.object({
      Links: z.object({
        WebSearchResult: z.object({
          Href: z.string(), //uk.hotels.com/PPCHotelDetails?adults=2&numberOfRooms=1&hotelid=180295&locale=en_GB&arrivalDate=04/07/2024&adultsPerRoom=2&view=prices&pos=HCOM_UK&regionId=500520&rateplanid=1027445&departureDate=11/07/2024&rm1=a2"
        }),
      }),
      Occupants: z.array(
        z.object({
          Adults: z.number(),
          ChildAges: z.array(z.number()).optional(),
        }),
      ),
    }),
  )
  .transform(({ HcomId, Status, Links, Occupants, RoomTypes, ...rest }) => {
    const firstRoomType = RoomTypes && RoomTypes[0] ? RoomTypes[0] : null
    return {
      hcomId: HcomId,
      deepLink: buildAffiliateLink(Links.WebSearchResult.Href),
      available: Status === 'AVAILABLE' ? true : false,
      averageNightlyPrice: firstRoomType ? firstRoomType.Price.AvgNightlyRate.Value : null,
      totalPrice: firstRoomType ? firstRoomType.Price.TotalPriceWithHotelFees.Value : null,
      //numberOfNights: LengthOfStay ? LengthOfStay : 0,
      numAdults: Occupants.reduce((sum, occupant) => sum + occupant.Adults, 0),
      numChildren: Occupants.reduce((sum, occupant) => sum + (occupant.ChildAges ? occupant.ChildAges.length : 0), 0),
      ...rest,
    }
  })
export type ExpediaPropertyResponse = z.infer<typeof ExpediaPropertyResponse>

export const ExpediaPropertyResultsResponse = z.object({
  TotalHotelCount: z.number(),
  LengthOfStay: z.number().optional(),
  NumberOfRooms: z.number(),
  Hotels: z.array(ExpediaPropertyResponse),
})
export type ExpediaPropertyResultsResponse = z.infer<typeof ExpediaPropertyResultsResponse>
/*
export const RoomAvailability = z
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
    Hotel: z.object({
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
  })
  .transform(({ LengthOfStay, Occupants, Hotel, ...rest }) => {
    const property = Hotel ?? {
      Status: null,
      RoomTypes: null,
      Links: {
        WebSearchResult: {
          Href: '',
        },
      },
    }
    const {
      Status,
      RoomTypes,
      Links: {
        WebSearchResult: { Href: deepLink },
      },
    } = property

    return {
      status: property.available ? 'available' : 'unavailable',
      totalPrice:
        'RoomTypes' in Hotel && RoomTypes && RoomTypes[0] ? parseFloat(RoomTypes[0].Price.TotalPrice.Value ?? '0') : 0,
      deepLink: buildAffiliateLink(deepLink),
      numberOfNights: LengthOfStay ? LengthOfStay : 0,
      numAdults: Occupants.reduce((sum, occupant) => sum + occupant.Adults, 0),
      numChildren: Occupants.reduce((sum, occupant) => sum + (occupant.ChildAges ? occupant.ChildAges.length : 0), 0),
      ...rest,
    }
  })

export type RoomAvailability = z.infer<typeof RoomAvailability>
*/

/*
function buildAffiliateLink(expediaDeepLink: string) {
  console.log(env.NODE_ENV)
  console.log(expediaDeepLink)
  if (env.NODE_ENV === 'development') {
    return expediaDeepLink
  }
  const affiliateLink = `${env.NEXT_PUBLIC_PARTNERIZE_BASE_AFF_LINK}${expediaDeepLink}`
  return affiliateLink
}
*/
