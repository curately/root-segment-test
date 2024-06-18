'use client'

import { useState } from 'react'
import { MapPin } from 'react-feather'
//import { getPropertyPricing } from '@/shared/marco-polo/domain/marco-polo-domain'
//import { PropertyExplorerCard as PropertyCard } from '@/shared/property-cards/domain/property-card-domain'
import { Card, CardContent, CardFooter, CardTitle } from '@/shared/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/shared/ui/carousel'
import { CuratelyScore } from '@/shared/ui/curately-score'
import { ExpediaImage } from '@/shared/ui/expedia-image'
import { cn } from '@/shared/ui/helpers'
import { type PropertyExplorerCard } from '../../domain/property-card-domain'

type PropertyCardProps = {
  property: PropertyExplorerCard
  className?: string
}
export function PropertyExplorerCard({ property, className }: PropertyCardProps) {
  const [showCarousel, setShowCarousel] = useState(false)

  const { images, propertyName, curatelyScore, description, city, country, lengthOfStay, pricingAndAvailability } =
    property

  const { available, averageNightlyPrice, totalPrice } = pricingAndAvailability
    ? pricingAndAvailability
    : { available: false, averageNightlyPrice: '', totalPrice: '' }
  const isSoldOut = available ? false : true
  return (
    <Card
      className={cn('border-0 shadow-none md:border md:shadow-sm', className)}
      onMouseEnter={() => {
        setShowCarousel(true)
      }}
    >
      <CardTitle>
        {showCarousel && images ? (
          <>
            {images && (
              <>
                <div className="relative bg-white sm:block">
                  <Carousel>
                    <CarouselContent>
                      {images.map((image, index) => (
                        <CarouselItem key={image.link}>
                          <div className="relative">
                            <div className="relative w-full h-auto border-0">
                              <div className="z-1 relative aspect-[3/2] w-full bg-ivory">
                                <ExpediaImage
                                  src={image.link}
                                  alt={propertyName}
                                  className="rounded-sm"
                                  priority={index === 0}
                                />
                              </div>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="hidden md:flex md:w-full md:justify-between md:px-4">
                      <CarouselPrevious className="hidden bg-ivory group-hover:inline-flex" />
                      <CarouselNext className="hidden bg-ivory group-hover:inline-flex" />
                    </div>
                  </Carousel>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="relative bg-white sm:block" id="lazy">
              <div className="relative">
                <div className="relative w-full h-auto border-0">
                  <div className="z-1 relative aspect-[3/2] w-full bg-ivory">
                    {images[0]?.link ? (
                      <ExpediaImage src={images[0].link} alt={propertyName} className="rounded-t-md" priority={true} />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex md:w-full md:justify-between md:px-4"></div>
          </>
        )}
      </CardTitle>
      <CardContent>
        <div className="min-h0 flex w-full flex-col justify-between pt-4 xl:min-h-[250px]">
          <h3 className="text-xl font-bold">{propertyName}</h3>
          <div>
            <div className="flex items-center justify-between w-full gap-4 md:items-start">
              <div className="text-lg antialiased font-semibold leading-6 line-clamp-1 text-dark md:text-lg xl:text-lg">
                <div className="flex items-center justify-start gap-1 mt-1 text-sm font-body text-dark/80">
                  <MapPin className="inline text-brand" size={13} />
                  {city}, {country}
                </div>
              </div>
              <div>
                <CuratelyScore score={curatelyScore} className="w-10 h-10 -mt-1" />
              </div>
            </div>
            <div className="block w-full">
              <div className="pt-4 leading-6 text-black text-semibold md:line-clamp-4 md:text-base">{description}</div>
            </div>
          </div>
          <div className="block w-full">
            <div className="mt-4 text-xl font-medium leading-4 text-dark">
              {pricingAndAvailability ? <SoldOutMessage isSoldOut={isSoldOut} /> : null}

              {!pricingAndAvailability && (
                <span className="text-sm text-medium">Add dates to check price & availability</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      {pricingAndAvailability && !isSoldOut ? (
        <CardFooter className="pt-4 bg-white border-t border-t-gray-100">
          <PropertyPriceSummary
            available={available}
            averageNightlyPrice={averageNightlyPrice}
            totalPrice={totalPrice}
            lengthOfStay={lengthOfStay}
          />
        </CardFooter>
      ) : null}
    </Card>
  )
}

type PropertyPriceSummaryProps = {
  available: boolean
  averageNightlyPrice: string | null
  totalPrice: string | null
  lengthOfStay: number | null
}

function PropertyPriceSummary({ available, averageNightlyPrice, totalPrice, lengthOfStay }: PropertyPriceSummaryProps) {
  if (!available) {
    return null
  }
  if (!available || !averageNightlyPrice || !totalPrice) {
    return null
  }
  const price = Math.round(parseInt(averageNightlyPrice))
  return (
    <div className="flex flex-col gap-4 py-4">
      <div>
        <span className="text-xl"> £{price}</span> <span className="text-sm text-dark"> per night</span>
        <div className="text-sm text-dark">
          <span className="text-sm font-bold">£{Math.round(parseInt(totalPrice))}</span>
          <span className="font-normal">
            {' total'}
            {lengthOfStay && lengthOfStay > 1 && ` for ${lengthOfStay} nights`}
          </span>
        </div>
      </div>
    </div>
  )
}

type SoldOutMessageProps = {
  isSoldOut: boolean
}
function SoldOutMessage({ isSoldOut }: SoldOutMessageProps) {
  if (isSoldOut) {
    return (
      <span className="p-4 py-1 text-xs text-red-900 rounded-4xl bg-gradient-to-r from-rose-50 to-rose-100 ">
        Not available for your dates
      </span>
    )
  }
  return null
}
