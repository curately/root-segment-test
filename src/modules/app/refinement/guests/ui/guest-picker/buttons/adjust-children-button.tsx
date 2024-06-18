import {
  getTotalAdultsAndChildren,
  getTotalChildren,
  transformInternalStateToUrl,
  type Rooms,
} from '../../../../guests/domain/guests-domain'
import { useActions } from '../../../../shared/domain/use-refinements-store'

interface Props {
  roomIndex: number
  increment: -1 | 1
  children: React.ReactNode
  rooms: Rooms
}

export function AdjustChildrenButton({ roomIndex, increment, children, rooms }: Props) {
  const { setRooms } = useActions()
  const room = rooms[roomIndex] ?? { adults: 0, children: [] }

  function adjustTotal(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault()
    const newRooms = rooms.map((room, i) => {
      if (i === roomIndex) {
        return {
          ...room,
          children: increment === -1 ? room.children.slice(0, -1) : [...room.children, 0],
        }
      }
      return room
    })

    setRooms(transformInternalStateToUrl(newRooms))
  }
  const disabled =
    increment === -1
      ? room.children.length < 1
      : room.children.length > 5 || getTotalChildren(rooms) > 11 || getTotalAdultsAndChildren(rooms) > 13
  return (
    <button className="cursor-pointer" disabled={disabled} onClick={adjustTotal}>
      {children}
    </button>
  )
}
