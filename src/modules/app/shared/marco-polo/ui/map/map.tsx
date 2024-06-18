'use client'

import { env } from 'env'
import 'mapbox-gl/dist/mapbox-gl.css'
import { getViewportData, type ViewportData } from '@/app/shared/marco-polo/domain/marco-polo-domain'
import { useActions, useActiveMarkerId } from '@/app/shared/marco-polo/domain/use-marco-polo-store'
import { MapMarker } from '@/app/shared/marco-polo/ui/map/map-marker'
import { Popup } from '@/app/shared/marco-polo/ui/map/popup'
import { useMemo, useRef, useState } from 'react'
import { Map as MapBox, type MapboxEvent, type MapRef } from 'react-map-gl'
import { type SwiperClass } from 'swiper/react'
//import type { PropertyCard as PropertyCardType } from '@/app/shared/property-cards/domain/property-card-domain'
import { type PropertyExplorerCard } from '../../domain/property-card-domain'

type MapProps = {
  properties: Array<PropertyExplorerCard>
  showPopups?: boolean
  props?: React.HTMLProps<HTMLDivElement>
  className?: string
}
export function Map({ properties, showPopups = true, props, className = '' }: MapProps) {
  const { updateActiveMarker } = useActions()
  const activeMarkerId = useActiveMarkerId()
  const mapRef = useRef<MapRef>(null)
  const [viewState, setViewState] = useState<ViewportData>(getViewportData({ properties }))

  const [mapFrozen, setMapFrozen] = useState(false)
  const [popupInfo, setPopupInfo] = useState<PropertyExplorerCard | null>(null)

  const [clickedMarkerId, setClickedMarkerId] = useState<string | null>(null)

  const [listingSwiper, setListingSwiper] = useState<SwiperClass>()

  const freezeMap = () => {
    setMapFrozen(true)
  }

  const unFreezeMap = () => {
    setMapFrozen(false)
  }

  const mapMarkers = useMemo(
    () =>
      properties.map(property => (
        <MapMarker
          slug={property.slug}
          coordinates={property.coordinates}
          key={property.slug}
          clickedMarkerId={clickedMarkerId}
          onClick={(e: MapboxEvent<MouseEvent>) => {
            freezeMap()
            e.originalEvent.stopPropagation() //this prevents the popup from closing when you click on the marker
            updateActiveMarker(property.slug)
            if (showPopups) {
              setPopupInfo(property)
            }
            if (listingSwiper) {
              const allSlides = listingSwiper.slides
              const activeCard = allSlides.findIndex(slide => slide.id === property.slug)
              listingSwiper.slideTo(activeCard)
            }
          }}
        />
      )),
    [properties, clickedMarkerId, listingSwiper, showPopups, updateActiveMarker],
  )

  return (
    <>
      <MapBox
        ref={mapRef}
        {...viewState}
        // initialViewState={getViewportData({ listingCards: listingCards })}
        reuseMaps
        onMove={evt => setViewState(evt.viewState)}
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        style={{
          width: '100%',
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onRender={event => event.target.resize()}
        onDragEnd={event => {
          console.log('bounds: ', event.target.getBounds())
        }}
      >
        {mapMarkers}
        {showPopups && popupInfo && (
          <Popup
            property={popupInfo}
            onClose={() => {
              setClickedMarkerId(null)
              setPopupInfo(null)
            }}
          />
        )}
      </MapBox>
    </>
  )
}
