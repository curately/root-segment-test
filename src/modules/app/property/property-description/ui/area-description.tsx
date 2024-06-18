import { ErrorList } from '@/shared/ui/error/error-list'

import { getAreaDescription } from '../../property-description/data-access/property-description-data-access'

type PrismaSlug = {
  prismaSlug: string
}
export async function AreaDescription({ prismaSlug }: PrismaSlug) {
  const { data: areaDescription, errors } = await getAreaDescription(prismaSlug)

  if (errors) {
    return <ErrorList errors={errors} />
  }

  if (!areaDescription) {
    return <div>No area description found</div>
  }

  return <div className="max-w-[600px] text-lg font-light text-dark">{areaDescription}</div>
}
