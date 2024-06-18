export function sanitisePlaceName(placeName: string) {
  if (!placeName) {
    return {
      itemPlaceOne: '',
      itemPlaceTwo: '',
    }
  }
  let itemPlaceArray = placeName.split(',')
  let itemPlaceOne = itemPlaceArray[0] ?? ''
  let itemPlaceTwo = []
  if (itemPlaceArray.length > 1) {
    if (itemPlaceArray[itemPlaceArray.length - 3] !== undefined) {
      if (itemPlaceArray[0] !== itemPlaceArray[itemPlaceArray.length - 3]) {
        itemPlaceTwo.push(itemPlaceArray[itemPlaceArray.length - 3])
      }
    }
    if (itemPlaceArray[itemPlaceArray.length - 2] !== undefined) {
      itemPlaceTwo.push(itemPlaceArray[itemPlaceArray.length - 2])
    }
    if (itemPlaceArray[itemPlaceArray.length - 1] !== undefined) {
      itemPlaceTwo.push(itemPlaceArray[itemPlaceArray.length - 1])
    }
  }
  return {
    itemPlaceOne: itemPlaceOne,
    itemPlaceTwo: itemPlaceTwo.join(', '),
  }
}
