import { useAllRefinements } from '@/app/refinement/shared/domain/use-refinements-store'
import Link from 'next/link'
import { type PropertyExplorerCard } from '../../domain/property-card-domain'

interface Props {
  property: PropertyExplorerCard
}

const cdnEndpoint = 'https://images.trvl-media.com/lodging/'

export function MapPropertyCard({ property }: Props) {
  const refinements = useAllRefinements()

  let propertySlug = property.slug ? property.slug : '/'
  if (refinements.checkin !== '' && refinements.checkout !== '') {
    propertySlug += `?checkin=${refinements.checkin}&checkout=${refinements.checkout}`
  }
  return (
    <Link href={propertySlug}>
      <div className="flex h-[132px]  w-full gap-0 overflow-hidden rounded-xl border border-slate-300 shadow-sm">
        <div className="flex h-[132px] flex-shrink-0 items-center justify-center rounded-l-md bg-white p-0 text-sm font-medium text-white ">
          <img
            src={`${cdnEndpoint}${property.images[0]}?impolicy=resizecrop&rw=234&rh=264`}
            alt=""
            className="inset-0 h-full w-[117px]  bg-white  object-cover "
            loading="eager"
          />
        </div>
        <div className="flex flex-col justify-between flex-1 w-full px-4 py-2 bg-white rounded-r-xl">
          <div className="flex-1 text-sm ">
            <h3 className="relative font-bold leading-tight text-left text line-clamp-2 font-body text-dark group-hover:text-gray-600">
              {property.propertyName}
            </h3>
            <p className="mt-2 text-sm text-left line-clamp-3 text-dark">{property.description ?? ''}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
