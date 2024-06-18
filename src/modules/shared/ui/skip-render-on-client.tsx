//import * as React from 'react'
import { useEffect, useId, useRef, useState } from "react"

const MAX_MOBILE_WIDTH = 768
const useIsFirstRender = (): boolean => {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false

    return true
  } else {
    return false
  }
}

/**
 * When using React's server-side rendering, we often need to render components
 * on the server even if they are conditional on the client e.g. hidden based on
 * window width.
 *
 * In order for hydration to succeed, the first client render must
 * match the DOM (which is generated from the HTML returned by the server),
 * otherwise we will get hydration mismatch errors. This means the component
 * must be rendered again during the first client render.
 *
 * However, hydration is expensive, so we really don't want to pay that penalty
 * only for the element to be hidden or removed immediately afterwards.
 *
 * For example, imagine we have two components: one for mobile and one for
 * desktop. Usually we would render both components on the server and on the
 * client (to avoid hydration mismatch errors) and toggle their visibility using
 * CSS. This means we would be hydrating both components even though only one of
 * them is currently shown to the user.
 *
 * `SkipRenderOnClient` conditionally skips hydrating children by removing them
 * from the DOM _before the first client render_. Removing them before ensures
 * hydration is successful and there are no hydration mismatch errors.
 *
 * Following on from the example above, this is how we would apply
 * `SkipRenderOnClient`:
 *
 * ```tsx
 * <SkipRenderOnClient shouldRenderOnClient={() => window.innerWidth <= 500}>
 *   <MyMobileComponent className={styles.showOnMobile} />
 * </SkipRenderOnClient>
 * <SkipRenderOnClient shouldRenderOnClient={() => window.innerWidth > 500}>
 *   <MyDesktopComponent className={styles.showOnDesktop} />
 * </SkipRenderOnClient>
 * ```
 */
export const SkipRenderOnClient: React.FC<{
  children: React.ReactNode
  shouldRenderOnClient: () => boolean
  className?: string
  breakpoint?: number
}> = ({ children, shouldRenderOnClient, className = '', breakpoint = 768 }) => {
  /*
  const [sizeHasChanged, setSizeHadChanged] = useState(false)
  const [numRenders, setNumRenders] = useState(0)
  const [lastWindowWidth, setLastWindowWidth] = useState(0)
  */
  const isMobileSize = useWindowResizeThreshold(breakpoint)
  /*
  useEffect(() => {
    //Some more code to execute when the mobile size is toggled
  }, [isMobileSize])
  */
  const id = useId()
  const isClient = typeof window !== 'undefined'
  const isFirstRender = useIsFirstRender()

  if (isClient && isFirstRender && shouldRenderOnClient() === false) {
    const el = document.getElementById(id)
    if (el !== null) {
      el.innerHTML = ''
    }
  }

  const shouldRender = isClient ? shouldRenderOnClient() : true
  //console.log('rendering')
  return (
    <div id={id} className={className}>
      {shouldRender && children}
    </div>
  )
}

const useWindowResizeThreshold = (threshold: number) => {
  const [isMobileSize, setIsMobileSize] = useState(false)
  const prevWidth = useRef(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      const currWidth = window.innerWidth
      if (currWidth <= threshold && prevWidth.current > threshold) {
        setIsMobileSize(true)
      } else if (currWidth > threshold && prevWidth.current <= threshold) {
        setIsMobileSize(false)
      }
      //console.log(currWidth, prevWidth.current)
      prevWidth.current = currWidth
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [threshold])

  return isMobileSize
}
