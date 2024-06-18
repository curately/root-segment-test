import Link from 'next/link'
import { Check, Info } from 'react-feather'

const AvailableMessage = () => {
  return (
    <div className="flex items-center gap-2 rounded-r-xl border-l-4 border-primary-500 bg-primary-50 p-3 text-black antialiased">
      <div className="rounded-full p-1 ">
        <Check className="font-bold text-primary-600" size={20} />
      </div>
      <div>Available</div>
    </div>
  )
}
const EmptyStateMessage = () => {
  return (
    <div className="my-4 flex w-full flex-col gap-4 rounded-r-lg border-l-4 border-l-orange-300 bg-orange-50 p-3 text-left leading-7 text-orange-800">
      <Info size="18" className="hidden text-orange-400 " />
      <div>Select travel dates to check for pricing and availability</div>
    </div>
  )
}
const UnavailableMessage = ({ link }: { link: string }) => {
  return (
    <div className="my-4 w-full rounded-r-lg border-l-4 border-l-orange-300 bg-orange-50 p-3 text-left text-base text-orange-800">
      <p className="inline md:block">
        This hotel has no available rooms for your dates / group size.
        <span className="md:hidden"> </span>
      </p>

      <div className="pt-4">
        Select new checkin / checkout dates or view{' '}
        <Link href={link} className="underline">
          nearby hotels with available rooms
        </Link>
      </div>
    </div>
  )
}

const ErrorMessage = ({ errorMessages }: { errorMessages?: Array<string> }) => {
  if (!errorMessages) {
    return (
      <div className="my-4 w-full rounded-r-lg border-l-4 border-l-red-300 bg-red-50 p-4 text-left text-base text-red-800">
        <p className="inline md:block">Oops, something went wrong. Please try again.</p>
      </div>
    )
  }
  return (
    <div className="my-4 w-full rounded-r-lg border-l-4 border-l-red-300 bg-red-50 p-4 text-left text-base text-red-800">
      {errorMessages.map((message, index) => (
        <p className="inline md:block" key={index}>
          {message}
        </p>
      ))}
    </div>
  )
  return (
    <div className="my-4 w-full rounded-r-lg border-l-4 border-l-red-300 bg-red-50 p-4 text-left text-base text-red-800">
      <p className="inline md:block">Check in and check out dates need to be within a range of 28 days.</p>
    </div>
  )
}

interface Props {
  messageType: 'empty' | 'available' | 'unavailable' | 'error'
  errorMessages?: Array<string>
  link?: string
}
export function Message({ messageType, link = '', errorMessages }: Props) {
  const MessageSelector = {
    empty: <EmptyStateMessage />,
    available: <AvailableMessage />,
    unavailable: <UnavailableMessage link={link} />,
    error: <ErrorMessage errorMessages={errorMessages} />,
  }
  return MessageSelector[messageType]
}
