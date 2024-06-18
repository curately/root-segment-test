'use client'

import { Calendar } from '@/app/refinement/dates/ui/calendar/calendar'
import { Refinements } from '@/app/refinement/shared/domain/refinements-domain'
import { useApplyRefinements } from '@/app/refinement/shared/domain/use-apply-refinements'
import { useRefinements } from '@/app/refinement/shared/domain/use-refinements'
import { useActions } from '@/app/refinement/shared/domain/use-refinements-store'
import { getLocalTimeZone, parseDate, today } from '@internationalized/date'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { type DateRange } from '@react-types/datepicker'
import { useState } from 'react'
import { X as CancelIcon } from 'react-feather'
import { Button } from '@/shared/ui/button'

interface dateFormat {
  month: 'short' | 'numeric' | '2-digit' | 'long' | 'narrow'
  day: 'numeric' | '2-digit'
  timeZone: string
}

const dateFormat: dateFormat = {
  month: 'short',
  day: 'numeric',
  timeZone: getLocalTimeZone(),
}

type Props = {
  propertyId: string
}

export function AvailabilityModal({ propertyId }: Props) {
  console.log('propertyId', propertyId)
  const { setCheckin, setCheckout } = useActions()
  const refinements = useRefinements()
  const setRefinements = Refinements.parse(refinements)

  const [checkAvailabilityHasBeenClicked, setCheckAvailabilityHasBeenClicked] = useState(false)

  const [selectedDates, setSelectedDates] = useState<DateRange>(getDefaultDate(setRefinements))
  const { updateAvailability } = useApplyRefinements({
    checkin: selectedDates.start.toString(),
    checkout: selectedDates.end.toString(),
    propertyId: propertyId,
  })
  function handleChanges(newDateRange: DateRange) {
    setCheckin(newDateRange.start.toString())
    setCheckout(newDateRange.end.toString())
    setSelectedDates(newDateRange)
  }

  function getDefaultDate(refinements: Refinements) {
    const { checkin, checkout } = refinements
    if (!checkin || !checkout || checkin === '' || checkout === '') {
      return {
        start: parseDate('1971-01-01'),
        end: parseDate('1971-01-01'),
      }
    }
    return {
      start: parseDate(checkin),
      end: parseDate(checkout),
    }
  }

  function closeModal() {
    //updateAvailability()
  }

  function clearDates() {
    setSelectedDates({
      start: parseDate('1971-01-01'),
      end: parseDate('1971-01-01'),
    })
  }

  function checkAvailability() {
    setCheckAvailabilityHasBeenClicked(true)
    updateAvailability()
  }

  return (
    <>
      <Modal
        isOpen={true}
        onClose={closeModal}
        size="2xl"
        key="calendarModal"
        scrollBehavior="inside"
        backdrop="opaque"
        radius="lg"
        classNames={{
          base: 'max-h-[calc(100%-2.5rem)] md:max-h-[calc(100%-7.5rem)]',
          backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 ',
          header: 'border-b border-b-pill',
          footer: 'bg-white min-h-[2.5rem]   bg-ivory/50 rounded-xl border-t border-t-ivory',
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
              <ModalHeader>Select Dates</ModalHeader>
              <ModalBody>
                <div className="hidden py-12 md:block">
                  <Calendar
                    key="calendarModalBody"
                    minValue={today(getLocalTimeZone())}
                    value={selectedDates}
                    autoFocus={true}
                    onChange={handleChanges}
                    pageBehavior="single"
                  />
                </div>
                <div className="md:hidden">
                  <Calendar
                    key="calendarModalBody"
                    minValue={today(getLocalTimeZone())}
                    value={selectedDates}
                    autoFocus={true}
                    onChange={handleChanges}
                    pageBehavior="single"
                    mobile={true}
                  />
                </div>
              </ModalBody>
              {selectedDates.start.toString() !== selectedDates.end.toString() && (
                <ModalFooter>
                  <div className="left-0 flex items-center justify-center w-full modal-footer ">
                    <div className="left-0 w-full">
                      <div className="flex items-center justify-between">
                        <>
                          <a className="text-lg underline cursor-pointer text-brand" onClick={clearDates}>
                            Clear dates
                          </a>
                          <Button
                            variant="accent"
                            effect="blur"
                            size="lg"
                            fullWidth={false}
                            onClick={checkAvailability}
                          >
                            <span className="hidden md:block">
                              <AvailabilityButtonText
                                checkAvailabilityHasBeenClicked={checkAvailabilityHasBeenClicked}
                              />
                            </span>
                            <span className="md:hidden">Apply</span>
                          </Button>
                        </>
                      </div>
                    </div>
                  </div>
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

function AvailabilityButtonText({ checkAvailabilityHasBeenClicked }: { checkAvailabilityHasBeenClicked: boolean }) {
  if (checkAvailabilityHasBeenClicked) {
    return 'checking availability...'
  }
  return 'Check availability'
}
