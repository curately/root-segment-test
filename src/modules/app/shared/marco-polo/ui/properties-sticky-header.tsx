'use client'

import { useActions } from '@/app/shared/marco-polo/domain/use-show-properties-button-store'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

type Props = {
  children: React.ReactNode
}

export function ListHeading({ children }: Props) {
  const { ref, inView } = useInView({
    threshold: 0.9,
  })
  const { setHotelListIsInView } = useActions()
  useEffect(() => {
    setHotelListIsInView(inView)
  }, [inView, setHotelListIsInView])
  return (
    <div
      className="top-[calc(theme(space.header-lg)+theme(space.searchbar-lg))] hidden  h-[70px]  items-center bg-white py-xl md:sticky md:z-20 xl:flex xl:justify-between"
      id="property-list-heading"
      ref={ref}
    >
      {children}
    </div>
  )
}
