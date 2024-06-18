import { Breadcrumb } from '@/app/shared/breadcrumb/ui/breadcrumb'
import { Suspense } from 'react'
import { CheckAvailability } from '../check-availability/ui/check-availability'
//import { SkipRenderOnClient } from '@/shared/ui/skip-render-on-client'
import { ImageGallery } from '../image-gallery/ui/image-gallery'
import { TeaserSkeleton } from '../image-gallery/ui/teaser/teaser-skeleton'
import {
  Amenities,
  AreaDescription,
  NearbyAirports,
  PropertyDescription,
  PropertyName,
  PropertyStarRating,
  ReviewsLink,
  StaticMap,
} from '../property-description/ui'
import { Reviews } from '../reviews/ui/reviews'
import { SimilarProperties } from '../similar-properties/ui/similar-properties'

type Props = {
  propertySlug: string
}

const MOBILE_BREAKPOINT = 768
export function PropertyTemplate({ propertySlug }: Props) {
  return (
    <>
      <main className="px-6 py-6 mx-auto max-w-hotel-container lg:px-0">
        <div className="flex flex-col gap-sm">
          <Breadcrumb type="property" prismaSlug={propertySlug} hideLast={false} linkToLast={false} />
          <PropertyName prismaSlug={propertySlug} />

          <Suspense fallback={<TeaserSkeleton />}>
            <ImageGallery prismaSlug={propertySlug} />
          </Suspense>
        </div>

        <section className="py-8 text-dark md:py-12 lg:px-0">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-start">
            <Suspense fallback={<div>Loading content...</div>}>
              <div className="flex flex-col order-2 w-full gap-4 pr-8 lg:w-5/12 xl:order-1 xl:w-8/12">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <PropertyStarRating prismaSlug={propertySlug} />
                    <ReviewsLink prismaSlug={propertySlug} />
                  </div>
                </div>
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-medium leading-9 text-black font-header">About the hotel</h2>
                    <PropertyDescription prismaSlug={propertySlug} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-medium leading-9 text-black font-header">Nearby attractions</h2>
                    <AreaDescription prismaSlug={propertySlug} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-medium leading-9 text-black font-header">Popular amenities</h2>
                    <Amenities prismaSlug={propertySlug} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <NearbyAirports prismaSlug={propertySlug} />
                  </div>
                </div>
              </div>
            </Suspense>
            <div className="order-1 w-full lg:order-2 lg:w-6/12 xl:sticky xl:top-[100px] xl:w-4/12">
              <Suspense>
                <CheckAvailability prismaSlug={propertySlug} />
              </Suspense>
            </div>
          </div>
        </section>
        <section>
          <Suspense fallback={<div>Loading map...</div>}>
            <StaticMap prismaSlug={propertySlug} />
          </Suspense>
        </section>
        <section id="reviews">
          <Suspense fallback={<div>Loading reviews...</div>}>
            <Reviews prismaSlug={propertySlug} />
          </Suspense>
        </section>
        <section className="container py-8 mx-auto mt-8 max-w-inner-container ">
          <h3 className="py-2 mt-4 text-2xl font-medium leading-9 text-black font-header">Similar Hotels</h3>
          <Suspense fallback={<div>Loading reviews...</div>}>
            <SimilarProperties prismaSlug={propertySlug} />
          </Suspense>
        </section>
      </main>
    </>
  )
}
