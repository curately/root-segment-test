import { getLocalTimeZone, today } from '@internationalized/date'
import { Button } from '@nextui-org/button'
import { Chip } from '@nextui-org/chip'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { type DateRange } from '@react-types/datepicker'
import { useRef, useState } from 'react'
import { useDateFormatter } from 'react-aria'
import { X as CancelIcon } from 'react-feather'
import { useCalendarModal, useActions as useModalActions } from '@/shared/domain/use-modal-store'
import { CalendarHasRangeSelected } from '../../..//dates/domain/calendar-has-range-selected'
import { useRefinements } from '../../..//shared/domain/use-refinements'
import { useActions, useCheckin, useCheckout } from '../../..//shared/domain/use-refinements-store'
import { Calendar } from '../../../dates/ui/calendar/calendar'

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
      <div>
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
      </div>
      <div>
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
      </div>
      {showApply && (
        <div>
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
        </div>
      )}
    </>
  )
}
