'use client'

import { createContext, useContext } from 'react'
import { createStore, useStore } from 'zustand'

type RefinementsStore = {
  location: string | null
  checkin: string | null
  checkout: string | null
  amenities: string | null
  rooms: string | null
  lat: string | null
  lng: string | null
  limit: string | null
  offset: string | null
  tc: string | null
  returnType: string | null
  type: string | null
  actions: {
    setLocation: (location: string | null) => void
    setCheckin: (checkin: string | null) => void
    setCheckout: (checkout: string | null) => void
    setAmenities: (amenities: string | null) => void
    setRooms: (rooms: string | null) => void
    setLat: (lat: string | null) => void
    setLng: (lng: string | null) => void
    setLimit: (limit: string | null) => void
    setOffset: (offset: string | null) => void
    setTotalCount: (totalCount: string | null) => void
    setReturnType: (returnType: string | null) => void
    setType: (type: string | null) => void
  }
}
export const useRefinementsStore = createStore<RefinementsStore>()(set => ({
  location: null,
  checkin: null,
  checkout: null,
  amenities: null,
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
    setAmenities: amenities => set({ amenities: amenities }),
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

export const StoreContext = createContext(useRefinementsStore)

export const useLocation = () => useStore(useContext(StoreContext), state => state.location)

export const useCheckin = () => useStore(useContext(StoreContext), state => state.checkin)
export const useCheckout = () => useStore(useContext(StoreContext), state => state.checkout)

export const useAmenities = () => useStore(useContext(StoreContext), state => state.amenities)
export const useRooms = () => useStore(useContext(StoreContext), state => state.rooms)
export const useLat = () => useStore(useContext(StoreContext), state => state.lat)
export const useLng = () => useStore(useContext(StoreContext), state => state.lng)

export const useLimit = () => useStore(useContext(StoreContext), state => state.limit)
export const useOffset = () => useStore(useContext(StoreContext), state => state.offset)
export const useTotalCount = () => useStore(useContext(StoreContext), state => state.tc)
export const useReturnType = () => useStore(useContext(StoreContext), state => state.returnType)
export const useType = () => useStore(useContext(StoreContext), state => state.type)

export const useAllRefinements = () =>
  useStore(useContext(StoreContext), state => {
    return {
      location: state.location,
      checkin: state.checkin,
      checkout: state.checkout,
      amenities: state.amenities,
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
