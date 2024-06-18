'use client'

import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar as CalendarIcon, X as CancelIcon, ChevronDown, Edit, MapPin, Users } from 'react-feather'
import {
  useCalendarModal,
  useDestinationModal,
  useGuestModal,
  useActions as useModalActions,
  useSearchModal,
} from '@/shared/domain/use-modal-store'
import { Button } from '@/shared/ui/button'
import { useApplyRefinements } from '../../shared/domain/use-apply-refinements'
import { useRefinements } from '../../shared/domain/use-refinements'
import { CalendarModal } from '../../shared/ui/non-modals/dates'
import { GuestModal } from '../../shared/ui/non-modals/guests'
import { LocationSearch } from '../../shared/ui/non-modals/location'

interface Props {
  autoCompleteInitialValue: string
}

export function SearchModal({ autoCompleteInitialValue = '' }: Props) {
  const { updateSearch } = useApplyRefinements()
  const calendarModalIsOpen = useCalendarModal()
  const destinationModalIsOpen = useDestinationModal()
  const guestModalIsOpen = useGuestModal()
  const {
    location: initialLocationValue,
    numberOfGuests: initialGuestsValue,
    displayDates: initialDisplayDateValue,
  } = useRefinements()

  const isOpen = useSearchModal()

  const {
    openDestinationModal,
    openCalendarModal,
    openGuestModal,
    closeSearchModal,
    closeGuestModal,
    closeDestinationModal,
    closeCalendarModal,
  } = useModalActions()

  function handleSearch() {
    closeSearchModal()
    updateSearch()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (!destinationModalIsOpen && !calendarModalIsOpen && !guestModalIsOpen) {
          closeSearchModal()
        } else {
          closeGuestModal()
          closeDestinationModal()
          closeCalendarModal()
        }
        //closeSearchModal()
      }}
      size="lg"
      scrollBehavior="inside"
      backdrop="opaque"
      key="searchModal"
      classNames={{
        //base: 'min-h-[calc(100%-2.0rem)] md:max-h-[calc(100%-7.5rem)]',
        backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 ',
        //header: 'border-b border-b-ivory',

        closeButton: 'top-3 right-2 ',
      }}
      closeButton={
        <div className="top-4">
          {destinationModalIsOpen || calendarModalIsOpen || guestModalIsOpen ? (
            <ChevronDown className="w-5 h-5 font-bold text-dark/70" aria-hidden="true" />
          ) : (
            <CancelIcon className="w-5 h-5 font-bold text-dark/70" aria-hidden="true" />
          )}
        </div>
      }
    >
      <ModalContent>
        {isOpen => (
          <>
            <>
              <ModalHeader className="px-8 ">
                {destinationModalIsOpen && <span>Enter your location</span>}
                {calendarModalIsOpen && <span>Choose Dates</span>}
                {guestModalIsOpen && <span>Select guests</span>}
                {/*!destinationModalIsOpen && !guestModalIsOpen && !calendarModalIsOpen && <span>Edit your search</span>*/}
              </ModalHeader>
              <ModalBody>
                <AnimatePresence>
                  <motion.div
                    layoutId="wrapper"
                    animate={{
                      height:
                        calendarModalIsOpen || destinationModalIsOpen || guestModalIsOpen
                          ? guestModalIsOpen
                            ? 300 + 400
                            : 2000
                          : 300,
                    }}
                  >
                    {destinationModalIsOpen && <LocationSearch inputRef={null} />}
                    {calendarModalIsOpen && (
                      <motion.div
                        animate={{
                          opacity: calendarModalIsOpen ? 1 : 0,
                        }}
                      >
                        <CalendarModal />
                      </motion.div>
                    )}
                    {guestModalIsOpen && <GuestModal />}

                    <motion.div
                      className="flex flex-col gap-4 pt-4"
                      animate={{
                        opacity: !destinationModalIsOpen && !calendarModalIsOpen && !guestModalIsOpen ? 1 : 0,
                      }}
                    >
                      <button
                        onClick={() => {
                          openDestinationModal()
                        }}
                      >
                        <div className="flex w-full  items-center  gap-2 rounded-[20px]  bg-gray-100 p-[16px] text-left text-lg font-semibold text-gray-950">
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
                        <div className="flex w-full items-center gap-2  rounded-[20px]  bg-gray-100 p-[16px] text-left text-lg font-semibold text-gray-950">
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
                        <div className="flex w-full items-center gap-2  rounded-[20px]  bg-gray-100 p-[16px] text-left text-lg font-semibold text-gray-950">
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
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </ModalBody>
            </>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
