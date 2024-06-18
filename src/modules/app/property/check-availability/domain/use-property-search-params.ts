import type { PropertyParams } from '@/shared/domain/routes'

import { useSearchParams } from 'next/navigation'

import { createClientErrorResponse, createClientSuccessResponse } from '@/shared/data-access/client-response'
import { Routes } from '@/shared/domain/routes'

export function usePropertySearchParams() {
  const searchParams = useSearchParams()
  const params = {
    checkin: searchParams.get('checkin'),
    checkout: searchParams.get('checkout'),
    rooms: searchParams.get('rooms'),
    modal: searchParams.get('modal'),
    image: searchParams.get('image'),
  }
  const { success, error: zodError, data: propertySearchParams } = Routes.property.searchParams.safeParse(params)

  if (!success) {
    return createClientErrorResponse<PropertyParams>(zodError)
  }

  return createClientSuccessResponse(propertySearchParams)
}
