import { getBreadcrumb } from '@/app/shared/breadcrumb/data-access/breadcrumb-data-access'
import { BreadcrumbItem } from '@/app/shared/breadcrumb/ui/breadcrumb-item'
import { notFound } from 'next/navigation'
import React from 'react'

const breadcrumbDomain = ['destination', 'property', 'curation'] as const

interface Props {
  type: (typeof breadcrumbDomain)[number]
  prismaSlug: string
  hideLast: boolean
  className?: string
  linkToLast?: boolean
}

export async function Breadcrumb({ type, prismaSlug, hideLast, className, linkToLast = true }: Props) {
  const { data, errors } = await getBreadcrumb({ slug: prismaSlug, type: type, hideLast: hideLast })

  if (errors || !data) return notFound()

  const { breadcrumb } = data

  if (!breadcrumb) {
    return null
  }

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="list-none ">
        {breadcrumb.map((breadcrumbItem, index) => {
          return (
            <li key={breadcrumbItem.url} className="inline" data-testid="breadcrumb">
              <BreadcrumbItem
                label={breadcrumbItem.name}
                url={breadcrumbItem.url}
                isLastBreadcrumbItem={index === breadcrumb.length - 1}
                shouldLinkToLastItem={linkToLast}
              />
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
