import type { CollectionSimilarCollections } from '@prisma/client'
import type { Prettify } from '@/shared/domain/utility-types'

export type SimilarDestinations = Prettify<CollectionSimilarCollections>

export type SimilarDestinationGroup = SimilarDestinations['neighborhood' | 'city' | 'province_state' | 'country']
