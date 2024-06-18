import { Refinements } from '@/app/refinement/shared/domain/refinements-domain'
import { useRefinements } from '@/app/refinement/shared/domain/use-refinements'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal'
import { modal } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { X as CancelIcon } from 'react-feather'
import { ExpediaImage } from '@/shared/ui/expedia-image'
import { buildQueryString } from '../../../check-availability/domain/build-query-string'

type ModalProps = {
  images: Array<{
    link: string
  }>
  propertyName: string
  //prismaSlug: string
  //searchParams: PropertyParams
}

type ModalImageProps = {
  src: string
  className: string
  index: number
  imageNumber: number
  roundedClass: string

  //setModal: (modal: string) => void
}

export function GalleryModal({ images, propertyName }: ModalProps) {
  const refinements = useRefinements()
  const setRefinements = Refinements.parse(refinements)
  const router = useRouter()
  const imagesPerChunk = 6
  const imageChunks = getImageChunks(images, imagesPerChunk)
  const path = usePathname()

  const queryString = buildQueryString({ ...setRefinements })

  return (
    <>
      <Modal
        isOpen={true}
        onClose={() => {
          router.push(`${path}${queryString}`)
        }}
        size="5xl"
        scrollBehavior="inside"
        backdrop="blur"
        classNames={{
          base: 'max-h-[calc(100%-1.5rem)] md:max-h-[100%] min-h-[500px] md:min-w-[100%] md:rounded-none pb-4',
          closeButton: 'top-3 right-2',
        }}
        closeButton={
          <div className="z-40 top-4">
            <CancelIcon className="w-5 h-5 font-bold text-dark/70" aria-hidden="true" />
          </div>
        }
      >
        <ModalContent>
          <>
            <ModalHeader>
              <div className="w-5xl line-clamp-1 md:w-full md:text-center md:text-3xl">{propertyName}</div>
            </ModalHeader>
            <ModalBody className="p-4">
              <div className="hidden w-full max-w-4xl grid-cols-6 gap-2 mx-auto text-center md:grid">
                {imageChunks.map((imageChunk, chunkIndex) => {
                  return imageChunk.map((image, index) => {
                    const colspan = getColspan(index)
                    const rounded = getRoundedCornersClass(index)
                    const imageNumber = chunkIndex * imagesPerChunk + index
                    return (
                      <ModalImage
                        key={index}
                        src={image.link}
                        index={index}
                        imageNumber={imageNumber}
                        roundedClass={rounded}
                        className={`aspect-h-2 aspect-w-3 ${(index + 1) % 3 === 0 ? 'col-span-6' : 'col-span-3'}`}

                        //setModal={setModal}
                      />
                    )
                  })
                })}
              </div>
              <div className="grid grid-cols-6 gap-3 md:hidden">
                {images.map((image, index) => {
                  const rounded = getRoundedCornersClass(index)

                  const imageNumber = index
                  return (
                    <ModalImage
                      key={index}
                      src={image.link}
                      index={index}
                      imageNumber={imageNumber}
                      roundedClass={rounded}
                      className={`aspect-h-2 aspect-w-3 ${(index + 1) % 3 === 0 ? 'col-span-6' : 'col-span-3'}`}
                      //setModal={setModal}
                    />
                  )
                })}
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}

function getImageChunks(images: Array<{ link: string }>, imagesPerChunk = 6) {
  // 🐨 Split images into chunks of 6 so that we can apply a different col-span to
  // each image and then repeat the pattern for each chunk

  const imageChunks = images.reduce(
    (
      resultArray: Array<Array<{ link: string }>>, //i.e. an array of lisitingImages arrays
      item: { link: string },
      index: number,
    ) => {
      const chunkIndex = Math.floor(index / imagesPerChunk)
      resultArray[chunkIndex] = resultArray[chunkIndex] || []
      resultArray[chunkIndex]?.push(item)
      return resultArray
    },
    [],
  )
  return imageChunks
}

function getColspan(index: number) {
  if (index < 3) {
    return 'col-span-2'
  }
  if (index === 3 || index === 4) {
    return 'col-span-3'
  }
  if (index === 5) {
    return 'col-span-6'
  }
  return ''
}

function getRoundedCornersClass(index: number) {
  if (index === 0) {
    return 'md:rounded-tl-lg'
  }
  if (index === 2) {
    return 'md:rounded-tr-lg'
  }
  if (index === 5) {
    return 'md:rounded-b-lg'
  }
  return ''
}
/*
function ModalImage(props: ModalImageProps) {
  return (
    <div
      className={props.className}
      onClick={() => {
        if (typeof props.setModal === 'function') {
          props.setModal('carousel')
        }
      }}
    >
      <ExpediaImage
        src={props.src}
        priority={props.imageNumber < 5}
        className={`${props.roundedClass} cursor-pointer hover:opacity-90`}
        alt=""
      />
    </div>
  )
}
*/
function ModalImage(props: ModalImageProps) {
  const path = usePathname()
  const refinements = useRefinements()
  const setRefinements = Refinements.parse(refinements)
  const queryString = buildQueryString({ ...setRefinements, modal: 'carousel', image: props.imageNumber })
  return (
    <Link href={`${path}${queryString}`} className={props.className}>
      <ExpediaImage
        src={props.src}
        priority={props.imageNumber < 5}
        className={`${props.roundedClass} cursor-pointer hover:opacity-90`}
        alt=""
      />
    </Link>
  )
}
