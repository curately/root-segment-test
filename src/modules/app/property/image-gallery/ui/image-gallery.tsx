import { getImageGalleryData } from '../../image-gallery/data-access/image-gallery-data-access'
import { ImageGalleryViewSelector } from '../../image-gallery/ui/image-gallery-view-selector'

type Props = {
  prismaSlug: string
}

export async function ImageGallery({ prismaSlug }: Props) {
  const { data, errors } = await getImageGalleryData(prismaSlug)

  if (errors || !data) return null

  const { images, propertyName } = data

  if (!images || images.length < 5) return null

  return <ImageGalleryViewSelector images={images} propertyName={propertyName} prismaSlug={prismaSlug} />
}
