//import type { PropertyCard } from '@/shared/property-cards/domain/property-card-domain'
import { MapPin } from 'react-feather'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { CuratelyScore } from '@/shared/ui/curately-score'
import { ExpediaImage } from '@/shared/ui/expedia-image'
import { cn } from '@/shared/ui/helpers'
import { StarRating } from '@/shared/ui/star-rating/star-rating'
import { type CuratedPropertyCard } from '../domain/curated-properties-domain'

type Props = {
  property: CuratedPropertyCard
  className?: string
}
export function CuratedPropertyCard({ property, className }: Props) {
  return (
    <Card className={cn('', className)}>
      <CardHeader className="p-2">
        <div className="relative aspect-[1200/800] w-full bg-ivory ">
          {property.images[0]?.link ? (
            <ExpediaImage src={property.images[0].link} alt="" className="rounded-md" />
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="px-4 pt-4 py-lg">
        <div className="">
          <div>
            <CardTitle className="text-lg font-bold leading-7 line-clamp-1">
              <div className="flex pb-2 text-base font-medium leading-4">
                <MapPin className="inline-block w-4 h-4 mr-1 text-dark" />
                {property.city}, {property.country}
              </div>
              {property.propertyName}
            </CardTitle>
            <div className="flex items-center justify-between mt-4">
              <StarRating rating={property.starRating} className="text-medium" />
              <div className="px-4 border rounded-lg border-primary-300">{property.curatelyScore}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
  /*
  return (
    <Card className={cn('', className)}>
      <CardHeader className="p-2">
        <div className="relative aspect-[1200/800] w-full bg-ivory ">
          {property.images[0]?.link ? (
            <ExpediaImage src={property.images[0].link} alt="" className="rounded-md" />
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="pt-4 py-lg">
        <div className="flex justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-medium leading-7 line-clamp-1">{property.propertyName}</CardTitle>
            <div className="flex pt-1 text-sm leading-4 py-md">
              <MapPin className="inline-block w-4 h-4 mr-1 text-dark" />
              {property.city}, {property.country}
            </div>
            <StarRating rating={property.starRating} className="mt-2 text-medium" />
          </div>
          <div>
            <CuratelyScore score={property.curatelyScore} className="w-10 h-10 rounded-full " />
          </div>
        </div>
      </CardContent>
    </Card>
  )
  */
}
