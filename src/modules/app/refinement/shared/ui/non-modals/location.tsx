import { usePathname } from 'next/navigation'
import React from 'react'
import { isDestinationPage } from '@/shared/domain/use-is-destination-page'
import { CancelButton } from '@/shared/ui/cancel-button'
import { useAutoCompleteComboBox } from '../../../location/domain/use-autocomplete-combo-box'
import { useActions as useAutoCompleteActions, useInputItems } from '../../../location/domain/use-location-search-store'
import { LocationSearchItems } from '../../../location/ui/location-search/location-search-items'
import { useApplyRefinements } from '../../../shared/domain/use-apply-refinements'
import { useActions, useLocation } from '../../../shared/domain/use-refinements-store'

interface Props {
  inModal?: boolean
  inputRef: React.RefObject<HTMLInputElement> | null
  autoCompleteMargin?: string
  initialValue?: string
}

function maybeGetCityNameFromUrl(pathName: string) {
  if (isDestinationPage(pathName)) {
    const pathArray = pathName.split('/')
    const city = pathArray.pop()
    if (!city) {
      return ''
    }
    return city.replace('-', ' ')
  } else {
    return ''
  }
}

export function LocationSearch({ inModal, inputRef = null, autoCompleteMargin, initialValue = '' }: Props) {
  let location = useLocation()
  if (location === ' ') {
    location = ''
  }
  if (location === '') {
    location = 'hello'
  }
  const { setLocation } = useActions()

  const pathName = usePathname()

  const { updateSearch } = useApplyRefinements()

  const inputItems = useInputItems()

  const startingPoint = initialValue === '' ? maybeGetCityNameFromUrl(pathName) : initialValue
  const { setInputItems } = useAutoCompleteActions()
  const { isOpen, setInputValue, reset, inputValue, getMenuProps, getInputProps, highlightedIndex, getItemProps } =
    useAutoCompleteComboBox({
      initialInputValue: startingPoint,
      inputRef: inputRef,
      inModal: inModal,
    })
  /*
  useSetInitialLocation({
    initialLocation: startingPoint,
    setInputValue: setInputValue,
  })
  */
  function cancelAutocomplete() {
    setLocation('') // set to empty string rather than null to indicate we have set a location in state, albeit an empty one so we don't revert to getting search params from the url
    reset()
    setInputItems([])
    if (inputRef?.current) {
      inputRef.current.focus()
    }
  }

  const focusedClass =
    'relative p-1 border rounded-md border-pill md:rounded-r-0 md:border-r-0 md:border-0 flex items-center justify-start'

  return (
    <div className="relative w-full">
      <div className={`relative ${inModal && 'rounded-lg border border-gray-200'} md:w-full md:pr-2`}>
        <div className={focusedClass}>
          <input
            {...getInputProps({
              ref: inputRef,

              placeholder: 'Where are you going?',
              className:
                'w-[85%]  bg-white py-1 pl-2 focus:ring-0 focus:outline-none pr-2 capitalize py-2 text-input-text placeholder-black focus:border-green-200 border-0 pl-9',
              onKeyDown: e => {
                if (e.key === 'Enter' && !isOpen) {
                  e.preventDefault()
                  if (inputValue.length > 2) {
                    updateSearch()
                  }
                }
              },
              onBlur: e => {
                setLocation(inputRef?.current?.value ?? '')
              },
            })}
          />
          <MapPinIcon className="absolute left-0 top-[14px] ml-3 h-5 w-5 " />
          {inputValue !== '' && (
            <div className="absolute right-0 top-[4px]">
              <CancelButton onClick={cancelAutocomplete} />
            </div>
          )}
        </div>
      </div>
      <div {...getMenuProps()} className="mt-4 md:mt-0 ">
        {isOpen && inputValue.length > 2 && (
          <LocationSearchItems
            results={inputItems}
            getItemProps={getItemProps}
            highlightedIndex={highlightedIndex}
            autoCompleteMargin={autoCompleteMargin}
          />
        )}
      </div>
    </div>
  )
}
type MapPinProps = {
  className?: string
  props?: React.SVGProps<SVGSVGElement>
}
function MapPinIcon({ className = '', props }: MapPinProps) {
  return (
    <svg
      className={className}
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
