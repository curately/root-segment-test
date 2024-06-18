'use client'

import { type DateRange } from '@react-types/datepicker'
import { usePathname, useRouter } from 'next/navigation'
import { useBuildRefinementQueryString } from './use-build-refinement-querystring'

export const useApplyRefinements = (mergedRefinements?: Record<string, string | number | DateRange | null> | null) => {
  const queryString = useBuildRefinementQueryString(mergedRefinements)

  console.log(queryString)
  const router = useRouter()
  const pathname = usePathname()
  /*
  const urlParams = useSearchParams()
  const isDestinationPage = useIsDestinationPage()
  const pathName = usePathname()
  let destination = ''
  if (isDestinationPage) {
    destination = unSlugifyDestinationName(pathName.split('/').pop() ?? '')
  }
  const refinements: Refinements = useRefinements()

  let safeSearchFilters: Refinements = {}

  // looop through all of our refinements and add to querystring if exists,
  // otherwise default to the existing querystring else default to empty string
  for (const key in refinements) {
    safeSearchFilters[key] = refinements[key] ?? urlParams.get(key) ?? ''
  }
  if (isDestinationPage && destination !== '') {
    safeSearchFilters.location = destination
  }

  const queryString = new URLSearchParams(createQueryString({ refinements: safeSearchFilters })).toString()
  */
  const newRoutes = {
    search: `/search/?${queryString}`,
    availability: `${pathname}/?${queryString}`,
  }
  return {
    updateSearch: async () => {
      router.push(newRoutes.search)
    },
    prefetchSearch: async () => {
      router.prefetch(newRoutes.search)
    },
    updateAvailability: async () => {
      router.push(newRoutes.availability, {
        scroll: false,
      })
    },
    /*
    updateAvailability: async (pathname: string) => {
      router.push(`/${pathname}/?${queryString}`)

    },
    */
  }
}
