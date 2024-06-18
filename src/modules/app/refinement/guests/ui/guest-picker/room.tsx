import { type Rooms } from '../../../guests/domain/guests-domain'
import { AdultsRange } from '../../../guests/ui/guest-picker/adults-range'
import { RemoveRoomButton } from '../../../guests/ui/guest-picker/buttons/remove-room-button'
import { Children } from '../../../guests/ui/guest-picker/children'
import { ChildrenRange } from '../../../guests/ui/guest-picker/children-range'

interface Props {
  roomIndex: number
  rooms: Rooms
}
export function Room({ roomIndex, rooms }: Props) {
  return (
    <div className="my-4 border border-t border-red-500 border-t-pill pt-6 first:mt-0 first:border-none first:pt-0">
      <div className="flex items-center justify-between">
        <div className="text-xl ">Room {roomIndex + 1}</div>
        {roomIndex > 0 && (
          <>
            <RemoveRoomButton roomIndex={roomIndex}>Remove</RemoveRoomButton>
          </>
        )}
      </div>
      <div className="flex items-center justify-between pt-2">
        <AdultsRange roomIndex={roomIndex} rooms={rooms} />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <ChildrenRange roomIndex={roomIndex} rooms={rooms} />
      </div>
      <div className="mt-4 grid w-full grid-cols-2 gap-4">
        <Children roomIndex={roomIndex} rooms={rooms} />
      </div>
    </div>
  )
}
