import { useRef, useState } from 'react'
import { useGuestModal, useActions as useModalActions } from '@/shared/domain/use-modal-store'
import { Button } from '@/shared/ui/button'
import { GuestPicker } from '../../../guests/ui/guest-picker/guest-picker'
import { useActions } from '../../../shared/domain/use-refinements-store'

interface Props {
  triggerSearchModal?: boolean
}
export function GuestModal({ triggerSearchModal = true }: Props) {
  const { closeGuestModal, openSearchModal } = useModalActions()

  const { setRooms } = useActions()
  const isOpen = useGuestModal()
  const applyRef = useRef<HTMLDivElement>(null)

  const [showApply, setShowApply] = useState(true)
  /*
  const handleChanges = (newDateRange: DateRange) => {
    {
      showApply && applyRef.current?.classList?.remove('hidden')
    }
  }
*/
  return (
    <>
      <div>Select Guests</div>
      <div>
        <div className="py-4">
          <GuestPicker />
        </div>
      </div>
      <div>
        {showApply && (
          <div className="flex items-center justify-between w-full">
            <a
              className="text-lg underline cursor-pointer text-brand"
              onClick={() => {
                setRooms(null)
              }}
            >
              Clear rooms
            </a>
            <Button
              variant="cta"
              className="py-1 text-sm"
              fullWidth={false}
              onClick={() => {
                closeGuestModal()
                if (triggerSearchModal) {
                  openSearchModal()
                }
              }}
            >
              ApplyX
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
