export type Rooms = {
  adults: number
  children: number[] | []
}[]
export const MAX_ROOMS = 8
export const MAX_GUESTS = 13

export function transformInternalStateToUrl(internalState: Rooms) {
  const urlRooms = internalState.map(room => {
    const adults = room.adults
    const children = room.children
    return `${adults},${children.join(',')}`
  })
  return urlRooms.join('-')
}

export function getTotalAdultsAndChildren(rooms: Rooms) {
  return getTotalAdults(rooms) + getTotalChildren(rooms)
}

export function getTotalChildren(rooms: Rooms) {
  let totalChildren = 0
  rooms.map(room => {
    totalChildren += room.children.length
  })
  return totalChildren
}

export function getTotalAdults(rooms: Rooms) {
  let totalAdults = 0
  rooms.map(room => {
    totalAdults += room.adults
  })

  return totalAdults
}

export function transformUrlToInternalState(urlRooms: string | null) {
  const rooms = urlRooms === '' ? ['2'] : urlRooms ? urlRooms.split('-') : ['2']

  const internalState = rooms.map(room => {
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

  return internalState
}

export function ordinal(i: number) {
  i = Math.abs(i)
  const cent = i % 100
  if (cent >= 10 && cent <= 20) return i + 'th'
  const dec = i % 10
  if (dec === 1) return i + 'st'
  if (dec === 2) return i + 'nd'
  if (dec === 3) return i + 'rd'
  return i + 'th'
}

export const childAges = [
  {
    label: 'Under 1',
    value: 0,
  },
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '3',
    value: 3,
  },
  {
    label: '4',
    value: 4,
  },
  {
    label: '5',
    value: 5,
  },
  {
    label: '6',
    value: 6,
  },
  {
    label: '7',
    value: 7,
  },
  {
    label: '8',
    value: 8,
  },
  {
    label: '9',
    value: 9,
  },
  {
    label: '10',
    value: 10,
  },
  {
    label: '11',
    value: 11,
  },
  {
    label: '12',
    value: 12,
  },
  {
    label: '13',
    value: 13,
  },
  {
    label: '14',
    value: 14,
  },
  {
    label: '15',
    value: 15,
  },
  {
    label: '16',
    value: 16,
  },
  {
    label: '17',
    value: 17,
  },
]
