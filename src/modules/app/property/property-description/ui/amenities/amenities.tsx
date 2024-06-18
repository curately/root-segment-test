import { ErrorList } from '@/shared/ui/error/error-list'

import { getAmenities } from '../../../property-description/data-access/property-description-data-access'
import { AmenityDisclosure } from '../../../property-description/ui/amenities/amenity-disclosure'

type Props = {
  prismaSlug: string
}
export async function Amenities({ prismaSlug }: Props) {
  const { data: amenities, errors } = await getAmenities(prismaSlug)

  if (errors) return <ErrorList errors={errors} />

  if (!amenities) return null

  return <AmenityDisclosure amenities={amenities} />
}
