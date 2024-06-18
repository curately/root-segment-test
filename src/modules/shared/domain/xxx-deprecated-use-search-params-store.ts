'use client'

import { createContext, useContext } from 'react'
import { createStore, useStore } from 'zustand'

type SearchParamsStore = {
  location: string | null
  checkin: string | null
  checkout: string | null
  filters: string | null
  rooms: string | null
  lat: string | null
  lng: string | null
  limit: string | null
  offset: string | null
  tc: string | null
  returnType: string | null
  type: string | null
  actions: {
    setLocation: (location: string) => void
    setCheckin: (checkin: string) => void
    setCheckout: (checkout: string) => void
    setFilters: (filters: string) => void
    setRooms: (rooms: string) => void
    setLat: (lat: string) => void
    setLng: (lng: string) => void
    setLimit: (limit: string) => void
    setOffset: (offset: string) => void
    setTotalCount: (totalCount: string) => void
    setReturnType: (returnType: string) => void
    setType: (type: string) => void
  }
}
export const useSearchParamsStore = createStore<SearchParamsStore>()(set => ({
  location: null,
  checkin: null,
  checkout: null,
  filters: null,
  rooms: null,
  lat: null,
  lng: null,
  limit: null,
  offset: null,
  tc: null,
  returnType: null,
  type: null,
  actions: {
    setLocation: location => set({ location: location }),
    setCheckin: checkin => set({ checkin: checkin }),
    setCheckout: checkout => set({ checkout: checkout }),
    setFilters: filters => set({ filters: filters }),
    setRooms: rooms => set({ rooms: rooms }),
    setLat: lat => set({ lat: lat }),
    setLng: lng => set({ lng: lng }),
    setLimit: limit => set({ limit: limit }),
    setOffset: offset => set({ offset: offset }),
    setTotalCount: totalCount => set({ tc: totalCount }),
    setReturnType: returnType => set({ returnType: returnType }),
    setType: type => set({ type: type }),
  },
}))

export const StoreContext = createContext(useSearchParamsStore)

export const useLocation = () => useStore(useContext(StoreContext), state => state.location)

export const useCheckin = () => useStore(useContext(StoreContext), state => state.checkin)
export const useCheckout = () => useStore(useContext(StoreContext), state => state.checkout)

export const useFilters = () => useStore(useContext(StoreContext), state => state.filters)
export const useRooms = () => useStore(useContext(StoreContext), state => state.rooms)
export const useLat = () => useStore(useContext(StoreContext), state => state.lat)
export const useLng = () => useStore(useContext(StoreContext), state => state.lng)

export const useLimit = () => useStore(useContext(StoreContext), state => state.limit)
export const useOffset = () => useStore(useContext(StoreContext), state => state.offset)
export const useTotalCount = () => useStore(useContext(StoreContext), state => state.tc)
export const useReturnType = () => useStore(useContext(StoreContext), state => state.returnType)
export const useType = () => useStore(useContext(StoreContext), state => state.type)

export const useAllSearchParams = () =>
  useStore(useContext(StoreContext), state => {
    return {
      location: state.location,
      checkin: state.checkin,
      checkout: state.checkout,
      filters: state.filters,
      rooms: state.rooms,
      lat: state.lat,
      lng: state.lng,
      limit: state.limit,
      offset: state.offset,
      tc: state.tc,
      returnType: state.returnType,
      type: state.type,
    }
  })

export const useActions = () => useStore(useContext(StoreContext), state => state.actions)
