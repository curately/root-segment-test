import { type BestOfBreadcrumb, type CollectionBreadcrumb, type ListingBreadcrumb } from '@prisma/client'

type Breadcrumb = Array<CollectionBreadcrumb | ListingBreadcrumb | BestOfBreadcrumb> | null

export type BreadcrumbDto = {
  breadcrumb: Breadcrumb
}

export function formatBreadcrumb(breadcrumb: Breadcrumb, hideLast: boolean) {
  if (!breadcrumb || breadcrumb.length < 2) return null
  breadcrumb.sort((a, b) => a.url.length - b.url.length)
  if (hideLast) {
    breadcrumb.pop()
  }
  return breadcrumb
}
