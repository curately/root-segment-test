import { createStore, useStore } from 'zustand'

export type SearchStore = {
  searchBarKey: string | null
  actions: {
    updateSearchBarKey: (searchBarKey: string | null) => void
  }
}

export const useSearchStore = createStore<SearchStore>()(set => ({
  searchBarKey: null,
  actions: {
    updateSearchBarKey: searchBarKey => set({ searchBarKey: searchBarKey }),
  },
}))

export const useSearchBarKey = () => useStore(useSearchStore, state => state.searchBarKey)

export const useActions = () => useStore(useSearchStore, state => state.actions)
