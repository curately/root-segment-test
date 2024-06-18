import emptyStateShrug from '@public/empty-shrug.png'
import Image from 'next/image'

export function EmptyState() {
  return (
    <img
      src="https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/-43.3011,0,1.14,0/1200x800?access_token=pk.eyJ1IjoidGhlZmFtaWx5aG90ZWxndWlkZSIsImEiOiJjbGdqNno3bTUxMnN1M2RwaHZnajlsM2k1In0.VLvow3R3rakCza3hK4p86w"
      alt="No results"
      className="w-full h-full"
    />
  )
}
export default EmptyState
