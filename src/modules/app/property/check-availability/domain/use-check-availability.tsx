//import { RoomAvailability } from '@/property/check-availability/domain/check-availability-domain'
import { useQuery } from '@tanstack/react-query'

import { SinglePropertyResponse } from '@/shared/domain/price-and-availability-domain'

import { checkAvailability } from '../data-access/check-availability-data-access'

type Props = {
  checkin: string | null
  checkout: string | null
  rooms: string | null
  propertyId: string
}

export function useGetAvailability({ checkin, checkout, rooms, propertyId }: Props) {
  return useQuery<SinglePropertyResponse | null, Error>({
    queryKey: ['room-availability', { checkin, checkout, rooms }],
    queryFn: async () => {
      if (!checkin || !checkout) {
        return null
      }
      const { data, errors } = await checkAvailability({
        checkin,
        checkout,
        propertyId,
        rooms,
      })
      if (errors || !data) {
        return null
      }
      return data
    },
  })
}
