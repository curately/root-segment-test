'use client'

import { usePropertySearchParams } from '@/app/property/check-availability/domain/use-property-search-params'
import Link, { type LinkProps } from 'next/link'
import { type PropsWithChildren } from 'react'

export function RetainQueryLink({ href, ...props }: LinkProps & PropsWithChildren) {
  const { data: searchParams, errors } = usePropertySearchParams()
  if (errors) {
    return null
  }

  const filtered = filterSearchParams(searchParams)
  // 1. use useRouter hook to get access to the current query params

  // 2. get the pathname
  const pathname = typeof href === 'object' ? href.pathname : href

  // 3. get the query from props
  const query = typeof href === 'object' && typeof href.query === 'object' ? href.query : {}

  return (
    <Link
      {...props}
      href={{
        pathname: pathname,
        // combine router.query and query props
        query: {
          ...filtered,
          ...query,
        },
      }}
    />
  )
}

function filterSearchParams(searchParams: any) {
  Object.keys(searchParams).forEach(key => searchParams[key] === '' && delete searchParams[key])
  Object.keys(searchParams).forEach(key => searchParams[key] === '1971-01-01' && delete searchParams[key])
  Object.keys(searchParams).forEach(key => searchParams[key] === '2' && delete searchParams[key])
  return searchParams
}
