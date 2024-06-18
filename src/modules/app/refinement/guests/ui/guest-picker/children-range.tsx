import { MinusCircle, PlusCircle } from 'react-feather'
import { getTotalAdultsAndChildren, getTotalChildren } from '../../../guests/domain/guests-domain'
import { AdjustChildrenButton } from '../../../guests/ui/guest-picker/buttons/adjust-children-button'

interface Props {
  roomIndex: number
  rooms: any
}
export function ChildrenRange({ roomIndex, rooms }: Props) {
  const room = rooms[roomIndex]
  return (
    <>
      <div>
        <div className="text-base">Children</div>
        <div className="text-sm font-light">Age 0-17</div>
      </div>
      <div className="flex gap-3">
        <AdjustChildrenButton increment={-1} roomIndex={roomIndex} rooms={rooms}>
          <MinusCircle
            className={`md:hover:text-primary h-8 w-8 text-gray-600 ${
              room.children.length < 1 ? 'text-gray-600 opacity-30' : ''
            }`}
            strokeWidth={1}
          />
        </AdjustChildrenButton>
        <div className="flex h-10 w-4 items-center justify-center text-lg">{room.children.length}</div>
        <AdjustChildrenButton increment={1} roomIndex={roomIndex} rooms={rooms}>
          <PlusCircle
            className={`md:hover:text-primary h-8 w-8 text-gray-600 ${
              room.children.length > 5 || getTotalChildren(rooms) > 11 || getTotalAdultsAndChildren(rooms) > 13
                ? 'text-gray-600 opacity-30'
                : ''
            }`}
            strokeWidth={1}
          />
        </AdjustChildrenButton>
      </div>
    </>
  )
}
