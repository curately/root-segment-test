'use client'

import { GuestPicker } from '@/app/refinement/guests/ui/guest-picker/guest-picker'
import { useApplyRefinements } from '@/app/refinement/shared/domain/use-apply-refinements'
import { useRefinements } from '@/app/refinement/shared/domain/use-refinements'
import { useActions as useRoomActions } from '@/app/refinement/shared/domain/use-refinements-store'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { useState } from 'react'
import { X as CancelIcon } from 'react-feather'
import { Button } from '@/shared/ui/button'

interface Props {
  propertyId: string
}

const modalClassNames = {
  base: 'min-h-[calc(100%-2.5rem)] md:max-h-[calc(100%-7.5rem)]',
  backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 ',
  header: 'border-b border-b-pill',
  footer: ' bg-white min-h-[5.5rem] rounded-b rounded-b-xl border-t border-t-pill ',
  closeButton: 'top-3 right-2 ',
}

export function GuestModal({ propertyId }: Props) {
  const { updateAvailability } = useApplyRefinements()

  const [checkAvailabilityHasBeenClicked, setCheckAvailabilityHasBeenClicked] = useState(false)

  const { setRooms } = useRoomActions()

  const [showApply] = useState(true)

  const { checkin, checkout } = useRefinements()

  return (
    <>
      <Modal
        isOpen={true}
        onClose={() => {
          updateAvailability()
          /*
          const currentSearchParamsWithoutModal = {
            ...setRefinements,
            propertyId: propertyId,
          }

          router.push(pathName + buildQueryString(currentSearchParamsWithoutModal), { scroll: false })
          */
        }}
        size="lg"
        scrollBehavior="inside"
        backdrop="opaque"
        classNames={{
          ...modalClassNames,
          base: 'max-h-[calc(100%-2.5rem)] md:max-h-[calc(100%-7.5rem)]',
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
              <ModalBody className="py-8">
                <GuestPicker />
              </ModalBody>
              <ModalFooter>
                {showApply && (
                  <div className="flex items-center justify-between w-full">
                    <a
                      className="text-lg underline cursor-pointer text-brand"
                      onClick={() => {
                        setRooms('2')
                      }}
                    >
                      Clear rooms
                    </a>
                    <Button
                      variant="cta"
                      className="py-1 text-sm"
                      fullWidth={false}
                      onClick={() => {
                        setCheckAvailabilityHasBeenClicked(true)
                        /*
                        const currentSearchParamsWithoutModal = {
                          ...setRefinements,
                          propertyId: propertyId,
                        }

                        router.push(pathName + buildQueryString(currentSearchParamsWithoutModal), { scroll: false })
                        */
                        updateAvailability()
                      }}
                    >
                      <span className="hidden md:block">
                        <AvailabilityButtonText
                          checkAvailabilityHasBeenClicked={checkAvailabilityHasBeenClicked}
                          checkin={checkin}
                          checkout={checkout}
                        />
                      </span>
                      <span className="md:hidden">Apply</span>
                    </Button>
                  </div>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
interface ButtonProps {
  checkAvailabilityHasBeenClicked: boolean
  checkin: string | null
  checkout: string | null
}
function AvailabilityButtonText(props: ButtonProps) {
  if (props.checkAvailabilityHasBeenClicked) {
    return 'Checking availability'
  }

  if (props.checkin === '' || props.checkout === '' || !props.checkin || !props.checkout) {
    return 'Apply'
  }
  return 'Check availability'
}
