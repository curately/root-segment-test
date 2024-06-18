type Props = {
  checkin: string
  checkout: string
}
export function isValidDateRange({ checkin, checkout }: Props) {
  const checkInDate = new Date(checkin)
  const checkOutDate = new Date(checkout)
  const timeDifference = checkOutDate.getTime() - checkInDate.getTime()
  const numberOfNights = Math.ceil(timeDifference / (1000 * 3600 * 24))

  const isValidRange = numberOfNights > 0 && numberOfNights <= 28

  return isValidRange
}

export function getNumberOfGuestsFromRooms({ rooms: rooms }: { rooms: string }) {
  const roomArray = rooms ? rooms.split('-') : []
  const numberOfRooms = roomArray.length

  let roomCounter = 0
  let numAdults = 0
  let numChildren = 0

  for (let i = 0; i < numberOfRooms; i++) {
    let currentRoomString = roomArray[i] ?? ''

    let currentRoom = currentRoomString.split(',')

    roomCounter++
    numAdults += parseInt(currentRoom[0] ?? '0')

    const childAges = currentRoom.map((childAge, index) => {
      if (index === 0) return
      return parseInt(childAge)
    })

    const childrenAgesSanitised = childAges.filter(childAge => {
      if (childAge === undefined) return false
      return childAge < 18
    })

    numChildren += childrenAgesSanitised.length ? childrenAgesSanitised.length : 0
  }
  const numGuests = numAdults + numChildren
  return `${numGuests} guest${numGuests > 1 ? 's' : ''}`
}

export function formatGuests({ rooms: rooms }: { rooms: string }) {
  const roomArray = rooms.split('-')

  const numberOfRooms = roomArray.length

  let numAdults = 0
  let numChildren = 0
  let roomString = ''
  for (let i = 0; i < numberOfRooms; i++) {
    let currentRoom = roomArray[i]?.split(',') ?? []

    numAdults += parseInt(currentRoom[0] ?? '0')

    const childAges = currentRoom.map((childAge, index) => {
      if (index === 0) return
      return parseInt(childAge)
    })

    const childrenAgesSanitised = childAges.filter(childAge => {
      return childAge && childAge > 0 && childAge < 18
    })

    numChildren += childrenAgesSanitised.length ? childrenAgesSanitised.length : 0
  }

  roomString += numAdults
  roomString += numAdults > 1 ? ' adults ' : ' adult '
  if (numChildren > 0) {
    roomString += 'and '
    roomString += numChildren
    roomString += numChildren === 0 || numChildren > 1 ? ' children' : ' child'
  }

  return roomString
}

export function formatRoomStay(rooms: string) {
  const numberOfRooms = rooms ? rooms.split('-').length : 0
  const suffix = rooms.split('-').length === 1 ? 'room' : 'rooms'
  return `${numberOfRooms} ${suffix}`
}

export function getNumberOfRooms(rooms: string) {
  const numberOfRooms = rooms ? rooms.split('-').length : 0
  return numberOfRooms
}

export function getNumberOfGuests(rooms: string) {
  const roomArray = rooms ? rooms.split('-') : []
  const numberOfRooms = roomArray.length

  let roomCounter = 0
  let numAdults = 0
  let numChildren = 0

  for (let i = 0; i < numberOfRooms; i++) {
    const currentRoomString = roomArray[i] ?? ''
    let currentRoom = currentRoomString.split(',')

    roomCounter++
    numAdults += parseInt(currentRoom[0] ?? '0')

    const childAges = currentRoom.map((childAge, index) => {
      if (index === 0) return
      return parseInt(childAge)
    })

    const childrenAgesSanitised = childAges.filter(childAge => {
      if (childAge === undefined) return false
      return childAge < 18
    })

    numChildren += childrenAgesSanitised.length ? childrenAgesSanitised.length : 0
  }
  const numGuests = numAdults + numChildren
  return numGuests
}
