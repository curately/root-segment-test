import {
  getTotalAdultsAndChildren,
  MAX_GUESTS,
  MAX_ROOMS,
  transformUrlToInternalState,
} from '../../guests/domain/guests-domain'
import { useRefinements } from '../../shared/domain/use-refinements'

export function useGuestPicker() {
  const { rooms, numberOfGuests } = useRefinements()

  const internalRoomsState = transformUrlToInternalState(rooms)
  const numberOfRooms = internalRoomsState.length

  const totalGuests = numberOfGuests

  const maxRoomsReached =
    internalRoomsState.length > MAX_ROOMS - 1 || getTotalAdultsAndChildren(internalRoomsState) > MAX_GUESTS

  return {
    totalGuests,
    internalRoomsState,
    maxRoomsReached,
  }
}
