import { ErrorList } from '@/shared/ui/error/error-list'
import { RetainQueryLink } from '@/shared/ui/retain-query-link'
import { getSimilarProperties } from '../../similar-properties/data-access/similar-properties-data-access'
//import { PropertyCard } from '@/shared/property-cards/ui/property-card'
import { SimilarPropertyCard } from '../../similar-properties/ui/similar-properties-card'

type Props = {
  prismaSlug: string
  maxPropertiesToShow?: number
}
export async function SimilarProperties({ prismaSlug, maxPropertiesToShow = 48 }: Props) {
  const { data: similarProperties, errors } = await getSimilarProperties(prismaSlug)

  if (errors) {
    return <ErrorList errors={errors} />
  }
  if (!similarProperties || !similarProperties.length) {
    return <>No properties found</>
  }
  console.log(typeof similarProperties)
  return (
    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:px-0">
      {similarProperties.map((property, index) => {
        if (index > maxPropertiesToShow) return null

        return (
          <RetainQueryLink key={property.slug} href={`${property.slug}`}>
            <SimilarPropertyCard property={property} />
          </RetainQueryLink>
        )
      })}
    </div>
  )
}
