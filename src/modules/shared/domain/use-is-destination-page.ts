import { usePathname } from 'next/navigation'

import { ROUTE_URLS } from './routes'

export function isDestinationPage(pathName: string) {
  if (pathName === '/') {
    return false
  }

  const allPages = ROUTE_URLS.pages
  const allPagesValues: Array<string> = Object.values(allPages)
  const isDirectMatch = allPagesValues.includes(pathName)

  if (isDirectMatch) {
    return false
  }

  const firstPartOfPath = '/' + pathName.split('/')[1]
  if (allPagesValues.includes(firstPartOfPath)) {
    return false
  }

  return true
}

export function useIsDestinationPage() {
  const pathName = usePathname()
  if (pathName === '/') {
    return false
  }

  const allPages = ROUTE_URLS.pages
  const allPagesValues = Object.values(allPages)

  const firstPartOfPath = '/' + pathName.split('/')[1]

  let isDirectMatch = false

  allPagesValues.map(page => {
    if (page === pathName || page === firstPartOfPath) {
      isDirectMatch = true
    }
  })

  if (isDirectMatch) {
    return false
  }
  return true
  /*
  //const firstPartOfPath = '/' + pathName.split('/')[1]

  allPagesValues.map(page => {
    if (page === firstPartOfPath) {
      isDirectMatch = true
    }
  })

  if (isDirectMatch) {
    return false
  }

  return true
  */
}
