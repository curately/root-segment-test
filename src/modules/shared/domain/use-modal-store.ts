import { createContext, useContext } from 'react'
import { createStore, useStore } from 'zustand'

export type ModalStore = {
  searchModalIsOpen: boolean
  destinationModalIsOpen: boolean
  calendarModalIsOpen: boolean
  guestModalIsOpen: boolean
  mapModalIsOpen: boolean
  filtersModalIsOpen: boolean
  availabilityModalIsOpen: boolean
  photosModalIsOpen: boolean
  photoCarouselModalIsOpen: boolean
  actions: {
    openSearchModal: () => void
    closeSearchModal: () => void
    openDestinationModal: () => void
    closeDestinationModal: () => void
    openCalendarModal: () => void
    closeCalendarModal: () => void
    openGuestModal: () => void
    closeGuestModal: () => void

    openMapModal: () => void
    closeMapModal: () => void
    openFiltersModal: () => void
    closeFiltersModal: () => void

    openAvailabilityModal: () => void
    closeAvailabilityModal: () => void

    openPhotosModal: () => void
    closePhotosModal: () => void

    openPhotoCarouselModal: () => void
    closePhotoCarouselModal: () => void
  }
}

export const useModalsStore = createStore<ModalStore>()(set => ({
  searchModalIsOpen: false,
  destinationModalIsOpen: false,
  calendarModalIsOpen: false,
  guestModalIsOpen: false,
  photosModalIsOpen: false,
  photoCarouselModalIsOpen: false,
  mapModalIsOpen: false,
  filtersModalIsOpen: false,
  availabilityModalIsOpen: false,
  actions: {
    openSearchModal: () => set(state => ({ searchModalIsOpen: true })),
    closeSearchModal: () => set(state => ({ searchModalIsOpen: false })),

    openDestinationModal: () => set(state => ({ destinationModalIsOpen: true })),
    closeDestinationModal: () => set(state => ({ destinationModalIsOpen: false })),

    openCalendarModal: () => set(state => ({ calendarModalIsOpen: true })),
    closeCalendarModal: () => set(state => ({ calendarModalIsOpen: false })),

    openGuestModal: () => set(state => ({ guestModalIsOpen: true })),
    closeGuestModal: () => set(state => ({ guestModalIsOpen: false })),

    openMapModal: () => set(state => ({ mapModalIsOpen: true })),
    closeMapModal: () => set(state => ({ mapModalIsOpen: false })),

    openFiltersModal: () => set(state => ({ filtersModalIsOpen: true })),
    closeFiltersModal: () => set(state => ({ filtersModalIsOpen: false })),

    openAvailabilityModal: () => set(state => ({ availabilityModalIsOpen: true })),
    closeAvailabilityModal: () => set(state => ({ availabilityModalIsOpen: false })),

    openPhotosModal: () => set(state => ({ photosModalIsOpen: true })),
    closePhotosModal: () => set(state => ({ photosModalIsOpen: false })),

    openPhotoCarouselModal: () => set(state => ({ photoCarouselModalIsOpen: true })),
    closePhotoCarouselModal: () => set(state => ({ photoCarouselModalIsOpen: false })),
  },
}))

export const useSearchModal = () => useStore(useModalsStore, state => state.searchModalIsOpen)

export const useDestinationModal = () => useStore(useModalsStore, state => state.destinationModalIsOpen)

export const useCalendarModal = () => useStore(useModalsStore, state => state.calendarModalIsOpen)

export const useGuestModal = () => useStore(useModalsStore, state => state.guestModalIsOpen)

export const useMapModal = () => useStore(useModalsStore, state => state.mapModalIsOpen)

export const useFiltersModal = () => useStore(useModalsStore, state => state.filtersModalIsOpen)

export const useAvailabilityModal = () => useStore(useModalsStore, state => state.availabilityModalIsOpen)

export const usePhotosModal = () => useStore(useModalsStore, state => state.photosModalIsOpen)

export const usePhotoCarouselModal = () => useStore(useModalsStore, state => state.photoCarouselModalIsOpen)

export const useActions = () => useStore(useModalsStore, state => state.actions)
