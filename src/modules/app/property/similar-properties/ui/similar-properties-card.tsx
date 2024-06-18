import { MapPin } from 'react-feather'
import { AspectRatio } from '@/shared/ui/aspect-ratio'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { ExpediaImage } from '@/shared/ui/expedia-image'
import { cn } from '@/shared/ui/helpers'
import { Spacer } from '@/shared/ui/spacer'
import { type SimilarPropertyCard } from '../domain/similar-properties-domain'
import { CuratelyScoreClient } from '../ui/curately-score'

type Props = {
  property: SimilarPropertyCard
  className?: string
}
export function SimilarPropertyCard({ property, className }: Props) {
  return (
    <Card className={cn('', className)}>
      <CardHeader className="p-2">
        <AspectRatio ratio={3 / 2} className="bg-muted">
          <ExpediaImage src={property.heroImage} alt="" className="object-cover rounded-md fill" />
        </AspectRatio>
      </CardHeader>
      <CardContent className="pt-4 py-lg">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base">{property.propertyName}</CardTitle>
            <Spacer size="sm" />
            <div className="flex items-center">
              <MapPin className="inline-block w-4 h-4 mr-1 text-dark" />
              {property.city}
            </div>
          </div>
          <CuratelyScoreClient score={property.curatelyScore} />
        </div>
      </CardContent>
    </Card>
  )
}
