import { getViewportData, type ViewportData } from '@/app/shared/marco-polo/domain/marco-polo-domain'
import { useEffect, useState } from 'react'
import { type PropertyExplorerCard } from './property-card-domain'

interface PropertyCardProps {
  propertyCards: Array<PropertyExplorerCard>
}
export default function useViewportData({ propertyCards }: PropertyCardProps) {
  const [viewState, setViewState] = useState<ViewportData>(
    getViewportData({ properties: propertyCards }),
    /*
    {
      longitude: 0,
      latitude: 0,
      zoom: 1,
    },
    */
  )

  useEffect(
    function updateMapViewportWhenListingsChangeAfterFiltering() {
      if (propertyCards.length > 0) {
        const newViewPortData =
          propertyCards.length > 0
            ? getViewportData({ properties: propertyCards })
            : {
                longitude: 0,
                latitude: 0,
                zoom: 1,
              }
        setViewState(newViewPortData)
      }
    },
    [propertyCards],
  )
  return { viewState, setViewState }
}
