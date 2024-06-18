import { ListContainer } from '@/app/shared/marco-polo/ui/property-list/list-container'
//import type { PropertyCards } from '@/app/shared/property-cards/domain/property-card-domain'
//import { PropertyCard } from "@/app/shared/property-cards/ui/property-card"
import { cn } from '@/shared/ui/helpers'
import { type PropertyExplorerCards } from '../../domain/property-card-domain'
import { PropertyExplorerCard } from './property-explorer-card'

type PropertyListProps = {
  properties: PropertyExplorerCards
  className?: string
}
export function PropertyList({ properties, className = '' }: PropertyListProps) {
  return (
    <div className={cn('grid grid-cols-1 md:gap-6 lg:grid-cols-2 2xl:grid-cols-3', className)}>
      {properties.map(property => (
        <ListContainer key={property.slug} slug={property.slug} className="group">
          <PropertyExplorerCard property={property} />
        </ListContainer>
      ))}
    </div>
  )
}
