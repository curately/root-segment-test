import { useActiveMarkerId } from '@/app/shared/marco-polo/domain/use-marco-polo-store'
import BuildingsLightSharp from '@/components/ui/map/images/buildings-sharp-light.svg'
import Image from 'next/image'
import { Home } from 'react-feather'
import { Marker } from 'react-map-gl'

interface Props {
  slug: string
  coordinates: number[]
  //onClick: (e: MapboxEvent<MouseEvent>) => void
  //onClick: (e: MapboxEvent<MouseEvent>) => void
  onClick: (e: any) => void
  clickedMarkerId: string | null
}

/*
export function MapMarker({ slug, coordinates, onClick, clickedMarkerId }: Props) {
  const activeMarkerId = useActiveMarkerId()
  return (
    <Marker
      key={slug}
      longitude={coordinates ? coordinates[0] : 0}
      latitude={coordinates ? coordinates[1] : 0}
      onClick={onClick}
      style={{
        zIndex: clickedMarkerId === slug || activeMarkerId === slug ? 1 : 0,
      }}
    >
      <div
        className={
          activeMarkerId === slug
            ? 'p-2   flex items-center justify-center border border-dark  rounded-full cursor-pointer bg-yellow-200 z-3 text-white tranform-all scale-300'
            : 'p-2  shadow-lg border border-gray-800  rounded-full  cursor-pointer bg-slate-50 z-1  hover:bg-yellow-300 text-dark/90 hover:text-white  hover:border-accent-dark hover:scale-200'
        }
      >
        <Image src={BuildingsLightSharp} alt="" width={18} height={18} />
      </div>
    </Marker>
  )
}
*/

export function MapMarker({ slug, coordinates, onClick, clickedMarkerId }: Props) {
  const activeMarkerId = useActiveMarkerId()
  return (
    <Marker
      key={slug}
      longitude={coordinates[0] ?? 0}
      latitude={coordinates[1] ?? 0}
      onClick={onClick}
      style={{
        zIndex: clickedMarkerId === slug || activeMarkerId === slug ? 1 : 0,
      }}
    >
      <div
        className={
          activeMarkerId === slug
            ? 'z-3   tranform-all scale-300 flex cursor-pointer items-center  justify-center rounded-full border-2 border-white bg-yellow-400 p-2 text-white'
            : 'z-1  hover:scale-200 cursor-pointer rounded-full border-2  border-white  bg-primary-400 p-2  text-dark/90 shadow-lg hover:bg-yellow-400   hover:text-white'
        }
      >
        <Home className={`h-4 w-4 ${activeMarkerId === slug ? 'text-dark' : 'text-white'} `} />
      </div>
    </Marker>
  )
}
