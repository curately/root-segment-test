import { getLocalTimeZone, today } from '@internationalized/date'
import { Button } from '@nextui-org/button'
import { Chip } from '@nextui-org/chip'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { type DateRange } from '@react-types/datepicker'
import { useRef, useState } from 'react'
import { useDateFormatter } from 'react-aria'
import { X as CancelIcon } from 'react-feather'
import { useCalendarModal, useActions as useModalActions } from '@/shared/domain/use-modal-store'
import { CalendarHasRangeSelected } from '../../dates/domain/calendar-has-range-selected'
import { Calendar } from '../../dates/ui/calendar/calendar'
import { useRefinements } from '../../shared/domain/use-refinements'
import { useActions, useCheckin, useCheckout } from '../../shared/domain/use-refinements-store'

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

interface Props {
  triggerSearchModal?: boolean
}

export function CalendarModal({ triggerSearchModal = true }: Props) {
  const checkin = useCheckin()
  const checkout = useCheckout()
  const { setCheckin, setCheckout } = useActions()
  //const { initialCalendarDate } = useInitialSearchFilterValues()
  const { calendarDateRange: initialCalendarDate } = useRefinements()

  const { closeCalendarModal, openSearchModal } = useModalActions()

  const isOpen = useCalendarModal()
  const applyRef = useRef<HTMLDivElement>(null)

  const formatter = useDateFormatter({
    month: 'short',
    day: 'numeric',
    timeZone: getLocalTimeZone(),
  })

  const [showApply, setShowApply] = useState(checkin !== '' && checkout !== '' ? true : false)

  const handleChanges = (newDateRange: DateRange) => {
    const calendarHasRangeSelected = CalendarHasRangeSelected({
      newDateRange: newDateRange,
    })

    if (calendarHasRangeSelected) {
      setCheckin(newDateRange.start.toString().split('T')[0] ?? '')
      setCheckout(newDateRange.end.toString().split('T')[0] ?? '')
    } else {
      setCheckin(null)
      setCheckout(null)
    }

    if (newDateRange.start.toString() !== newDateRange.end.toString()) {
      setShowApply(true)
    } else {
      setShowApply(false)
    }

    {
      showApply && applyRef.current?.classList?.remove('hidden')
    }
  }

  function cancelDates() {
    setCheckin(null)
    setCheckout(null)
    setShowApply(false)
  }
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          closeCalendarModal()
          openSearchModal()
        }}
        size="lg"
        key="calendarModal"
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
              <ModalHeader>
                {checkin && checkout && checkin !== '' && checkout !== '' ? (
                  <>
                    <Chip
                      variant="solid"
                      radius="full"
                      className="font-bold border border-gray-300 bg-ivory"
                      onClose={cancelDates}
                    >
                      {formatter.formatRange(new Date(checkin), new Date(checkout))}
                    </Chip>
                  </>
                ) : (
                  <span>Choose dates</span>
                )}
              </ModalHeader>
              <ModalBody>
                <div className="">
                  <Calendar
                    key="calendarModalBody"
                    defaultValue={initialCalendarDate}
                    minValue={today(getLocalTimeZone())}
                    value={initialCalendarDate}
                    autoFocus={true}
                    onChange={handleChanges}
                    mobile={true}
                  />
                </div>
              </ModalBody>
              {showApply && (
                <ModalFooter>
                  <div className="absolute bottom-0 left-0 flex items-center justify-center w-full h-24 px-4 pt-4 bg-white modal-footer">
                    <div className="left-0 w-full mt-6 mb-8 bg-white border-t border-ivory">
                      <div className="flex items-center justify-between px-4 pt-4">
                        <a
                          className="text-lg underline cursor-pointer underline-brand-600 text-dark decoration-brand-600 decoration-1 underline-offset-4"
                          onClick={cancelDates}
                        >
                          Clear
                        </a>
                        <Button
                          variant="flat"
                          radius="full"
                          fullWidth={false}
                          className="font-bold text-white bg-brand-600"
                          onClick={() => {
                            closeCalendarModal()
                            if (triggerSearchModal) {
                              openSearchModal()
                            }
                          }}
                        >
                          OK
                        </Button>
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
