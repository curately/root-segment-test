import { createContext, useContext } from 'react'
import { createStore, useStore } from 'zustand'

export type RefinementModalStore = {
  searchModalIsOpen: boolean
  destinationModalIsOpen: boolean
  calendarModalIsOpen: boolean
  guestModalIsOpen: boolean

  amenitiesModalIsOpen: boolean
  availabilityModalIsOpen: boolean

  actions: {
    openSearchModal: () => void
    closeSearchModal: () => void

    openDestinationModal: () => void
    closeDestinationModal: () => void

    openCalendarModal: () => void
    closeCalendarModal: () => void

    openGuestModal: () => void
    closeGuestModal: () => void

    openAmenitiesModal: () => void
    closeAmenitiesModal: () => void

    openAvailabilityModal: () => void
    closeAvailabilityModal: () => void
  }
}

export const useModalsStore = createStore<RefinementModalStore>()(set => ({
  searchModalIsOpen: false,
  destinationModalIsOpen: false,
  calendarModalIsOpen: false,
  guestModalIsOpen: false,
  amenitiesModalIsOpen: false,
  availabilityModalIsOpen: false,

  actions: {
    openSearchModal: () => set({ searchModalIsOpen: true }),
    closeSearchModal: () => set({ searchModalIsOpen: false }),

    openDestinationModal: () => set({ destinationModalIsOpen: true }),
    closeDestinationModal: () => set({ destinationModalIsOpen: false }),

    openCalendarModal: () => set({ calendarModalIsOpen: true }),
    closeCalendarModal: () => set({ calendarModalIsOpen: false }),

    openGuestModal: () => set({ guestModalIsOpen: true }),
    closeGuestModal: () => set({ guestModalIsOpen: false }),

    openAmenitiesModal: () => set({ amenitiesModalIsOpen: true }),
    closeAmenitiesModal: () => set({ amenitiesModalIsOpen: false }),

    openAvailabilityModal: () => set({ availabilityModalIsOpen: true }),
    closeAvailabilityModal: () => set({ availabilityModalIsOpen: false }),
  },
}))

export const useSearchModal = () => useStore(useModalsStore, state => state.searchModalIsOpen)

export const useDestinationModal = () => useStore(useModalsStore, state => state.destinationModalIsOpen)

export const useCalendarModal = () => useStore(useModalsStore, state => state.calendarModalIsOpen)

export const useGuestModal = () => useStore(useModalsStore, state => state.guestModalIsOpen)

export const useAmenitiesModal = () => useStore(useModalsStore, state => state.amenitiesModalIsOpen)

export const useAvailabilityModal = () => useStore(useModalsStore, state => state.availabilityModalIsOpen)

export const useActions = () => useStore(useModalsStore, state => state.actions)
