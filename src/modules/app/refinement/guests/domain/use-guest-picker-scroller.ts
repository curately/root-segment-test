import { type Rooms } from '@/app/refinement/guests/domain/guests-domain'
import { useEffect } from 'react'

export default function useGuestPickerScroller(bottomRef: React.RefObject<HTMLDivElement>, rooms: Rooms) {
  useEffect(
    function scrollToBottomAfterRoomAddition() {
      if (bottomRef.current && rooms.length > 1) {
        bottomRef.current?.scrollIntoView({
          behavior: 'auto',
          block: 'nearest',
          inline: 'nearest',
        })
      }
    },
    [rooms.length, bottomRef],
  )
}
