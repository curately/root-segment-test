import { SafeHtml } from '@/shared/ui/safe-html'
import { getPropertyDescription } from '../../property-description/data-access/property-description-data-access'

type PrismaSlug = {
  prismaSlug: string
}
export async function PropertyDescription({ prismaSlug }: PrismaSlug) {
  const { data: propertyDescription, errors } = await getPropertyDescription(prismaSlug)

  if (errors || !propertyDescription) return null

  //const { propertyDescription } = data

  return (
    <div className="max-w-[600px] text-lg font-light text-dark">
      <SafeHtml>{propertyDescription}</SafeHtml>
    </div>
  )
}
