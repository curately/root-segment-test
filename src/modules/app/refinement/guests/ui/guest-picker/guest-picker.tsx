import { useRef } from 'react'
import { useGuestPicker } from '../../../guests/domain/use-guest-picker'
import useGuestPickerScroller from '../../../guests/domain/use-guest-picker-scroller'
import { AddRoomButton } from '../../../guests/ui/guest-picker/buttons/add-room-button'
import { Room } from '../../../guests/ui/guest-picker/room'

export function GuestPicker() {
  const { internalRoomsState } = useGuestPicker()

  const bottomRef = useRef<HTMLDivElement | null>(null)

  useGuestPickerScroller(bottomRef, internalRoomsState)

  return (
    <>
      <div className="w-full bg-white md:px-4 lg:max-w-lg">
        <div className="flex flex-col gap-2">
          {internalRoomsState.map((room, roomIndex) => {
            return <Room key={roomIndex} roomIndex={roomIndex} rooms={internalRoomsState} />
          })}
        </div>
        <div className="mt-4 text-left">
          <AddRoomButton>Add room</AddRoomButton>
        </div>
      </div>
      <div ref={bottomRef} className="h-2"></div>
    </>
  )
}
