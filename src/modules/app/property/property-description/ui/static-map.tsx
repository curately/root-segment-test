import { ErrorList } from '@/shared/ui/error/error-list'
import { getPropertyCoordinates } from '../../property-description/data-access/property-description-data-access'

type PrismaSlug = {
  prismaSlug: string
}
export async function StaticMap({ prismaSlug }: PrismaSlug) {
  const { data: propertyCoordinates, errors } = await getPropertyCoordinates(prismaSlug)
  if (errors) {
    return <ErrorList errors={errors} />
  }
  if (!propertyCoordinates) return <div>No coordinates for map found.</div>

  const mapBoxStaticImageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+555555(${propertyCoordinates[0]},${propertyCoordinates[1]})/${propertyCoordinates[0]},${propertyCoordinates[1]},12,0/1200x500@2x?access_token=pk.eyJ1IjoidGhlZmFtaWx5aG90ZWxndWlkZSIsImEiOiJjbGdqNno3bTUxMnN1M2RwaHZnajlsM2k1In0.VLvow3R3rakCza3hK4p86w`

  return <img className="w-full mt-8" alt="Map of property location" src={mapBoxStaticImageUrl} />
}
