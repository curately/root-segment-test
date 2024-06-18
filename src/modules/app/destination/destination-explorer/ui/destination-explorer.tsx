import { Suspense } from 'react'

import { notFound } from 'next/navigation'

import { DestinationGuide } from '@/app/destination/destination-guide/ui/destination-guide'
import { DestinationTitle } from '@/app/destination/destination-guide/ui/destination-title'
import { SimilarDestinations } from '@/app/destination/similar-destinations/ui/similar-destinations'
import { Breadcrumb } from '@/app/shared/breadcrumb/ui/breadcrumb'
import { Map } from '@/app/shared/marco-polo/ui/map/map'
import { ListHeading } from '@/app/shared/marco-polo/ui/properties-sticky-header'
import { PropertyList } from '@/app/shared/marco-polo/ui/property-list/property-list'
import { PropertyExplorer, PropertyView } from '@/app/shared/marco-polo/ui/property-map-container'
import { ViewPropertiesButton } from '@/app/shared/marco-polo/ui/view-properties-button'

import { ErrorList } from '@/shared/ui/error/error-list'

import { getPropertiesForDestination, getPropertyCount } from '../data-access/destination-explorer-data-access'

type Props = {
  prismaSlug: string
  hasContent: boolean
}

export async function DestinationExplorer({ prismaSlug, hasContent }: Props) {
  const [propertyResponse, propertyCountResponse] = await Promise.all([
    getPropertiesForDestination(prismaSlug),
    getPropertyCount(prismaSlug),
  ])

  const { data: properties, errors } = propertyResponse
  if (errors) {
    return <ErrorList errors={errors} />
  }
  if (!properties || !properties.length) {
    // we actually want a ui here to show empty state
    return notFound()
  }
  const { data: propertyCountData, errors: propertyCountErrors } = propertyCountResponse

  if (propertyCountErrors) {
    return <ErrorList errors={propertyCountErrors} />
  }
  if (!propertyCountData) {
    // we actually want a ui here to show empty state
    return null
  }

  return (
    <>
      <PropertyExplorer>
        {/* PROPERTY VIEW */}
        <PropertyExplorer.PropertyView>
          <PropertyView.Section className="p-4 md:p-0">
            <Breadcrumb prismaSlug={prismaSlug} type="destination" hideLast={false} linkToLast={false} />
            <h1 className="text-3xl font-bold font-header py-sm text-dark md:text-5xl">
              <DestinationTitle prismaSlug={prismaSlug} />
            </h1>
          </PropertyView.Section>
          <div className="flex flex-col gap-16">
            <PropertyView.Section>
              <ListHeading>
                <div className="hidden w-2/3 text-3xl capitalize font-header md:block">
                  <p className="line-clamp-1">
                    Family friendly hotels in <DestinationTitle prismaSlug={prismaSlug} />
                  </p>
                </div>
                {parseInt(propertyCountData.propertyCount) > 20 ? (
                  <div>
                    showing 20 of {propertyCountData.propertyCount} <span className="underline">{'   '}See all</span>
                  </div>
                ) : null}
              </ListHeading>
              <Suspense>
                <PropertyList properties={properties} />{' '}
              </Suspense>
            </PropertyView.Section>

            <PropertyView.Section>
              <div className="flex flex-col gap-8">
                <Suspense>
                  <DestinationGuide prismaSlug={prismaSlug} />
                </Suspense>
              </div>
            </PropertyView.Section>
            <PropertyView.Section>
              <div className="flex flex-col gap-8">
                <Suspense>
                  <SimilarDestinations prismaSlug={prismaSlug} />
                </Suspense>
              </div>
            </PropertyView.Section>
          </div>
        </PropertyExplorer.PropertyView>
        {hasContent ? <ViewPropertiesButton /> : false}

        {/* END PROPERTY VIEW */}

        {/* MAP VIEW */}
        <PropertyExplorer.MapView>
          <Suspense>
            <Map properties={properties} />
          </Suspense>
        </PropertyExplorer.MapView>
        {/* END MAP VIEW */}
      </PropertyExplorer>
    </>
  )
}
