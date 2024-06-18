import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal'
import { useRef } from 'react'
import { X as CancelIcon } from 'react-feather'
import { useDestinationModal, useActions as useModalActions } from '@/shared/domain/use-modal-store'
import { LocationSearch } from '../../location/ui/location-search/location-search'

interface Props {
  autoCompleteInitialValue?: string
}
export function DestinationModal({ autoCompleteInitialValue = '' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const isOpen = useDestinationModal()

  const { closeDestinationModal } = useModalActions()
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeDestinationModal}
        size="lg"
        scrollBehavior="inside"
        backdrop="opaque"
        classNames={{
          base: 'min-h-[calc(100%-2.5rem)] md:max-h-[calc(100%-7.5rem)]',
          backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 ',
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
          <>
            <ModalHeader>Choose destination</ModalHeader>
            <ModalBody className="py-4">
              <LocationSearch inputRef={inputRef} inModal={true} initialValue={autoCompleteInitialValue} />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}
