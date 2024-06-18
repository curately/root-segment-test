'use client'

import { useSearchParams } from 'next/navigation'
import React, { lazy } from 'react'
import { CarouselModal } from '../../image-gallery/ui/carousel/carousel-modal'
//import { usePropertySearchParams } from '../../shared/domain/use-property-search-params'
import { GalleryModal } from '../../image-gallery/ui/gallery/gallery-modal'

export const loadCarouselModal = () => {
  return import('../../image-gallery/ui/carousel/carousel-modal')
}
export const loadGalleryModal = () => {
  return import('../../image-gallery/ui/gallery/gallery-modal')
}

const LazyGalleryModal = lazy(() =>
  import('../../image-gallery/ui/gallery/gallery-modal').then(module => ({
    default: module.GalleryModal,
  })),
)

const LazyCarouselModal = lazy(() =>
  import('../../image-gallery/ui/carousel/carousel-modal').then(module => ({
    default: module.CarouselModal,
  })),
)

type Props = {
  images: Array<{ link: string }>
  propertyName: string
  prismaSlug: string
}

export function ModalView({ images, propertyName, prismaSlug }: Props) {
  const searchParams = useSearchParams()
  const modal = searchParams.get('modal')
  const image = searchParams.get('image') || '0'

  if (modal === 'gallery') {
    return <LazyGalleryModal images={images} propertyName={propertyName} />
  }
  if (modal === 'carousel') {
    return <LazyCarouselModal images={images} initialSlide={image} />
  }
}
