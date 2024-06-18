'use client'

import Link from 'next/link'
import { cn } from '@/shared/ui/helpers'

interface Props {
  children: React.ReactNode
  className?: string
  slug: string
  first?: boolean
}
export function HotelCard({ children, slug = '', className = '', first }: Props) {
  if (!slug || slug === '') {
    return <div>Missing Slug</div>
  }

  return (
    <>
      <Link
        href={slug}
        className={cn('block  cursor-pointer rounded-sm border-0 bg-white py-0   hover:bg-gray-50 ', className)}
        target="_blank"
      >
        <article className={`property-card relative isolate  flex flex-col  lg:flex-col`}>{children}</article>
      </Link>
    </>
  )
}
