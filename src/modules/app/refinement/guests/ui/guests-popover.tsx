import { Button } from '@/shared/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { useGuestPickerOverlay } from '../../guests/domain/use-overlay-trigger-state'
import { GuestPicker } from '../../guests/ui/guest-picker/guest-picker'
import { useRefinements } from '../../shared/domain/use-refinements'

interface Props {
  borderClassName?: string
}
export function GuestsPopover({ borderClassName }: Props) {
  const { numberOfGuests: initialGuestsValue } = useRefinements()
  const { overlayState } = useGuestPickerOverlay()
  return (
    <Popover>
      <PopoverTrigger asChild className="border-r-0ll  flex h-14 w-[33%] min-w-[200px] items-center justify-start pl-4">
        {initialGuestsValue && initialGuestsValue > 0 ? (
          <button>
            <BedIcon className="w-5 h-5 ml-0 mr-3" /> {initialGuestsValue + ' guests'}
          </button>
        ) : (
          <button>
            <BedIcon className="w-5 h-5 ml-0 mr-3" /> {'Add guests'}
          </button>
        )}
      </PopoverTrigger>

      <PopoverContent className="w-full mt-1 bg-white ">
        <div className="max-h-[600px] w-screen max-w-[300px]  overflow-y-scroll py-4">
          <GuestPicker />
        </div>
        <div className="flex justify-end w-full p-4 text-right border-t border-ivory">
          <Button
            variant="primary"
            //color="secondary"
            onClick={() => {
              overlayState.close()
            }}
          >
            OK
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
function BedIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </svg>
  )
}
