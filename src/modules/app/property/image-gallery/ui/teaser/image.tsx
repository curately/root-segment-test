import { useQueryState } from 'nuqs'
import { ExpediaImage } from '@/shared/ui/expedia-image'

type Props = {
  src: string | null
  className?: string
  priority?: boolean
  /*
  galleryLink: {
    pathName: string
    query: PropertyParams
  }
  */
}

export function MontageImage({ priority = false, ...props }: Props) {
  const [_, setModal] = useQueryState('modal')
  if (!props.src) {
    return null
  }
  return (
    <div
      onClick={() => {
        /*
        const queryString = new URLSearchParams(props.galleryLink.query).toString()
        window.history.pushState(null, '', `?${queryString}`)
        */
        setModal('gallery')
      }}
    >
      <ExpediaImage src={props.src} alt="" priority={priority} className={props.className} />
    </div>
  )
  /*
  return (
    <Link href={props.galleryLink.pathName}>
      <ExpediaImage src={props.src} alt="" priority={true} className={props.className} />
    </Link>
  )
  */
}
//window.history.pushState(null, '', `?${params.toString()}`)
