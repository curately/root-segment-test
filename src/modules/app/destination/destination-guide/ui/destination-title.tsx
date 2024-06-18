import { ErrorList } from '@/shared/ui/error/error-list'

import { db } from '../../shared/data-access/db'
import { getDestinationName } from '../data-access/destination-guide-data-access'

interface Props {
  prismaSlug: string
  className?: string
}
export async function DestinationTitle({ prismaSlug, className }: Props) {
  var startTime = performance.now()

  const { data: destinationName, errors } = await getDestinationName(prismaSlug)
  var endTime = performance.now()
  console.log(`Call to getDestinationName took ${endTime - startTime} milliseconds`)
  if (errors) {
    return <ErrorList errors={errors} />
  }
  if (!destinationName) {
    return <div>No destination name found</div>
  }

  return <>{destinationName}</>
}
