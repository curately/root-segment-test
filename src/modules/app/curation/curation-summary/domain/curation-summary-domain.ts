import type { BestOf } from '@prisma/client'

export type CurationSummaryDTO = Pick<BestOf, 'bannerImage' | 'heading' | 'introText'>
