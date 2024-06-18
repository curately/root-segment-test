import { MinusCircle, PlusCircle } from 'react-feather'
import { getTotalAdults, getTotalAdultsAndChildren, type Rooms } from '../../../guests/domain/guests-domain'
import { AdjustAdultButton } from '../../../guests/ui/guest-picker/buttons/adjust-adult-button'

interface Props {
  roomIndex: number
  rooms: Rooms
}
export function AdultsRange({ roomIndex, rooms }: Props) {
  const room = rooms[roomIndex] ?? { adults: 0, children: [] }

  return (
    <>
      <div className="text-base">Adults</div>
      <div className="flex gap-3">
        <AdjustAdultButton roomIndex={roomIndex} increment={-1} rooms={rooms}>
          <MinusCircle
            className={`md:hover:text-primary h-8 w-8 text-medium ${getTotalAdults(rooms) < 2 ? 'opacity-30' : ''}`}
            strokeWidth={1}
          />
        </AdjustAdultButton>
        <div className="flex h-10 w-4 items-center justify-center text-lg">{room.adults}</div>
        <AdjustAdultButton roomIndex={roomIndex} increment={1} rooms={rooms}>
          <PlusCircle
            className={`md:hover:text-primary h-8 w-8 text-gray-600 ${
              getTotalAdults(rooms) > 11 || getTotalAdultsAndChildren(rooms) > 13 ? 'opacity-30' : ''
            }`}
            strokeWidth={1}
          />
        </AdjustAdultButton>
      </div>
    </>
  )
}
