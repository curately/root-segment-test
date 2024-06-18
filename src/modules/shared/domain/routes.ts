//import { usePathname } from 'next/navigation'
import { string, z } from 'zod'

import { validateCheckinAndCheckoutDates } from '@/shared/domain/validate-dates'

export type AppSlug = Array<string>

export const ROUTE_URLS = {
  // 🦀 pages include all our routes except destinations which are fully dynamic.
  // Hotel and best of also include dynamic stubs so we include their prefix.
  pages: {
    home: '/',
    hotel: '/hotel',
    about: '/about-us',
    bestOf: '/best-of',
    search: '/search',
    privacy: '/privacy-policy',
    terms: '/terms-of-use',
    sitemap: '/sitemap',
  },
  api: {
    autocomplete: '/api/autocomplete',
    availability: '/api/check-availability',
    search: '/api/search-results',
  },
  external: {
    facebook: 'https://www.facebook.com/thefamilyhotelguide',
    instagram: 'https://www.instagram.com/thefamilyhotelguide/',
    twitter: 'https://twitter.com/tfh_guide',
  },
} as const

const allSearchParams = z
  .object({
    checkin: z.string().default('').catch(''),
    checkout: z.string().default('').catch(''),
    rooms: z.string().default('2').catch('2'),
    modal: string().default('').catch(''),
    image: string().default('').catch(''),
  })
  .transform(data => {
    const { checkin, checkout, ...rest } = data
    const { validatedCheckin, validatedCheckout } = validateCheckinAndCheckoutDates({
      checkin,
      checkout,
    })
    return {
      checkin: validatedCheckin,
      checkout: validatedCheckout,
      ...rest,
    }
  })

export const dynamicPaths = {
  property: '/hotel/:slug*',
  destination: '/:slug*',
  curation: '/best-of/:slug*',
}

export const Routes = {
  home: {
    path: '/',
  },
  about: {
    path: '/about-us',
  },
  privacy: {
    path: '/privacy-policy',
  },
  terms: {
    path: '/terms-of-use',
  },
  sitemap: {
    path: '/sitemap',
  },
  curation: {
    path: '/best-of/:slug*',
    getPrismaSlug: (appSlug: AppSlug) => {
      if (!appSlug || appSlug.length === 0) {
        return '/best-of'
      }

      return Routes.curation.path.replace(':slug*', appSlug.join('/'))
    },
  },
  property: {
    path: '/hotel/:slug*',
    getPrismaSlug: (appSlug: AppSlug) => {
      return decodeURI(dynamicPaths.property.replace(':slug*', appSlug.join('/')))
    },
    searchParams: z
      .object({
        checkin: z.string().default('').catch(''),
        checkout: z.string().default('').catch(''),
        rooms: z.string().default('2').catch('2'),
        modal: string().default('').catch(''),
        //image: z.coerce.number().default(0).catch(0),
        image: string().default('').catch(''),
      })
      .transform(data => {
        const { checkin, checkout, ...rest } = data
        const { validatedCheckin, validatedCheckout } = validateCheckinAndCheckoutDates({
          checkin,
          checkout,
        })
        return {
          checkin: validatedCheckin,
          checkout: validatedCheckout,
          ...rest,
        }
      }),
  },
  destination: {
    path: '/:slug*',
    getPrismaSlug: (appSlug: AppSlug) => {
      const safeAppSlug = appSlug[0] === '/' ? appSlug.slice(1) : appSlug
      return decodeURI(dynamicPaths.destination.replace(':slug*', safeAppSlug.join('/')))
    },
    searchParams: z.object({
      checkin: z.string().default(''),
      checkout: z.string().default(''),
      roooms: z.string().default('2'),
      modal: z.string().default(''),
    }),
  },
  search: {
    path: '/search',
    searchParams: z.object({
      checkin: z.string().default(''),
      checkout: z.string().default(''),
      roooms: z.string().default('2'),
      modal: z.string().default(''),
    }),
  },
  external: {
    facebook: 'https://www.facebook.com/thefamilyhotelguide',
    instagram: 'https://www.instagram.com/thefamilyhotelguide/',
    twitter: 'https://twitter.com/tfh_guide',
  },
}

export type PropertyParams = z.infer<typeof Routes.property.searchParams>
export type DestinationParams = z.infer<typeof Routes.destination.searchParams>
export type SearchParams = z.infer<typeof Routes.search.searchParams>
/*
export function isDestinationPage(pathName: string) {
  if (pathName === '/') {
    return false
  }

  const allPages = ROUTE_URLS.pages
  const allPagesValues = Object.values(allPages)
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
*/

export function unSlugifyDestinationName(destinationName: string) {
  if (!destinationName) {
    return ''
  }
  const destinationParts = destinationName.split('-')
  destinationParts.map(part => {
    return part.charAt(0).toUpperCase() + part.slice(1)
  })
  return destinationParts.join(' ')
}
