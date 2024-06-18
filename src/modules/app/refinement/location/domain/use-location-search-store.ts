import { createStore, useStore } from 'zustand'
import { type InputItem } from '../../location/domain/location-search-domain'

export type LocationSearchStore = {
  inputItems: Array<InputItem>
  actions: {
    setInputItems: (inputItems: Array<InputItem>) => void
  }
}

export const useLocationSearchStore = createStore<LocationSearchStore>()(set => ({
  inputItems: [],
  actions: {
    setInputItems: inputItems => set({ inputItems: inputItems }),
  },
}))

export const useInputItems = () => useStore(useLocationSearchStore, state => state.inputItems)

export const useActions = () => useStore(useLocationSearchStore, state => state.actions)
