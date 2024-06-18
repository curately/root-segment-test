import type { CurationSummaryDTO } from '../domain/curation-summary-domain'

import { unstable_cache } from 'next/cache'

import { createServerErrorResponse, createServerSuccessResponse } from '@/shared/data-access/server-response'

import { getCuration } from '../../shared/data-access/get-curation'

export const getCurationSummary = unstable_cache(
  async (slug: string) => {
    try {
      const curation = await getCuration(slug)

      if (!curation) {
        return createServerErrorResponse<CurationSummaryDTO>('Curation summary not found')
      }

      const { bannerImage, introText, heading } = curation

      const dto: CurationSummaryDTO = {
        bannerImage,
        heading,
        introText,
      }

      return createServerSuccessResponse(dto)
    } catch {
      return createServerErrorResponse<CurationSummaryDTO>('There was a problem with this request. Please try again.')
    }
  },
  ['curation-summary'],
  {
    tags: ['curation-summary', 'curation'],
    revalidate: 90000,
  },
)
