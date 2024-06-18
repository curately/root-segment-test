import Link from 'next/link'
import { MessageCircle, Star } from 'react-feather'
import { getNumberOfReviews } from '../../property-description/data-access/property-description-data-access'

type PrismaSlug = {
  prismaSlug: string
}

export async function ReviewsLink({ prismaSlug }: PrismaSlug) {
  const { data: numberOfReviews, errors } = await getNumberOfReviews(prismaSlug)

  if (errors || !numberOfReviews) return null

  return (
    <Link href={`${prismaSlug}/#reviews`} className="flex items-center gap-1 underline underline-offset-4">
      <MessageCircle className="h-5 w-5 font-bold text-dark" /> {numberOfReviews} family reviews
    </Link>
  )
}
