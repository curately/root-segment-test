import { type GetItemPropsOptions } from 'downshift'
import { Bed, MapPin } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/shared/ui/helpers'
import { type InputItem } from '../../../location/domain/location-search-domain'
import { sanitisePlaceName } from '../../../location/domain/sanitise-place-name'
import Building from '../../../location/ui/location-search/icons/buildings-sharp-light.svg'
import Pin from '../../../location/ui/location-search/icons/location-dot-sharp-light.svg'

type Results = {
  results: Array<InputItem>
  getItemProps: (options: GetItemPropsOptions<InputItem>) => any
  highlightedIndex: number
  autoCompleteMargin?: string
}
type ItemPlaceNameProps = {
  sanitizedPlaceName: {
    itemPlaceOne: string
    itemPlaceTwo: string
  }
}

export function LocationSearchItems({ results, getItemProps, highlightedIndex, autoCompleteMargin }: Results) {
  return (
    <ul
      className={`left-0 z-40 w-full overflow-y-auto bg-white text-left md:absolute md:left-0 md:-mt-1 md:h-auto md:rounded-b-lg md:py-6 md:shadow-lg ${
        autoCompleteMargin === 'loose' ? 'md:top-16' : 'md:top-12'
      }`}
    >
      {results.map((item, index) => {
        let sanitizedPlaceName = sanitisePlaceName(item.placeName)

        const itemClassName = cn(
          'min-h-[50px] pl-3 flex items-center gap-4 text-dark cursor-pointer max-w-[800px] py-4 md:py-2 md:px-6 md:hover:bg-ivory hover:bg-ivory text-base border-b border-pill/20 last:border-b-0 md:border-0 font-normal text-input-text/90  items-center gap-2',
          highlightedIndex === index && 'bg-primary-50 md:bg-primary-100',
        )

        return (
          <div className={itemClassName} key={`${item}${index}`} {...getItemProps({ item, index })}>
            <div>
              <ItemIcon itemType={item.type || ''} />
            </div>
            <ItemPlaceName sanitizedPlaceName={sanitizedPlaceName} />
          </div>
        )
      })}
    </ul>
  )
}

function ItemIcon({ itemType }: { itemType: string }) {
  if (itemType === 'hotel') {
    return <Bed className="w-5 h-5 text-primary" strokeWidth={2} color="#5eead4" />

    return <Image src={Building} alt="" className="w-4 h-4 text-primary" />
  } else {
    return <MapPin className="w-5 h-5 text-primary" strokeWidth={2} color="#ff8000" />
    return <Image src={Pin} alt="" className="w-4 h-4 text-primary" />
  }
}

function ItemPlaceName({ sanitizedPlaceName }: ItemPlaceNameProps) {
  return (
    <div>
      <div className="w-full font-medium text-black line-clamp-1">{sanitizedPlaceName.itemPlaceOne}</div>
      <div className="-mt-[2px] line-clamp-1 text-sm leading-tight text-dark">{sanitizedPlaceName.itemPlaceTwo}</div>
    </div>
  )
}
