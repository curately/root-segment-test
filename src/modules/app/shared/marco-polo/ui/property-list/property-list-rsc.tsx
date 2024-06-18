import { Refinements } from '@/app/refinement/shared/domain/refinements-domain'
import { getSearchedProperties } from '@/app/search/data-access/search-data-access'
import { ListContainer } from '@/app/shared/marco-polo/ui/property-list/list-container'
import { cn } from '@/shared/ui/helpers'
import { PropertyExplorerCard } from './property-explorer-card'

type PropertyListProps = {
  searchParams: Refinements
  className?: string
}
export async function PropertyListRSC({ searchParams, className = '' }: PropertyListProps) {
  const { data, errors } = await getSearchedProperties(searchParams)
  if (errors || !data) {
    //handle error
    return <div>error</div>
  }

  const { properties } = data

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
