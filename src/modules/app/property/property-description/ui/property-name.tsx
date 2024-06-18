import { ErrorList } from '@/shared/ui/error/error-list'
import { getPropertyName } from '../../property-description/data-access/property-description-data-access'

type PrismaSlug = {
  prismaSlug: string
}
export async function PropertyName({ prismaSlug }: PrismaSlug) {
  const { data: propertyName, errors } = await getPropertyName(prismaSlug)

  if (errors) {
    return <ErrorList errors={errors} />
  }
  if (!propertyName) {
    return <div>No property found</div>
  }

  //const { propertyName } = data

  return <h1 className="p-0 m-0 text-3xl font-normal font-header text-dark sm:text-left md:text-4xl">{propertyName}</h1>
}
