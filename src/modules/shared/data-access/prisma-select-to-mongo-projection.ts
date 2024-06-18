type SliceOperation = { $slice: [string, number] }
type Projection = Record<string, number | SliceOperation>
type PrismaSelection = Record<string, boolean> | boolean

type PrismaSelectionProps = {
  prismaSelection: PrismaSelection
  sliceImages?: boolean
  numImages?: number
}

/*

this function takes a prisma selection and returns a mongo projection by converting the keys of the prisma selection to the keys of the mongo projection
i.e from true to 1 and strips out any keys with a non true value.

The purpose of this is to be able to create projections for mongo queries based on the prisma selection object so that we can use the imbuilt prisma
payload type to type the return values of raw prisma queries (findRaw)

*/

export function prismaSelectToMongoProjection({
  prismaSelection,
  sliceImages = false,
  numImages = 5,
}: PrismaSelectionProps): Record<string, number> | Projection {
  //replace each true with 1 in the values of selection object
  const mongoProjection = Object.fromEntries(
    Object.entries(prismaSelection).map(([key, value]) => {
      if (value === true) {
        return [key, 1]
      }

      return [key, prismaSelectToMongoProjection(value)]
    }),
  )
  //filter out all the false values
  Object.keys(mongoProjection).forEach(key => {
    if (mongoProjection[key] !== 1) {
      delete mongoProjection[key]
    }
  })
  if (!sliceImages) {
    return mongoProjection
  }
  return sliceProjectionImages(mongoProjection, numImages)
}

function sliceProjectionImages(projection: Projection, numImages: number = 5) {
  let slicedProjection: Projection = { ...projection }

  if (projection.images !== undefined) {
    slicedProjection.images = {
      $slice: ['$images', numImages],
    }
  }
  return slicedProjection
}
