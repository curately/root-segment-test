import { transformInternalStateToUrl } from '../../../../guests/domain/guests-domain'
import { useGuestPicker } from '../../../../guests/domain/use-guest-picker'
import { useActions } from '../../../../shared/domain/use-refinements-store'

interface Props {
  roomIndex: number
  children: React.ReactNode
}
export function RemoveRoomButton({ roomIndex, children }: Props) {
  const { internalRoomsState } = useGuestPicker()
  const { setRooms } = useActions()

  return (
    <button
      className="cursor-pointer text-base font-bold text-brand-600 underline"
      onClick={() => {
        const newRooms = internalRoomsState.filter((_, index) => {
          if (index === roomIndex) {
            return false
          }
          return true
        })
        setRooms(transformInternalStateToUrl(newRooms))
      }}
    >
      {children}
    </button>
  )
}
