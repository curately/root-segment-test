import { notFound } from 'next/navigation'

import { getPropertiesForDestination } from '@/app/destination/destination-explorer/data-access/destination-explorer-data-access'
import { DestinationExplorer } from '@/app/destination/destination-explorer/ui/destination-explorer'
import { ErrorList } from '@/shared/ui/error/error-list'

type Props = {
  prismaSlug: string
  hasContent: boolean
}
export async function DestinationTemplate({ prismaSlug, hasContent }: Props) {
  /*
  const { data: properties, errors } = await getPropertiesForDestination(prismaSlug)

  if (errors) {
    return <ErrorList errors={errors} />
  }
  if (!properties || !properties.length) {
    // we actually want a ui here to show empty state
    return notFound()
  }
  */
  return <DestinationExplorer prismaSlug={prismaSlug} hasContent={hasContent} />
}
