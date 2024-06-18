import { ExpediaImage } from '@/shared/ui/expedia-image'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

/* eslint-disable @next/next/no-img-element */

interface ImageCarouselProps {
  images: Array<string>
}

export function PopUpCarousel({ images }: ImageCarouselProps) {
  if (images.length < 1) {
    return <div className="h-[150px] w-[240px] bg-ivory "></div>
  }

  return (
    <div className="h-auto max-w-[300px] border-0 bg-white ">
      <Swiper
        modules={[Navigation, Pagination]}
        grabCursor={true}
        loop={true}
        pagination={{ clickable: true }}
        spaceBetween={0}
        centeredSlides={true}
        navigation
        slidesPerView={1}
        cssMode={false}
      >
        {images.map((image, index) => {
          if (!image || index > 5) return null

          const alt = 'Hotel Image'
          return (
            <SwiperSlide key={index}>
              <div className="aspect-h-[160] aspect-w-[240]">
                <ExpediaImage src={image} priority={false} alt={alt} />
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
