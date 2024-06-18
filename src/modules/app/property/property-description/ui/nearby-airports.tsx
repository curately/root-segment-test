import Image from 'next/image'

import { getNearbyAirports } from '../../property-description/data-access/property-description-data-access'
import { Plane } from '../../property-description/ui/assets'

type PrismaSlug = {
  prismaSlug: string
}
export async function NearbyAirports({ prismaSlug }: PrismaSlug) {
  const { data: nearbyAirports, errors } = await getNearbyAirports(prismaSlug)

  if (errors || !nearbyAirports) return null

  if (!nearbyAirports.length) return null
  return (
    <>
      <h2 className="font-header py-2 text-2xl font-medium leading-9 text-black">
        Nearest Airport
        {nearbyAirports.length > 1 ? 's' : ''}
      </h2>
      <div className="flex items-center gap-2">
        <div>
          {nearbyAirports.map((airport, index) => {
            return index < 3 ? (
              <div key={index}>
                {index === 0 ? <Image src={Plane} alt="Airplane" width={20} style={{ height: 'auto' }} /> : false}
                <div className="flex items-center gap-2">
                  <div>
                    <div className="font-bold">{airport.name}</div>
                    <div>{airport.distance} km from this hotel</div>
                  </div>
                </div>
              </div>
            ) : (
              false
            )
          })}
        </div>
      </div>
    </>
  )
}
