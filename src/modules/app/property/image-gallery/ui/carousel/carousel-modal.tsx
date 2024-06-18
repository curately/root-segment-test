'use client'

import { Refinements } from '@/app/refinement/shared/domain/refinements-domain'
import { useRefinements } from '@/app/refinement/shared/domain/use-refinements'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { X as CancelIcon } from 'react-feather'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/shared/ui/carousel'
import { ExpediaImage } from '@/shared/ui/expedia-image'
import { buildQueryString } from '../../../check-availability/domain/build-query-string'

interface Props {
  images: Array<{ link: string }>
  initialSlide?: string
}
export function CarouselModal({ images, initialSlide }: Props) {
  const router = useRouter()
  const path = usePathname()
  const refinements = useRefinements()
  const setRefinements = Refinements.parse(refinements)
  const queryString = buildQueryString({ ...setRefinements, modal: 'gallery' })

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(initialSlide ? parseInt(initialSlide) : 0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <>
      <Modal
        isOpen={true}
        onClose={() => {
          router.push(`${path}${queryString}`)
        }}
        size="full"
        placement="center"
        backdrop="blur"
        classNames={{
          header: 'h-12 p-0',
          closeButton: 'top-8 right-8 hover:text-gray-950 text-white',
        }}
        closeButton={
          <div className="z-40 top-4">
            <CancelIcon className="w-5 h-5 font-bold " aria-hidden="true" />
          </div>
        }
      >
        <ModalContent>
          <>
            <ModalHeader className="bg-black"></ModalHeader>
            <ModalBody className="flex items-center justify-center p-0 bg-black flex-cols md:p-6">
              <Carousel
                className="relative mx-4 aspect-[3/2] w-full md:mx-0 md:h-[90%] md:w-auto"
                setApi={setApi}
                opts={{ startIndex: initialSlide ? parseInt(initialSlide) : 0 }}
              >
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="z-1 relative aspect-[3/2] w-full bg-ivory">
                        <ExpediaImage src={image.link} alt="" className="rounded-0" priority={index === 0} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden md:flex md:w-full md:justify-between md:px-4">
                  <CarouselPrevious className="hidden w-12 h-12 bg-gray-100 hover:bg-gray-200 md:inline-flex" />
                  <CarouselNext className="hidden w-12 h-12 bg-gray-100 hover:bg-gray-200 md:inline-flex" />
                </div>
              </Carousel>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}
