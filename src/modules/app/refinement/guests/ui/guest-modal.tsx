import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { useRef, useState } from 'react'
import { X as CancelIcon } from 'react-feather'
import { useGuestModal, useActions as useModalActions } from '@/shared/domain/use-modal-store'
import { Button } from '@/shared/ui/button'
import { GuestPicker } from '../../guests/ui/guest-picker/guest-picker'
import { useActions } from '../../shared/domain/use-refinements-store'

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
    <Modal
      isOpen={isOpen}
      onClose={closeGuestModal}
      size="lg"
      scrollBehavior="inside"
      backdrop="opaque"
      /*
        classNames={{
          base: 'max-h-[calc(100%-2.5rem)] md:max-h-[calc(100%-7.5rem)] min-h-[500px]',
          header: 'border-b border-b-ivory ',
          footer: 'bg-ivory min-h-[5.5rem] rounded-xl bg-green-500',
          closeButton: 'top-3 right-2',
        }}
        */
      classNames={{
        base: 'min-h-[calc(100%-2.5rem)] md:max-h-[calc(100%-7.5rem)]',
        backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 ',
        header: 'border-b border-b-pill',
        footer: ' bg-white min-h-[5.5rem] rounded-b rounded-b-xl border-t border-t-pill ',
        closeButton: 'top-3 right-2 ',
      }}
      closeButton={
        <div className="top-4">
          <CancelIcon className="w-5 h-5 font-bold text-dark/70" aria-hidden="true" />
        </div>
      }
    >
      <ModalContent>
        {isOpen => (
          <>
            <ModalHeader>Select Guests</ModalHeader>
            <ModalBody>
              <div className="py-4">
                <GuestPicker />
              </div>
            </ModalBody>
            <ModalFooter>
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
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
