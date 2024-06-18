export function buildExpediaRoomString(rooms: string) {
  const roomArray = rooms ? rooms.split('-') : []
  const numberOfRooms = roomArray.length

  let roomString = ''
  for (let i = 0; i < numberOfRooms; i++) {
    let currentRoom = roomArray[i] ?? ''
    const currentRoomArray = currentRoom.split(',')

    let currentRoomArrayAdults = currentRoomArray[0]

    const childAges = currentRoomArray.map((childAge, index) => {
      if (index === 0) return // this is adults
      return childAge === '' ? -1 : parseInt(childAge)
    })

    const childrenAgesSanitised = childAges.filter(childAge => {
      if (childAge === undefined) return false
      return childAge < 18
    })

    const childAgesString = childrenAgesSanitised.join(',')

    roomString += `&room${i + 1}.adults=${currentRoomArrayAdults}`
    if (childAgesString.length > 0 && childAgesString !== '-1') {
      roomString += `&room${i + 1}.childAges=${childAgesString}`
    }
  }
  return roomString
}
