import { Suspense } from 'react'
import { SkipRenderOnClient } from '@/shared/ui/skip-render-on-client'
import { ModalView } from '../../image-gallery/ui/modal-view'
import { MobileCarousel } from '../../image-gallery/ui/teaser/mobile-carousel'
import { TeaserSkeleton } from '../../image-gallery/ui/teaser/teaser-skeleton'
import { BentoGrid } from './bento-grid/bento-grid'

const MOBILE_BREAKPOINT = 768

type Props = {
  images: Array<{ link: string }>
  propertyName: string
  prismaSlug: string
}
/*
const LazyGalleryModal = lazy(() =>
  import('@/property/image-gallery/ui/gallery/gallery-modal').then(module => ({
    default: module.GalleryModal,
  })),
)

const LazyCarouselModal = lazy(() =>
  import('@/property/image-gallery/ui/carousel/carousel-modal').then(module => ({
    default: module.CarouselModal,
  })),
)
*/
export function ImageGalleryViewSelector({ images, propertyName, prismaSlug }: Props) {
  const totalImages = images.length

  const teaserImages: Array<{ link: string }> = images.slice(0, 5)

  return (
    <>
      <BentoGrid images={teaserImages} allImages={images} prismaSlug={prismaSlug} totalImages={totalImages} />
      <MobileCarousel images={images.slice(0, 10)} />
      <ModalView images={images} propertyName={propertyName} prismaSlug={prismaSlug} />
    </>
  )
}
