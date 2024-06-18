import { z } from 'zod'

export const HcomId = z.object({
  HcomId: z.string(),
})

const ExpediaRoomTypes = z.object({
  RoomTypes: z
    .array(
      z.object({
        Price: z.object({
          BaseRate: z.object({
            Value: z.string(),
            Currency: z.string(),
          }),
          TotalPrice: z.object({
            Value: z.string(),
            Currency: z.string(),
          }),
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
    .optional(),
})

export const Hotels = ExpediaRoomTypes.extend({
  Status: z.string(),
  Links: z.object({
    WebSearchResult: z.object({
      Method: z.string(),
      Href: z.string(),
    }),
  }),
})
