import { formatGuests, formatRoomStay } from '../ui/helpers'

type Props = {
  totalPrice: number | null
  lengthOfStay: number
  rooms: string
}

export function TripSummary({ totalPrice, lengthOfStay, rooms }: Props) {
  return (
    <>
      <div className="flex justify-between">
        <div>Guests</div>
        <div>{formatGuests({ rooms: rooms })}</div>
      </div>
      <div className="mt-1 flex justify-between">
        <div>Rooms</div>
        <div>{formatRoomStay(rooms)}</div>
      </div>
      <div className="mt-1 flex justify-between">
        <div>Trip duration</div>
        <div>{lengthOfStay} nights</div>
      </div>
      <div className="mt-1 flex justify-between">
        <div>Estimated total price</div>
        <div className="text-xl font-bold">
          £{totalPrice && <span>{new Intl.NumberFormat('en-US').format(Math.round(totalPrice))}</span>}
        </div>
      </div>
    </>
  )
}
