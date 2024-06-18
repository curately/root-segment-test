//import { Property } from '@/app/shared/property-explorer/domain/property-explorer-domain'
//import { MapMarker } from '@/shared/x-property-explorer/ui/map/components/map-marker'
//import type { PropertyCard } from '@/app/shared/property-cards/domain/property-card-domain'

//import { ExpediaResponseSchema, Rooms, RoomTypes } from '@/shared/domain/price-and-availability-domain'
import { useMemo } from 'react'
import { type PropertyExplorerCard } from './property-card-domain'

const geoViewport = require('@placemarkio/geo-viewport')
const geojsonExtent = require('@mapbox/geojson-extent')

export type ViewportData = {
  longitude: number
  latitude: number
  zoom: number
}

type Properties = {
  properties: Array<PropertyExplorerCard>
}

export const getViewportData = ({ properties }: Properties) => {
  if (!properties || properties.length === 0) {
    return {
      longitude: 0,
      latitude: 0,
      zoom: 1,
    }
  }
  const geoPoints = properties.map(property => {
    const coordinates = property.coordinates

    if (!coordinates) return [0, 0]

    const lat = coordinates[0] ? coordinates[0] : 0
    const lng = coordinates[1] ? coordinates[1] : 0

    return [lat, lng]
  })

  const extent = geojsonExtent({ type: 'Point', coordinates: geoPoints })

  const myViewport = geoViewport.viewport(extent, [400, 400])

  return {
    longitude: myViewport.center[0],
    latitude: myViewport.center[1],
    zoom: myViewport.zoom >= 12 ? 12 : myViewport.zoom,
  } satisfies ViewportData
}

/*
export function getPropertyPricing(
  propertyPricingDetails:
    | {
        totalPrice: string
        avgNightlyRate: string
      }[]
    | null
    | undefined,
) {
  if (propertyPricingDetails && propertyPricingDetails.length > 0) {
    return {
      avgNightlyRate: propertyPricingDetails[0]?.avgNightlyRate ?? null,
      totalPrice: propertyPricingDetails[0]?.totalPrice ?? null,
    }
  }
  return { avgNightlyRate: null, totalPrice: null }
}
*/
/*
export function getPropertyPricing(propertyPricingDetails: Rooms | null | undefined) {
  if (propertyPricingDetails && propertyPricingDetails.length > 0) {
    return {
      avgNightlyRate: propertyPricingDetails[0]?.Price?.AvgNightlyRate.Value ?? null,
      totalPrice: propertyPricingDetails[0]?.Price?.TotalPrice.Value ?? null,
    }
  }
  return { avgNightlyRate: null, totalPrice: null }
}
*/
