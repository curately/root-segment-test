import Link from 'next/link'
import { Navigation as NavigationIcon } from 'react-feather'
import { ErrorList } from '@/shared/ui/error/error-list'
import { cn } from '@/shared/ui/helpers'
import { getSimilarDestinations } from '../data-access/similar-destinations-data-access'
import type { SimilarDestinationGroup } from '../domain/similar-destinations-domain'

const destinationGroupHeaders = ['Neighborhoods', 'Cities', 'Province / State', 'Countries']

type Props = {
  prismaSlug: string
  className?: string
}
export async function SimilarDestinations({ prismaSlug, className = '' }: Props) {
  const { data, errors } = await getSimilarDestinations(prismaSlug)
  if (errors) {
    return <ErrorList errors={errors} />
  }
  if (!data) {
    return null
  }

  const { neighborhood, city, province_state, country } = data

  const SimilarDestinationsArray = [neighborhood, city, province_state, country]

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex items-center w-full gap-1 pl-4 mx-auto text-center">
        <NavigationIcon className="inline-block mr-2" />
        <h3 className="text-2xl font-semibold font-body ">Nearby locations to explore</h3>
      </div>

      <div className="p-0 my-1 overflow-hidden divide-y divide-gray-200 rounded-lg bg-ivory sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0 md:p-0">
        {SimilarDestinationsArray.map((similarDestinationGroup, index) => {
          return <SimilarDestinationList key={index} similarDestinationGroup={similarDestinationGroup} index={index} />
        })}
      </div>
    </div>
  )
}

type SimilarDestinationListProps = {
  index: number
  similarDestinationGroup: SimilarDestinationGroup
}
export function SimilarDestinationList({ index, similarDestinationGroup }: SimilarDestinationListProps) {
  return (
    <div
      key={index}
      className={cn(
        index === 0 ? 'divide-y-none sm:rounded-tl-lg' : '',
        index === 1 ? 'sm:rounded-tr-lg' : '',
        index === 2 ? 'sm:rounded-bl-lg' : '',
        index === 3 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
        'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500',
      )}
    >
      <div className="flex flex-col gap-3 text-md">
        <h4 className="text-xl font-semibold">{destinationGroupHeaders[index]}</h4>
        <ul className="flex flex-col gap-2">
          {similarDestinationGroup.map(destination => {
            return (
              <li key={destination.slug}>
                <Link href={destination.slug} className="block text-brand hover:underline" prefetch={true}>
                  <span className="text-dark/60">{'- '} </span> {destination.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
