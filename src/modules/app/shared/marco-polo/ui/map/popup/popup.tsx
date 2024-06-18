import { PopUpCarousel } from '@/app/shared/marco-polo/ui/map/popup/popup-carousel'
import Link from 'next/link'
import { parseAsString, useQueryState } from 'nuqs'
import { Popup as MapBoxPopup } from 'react-map-gl'
//import type { PropertyCard } from '@/app/shared/property-cards/domain/property-card-domain'
import { type PropertyExplorerCard } from '../../../domain/property-card-domain'

interface Props {
  property: PropertyExplorerCard | null
  onClose: () => void
}
export function Popup({ property, onClose }: Props) {
  const [checkin] = useQueryState('checkin', parseAsString.withDefault(''))
  const [checkout] = useQueryState('checkout', parseAsString.withDefault(''))
  if (!property) return null
  const { slug, coordinates, propertyName, images } = property
  let hotelSlug = slug ? slug : '/'
  if (checkin !== '' && checkout !== '') {
    hotelSlug += `?checkin=${checkin}&checkout=${checkout}`
  }

  return (
    <Link href={hotelSlug} className="cursor-pointer">
      <MapBoxPopup
        longitude={Number(coordinates ? coordinates[0] : 0)}
        latitude={Number(coordinates ? coordinates[1] : 0)}
        closeButton={false}
        maxWidth="300px"
        offset={20}
        className="w-[300px] cursor-pointer p-0"
        //style={{ padding: '0px', cursor: 'pointer' }}
        onClose={onClose}
      >
        <div className="text-base bg-white shadow-3xl">
          {images && <PopUpCarousel images={images.flatMap(image => (image ? [image.link] : []))} />}
          <div className="text-base font-normal p-sm font-body">{propertyName}</div>
        </div>
      </MapBoxPopup>
    </Link>
  )
}
