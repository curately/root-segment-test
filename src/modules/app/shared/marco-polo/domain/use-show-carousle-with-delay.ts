import { useEffect, useState } from 'react'

export default function useShowCarouselWithDelay() {
  const [showCarousel, setShowCarousel] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowCarousel(true), 500)
    return () => clearTimeout(timer)
  }, [])
}
