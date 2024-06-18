'use client'

import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/shared/ui/button'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/shared/ui/carousel'
import { ExpediaImage } from '@/shared/ui/expedia-image'

//import { preloadAssets } from "./image-gallery-teaser"

type Props = {
  images: Array<{ link: string }>
}
export function MobileCarousel({ images }: Props) {
  const [_, setModal] = useQueryState('modal')

  const { ref, inView } = useInView({
    threshold: 0.9,
  })
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }
    if (inView) {
      //preloadAssets(images)
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api, images, inView])
  return (
    <Carousel className="relative w-full md:hidden" setApi={setApi} ref={ref}>
      <div className="absolute z-20 px-2 text-sm text-white rounded-full right-4 top-4 h-7 bg-dark/70">
        <div className="flex items-center justify-center p-1 ">
          {current}/ {images.length}
        </div>
      </div>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            onClick={() => {
              setModal('gallery')
            }}
          >
            <div className="relative">
              <div className="relative w-full h-auto border-0">
                <div className="z-1 relative aspect-[3/2] w-full bg-ivory">
                  <ExpediaImage src={image.link} alt="" className="rounded-sm" priority={index === 0} />
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center gap-2 pt-4 bottom-2">
        {images.map((image, i) => (
          <Button
            key={i}
            className={`mx-1 h-1.5 w-1.5 flex-grow rounded-full p-0  ${
              i === current - 1 ? 'bg-accent hover:bg-accent' : 'bg-pill hover:bg-pill'
            }`}
            onClick={() => api?.scrollTo(i)}
          />
        ))}
      </div>
    </Carousel>
  )
}
