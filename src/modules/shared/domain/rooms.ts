import { type Rooms as GuestPickerObject } from '@/app/refinement/guests/domain/guests-domain'

export const tranformRoomToExpediaFormat = (roomParam: string): string => {
  const roomArray = roomParam.split('-')
  const numberOfRooms = roomParam === '' ? 0 : roomArray.length

  let expediaRoomString = ''
  for (let i = 0; i < numberOfRooms; i++) {
    let currentRoom = roomArray[i] ?? ''

    let currentRoomArrayAdults = currentRoom.split(',')[0]

    let currentRoomArrayChildren = currentRoom.split(',')
    currentRoomArrayChildren.shift()

    const childAges = currentRoomArrayChildren.join(',')

    expediaRoomString += `&room${i + 1}.adults=${currentRoomArrayAdults}`
    if (childAges !== '') {
      expediaRoomString += `&room${i + 1}.childAges=${childAges}`
    }
  }
  return expediaRoomString
}

export const transformRoomToGuestPickerObject = (roomParam: string): GuestPickerObject => {
  const rooms = roomParam === '' ? ['2'] : roomParam ? roomParam.split('-') : ['2']
  const guestPickerObject = rooms.map(room => {
    const currentRoom = room.split(',')

    const adults = currentRoom[0] === '' ? 0 : parseInt(currentRoom[0] ?? '0')
    let childrenAges: number[] = []
    currentRoom.map((childAge, index) => {
      if (index === 0) return false
      if (parseInt(childAge) > -1) {
        childrenAges.push(parseInt(childAge))
      }
    })

    return {
      adults: adults,
      children: childrenAges,
    }
  })

  return guestPickerObject
}

export const transformRoomToUrl = (guestPickerObject: GuestPickerObject): string => {
  const urlRooms = guestPickerObject.map(room => {
    const adults = room.adults
    const children = room.children
    return `${adults},${children.join(',')}`
  })
  return urlRooms.join('-')
}
