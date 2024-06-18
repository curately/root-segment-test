import Link from 'next/link'
import { ErrorList } from '@/shared/ui/error/error-list'
import { getCuratedProperties } from '../data-access/curated-properties-data-access'
import { CuratedPropertyCard } from './curated-property-card'

const numCardsToShow = 48

type Props = {
  prismaSlug: string
}
export async function CuratedProperties({ prismaSlug }: Props) {
  const { data: curatedProperties, errors } = await getCuratedProperties(prismaSlug)
  if (errors) {
    return <ErrorList errors={errors} />
  }
  if (!curatedProperties) return <div>No properties found</div>

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {curatedProperties.map((property, index) => {
        if (index > numCardsToShow - 1) return null
        return (
          <Link key={property.slug} href={property.slug}>
            <CuratedPropertyCard property={property} />
          </Link>
        )
      })}
    </div>
  )
}
