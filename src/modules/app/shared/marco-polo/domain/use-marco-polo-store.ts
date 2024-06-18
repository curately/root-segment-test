import { createStore, useStore } from 'zustand'

export type activeMarkerId = string | null
export type PropertyExplorerStore = {
  activeMarkerId: activeMarkerId
  mapIsOpen: boolean
  actions: {
    updateActiveMarker: (markerId: activeMarkerId) => void
    showMap: () => void
  }
}

export const usePropertyExplorerStore = createStore<PropertyExplorerStore>()(set => ({
  activeMarkerId: null,
  mapIsOpen: false,
  actions: {
    updateActiveMarker: markerId => set({ activeMarkerId: markerId }),
    showMap: () => set({ mapIsOpen: true }),
  },
}))

export const useActiveMarkerId = () => useStore(usePropertyExplorerStore, state => state.activeMarkerId)
export const useMapIsOpen = () => useStore(usePropertyExplorerStore, state => state.mapIsOpen)

export const useActions = () => useStore(usePropertyExplorerStore, state => state.actions)
