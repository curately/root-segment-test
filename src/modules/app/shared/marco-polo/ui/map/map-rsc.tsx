import { Refinements } from '@/app/refinement/shared/domain/refinements-domain'
import { getSearchedProperties } from '@/app/search/data-access/search-data-access'
import { Map } from '@/app/shared/marco-polo/ui/map/map'

type MapProps = {
  searchParams: Refinements
}
export async function MapRsc({ searchParams }: MapProps) {
  const { data, errors } = await getSearchedProperties(searchParams)
  if (errors || !data) {
    //handle error
    return <div>error</div>
  }

  const { properties } = data
  return <Map properties={properties} />
}
