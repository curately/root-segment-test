import { Select, SelectItem } from '@nextui-org/select'
import { childAges, ordinal, transformInternalStateToUrl, type Rooms } from '../../../guests/domain/guests-domain'
import { useActions } from '../../../shared/domain/use-refinements-store'

interface Props {
  roomIndex: number
  rooms: Rooms
}

export function Children({ roomIndex, rooms }: Props) {
  const { setRooms } = useActions()
  const room = rooms[roomIndex]

  return (
    <>
      {room?.children.map((child, index) => {
        return (
          <Select
            key={index}
            //placeholder="Select age"
            variant="flat"
            items={childAges}
            label={`${ordinal(index + 1)} child`}
            className="max-w-xs"
            defaultSelectedKeys={[child.toString()]}
            classNames={
              {
                //label: 'text-slate-500',
                //label: ' text-slate-500 text-sm font-semibold border border-red-500 w-full',
                //trigger: 'min-h-unit-16',
                //listboxWrapper: 'max-h-[400px]',
              }
            }
            listboxProps={{
              itemClasses: {
                base: [
                  'rounded-md',
                  'text-dark',
                  'transition-opacity',
                  'data-[hover=true]:text-foreground',
                  'data-[hover=true]:bg-default-100',
                  'dark:data-[hover=true]:bg-default-50',
                  'data-[selectable=true]:focus:bg-default-50',
                  'data-[pressed=true]:opacity-70',
                  'data-[focus-visible=true]:ring-default-500',
                ],
              },
            }}
            popoverProps={{
              classNames: {
                base: 'p-0 border-small border-0 bg-white',
                arrow: 'bg-default-200',
              },
            }}
            onChange={e => {
              let newArray = [...room.children]

              newArray[index] = parseInt(e.target.value)

              const newRoom = rooms.map((room, index) => {
                if (index === roomIndex) {
                  return {
                    ...room,
                    children: newArray,
                  }
                }
                return room
              })

              setRooms(transformInternalStateToUrl(newRoom))
            }}
          >
            {option => <SelectItem key={option.value}>{option.label}</SelectItem>}
          </Select>
        )
      })}
    </>
  )
}
