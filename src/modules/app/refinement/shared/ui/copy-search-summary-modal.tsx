'use client'

import { useApplyRefinements } from '@/app/refinement/shared/domain/use-apply-refinements'
import { useRefinements } from '@/app/refinement/shared/domain/use-refinements'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal'
import { Calendar as CalendarIcon, X as CancelIcon, MapPin, Users } from 'react-feather'
import { useActions as useModalActions, useSearchModal } from '@/shared/domain/use-modal-store'
import { Button } from '@/shared/ui/button'

interface Props {
  autoCompleteInitialValue: string
}

export function SearchModal({ autoCompleteInitialValue = '' }: Props) {
  const { updateSearch } = useApplyRefinements()

  const {
    location: initialLocationValue,
    numberOfGuests: initialGuestsValue,
    displayDates: initialDisplayDateValue,
  } = useRefinements()

  const isOpen = useSearchModal()

  const { openDestinationModal, openCalendarModal, openGuestModal, closeSearchModal } = useModalActions()

  function handleSearch() {
    closeSearchModal()
    updateSearch()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        closeSearchModal()
      }}
      size="lg"
      scrollBehavior="inside"
      backdrop="opaque"
      key="searchModal"
      classNames={{
        base: 'min-h-[calc(100%-2.0rem)] md:max-h-[calc(100%-7.5rem)]',
        backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 ',
        header: 'border-b border-b-ivory',

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
            <ModalHeader>Edit your search</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4 pt-4">
                <button
                  onClick={() => {
                    openDestinationModal()
                  }}
                >
                  <div className="flex w-full  items-center  gap-2 rounded-lg  bg-gray-100 p-[16px] text-left text-lg font-semibold text-gray-950">
                    <div>
                      <MapPin size={22} className="text-slate-600" />
                    </div>
                    <div className="capitalize line-clamp-1">
                      {' '}
                      {!initialLocationValue || initialLocationValue === ''
                        ? autoCompleteInitialValue !== ''
                          ? autoCompleteInitialValue
                          : 'Add destination'
                        : initialLocationValue}
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    openCalendarModal()
                  }}
                >
                  <div className="flex w-full items-center gap-2  rounded-lg  bg-gray-100 p-[16px] text-left text-lg font-semibold text-gray-950">
                    <div>
                      <CalendarIcon size={22} className="text-slate-600" />
                    </div>
                    <div>{initialDisplayDateValue}</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    openGuestModal()
                  }}
                >
                  <div className="flex w-full items-center gap-2  rounded-lg  bg-gray-100 p-[16px] text-left text-lg font-semibold text-gray-950">
                    <div>
                      <Users size={22} className="text-gray-900" />
                    </div>
                    <div>{initialGuestsValue > 1 ? `${initialGuestsValue} guests` : `1 guest`}</div>
                  </div>
                </button>
                <div>
                  <Button variant="primary" className="w-full" onClick={handleSearch}>
                    Search
                  </Button>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
