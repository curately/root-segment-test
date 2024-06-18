import { unstable_cache } from 'next/cache'

import { createServerErrorResponse, createServerSuccessResponse } from '@/shared/data-access/server-response'
import { type Prettify } from '@/shared/domain/utility-types'

import { getAllRoutes } from '../../shared/data-access/cached-curation-objects'
import { getCuration } from '../../shared/data-access/get-curation'
import { type AllCurationRoutesDto, type CurationParamsDto } from '../domain/route-params-domain'

export const getCurationPageParams = unstable_cache(
  async (prismaSlug: string) => {
    try {
      const curation = await getCuration(prismaSlug)
      if (!curation) {
        return createServerErrorResponse<Prettify<CurationParamsDto>>('Curation not found')
      }

      return createServerSuccessResponse({ curationSlug: prismaSlug })
    } catch (error) {
      return createServerErrorResponse<Prettify<CurationParamsDto>>(error)
    }
  },
  ['curation-page-params'],
  {
    tags: ['curation-page-params', 'curation'],
    revalidate: 864000,
  },
)

export const getAllCurationRoutes = unstable_cache(
  async () => {
    console.log('running getAllCurationRoutes')
    try {
      const prismaCurationRoutes = await getAllRoutes()
      if (!prismaCurationRoutes) {
        return createServerErrorResponse<Prettify<AllCurationRoutesDto>>('Curation not found')
      }

      //strip out the /best-of prefix from all curationRoutes

      let curationSlugs: AllCurationRoutesDto = []

      prismaCurationRoutes.map(route => {
        const slug = route.slug.replace('/best-of', '').replace('/', '')
        curationSlugs.push(slug)
      })

      return createServerSuccessResponse(curationSlugs)
    } catch (error) {
      return createServerErrorResponse<Prettify<AllCurationRoutesDto>>(error)
    }
  },
  ['curation-routes'],
  {
    tags: ['curation-routes', 'curation'],
    revalidate: 900,
  },
)
/*
export const getAllCurationRoutes = unstable_cache(
  async () => {
    return await prismaCurationClient.bestOf.getAllRoutes()
  },
  ['curation-routes'],
  {
    tags: ['curation-routes', 'curation'],
    revalidate: 900,
  },
)
*/
