'use client'

import { Suspense, useState } from 'react'
import { MontageImage } from '../../../image-gallery/ui/bento-grid/image'
import { SeeMorePhotosButton } from '../../../image-gallery/ui/bento-grid/see-more-photos-button'
import { loadCarouselModal, loadGalleryModal } from '../modal-view'

type Props = {
  prismaSlug: string
  images: Array<{ link: string }>
  totalImages: number
  allImages: Array<{ link: string }>
}

export const preloadAssets = (images: Array<{ link: string }>) => {
  loadCarouselModal().then(() => {
    loadGalleryModal().then(() => {
      images.forEach(propertyImage => {
        const image = new Image()
        image.src = `https://images.trvl-media.com/lodging/${propertyImage.link}?impolicy=resizecrop&rw=900&ra=fit`
      })
    })
  })
}

export const primeExpediaCache = (images: Array<{ link: string }>) => {
  images.forEach(propertyImage => {
    fetch(`https://images.trvl-media.com/lodging/${propertyImage.link}?impolicy=resizecrop&rw=730&ra=fit`)
  })
}

export function BentoGrid({ images, allImages, prismaSlug, totalImages }: Props) {
  const [assetsHaveBeenPreloaded, setAssetsHaveBeenPreloaded] = useState(false)

  return (
    <div
      className="relative mx-auto hidden max-w-inner-container bg-white lg:container md:block"
      onMouseOver={() => {
        if (!assetsHaveBeenPreloaded) {
          preloadAssets(allImages)
          //primeExpediaCache(allImages)
          setAssetsHaveBeenPreloaded(true)
        }
      }}
      onTouchStart={() => {
        if (!assetsHaveBeenPreloaded) {
          preloadAssets(allImages)
          //primeExpediaCache(allImages)
          setAssetsHaveBeenPreloaded(true)
        }
      }}
    >
      <div className="grid auto-rows-[250px] grid-cols-4 gap-[2px]">
        {images.map((image, index) => (
          <div key={index} className={` ${index === 0 ? 'col-span-2 row-span-2 ' : ''}`}>
            <ImageContainer image={images[index]?.link ?? null}>
              <div className="group aspect-h-1 aspect-w-1 cursor-pointer overflow-hidden sm:aspect-none sm:relative sm:h-full">
                <MontageImage
                  src={images[index]?.link ?? null}
                  className={`object-cover object-center duration-500 group-hover:scale-105 sm:absolute sm:inset-0 sm:h-full sm:w-full ${index === 0 && 'rounded-l-2xl'} ${index === 2 && 'rounded-tr-2xl'} ${index === 4 && 'rounded-br-2xl'}`}
                />
                {index === 4 && (
                  <div className="flex w-full items-end p-6 sm:absolute sm:bottom-2 sm:right-0">
                    <Suspense>
                      <SeeMorePhotosButton numImages={totalImages} />
                    </Suspense>
                  </div>
                )}
              </div>
            </ImageContainer>
          </div>
        ))}
      </div>
    </div>
  )
}

function ImageContainer({ image, children }: { image: string | null; children: React.ReactNode }) {
  if (!image) {
    return null
  }
  return <>{children}</>
}
