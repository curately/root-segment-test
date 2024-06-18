import { createStore, useStore } from 'zustand'

export type DateStore = {
  dateHasBeenCancelled: boolean
  actions: {
    cancelDate: (dateHasBeenCancelled: boolean) => void
  }
}

export const useDateStore = createStore<DateStore>()(set => ({
  dateHasBeenCancelled: false,
  actions: {
    cancelDate: dateHasBeenCancelled => set({ dateHasBeenCancelled: dateHasBeenCancelled }),
  },
}))

export const useDateHasBeenCancelled = () => useStore(useDateStore, state => state.dateHasBeenCancelled)

export const useActions = () => useStore(useDateStore, state => state.actions)
