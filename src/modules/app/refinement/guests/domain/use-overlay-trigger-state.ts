import { useOverlayTriggerState } from 'react-stately'

export function useGuestPickerOverlay() {
  const overlayState = useOverlayTriggerState({})

  return {
    overlayState,
  }
}
