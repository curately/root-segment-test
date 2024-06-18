import { StarRating } from '@/shared/ui/star-rating/star-rating'
import { getPropertyStarRating } from '../../property-description/data-access/property-description-data-access'

type PrismaSlug = {
  prismaSlug: string
}
export async function PropertyStarRating({ prismaSlug }: PrismaSlug) {
  const { data: starRating, errors } = await getPropertyStarRating(prismaSlug)
  if (errors || !starRating) return null
  if (!starRating) return null

  return <StarRating rating={starRating} />
}
