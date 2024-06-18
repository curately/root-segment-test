import { useCombobox } from 'downshift'
import { useId } from 'react'
import { getAutoCompleteSuggestions } from '../../location/data-access/location-search-data-access'
import { sanitisePlaceName } from '../../location/domain/sanitise-place-name'
import { useActions as useAutoCompleteActions, useInputItems } from '../../location/domain/use-location-search-store'
import { useActions as useModalActions } from '../../shared/domain/use-refinement-modals-store'
import { useActions } from '../../shared/domain/use-refinements-store'

type Props = {
  initialInputValue: string
  inputRef: React.RefObject<HTMLInputElement> | null
  inModal?: boolean
}

export function useAutoCompleteComboBox({ initialInputValue, inputRef, inModal = false }: Props) {
  const inputItems = useInputItems()
  const { setInputItems } = useAutoCompleteActions()
  const { setLocation, setType, setLat, setLng } = useActions()
  const { closeDestinationModal } = useModalActions()

  function updateInputItems(inputValue: string) {
    if (!inputValue || inputValue.length < 3) {
      return null
    }
    const suggestions = getAutoCompleteSuggestions(inputValue ?? '')

    suggestions.then(response => {
      console.log(response)
      setInputItems(response.slice(0, 8))
    })
  }
  function clearAutocomplete() {
    reset()
    setInputItems([])
  }

  function inputHasBeenSelected(inputValue: string, selectedItemPlaceName: string) {
    return inputValue.toLowerCase() === selectedItemPlaceName.toLowerCase()
  }

  const { isOpen, setInputValue, reset, inputValue, getMenuProps, getInputProps, highlightedIndex, getItemProps } =
    useCombobox({
      id: useId(),
      initialInputValue: initialInputValue,
      initialIsOpen: false,
      items: inputItems,

      itemToString(item) {
        if (!item) return ''
        //return item.place_name
        return item.placeName
      },

      onIsOpenChange(changes) {
        if (changes.inputValue && changes.inputValue.length > 0) {
          try {
            updateInputItems(inputValue)
          } catch (error) {}
        }
      },

      onInputValueChange({ inputValue, selectedItem }) {
        const sanitisedPlaceName = sanitisePlaceName(inputValue ?? '')

        let placeName = selectedItem?.type === 'hotel' ? sanitisedPlaceName.itemPlaceOne : inputValue ?? ''

        if (!inputValue || inputValue.length < 1) {
          return clearAutocomplete()
        }

        try {
          if (inputValue.length < 2) {
            return false
          }
          updateInputItems(inputValue)

          if (selectedItem && inputHasBeenSelected(inputValue, selectedItem?.placeName)) {
            setLocation(placeName ?? '')
            setType(selectedItem.type ?? '')
            setLat(selectedItem.lat.toString())
            setLng(selectedItem.lng.toString())
          }
        } catch (error) {}
      },

      onSelectedItemChange(item) {
        if (inModal) {
          closeDestinationModal()
        }
        if (inputRef?.current) {
          inputRef.current.blur()
        }
      },
    })
  return {
    isOpen,
    setInputValue,
    reset,
    inputValue,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  }
}
