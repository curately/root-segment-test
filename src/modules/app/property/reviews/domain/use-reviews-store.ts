import type { ReviewsResponse } from '@/shared/domain/review-domain'
import type { InitialReviewsResponse } from '../../reviews/domain/reviews-domain'

import { createContext, useContext } from 'react'

import { keepPreviousData, QueryClient, useQuery } from '@tanstack/react-query'
import { createStore, useStore } from 'zustand'

import { filterReviews } from '../../reviews/data-access/reviews-data-access'

type ReviewParams = {
  starRating: number
  currentPage: number
  filters: Array<string>
  currentFilterText: string
}
export type ReviewStore = {
  selectedStarRating: number
  currentPage: number
  currentFilterText: string
  filters: Array<string>
  reviewParams: ReviewParams
  actions: {
    setReviewParams: (reviewParams: ReviewParams) => void
    resetQuery: () => void

    prefetchReviews: (
      queryClient: any,
      hcomId: string,
      reviewParams: {
        currentPage: number
        starRating: number
        filters: Array<string>
        currentFilterText: string
      },
    ) => void
  }
}

export const useReviewsStore = createStore<ReviewStore>()(set => ({
  selectedStarRating: 0,
  currentPage: 1,
  currentFilterText: '',
  filters: [],
  reviewParams: {
    starRating: 0,
    currentPage: 0,
    filters: [],
    currentFilterText: '',
  },
  actions: {
    setReviewParams: reviewParams => set({ reviewParams: reviewParams }),
    resetQuery: () => set({ reviewParams: { starRating: 0, currentPage: 0, filters: [], currentFilterText: '' } }),
    prefetchReviews: (
      queryClient: QueryClient,
      hcomId: string,
      reviewParams: {
        currentPage: number
        starRating: number
        filters: Array<string>
        currentFilterText: string
      },
    ) => {
      queryClient.prefetchQuery({
        queryKey: ['filtered-reviews', hcomId, reviewParams],
        queryFn: async () => {
          const { data, errors } = await filterReviews({
            hcomId: hcomId,
            starRating: reviewParams.starRating,
            currentPage: reviewParams.currentPage,
            filters: reviewParams.filters || [],
            currentFilterText: reviewParams.currentFilterText,
          })
          if (errors || !data) {
            return null
          }
          return data
        },
        staleTime: 6000000000,
      })
    },
  },
}))

export const ReviewsStoreContext = createContext(useReviewsStore)

export const useSelectedStarRating = () => useStore(useContext(ReviewsStoreContext), state => state.selectedStarRating)

export const useCurrentPage = () => useStore(useContext(ReviewsStoreContext), state => state.currentPage)

export const useFilters = () => useStore(useContext(ReviewsStoreContext), state => state.filters)

export const useCurrentFilterText = () => useStore(useContext(ReviewsStoreContext), state => state.currentFilterText)

export const useReviewParams = () => useStore(useContext(ReviewsStoreContext), state => state.reviewParams)

export const useActions = () => useStore(useReviewsStore, state => state.actions)

export const useFilteredReviews = (initialData: InitialReviewsResponse, hcomId: string) => {
  const reviewParams = useReviewParams()
  return useQuery<InitialReviewsResponse | ReviewsResponse, Error>({
    //return useQuery<any, Error>({
    queryKey: ['filtered-reviews', hcomId, reviewParams],
    queryFn: async () => {
      const { data, errors } = await filterReviews({
        hcomId: hcomId,
        starRating: reviewParams.starRating,
        currentPage: reviewParams.currentPage,
        filters: reviewParams.filters || [],
        currentFilterText: reviewParams.currentFilterText,
      })
      if (errors || !data) {
        return {
          totalNoReviews: 0,
          reviews: [],
        }
      }
      return data as ReviewsResponse
    },
    placeholderData: keepPreviousData,
    staleTime: 60000000000000,
    initialData:
      reviewParams.currentPage === 0 &&
      reviewParams.starRating === 0 &&
      reviewParams.filters.length === 0 &&
      reviewParams.currentFilterText === ''
        ? initialData
        : undefined,
  })
}
