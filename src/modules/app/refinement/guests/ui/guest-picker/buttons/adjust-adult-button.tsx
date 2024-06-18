import {
  getTotalAdults,
  getTotalAdultsAndChildren,
  transformInternalStateToUrl,
  type Rooms,
} from '../../../../guests/domain/guests-domain'
import { useActions } from '../../../../shared/domain/use-refinements-store'

interface changeAdultButtonProps {
  roomIndex: number
  increment: -1 | 1
  children: React.ReactNode
  rooms: Rooms
}

export function AdjustAdultButton({ roomIndex, increment, children, rooms }: changeAdultButtonProps) {
  //const [roomsQuery, setRoomsQuery] = useQueryState('rooms')

  const { setRooms } = useActions()
  function adjustTotal(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault()
    const newRooms = rooms.map((room, i) => {
      if (i === roomIndex) {
        return {
          ...room,
          adults: room.adults + increment,
        }
      }
      return room
    })
    setRooms(transformInternalStateToUrl(newRooms))
  }
  const disabled =
    increment === -1 ? getTotalAdults(rooms) < 2 : getTotalAdults(rooms) > 11 || getTotalAdultsAndChildren(rooms) > 13
  return (
    <button className="cursor-pointer" disabled={disabled} onClick={adjustTotal}>
      {children}
    </button>
  )
}
