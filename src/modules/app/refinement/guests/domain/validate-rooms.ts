import { getTotalAdultsAndChildren, transformUrlToInternalState } from '../../guests/domain/guests-domain'

export function validateRooms(rooms: string | null) {
  if (!rooms) {
    return null
  }
  const roomState = transformUrlToInternalState(rooms)

  const totalAdultsAndChildren = getTotalAdultsAndChildren(roomState)

  if (isNaN(totalAdultsAndChildren)) {
    return null
  }
  if (totalAdultsAndChildren > 8) {
    return null
  }
  return rooms
}
