import { createStore, useStore } from 'zustand'

export type ShowViewHotelsStore = {
  showViewMoreButton: boolean
  hotelListIsInView: boolean
  actions: {
    showButton: () => void
    hideButton: () => void
    setHotelListIsInView: (inView: boolean) => void
  }
}

export const useShowViewHotelsStore = createStore<ShowViewHotelsStore>()(set => ({
  showViewMoreButton: false,
  hotelListIsInView: true,
  actions: {
    showButton: () => set({ showViewMoreButton: true }),
    hideButton: () => set({ showViewMoreButton: false }),
    setHotelListIsInView: (inView: boolean) => set({ hotelListIsInView: inView }),
  },
}))

export const useShowButton = () => useStore(useShowViewHotelsStore, state => state.showViewMoreButton)
export const useHotelListIsInView = () => useStore(useShowViewHotelsStore, state => state.hotelListIsInView)
export const useActions = () => useStore(useShowViewHotelsStore, state => state.actions)
