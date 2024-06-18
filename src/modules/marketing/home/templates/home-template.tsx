import { CurationList } from '../curation-list/ui/curation-list'
import { PopularDestinations } from '../popular-destinations/ui/popular-destinations'
import { PopularHotels } from '../popular-hotels/ui/popular-hotels'

export function HomeTemplate() {
  return (
    <>
      <PopularHotels />
      <PopularDestinations />
      <CurationList />
    </>
  )
}
