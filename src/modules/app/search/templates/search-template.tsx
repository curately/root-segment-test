import { Refinements } from '@/app/refinement/shared/domain/refinements-domain'
import { getSearchedProperties } from '@/app/search/data-access/search-data-access'
import { Map } from '@/app/shared/marco-polo/ui/map/map'
import { MapRsc } from '@/app/shared/marco-polo/ui/map/map-rsc'
import { PropertyList } from '@/app/shared/marco-polo/ui/property-list/property-list'
import { PropertyListRSC } from '@/app/shared/marco-polo/ui/property-list/property-list-rsc'
import { PropertyListSkeleton } from '@/app/shared/marco-polo/ui/property-list/property-list-skeleton'
import { PropertyExplorer, PropertyView } from '@/app/shared/marco-polo/ui/property-map-container'
import { Suspense } from 'react'

type Props = {
  searchParams: Refinements
}
export async function SearchTemplate({ searchParams }: Props) {
  // Get properties by searching with the search params
  /*
  const { data, errors } = await getSearchedProperties(searchParams)
  if (errors || !data) {
    //handle error
    return <div>error</div>
  }

  const { properties } = data
  */
  void getSearchedProperties(searchParams)
  const propertySuspenseKey = new URLSearchParams(searchParams).toString()
  return (
    <div>
      <PropertyExplorer>
        {/* PROPERTY VIEW */}

        <PropertyExplorer.PropertyView>
          <div className="flex flex-col gap-16">
            <PropertyView.Section>
              {/*<PropertyList properties={properties} />*/}
              <Suspense fallback={<PropertyListSkeleton />} key={propertySuspenseKey}>
                <PropertyListRSC searchParams={searchParams} />
              </Suspense>
              <div className="w-full pt-8 text-right">
                showing 20/300+ properties in Brighton...<span className="underline">{'   '}See all</span>
              </div>
            </PropertyView.Section>
          </div>
        </PropertyExplorer.PropertyView>

        {/* END PROPERTY VIEW */}

        {/* MAP VIEW */}
        <PropertyExplorer.MapView>
          {/*<Map properties={properties} />*/}
          <Suspense fallback={<div>Loading Map...</div>} key={propertySuspenseKey}>
            <MapRsc searchParams={searchParams} />
          </Suspense>
        </PropertyExplorer.MapView>
        {/* END MAP VIEW */}
      </PropertyExplorer>
    </div>
  )
}
