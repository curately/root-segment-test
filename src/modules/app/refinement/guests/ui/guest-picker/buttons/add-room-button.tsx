import { Button } from '@/shared/ui/button'
import { transformInternalStateToUrl } from '../../../../guests/domain/guests-domain'
import { useGuestPicker } from '../../../../guests/domain/use-guest-picker'
import { useActions } from '../../../../shared/domain/use-refinements-store'

interface Props {
  children: React.ReactNode
}
export function AddRoomButton({ children }: Props) {
  const { internalRoomsState, maxRoomsReached } = useGuestPicker()
  console.log('internalRoomsState', internalRoomsState)
  const { setRooms } = useActions()

  if (maxRoomsReached) {
    return null
  }

  return (
    <Button
      variant="outline"
      //disabled={maxRoomsReached}
      onClick={() => {
        const newRooms = [
          ...internalRoomsState,
          {
            adults: 1,
            children: [],
          },
        ]
        console.log('newRooms', newRooms)
        console.log(transformInternalStateToUrl(newRooms))
        setRooms(transformInternalStateToUrl(newRooms))
      }}
    >
      {children}
    </Button>
  )
}
